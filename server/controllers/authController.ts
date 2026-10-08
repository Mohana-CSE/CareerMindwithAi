import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { Users } from '../models';
import { AuthenticatedRequest, signUserToken } from '../middleware/authMiddleware';

export async function register(req: AuthenticatedRequest, res: Response) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const existing = Users.findOne(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = Users.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const token = signUserToken({ _id: newUser._id, email: newUser.email, name: newUser.name });

    return res.status(201).json({
      success: true,
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err: any) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Internal server error during registration.' });
  }
}

export async function login(req: AuthenticatedRequest, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = Users.findOne(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || !user.passwordHash) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = signUserToken({ _id: user._id, email: user.email, name: user.name });

    return res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error during login.' });
  }
}

export async function getMe(req: AuthenticatedRequest, res: Response) {
  if (!req.user || req.user._id === 'guest-user') {
    return res.json({
      user: null,
      isGuest: true,
    });
  }

  const user = Users.findById(req.user._id);
  if (!user) {
    return res.json({ user: null, isGuest: true });
  }

  return res.json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      targetCareerId: user.targetCareerId,
    },
    isGuest: false,
  });
}
