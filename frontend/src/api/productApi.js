import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

class ProductApi {
    productApi = axios.create({
        baseURL: API_BASE_URL + '/products',
        withCredentials: true,
    });

    getAllProducts() {
        return this.productApi.get('/');
    }

    getProductsByCategory(category) {
        return this.productApi.get(`/category/${category}`);
    }

    getProductById(productId) {
        return this.productApi.get(`/${productId}`);
    }

    createProduct(newProductData) {
        return this.productApi.post('/', newProductData);
    }

    updateProduct(productId, updatedProductData) {
        return this.productApi.put(`/${productId}`, updatedProductData);
    }

    deleteProduct(productId) {
        return this.productApi.delete(`/${productId}`);
    }
}

const ProductApiInstacnce = new ProductApi();
export default ProductApiInstacnce;