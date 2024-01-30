import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

class ProductApi {
    productApi = axios.create({
        baseURL: API_BASE_URL + '/products',
        withCredentials: true,
    });

    getAllProducts() {
        return this.productApi.get('/');
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

export default new ProductApi();