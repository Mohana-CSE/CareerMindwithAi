import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { LearningResources, Analyses } from '../models';

export async function getRecommendedCourses(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user?._id || 'guest-user';
    const analysisId = req.query.analysisId as string;

    let targetAnalysis = null;
    if (analysisId) {
      targetAnalysis = Analyses.findById(analysisId);
    } else {
      const userAnalyses = Analyses.find(a => a.userId === userId && !a.isDemo);
      if (userAnalyses.length > 0) {
        targetAnalysis = userAnalyses[userAnalyses.length - 1];
      }
    }

    const allResources = LearningResources.find();

    const learnNow = allResources.filter(r => r.tier === 'Learn Now');
    const learnNext = allResources.filter(r => r.tier === 'Learn Next');
    const optional = allResources.filter(r => r.tier === 'Optional');

    // If we have user's skill gaps, tailor the priority
    if (targetAnalysis && targetAnalysis.skillGaps.length > 0) {
      const highGaps = targetAnalysis.skillGaps
        .filter(g => g.priority === 'HIGH')
        .map(g => g.skill.toLowerCase());

      learnNow.sort((a, b) => {
        const aMatch = highGaps.some(g => a.skill.toLowerCase().includes(g));
        const bMatch = highGaps.some(g => b.skill.toLowerCase().includes(g));
        if (aMatch && !bMatch) return -1;
        if (!aMatch && bMatch) return 1;
        return 0;
      });
    }

    return res.json({
      success: true,
      learnNow,
      learnNext,
      optional,
      totalCount: allResources.length,
    });
  } catch (err: any) {
    console.error('Error fetching courses:', err);
    return res.status(500).json({ success: false, error: 'Failed to retrieve course recommendations.' });
  }
}
