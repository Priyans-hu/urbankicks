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
                const userResponse = await userApi.getUserDetails({userEmail});
                setUserInfo(userResponse.data);
    
                // Fetch user orders using the user email
                const ordersResponse = await OrderApi.getUserOrders(userEmail);
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
                <h1 className="text-4xl font-bold mb-4">User Account</h1>

                {loading && <p>Loading user details and orders...</p>}

                {!loading && userInfo && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">User Details</h2>
                        <p>Name: {userInfo.name}</p>
                        <p>Email: {userInfo.email}</p>
                        {/* Add other user details as needed */}
                    </div>
                )}

                {!loading && userOrders.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-semibold my-4">Order History</h2>
                        <ul>
                            {userOrders.map((order) => (
                                <li key={order.orderId}>
                                    Order ID: {order.orderId}, Date: {order.date}, Total: {order.total}
                                    {/* Add other order details as needed */}
                                </li>
                            ))}
                        </ul>
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
