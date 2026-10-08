import { Response } from 'express';
import multer from 'multer';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { parseResumeFile } from '../services/parserService';
import { analyzeResumeWithGemini } from '../services/aiService';
import { Resumes, Analyses, ProgressCollection } from '../models';

// Configure Multer for in-memory handling
const uploadStorage = multer.memoryStorage();
export const uploadMiddleware = multer({
  storage: uploadStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB maximum
  },
  fileFilter: (_req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
    ];
    const ext = file.originalname.split('.').pop()?.toLowerCase();
    if (allowed.includes(file.mimetype) || ['pdf', 'docx', 'doc', 'txt'].includes(ext || '')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOCX, DOC, and TXT files are accepted.'));
    }
  },
}).single('resume');

export async function uploadResume(req: AuthenticatedRequest, res: Response) {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No resume file uploaded. Please attach a valid PDF or DOCX file.',
      });
    }

    const userId = req.user?._id || 'guest-user';

    // 1. Parse File Content
    const parseResult = await parseResumeFile(file.buffer, file.mimetype, file.originalname);
    if (!parseResult.isReadable || !parseResult.text) {
      return res.status(422).json({
        success: false,
        error: parseResult.error || 'Unable to extract readable text from this resume.',
      });
    }

    // 2. Save parsed resume to database
    const savedResume = Resumes.create({
      userId,
      filename: `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`,
      originalName: file.originalname,
      mimeType: file.mimetype,
      fileSize: file.size,
      extractedText: parseResult.text,
      charCount: parseResult.charCount,
      wordCount: parseResult.wordCount,
      createdAt: new Date().toISOString(),
    });

    // 3. Analyze ACTUAL uploaded resume using Gemini AI / deep NLP
    const analysisData = await analyzeResumeWithGemini(
      parseResult.text,
      userId,
      savedResume._id
    );

    // Explicitly guarantee isDemo is false for uploaded resumes
    analysisData.isDemo = false;
    analysisData.userId = userId;
    analysisData.resumeId = savedResume._id;

    // 4. Save analysis to Database
    const savedAnalysis = Analyses.create(analysisData);

    // 5. Initialize or update progress record
    const existingProgress = ProgressCollection.findOne(p => p.userId === userId);
    if (!existingProgress) {
      ProgressCollection.create({
        userId,
        skillStatus: {},
        projectStatus: {},
        completedRoadmapSteps: [1],
        updatedAt: new Date().toISOString(),
      });
    }

    return res.status(200).json({
      success: true,
      analysisId: savedAnalysis._id,
      resumeId: savedResume._id,
      analysis: savedAnalysis,
      isDemo: false,
      message: 'Resume analyzed successfully.',
    });
  } catch (err: any) {
    console.error('Error in uploadResume handler:', err);
    return res.status(500).json({
      success: false,
      error: `Unable to analyze this resume: ${err?.message || 'Server processing error.'}`,
    });
  }
}
