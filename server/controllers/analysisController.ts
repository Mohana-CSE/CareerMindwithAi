import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { Analyses, Resumes } from '../models';
import { analyzeResumeWithGemini, getDemoAnalysis } from '../services/aiService';

export async function createAnalysis(req: AuthenticatedRequest, res: Response) {
  try {
    const { text, resumeId } = req.body;
    const userId = req.user?._id || 'guest-user';

    let resumeText = text;
    let targetResumeId = resumeId || '';

    if (!resumeText && resumeId) {
      const resume = Resumes.findById(resumeId);
      if (resume) {
        resumeText = resume.extractedText;
      }
    }

    if (!resumeText || resumeText.trim().length < 40) {
      return res.status(400).json({
        success: false,
        error: 'Unable to analyze: resume content is too short or empty.',
      });
    }

    const analysisData = await analyzeResumeWithGemini(resumeText, userId, targetResumeId);
    analysisData.isDemo = false;
    analysisData.userId = userId;
    analysisData.resumeId = targetResumeId;

    const saved = Analyses.create(analysisData);

    return res.status(201).json({
      success: true,
      analysisId: saved._id,
      analysis: saved,
      isDemo: false,
    });
  } catch (err: any) {
    console.error('Create analysis error:', err);
    return res.status(500).json({
      success: false,
      error: `Unable to analyze this resume: ${err?.message || 'Processing error.'}`,
    });
  }
}

export async function getAnalysisById(req: AuthenticatedRequest, res: Response) {
  try {
    const { id } = req.params;
    if (id === 'demo' || id === 'demo-analysis-sample-id') {
      const demo = getDemoAnalysis();
      return res.json({ success: true, analysis: demo, isDemo: true });
    }

    const analysis = Analyses.findById(id);
    if (!analysis) {
      return res.status(404).json({
        success: false,
        error: 'Analysis not found.',
      });
    }

    return res.json({
      success: true,
      analysis,
      isDemo: Boolean(analysis.isDemo),
    });
  } catch (err: any) {
    console.error('Get analysis by ID error:', err);
    return res.status(500).json({ success: false, error: 'Failed to retrieve analysis.' });
  }
}

export async function getAnalysisHistory(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user?._id || 'guest-user';
    const history = Analyses.find(a => a.userId === userId && !a.isDemo);

    return res.json({
      success: true,
      history: history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    });
  } catch (err: any) {
    console.error('Get history error:', err);
    return res.status(500).json({ success: false, error: 'Failed to load history.' });
  }
}

export async function getDemoAnalysisHandler(_req: AuthenticatedRequest, res: Response) {
  const demo = getDemoAnalysis();
  return res.json({
    success: true,
    analysis: demo,
    isDemo: true,
    message: 'Loaded sample demo intelligence data.',
  });
}
