import { Request, Response } from 'express';
import { Product } from '../models';

export const getAllProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('getAllProducts:', error);
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
    console.error('getProductsByCategory:', error);
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
    console.error('createProduct:', error);
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
    console.error('getProductById:', error);
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
    console.error('updateProduct:', error);
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
    console.error('deleteProduct:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};
