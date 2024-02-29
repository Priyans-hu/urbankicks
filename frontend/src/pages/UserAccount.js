// UserAccount.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import userApi from '../api/userApi';
import OrderApi from '../api/orderApi';

const UserAccount = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [userOrders, setUserOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // getting the user email from localStorage
                const userEmail = localStorage.getItem('userEmail');

                // Fetch user details using the user email
                const userResponse = await userApi.getUserDetails({ userEmail });
                setUserInfo(userResponse);

                // Fetch user orders using the user email
                const ordersResponse = await OrderApi.getUserOrders(userResponse.id);
                setUserOrders(ordersResponse.data);
            } catch (error) {
                console.error('Error fetching user details or orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);


    return (
        <div>
            <Header />
            <div className="container mx-auto my-16 min-h-[51vh]">
                <h1 className="text-5xl font-bold text-center mb-4">User Account</h1>

                {loading && <p>Loading user details and orders...</p>}

                {!loading && userInfo && (
                    <div className='my-8'>
                        <h2 className="text-2xl font-semibold mb-4">User Details</h2>
                        <p className='text-lg'>Name: {userInfo.email.split('@')[0]}</p>
                        <p className='text-lg'>Email: {userInfo.email}</p>
                    </div>
                )}

                {!loading && userOrders.length > 0 ? (
                    <div>
                        <h2 className="text-2xl font-semibold my-8">Order History</h2>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {userOrders.map((order) => (
                                    <tr key={order._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(order.order_date).toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.products.length}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.order_status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">₹{order.total_amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className='flex items-center justify-center h-48'>
                        <p className="text-2xl">No orders placed in the past.</p>
                    </div>
                )}

                {!loading && !userInfo && userOrders.length === 0 && (
                    <p>No user details or order history found.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default UserAccount;
