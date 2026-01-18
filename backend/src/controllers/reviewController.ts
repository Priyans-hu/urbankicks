import { Request, Response } from 'express';
import { Review } from '../models';
import { getPaginationParams, createPaginatedResponse } from '../utils/pagination';

export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
        res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Bad request'
    });
  }
};

export const getAllReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit, skip } = getPaginationParams(req);
    const [reviews, total] = await Promise.all([
      Review.find().skip(skip).limit(limit),
      Review.countDocuments()
    ]);
    res.json({
      success: true,
      data: reviews,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
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
        res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};
