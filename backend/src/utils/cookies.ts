import { Response } from 'express';
import config from '../config';

interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'strict' | 'lax' | 'none';
  maxAge: number;
}

export const getCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: config.nodeEnv === 'production',
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
});

export const setAuthCookie = (res: Response, token: string): void => {
  res.cookie('jwt', token, getCookieOptions());
};

export const clearAuthCookie = (res: Response): void => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'strict'
  });
};
