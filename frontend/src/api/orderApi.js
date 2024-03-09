import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

class OrderApi {
    orderApi = axios.create({
        baseURL: API_BASE_URL + '/orders',
        withCredentials: true,
    });

    getAllOrders() {
        return this.orderApi.get('/');
    }

    getUserOrders(userId) {
        return this.orderApi.get(`/user/${userId}`);
    }

    createOrder(orderData) {
        return this.orderApi.post('/', orderData);
    }

    getOrderById(orderId) {
        return this.orderApi.get(`/${orderId}`);
    }

    updateOrderStatus(orderId, updatedStatus) {
        return this.orderApi.put(`/${orderId}`, { status: updatedStatus });
    }

    deleteOrder(orderId) {
        return this.orderApi.delete(`/${orderId}`);
    }
}

const OrderApiInstance = new OrderApi();
export default OrderApiInstance;