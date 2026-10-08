import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { CodingProblems, Analyses, ProgressCollection } from '../models';

export async function getRecommendedCodingProblems(req: AuthenticatedRequest, res: Response) {
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

    const allProblems = CodingProblems.find();
    const progress = ProgressCollection.findOne(p => p.userId === userId);
    const solvedSet = new Set(progress?.solvedProblemIds || []);

    if (!targetAnalysis) {
      return res.json({
        success: true,
        problems: allProblems.map(p => ({
          ...p,
          isSolved: solvedSet.has(p._id),
        })),
        solvedCount: solvedSet.size,
      });
    }

    // Prioritize problems matching user's missing skills and top career
    const gaps = targetAnalysis.skillGaps.map(g => g.skill.toLowerCase());
    const topRole = targetAnalysis.topCareerMatch.title.toLowerCase();

    const scored = allProblems.map(prob => {
      let score = 50;
      if (gaps.some(g => prob.skill.toLowerCase().includes(g) || g.includes(prob.skill.toLowerCase()))) {
        score += 40;
      }
      if (topRole.includes(prob.skill.toLowerCase())) {
        score += 25;
      }
      return {
        ...prob,
        isSolved: solvedSet.has(prob._id),
        score,
      };
    });

    scored.sort((a, b) => {
      // Unsolved first, then by priority score
      if (a.isSolved !== b.isSolved) {
        return a.isSolved ? 1 : -1;
      }
      return b.score - a.score;
    });

    return res.json({
      success: true,
      problems: scored,
      solvedCount: solvedSet.size,
      targetGaps: targetAnalysis.skillGaps.map(g => g.skill),
    });
  } catch (err: any) {
    console.error('Error fetching coding problems:', err);
    return res.status(500).json({ success: false, error: 'Failed to retrieve coding problems.' });
  }
}

export async function toggleProblemSolved(req: AuthenticatedRequest, res: Response) {
  try {
    const { id } = req.params;
    const userId = req.user?._id || 'guest-user';

    let progress = ProgressCollection.findOne(p => p.userId === userId);
    if (!progress) {
      progress = ProgressCollection.create({
        userId,
        skillStatus: {},
        projectStatus: {},
        completedRoadmapSteps: [1],
        solvedProblemIds: [],
        updatedAt: new Date().toISOString(),
      });
    }

    let solved = [...(progress.solvedProblemIds || [])];
    if (solved.includes(id)) {
      solved = solved.filter(sId => sId !== id);
    } else {
      solved.push(id);
    }

    const updated = ProgressCollection.updateOne(p => p.userId === userId, {
      solvedProblemIds: solved,
      updatedAt: new Date().toISOString(),
    });

    return res.json({
      success: true,
      solvedProblemIds: updated?.solvedProblemIds || solved,
      isSolved: solved.includes(id),
    });
  } catch (err: any) {
    console.error('Error toggling problem solved status:', err);
    return res.status(500).json({ success: false, error: 'Failed to update problem status.' });
  }
}
