const { Product } = require('../models/productsModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getProductsByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const products = await Product.find({ categories: category });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createProduct = async (req, res) => {
    const newProduct = req.body;

    try {
        const product = new Product(newProduct);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;

    try {
        const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(204).end(); // No content
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllProducts,
    getProductsByCategory,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};
