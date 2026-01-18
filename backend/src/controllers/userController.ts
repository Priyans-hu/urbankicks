import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { User } from '../models';
import config from '../config';
import { setAuthCookie, clearAuthCookie } from '../utils/cookies';
import { AuthRequest } from '../types';

const jwtOptions: SignOptions = {
  expiresIn: config.jwtExpiresIn as jwt.SignOptions['expiresIn']
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const {
    username,
    email,
    password,
    phone_number,
    street,
    city,
    state,
    postal_code,
    country
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone_number,
      address: { street, city, state, postal_code, country }
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { userId: savedUser._id },
      config.jwtSecret,
      jwtOptions
    );

    setAuthCookie(res, token);

    // Don't return password in response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email
      }
    });
  } catch (error) {
    console.error('registerUser:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Need to explicitly select password since it's excluded by default
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    const token = jwt.sign(
      { userId: user._id },
      config.jwtSecret,
      jwtOptions
    );

    setAuthCookie(res, token);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: { email: user.email }
    });
  } catch (error) {
    console.error('loginUser:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const logoutUser = async (_req: Request, res: Response): Promise<void> => {
  try {
    clearAuthCookie(res);
    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('logoutUser:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const getUserDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.query;
    const userDetails = await User.findOne({ email: email as string });

    if (!userDetails) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    res.json({
      success: true,
      data: {
        id: userDetails._id,
        name: userDetails.username,
        email: userDetails.email,
        phone_number: userDetails.phone_number,
        address: userDetails.address
      }
    });
  } catch (error) {
    console.error('getUserDetails:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const getUserDetailsFromId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.query;
    const userDetails = await User.findById(userId as string);

    if (!userDetails) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    res.json({
      success: true,
      data: {
        id: userDetails._id,
        name: userDetails.username,
        email: userDetails.email
      }
    });
  } catch (error) {
    console.error('getUserDetailsFromId:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const updateUser = async (req: AuthRequest, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { password, address } = req.body;

  try {
    const user = await User.findById(userId).select('+password');

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if (address) {
      user.address.street = address.street || user.address.street;
      user.address.city = address.city || user.address.city;
      user.address.state = address.state || user.address.state;
      user.address.postal_code = address.postal_code || user.address.postal_code;
      user.address.country = address.country || user.address.country;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('updateUser:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};
