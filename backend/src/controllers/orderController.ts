import { Request, Response } from 'express';
import { Order, Product } from '../models';
import { AuthRequest } from '../types';
import { getPaginationParams, createPaginatedResponse } from '../utils/pagination';

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit, skip } = getPaginationParams(req);
    const [orders, total] = await Promise.all([
      Order.find().populate('products.product_id', 'name price').skip(skip).limit(limit),
      Order.countDocuments()
    ]);
    res.status(200).json({
      success: true,
      ...createPaginatedResponse(orders, total, page, limit)
    });
  } catch (error) {
        res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const getUserOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    // Authorization check
    if (req.userId !== userId) {
      res.status(403).json({
        success: false,
        message: 'Forbidden - You can only access your own orders'
      });
      return;
    }

    const userOrders = await Order.find({ user_id: userId }).populate('products.product_id', 'name price');
    res.json({
      success: true,
      data: userOrders
    });
  } catch (error) {
        res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  const { userId, products, total_amount } = req.body;

  try {
    // Authorization check
    if (req.userId !== userId) {
      res.status(403).json({
        success: false,
        message: 'Forbidden - You can only create orders for yourself'
      });
      return;
    }

    // Check quantity and update for each product
    for (const item of products) {
      const product = await Product.findById(item.product_id);
      if (!product) {
        res.status(404).json({
          success: false,
          message: `Product with id ${item.product_id} not found`
        });
        return;
      }

      if (product.quantity < item.quantity) {
        res.status(400).json({
          success: false,
          message: `Insufficient quantity for product ${product.name}`
        });
        return;
      }

      product.quantity -= item.quantity;
      await product.save();
    }

    const newOrder = new Order({
      user_id: userId,
      products,
      total_amount
    });
    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      data: savedOrder
    });
  } catch (error) {
        res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId).populate('products.product_id', 'name price');
    if (!order) {
      res.status(404).json({
        success: false,
        message: 'Order not found'
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
        res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  const orderId = req.params.id;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { order_status: status },
      { new: true }
    );
    if (!updatedOrder) {
      res.status(404).json({
        success: false,
        message: 'Order not found'
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: updatedOrder
    });
  } catch (error) {
        res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  const orderId = req.params.id;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      res.status(404).json({
        success: false,
        message: 'Order not found'
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
