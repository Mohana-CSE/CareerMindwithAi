import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController';
import { uploadResume, uploadMiddleware } from '../controllers/resumeController';
import { createAnalysis, getAnalysisById, getAnalysisHistory, getDemoAnalysisHandler } from '../controllers/analysisController';
import { getAllCareers, getCareerById } from '../controllers/careerController';
import { getAllProjects, getRecommendedProjects, getProjectById, submitProjectSolution, getProjectSubmissions } from '../controllers/projectController';
import { getRecommendedCourses } from '../controllers/courseController';
import { getRecommendedCodingProblems, toggleProblemSolved } from '../controllers/codingProblemController';
import { getProgress, updateProgressItem } from '../controllers/progressController';
import { getAssessmentQuestions, submitAssessment } from '../controllers/assessmentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Apply authMiddleware globally to /api routes
router.use(authMiddleware);

// Auth routes
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/me', getMe);

// Resume upload route (POST /api/resume/upload)
router.post('/resume/upload', uploadMiddleware, uploadResume);

// Analysis routes
router.post('/analysis', createAnalysis);
router.get('/analysis/demo', getDemoAnalysisHandler); // Explicit Demo Mode ONLY
router.get('/analysis/history', getAnalysisHistory);
router.get('/analysis/:id', getAnalysisById);

// Career routes
router.get('/careers', getAllCareers);
router.get('/careers/:id', getCareerById);

// Project routes
router.get('/projects', getAllProjects);
router.get('/projects/recommended', getRecommendedProjects);
router.get('/projects/:id', getProjectById);
router.post('/projects/:id/submit', submitProjectSolution);
router.get('/projects/:id/submissions', getProjectSubmissions);

// Coding problem routes (LeetCode / NeetCode / BigFrontend)
router.get('/coding-problems/recommended', getRecommendedCodingProblems);
router.put('/coding-problems/:id/toggle', toggleProblemSolved);

// Course routes
router.get('/courses/recommended', getRecommendedCourses);

// Progress routes
router.get('/progress', getProgress);
router.put('/progress/:id', updateProgressItem);

// Assessment routes
router.get('/assessment/questions', getAssessmentQuestions);
router.post('/assessment/submit', submitAssessment);

export default router;
