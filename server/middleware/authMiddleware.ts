import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Users } from '../models';

const JWT_SECRET = process.env.JWT_SECRET || 'careermind-super-secret-key-2026';

export interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    email: string;
    name: string;
  };
  file?: Express.Multer.File;
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; name: string };
      const user = Users.findById(decoded.id);
      if (user) {
        req.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
        };
      }
    } catch {
      // Invalid token, continue as unauthenticated / anonymous
    }
  }

  // If no user token, check x-user-id header or create persistent anonymous session
  if (!req.user) {
    const anonId = (req.headers['x-session-id'] as string) || 'guest-user';
    req.user = {
      _id: anonId,
      email: 'guest@careermind.ai',
      name: 'Guest Developer',
    };
  }

  next();
}

export function signUserToken(user: { _id: string; email: string; name: string }): string {
  return jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, {
    expiresIn: '7d',
  });
}
