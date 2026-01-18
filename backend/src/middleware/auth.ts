import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { AuthRequest } from '../types';

interface JwtPayload {
  userId: string;
}

export const isAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies?.jwt;

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized - No token provided'
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    req.userId = decoded.userId;
    next();
  } catch (_error) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized - Invalid token'
    });
  }
};

export const isOwner = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const { userId } = req.params;

  if (req.userId !== userId) {
    res.status(403).json({
      success: false,
      message: 'Forbidden - You can only access your own resources'
    });
    return;
  }

  next();
};
