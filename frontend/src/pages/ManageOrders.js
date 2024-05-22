import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderApiInstance from '../api/orderApi';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await OrderApiInstance.getAllOrders();
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            await OrderApiInstance.updateOrderStatus(orderId, newStatus);
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
            toast.success('Order status updated successfully', {position: 'bottom-right'});
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Failed to update order status', {position: 'bottom-right'});
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await OrderApiInstance.deleteOrder(orderId);
            setOrders(prevOrders =>
                prevOrders.filter(order => order._id !== orderId)
            );
            toast.success('Order deleted successfully', {position: 'bottom-right'});
        } catch (error) {
            console.error('Error deleting order:', error);
            toast.error('Failed to delete order', {position: 'bottom-right'});
        }
    };
    
    return (
        <div>
            <Header />
            <div className="container mx-auto my-8 min-h-[75vh]">
                <h1 className='text-4xl font-bold mb-4 text-center'>Manage Orders</h1>
                <table className="table-auto w-full m-4">
                    <thead className='bg-gray-50 text-left'>
                        <tr>
                            <th scope='col' className="text-sm text-gray-500 tracking-wide px-6 py-4">Order ID</th>
                            <th scope='col' className="text-sm text-gray-500 tracking-wide px-6 py-4">Date</th>
                            <th scope='col' className="text-sm text-gray-500 tracking-wide px-6 py-4">Total Amount</th>
                            <th scope='col' className="text-sm text-gray-500 tracking-wide px-6 py-4">Status</th>
                            <th scope='col' className="text-sm text-gray-500 tracking-wide px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td className="px-6 py-4">{order._id}</td>
                                <td className="px-6 py-4">{new Date(order.order_date).toLocaleString()}</td>
                                <td className="px-6 py-4">₹{order.total_amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                <td className="px-6 py-4 font-bold">{order.order_status}</td>
                                <td className="px-6 py-4 flex justify-around">
                                    <div className="relative w-1/2">
                                        <select
                                            className="appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                                            onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                            value={order.order_status}
                                        >
                                            <option value='' disabled>Choose Updated status</option>
                                            <option value='Processing'>Processing</option>
                                            <option value='Shipped'>Shipped</option>
                                            <option value='Delivered'>Delivered</option>
                                            <option value='Cancelled'>Cancelled</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12 3v10l3-3v-4h4v-4h-7z" /></svg>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleUpdateOrderStatus(order._id, order.status)}>Save</button>
                                        <button className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDeleteOrder(order._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
};

export default ManageOrders;
