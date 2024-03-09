import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductApi from '../api/productApi';
import orderApi from '../api/orderApi';
import { toast } from 'react-toastify';
import cartApi from '../api/cartApi';
import userApi from '../api/userApi';
import PopularProducts from '../components/PopularProducts';

const ProductDetailPage = () => {
    const { productId } = useParams();
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await ProductApi.getProductById(productId);
                setProductDetails(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [productId]);

    const buyNowHandler = async (productId, product) => {
        try {
            const orderData = {
                userId: localStorage.getItem('userId'),
                products: [{ product_id: productId, quantity: 1 }],
                total_amount: product.price
            };
            const response = await orderApi.createOrder(orderData);
            if (response.status === 201) {
                toast.success(`${product.name} Order placed successfully`, {
                    position: 'bottom-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                });
            } else {
                console.error('Failed to create order:', response.data);
                toast.error('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('An error occurred. Please try again.', { position: 'bottom-right' });
        }
    }
    

    const addCartHandler = async (product) => {
        try {
            const userEmail = localStorage.getItem('userEmail');
            const userResponse = await userApi.getUserDetails({ userEmail });
            const userId = userResponse.id;
            localStorage.setItem('userId', userId);

            if (!userId) {
                throw new Error('User not logged in');
            }

            await cartApi.addItemToCart(userId, productId, 1, product.price);
            toast.success(`${product.name} added to cart`, {
                position: 'bottom-right',
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Failed to add to cart. Please try again.', {
                position: 'bottom-right',
                autoClose: 4000,
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
            <div className="container mx-auto mt-8 min-h-[75vh]">
                {productDetails ? (
                    <div className="flex flex-col lg:flex-row">
                        <div className="m-auto mb-8 lg:mb-0 w-11/12 lg:w-1/2">
                            <img src={productDetails.productImg} alt={productDetails.name} className="h-auto md:h-[90%]" />
                        </div>
                        <div className="w-11/12 lg:w-1/2 pl-8 flex flex-col justify-center">
                            <h1 className="text-3xl font-bold mb-4">{productDetails.name}</h1>
                            <p className="text-gray-600 mb-4">{productDetails.description}</p>
                            <p className="text-2xl font-bold text-orange-500">₹{productDetails.price}</p>
                            {productDetails.quantity < 4 ? (
                                <p className="text-red-500">Hurry Up! Only few left in stock.</p>)
                                : (
                                    <p></p>
                                )}
                            {/* <div>
                                <label htmlFor="size" className="block text-sm font-medium text-gray-700">Size</label>
                                <select
                                    name="size"
                                    id="size"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    <option value=""></option>
                                    {productDetails.size.map((sizeOption, index) => (
                                        <option key={index} value={sizeOption}>{sizeOption}</option>
                                    ))}
                                </select>
                            </div> */}
                            <div className='butBtn mt-4'>
                                <button className='bg-black rounded-2xl px-6 py-2 text-white'
                                    onClick={() => { buyNowHandler(productId, productDetails) }}>
                                    Buy Now
                                </button>
                                <button
                                    className='bg-black rounded-2xl px-6 py-2 text-white mx-4'
                                    onClick={() => addCartHandler(productDetails)}>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex justify-center items-center min-h-[100%]'>
                        <h2 className='text-2xl font-semibold'>Loading product details...</h2>
                    </div>
                )}
            </div>
            <PopularProducts heading={'Suggested Products'}/>
            <Footer />
        </div>
    );
};

export default ProductDetailPage;