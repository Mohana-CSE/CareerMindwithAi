import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { ProgressCollection } from '../models';

export async function getProgress(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user?._id || 'guest-user';
    let progress = ProgressCollection.findOne(p => p.userId === userId);

    if (!progress) {
      progress = ProgressCollection.create({
        userId,
        skillStatus: {},
        projectStatus: {},
        completedRoadmapSteps: [1],
        updatedAt: new Date().toISOString(),
      });
    }

    return res.json({
      success: true,
      progress,
    });
  } catch (err: any) {
    console.error('Error fetching progress:', err);
    return res.status(500).json({ success: false, error: 'Failed to retrieve progress.' });
  }
}

export async function updateProgressItem(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user?._id || 'guest-user';
    const { id } = req.params;
    const { type, status, step } = req.body; // type: 'skill' | 'project' | 'roadmap'

    let progress = ProgressCollection.findOne(p => p.userId === userId);
    if (!progress) {
      progress = ProgressCollection.create({
        userId,
        skillStatus: {},
        projectStatus: {},
        completedRoadmapSteps: [1],
        updatedAt: new Date().toISOString(),
      });
    }

    const skillStatus = { ...progress.skillStatus };
    const projectStatus = { ...progress.projectStatus };
    let completedSteps = [...progress.completedRoadmapSteps];

    if (type === 'skill') {
      skillStatus[id] = status;
    } else if (type === 'project') {
      projectStatus[id] = status;
    } else if (type === 'roadmap' && typeof step === 'number') {
      if (!completedSteps.includes(step)) {
        completedSteps.push(step);
      } else {
        completedSteps = completedSteps.filter(s => s !== step);
      }
    } else {
      // Auto-detect
      skillStatus[id] = status;
    }

    const updated = ProgressCollection.updateOne(
      p => p.userId === userId,
      {
        skillStatus,
        projectStatus,
        completedRoadmapSteps: completedSteps,
        updatedAt: new Date().toISOString(),
      }
    );

    return res.json({
      success: true,
      progress: updated,
    });
  } catch (err: any) {
    console.error('Error updating progress:', err);
    return res.status(500).json({ success: false, error: 'Failed to update progress.' });
  }
}
