import { Response } from 'express';
import { Cart, Product, ICart } from '../models';
import { AuthRequest } from '../types';

// Populate cart items with product details
const populateCartItems = async (cart: ICart) => {
  const populatedItems = await Promise.all(
    cart.items.map(async (item) => {
      const product = await Product.findById(item.product);
      const itemObj = item.toObject ? item.toObject() : item;
      return {
        ...itemObj,
        product: product ? {
          id: product._id,
          img: product.productImg,
          name: product.name,
          price: product.price
        } : null
      };
    })
  );

  return { ...cart.toObject(), items: populatedItems };
};

export const getCartByUserId = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    // Authorization check
    if (req.userId !== userId) {
      res.status(403).json({
        success: false,
        message: 'Forbidden - You can only access your own cart'
      });
      return;
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
      return;
    }

    const populatedCart = await populateCartItems(cart);
    res.status(200).json({
      success: true,
      data: populatedCart
    });
  } catch (error) {
        res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const addItemToCart = async (req: AuthRequest, res: Response): Promise<void> => {
  const { user, productId, quantity, price } = req.body;

  try {
    // Authorization check
    if (req.userId !== user) {
      res.status(403).json({
        success: false,
        message: 'Forbidden - You can only modify your own cart'
      });
      return;
    }

    let cart = await Cart.findOne({ user });
    if (!cart) {
      cart = new Cart({ user, items: [] });
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found'
      });
      return;
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, price });
    }

    cart.total += quantity * price;
    await cart.save();

    res.status(201).json({
      success: true,
      data: cart
    });
  } catch (error) {
        res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const removeItemFromCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { userId, productId } = req.params;

    // Authorization check
    if (req.userId !== userId) {
      res.status(403).json({
        success: false,
        message: 'Forbidden - You can only modify your own cart'
      });
      return;
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
      return;
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
      return;
    }

    const removedItem = cart.items.splice(itemIndex, 1)[0];
    cart.total -= removedItem.quantity * removedItem.price;

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
        res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const updateItemInCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { user, item: productId, quantity } = req.body;

    // Authorization check
    if (req.userId !== user) {
      res.status(403).json({
        success: false,
        message: 'Forbidden - You can only modify your own cart'
      });
      return;
    }

    const cart = await Cart.findOne({ user });

    if (!cart) {
      res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
      return;
    }

    const itemIndex = cart.items.findIndex(
      cartItem => cartItem._id?.toString() === productId
    );

    if (itemIndex === -1) {
      res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
      return;
    }

    const currentItem = cart.items[itemIndex];
    const oldQuantity = currentItem.quantity;

    currentItem.quantity = quantity;

    if (currentItem.quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.total += (quantity - oldQuantity) * currentItem.price;
    }

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
        res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const clearCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    // Authorization check
    if (req.userId !== userId) {
      res.status(403).json({
        success: false,
        message: 'Forbidden - You can only modify your own cart'
      });
      return;
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
      return;
    }

    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
        res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};
