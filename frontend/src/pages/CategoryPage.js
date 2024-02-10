import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductApi from '../api/productApi';
import Card from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CategoryPage = () => {
    const { type } = useParams();
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const response = await ProductApi.getProductsByCategory(type);
                setCategoryProducts(response.data);
            } catch (error) {
                console.error('Error fetching category products:', error);
                setError('Oops!! Error fetching category products. Please try again later.');
            }
        };

        fetchCategoryProducts();
    }, [type]);

    return (
        <div>
            <Header />
            <div className='m-8'>
                <h1 className='text-5xl ml-8 text-center'>Products in {type}</h1>
                {error ? (
                    <p className="text-red-500 text-center mt-4">{error}</p>
                ) : (
                    <div className="flex flex-wrap justify-around m-auto my-16 w-[75%]">
                        {categoryProducts.length > 0 ? (
                            categoryProducts.map((product) => (
                                <Card key={product._id} item={product} />
                            ))
                        ) : (
                            <div className='flex items-center text-center justify-center flex-col min-h-[44vh]'>
                                <p className="text-center mt-4">Sorry, nothing right now! More products on the way.</p>
                                <a href="/products" className="mt-8 bg-green-600 text-white text-xl py-2 px-4 rounded-full hover:bg-gray-300">Shop Now</a>
                            </div>

                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CategoryPage;