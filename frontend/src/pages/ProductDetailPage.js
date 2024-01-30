import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// imports for header footer components
import Header from '../components/Header';
import Footer from '../components/Footer';
// import for product api
import ProductApi from '../api/productApi';
import orderApi from '../api/orderApi';
// import for cart context
import { useCart } from '../hooks/useCart';
// import for toastify notifications
import { toast } from 'react-toastify'; 


const ProductDetailPage = () => {
    const { productId } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                // Use the productId from the URL params
                const response = await ProductApi.getProductById(productId);

                setProductDetails(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [productId]);

    const buyNowHandler = (productId, product) => {
        orderApi.createOrder(productId, product);
        toast.success(`${product.name} Order placed successfully`, {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    }

    const addCartHandler = (product) => {
        addToCart(product);
        toast.success(`${product.name} added to cart`, {
            position: 'bottom-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    };

    return (
        <div>
            <Header />
            <div className="container mx-auto mt-8 min-h-[75vh]">
                {productDetails ? (
                    <div className="flex">
                        <div className="w-1/2">
                            <img src={productDetails.productImg} alt={productDetails.name} className="h-[90%]" />
                        </div>
                        <div className="w-1/2 pl-8 flex flex-col justify-center">
                            <h1 className="text-3xl font-bold mb-4">{productDetails.name}</h1>
                            <p className="text-gray-600 mb-4">{productDetails.description}</p>
                            <p className="text-2xl font-bold text-orange-500">₹{productDetails.price}</p>
                            <div className='butBtn mt-4'>
                                {/* buy now button */}
                                <button className='bg-black rounded-2xl px-6 py-2 text-white'
                                    onClick={() => {buyNowHandler(productId, productDetails)}}>
                                    Buy Now
                                </button>
                                {/* add to cart button */}
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
            <Footer />
        </div>
    );
};

export default ProductDetailPage;
