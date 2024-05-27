import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import userApi from '../api/userApi';
import OrderApi from '../api/orderApi';

const UserAccount = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [userOrders, setUserOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [editedUserInfo, setEditedUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userEmail = localStorage.getItem('userEmail');
                const userResponse = await userApi.getUserDetails({ userEmail });
                setUserInfo(userResponse);
                setEditedUserInfo(userResponse);
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

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        try {
            await userApi.updateUser(userInfo.id, editedUserInfo);
            setUserInfo(editedUserInfo);
            setEditMode(false);
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        setEditedUserInfo(userInfo);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value,
        }));
    };

    return (
        <div>
            <Header />
            <div className="container mx-auto my-16 min-h-[51vh]">
                <h1 className="text-5xl font-bold text-center mb-4">User Account</h1>

                {loading && <p>Loading user details and orders...</p>}

                {!loading && userInfo && (
                    <div className='my-8'>
                        <h2 className="text-2xl font-semibold mb-4">User Details</h2>
                        {editMode ? (
                            <div className="flex justify-center">
                                <div className="w-full max-w-md">
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3 mb-6">
                                            <label htmlFor="username" className='block text-lg mb-1'>Username:</label>
                                            <input type="text" id="username" name="username" value={editedUserInfo.username} onChange={handleChange} className='border border-gray-300 rounded px-2 py-1 w-full' />
                                        </div>
                                        <div className="w-full px-3 mb-6">
                                            <label htmlFor="phone_number" className='block text-lg mb-1'>Phone Number:</label>
                                            <input type="text" id="phone_number" name="phone_number" value={editedUserInfo.phone_number} onChange={handleChange} className='border border-gray-300 rounded px-2 py-1 w-full' />
                                        </div>
                                        <div className="w-full px-3 mb-6">
                                            <label htmlFor="street" className='block text-lg mb-1'>Street:</label>
                                            <input type="text" id="street" name="street" value={editedUserInfo.address.street} onChange={(e) => handleChange({ target: { name: 'address', value: { ...editedUserInfo.address, street: e.target.value } } })} className='border border-gray-300 rounded px-2 py-1 w-full' />
                                        </div>
                                        <div className="w-full px-3 mb-6">
                                            <label htmlFor="city" className='block text-lg mb-1'>City:</label>
                                            <input type="text" id="city" name="city" value={editedUserInfo.address.city} onChange={(e) => handleChange({ target: { name: 'address', value: { ...editedUserInfo.address, city: e.target.value } } })} className='border border-gray-300 rounded px-2 py-1 w-full' />
                                        </div>
                                        <div className="w-full px-3 mb-6">
                                            <label htmlFor="state" className='block text-lg mb-1'>State:</label>
                                            <input type="text" id="state" name="state" value={editedUserInfo.address.state} onChange={(e) => handleChange({ target: { name: 'address', value: { ...editedUserInfo.address, state: e.target.value } } })} className='border border-gray-300 rounded px-2 py-1 w-full' />
                                        </div>
                                        <div className="w-full px-3 mb-6">
                                            <label htmlFor="postal_code" className='block text-lg mb-1'>Postal Code:</label>
                                            <input type="text" id="postal_code" name="postal_code" value={editedUserInfo.address.postal_code} onChange={(e) => handleChange({ target: { name: 'address', value: { ...editedUserInfo.address, postal_code: e.target.value } } })} className='border border-gray-300 rounded px-2 py-1 w-full' />
                                        </div>
                                        <div className="w-full px-3 mb-6">
                                            <label htmlFor="country" className='block text-lg mb-1'>Country:</label>
                                            <input type="text" id="country" name="country" value={editedUserInfo.address.country} onChange={(e) => handleChange({ target: { name: 'address', value: { ...editedUserInfo.address, country: e.target.value } } })} className='border border-gray-300 rounded px-2 py-1 w-full' />
                                        </div>
                                        <div className="w-full px-3 mb-6 flex justify-end">
                                            <button onClick={handleCancel} className='bg-gray-500 w-1/4 mx-4 hover:bg-gray-700 text-white font-bold py-2 px-8 rounded'>Cancel</button>
                                            <button onClick={handleSave} className='bg-blue-500 w-2/4 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded'>Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p className='text-lg'><span className='font-semibold'>Username:</span> {userInfo.username || 'N/A'}</p>
                                <p className='text-lg'><span className='font-semibold'>Email:</span> {userInfo.email}</p>
                                <p className='text-lg'><span className='font-semibold'>Phone Number:</span> {userInfo.phone_number}</p>
                                <div className='mt-4'>
                                    <h3 className="text-xl font-semibold">Address:</h3>
                                    <p className='text-lg'>{userInfo.address.street}, {userInfo.address.city}, {userInfo.address.state}, {userInfo.address.postal_code}, {userInfo.address.country}</p>
                                </div>
                                <button onClick={handleEdit} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>Edit</button>
                            </div>
                        )}
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