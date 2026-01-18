import { Request, Response } from 'express';
import { Review } from '../models';

export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('createReview:', error);
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Bad request'
    });
  }
};

export const getAllReviews = async (_req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find();
    res.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    console.error('getAllReviews:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const getReviewById = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      res.status(404).json({
        success: false,
        message: 'Review not found'
      });
      return;
    }
    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('getReviewById:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const getReviewsByProductId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }).populate('userId', 'username');
    res.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    console.error('getReviewsByProductId:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      res.status(404).json({
        success: false,
        message: 'Review not found'
      });
      return;
    }
    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('deleteReview:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};
