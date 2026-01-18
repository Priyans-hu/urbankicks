import { Request, Response } from 'express';
import { Product } from '../models';
import { getPaginationParams, createPaginatedResponse } from '../utils/pagination';

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit, skip } = getPaginationParams(req);
    const [products, total] = await Promise.all([
      Product.find().skip(skip).limit(limit),
      Product.countDocuments()
    ]);
    res.status(200).json({
      success: true,
      data: products,
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

export const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
  const { category } = req.params;

  try {
    const products = await Product.find({ categories: category });
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
        res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json({
      success: true,
      data: savedProduct
    });
  } catch (error) {
        res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found'
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
        res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;

  try {
    const product = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found'
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
        res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found'
      });
      return;
    }
    res.status(204).end();
  } catch (error) {
        res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};
