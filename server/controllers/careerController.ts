import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { CareerRoles } from '../models';

export async function getAllCareers(_req: AuthenticatedRequest, res: Response) {
  try {
    const roles = CareerRoles.find();
    return res.json({
      success: true,
      careers: roles,
      count: roles.length,
    });
  } catch (err: any) {
    console.error('Error fetching careers:', err);
    return res.status(500).json({ success: false, error: 'Failed to retrieve career roles.' });
  }
}

export async function getCareerById(req: AuthenticatedRequest, res: Response) {
  try {
    const { id } = req.params;
    const role = CareerRoles.findById(id) || CareerRoles.findOne(r => r.title.toLowerCase() === id.toLowerCase());
    if (!role) {
      return res.status(404).json({ success: false, error: 'Career role not found.' });
    }
    return res.json({ success: true, career: role });
  } catch (err: any) {
    console.error('Error fetching career by id:', err);
    return res.status(500).json({ success: false, error: 'Failed to retrieve career role.' });
  }
}
