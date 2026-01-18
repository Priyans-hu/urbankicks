import request from 'supertest';
import express from 'express';
import { Product } from '../models';
import * as productController from '../controllers/productController';

const app = express();
app.use(express.json());

// Setup routes for testing
app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductById);
app.post('/products', productController.createProduct);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);

describe('Product Controller', () => {
  describe('GET /products', () => {
    it('should return empty array when no products exist', async () => {
      const response = await request(app).get('/products');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
      expect(response.body.total).toBe(0);
    });

    it('should return paginated products', async () => {
      // Create test products
      await Product.create([
        { name: 'Product 1', price: 100, productImg: 'img1.jpg', quantity: 10, sizes: [8, 9] },
        { name: 'Product 2', price: 200, productImg: 'img2.jpg', quantity: 5, sizes: [10, 11] }
      ]);

      const response = await request(app).get('/products?page=1&limit=10');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBe(2);
      expect(response.body.total).toBe(2);
      expect(response.body.page).toBe(1);
      expect(response.body.limit).toBe(10);
    });

    it('should respect pagination limits', async () => {
      // Create multiple test products
      const products = Array.from({ length: 5 }, (_, i) => ({
        name: `Product ${i + 1}`,
        price: 100 * (i + 1),
        productImg: `img${i + 1}.jpg`,
        quantity: 10,
        sizes: [8, 9]
      }));
      await Product.create(products);

      const response = await request(app).get('/products?page=1&limit=2');
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(2);
      expect(response.body.total).toBe(5);
      expect(response.body.totalPages).toBe(3);
    });
  });

  describe('GET /products/:id', () => {
    it('should return product by id', async () => {
      const product = await Product.create({
        name: 'Test Product',
        price: 150,
        productImg: 'test.jpg',
        quantity: 10,
        sizes: [8, 9, 10]
      });

      const response = await request(app).get(`/products/${product._id}`);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Test Product');
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app).get(`/products/${fakeId}`);
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /products', () => {
    it('should create a new product', async () => {
      const productData = {
        name: 'New Product',
        description: 'A great product',
        price: 250,
        productImg: 'new.jpg',
        quantity: 15,
        sizes: [7, 8, 9],
        categories: ['running']
      };

      const response = await request(app).post('/products').send(productData);
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('New Product');
    });
  });

  describe('PUT /products/:id', () => {
    it('should update an existing product', async () => {
      const product = await Product.create({
        name: 'Old Name',
        price: 100,
        productImg: 'old.jpg',
        quantity: 5,
        sizes: [8]
      });

      const response = await request(app)
        .put(`/products/${product._id}`)
        .send({ name: 'New Name', price: 150 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('New Name');
      expect(response.body.data.price).toBe(150);
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .put(`/products/${fakeId}`)
        .send({ name: 'Updated Name' });
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /products/:id', () => {
    it('should delete an existing product', async () => {
      const product = await Product.create({
        name: 'To Delete',
        price: 100,
        productImg: 'delete.jpg',
        quantity: 1,
        sizes: [8]
      });

      const response = await request(app).delete(`/products/${product._id}`);
      expect(response.status).toBe(204);

      // Verify deletion
      const deleted = await Product.findById(product._id);
      expect(deleted).toBeNull();
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app).delete(`/products/${fakeId}`);
      expect(response.status).toBe(404);
    });
  });
});
