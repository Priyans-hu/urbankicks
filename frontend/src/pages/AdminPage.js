import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductApiInstance from '../api/productApi';
import { toast } from 'react-toastify'; 

const AdminPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await ProductApiInstance.getAllProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await ProductApiInstance.deleteProduct(productId);
            toast.error(`Product deleted successfully`, {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.warning(`Unable to delete product`, {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        }
    };

    return (
        <div>
            <Header />
            <div className="container mx-auto my-8 min-h-[75vh]">
                <h2 className="text-4xl font-bold mb-4 text-center">Admin Dashboard</h2>
                <div>
                    <div className='flex justify-between items-center m-4'>
                        <h3 className="text-2xl font-bold mb-2">All Products</h3>
                        <a href="/admin/dashboard/newProduct"><button className='font-bold text-white bg-green-600 px-4 py-2 rounded-2xl'>Add Product</button></a>
                    </div>
                    <ul>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No.</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map((product, index) => (
                                    <tr key={product._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img className="h-10 w-10 rounded-full" src={product.productImg} alt={product.name} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{product.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleDeleteProduct(product._id)}
                                                className="text-red-500 hover:text-red-700 focus:outline-none"
                                            >
                                                <i className="fas fa-trash"></i>
                                                <span className="sr-only">Delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminPage;