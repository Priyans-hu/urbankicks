import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

class CartApi {
    cartApi = axios.create({
        baseURL: API_BASE_URL + '/cart',
        withCredentials: true,
    });

    getCartByUserId(userId) {
        return this.cartApi.get(`/${userId}`);
    }

    addItemToCart(userId, productId, quantity, price) {
        return this.cartApi.post(`/${userId}`, { user: userId, productId, quantity, price });
    }

    removeItemFromCart(userId, productId) {
        return this.cartApi.delete(`/${userId}/${productId}`);
    }

    updateItemQuantity(userId, item, quantity) {
        return this.cartApi.put(`/${userId}/${item}`, { user: userId, item, quantity });
    }    

    clearCart(userId) {
        return this.cartApi.delete(`/${userId}`);
    }
}

const cartApiInstance = new CartApi();
export default cartApiInstance;
