import React, { useState, useEffect } from 'react';
import ProductApi from '../api/productApi';
import Card from './Card';

const PopularProducts = ( { heading } ) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ProductApi.getAllProducts();
                setProducts(response.data);
            } catch (error) {
                // Error handled silently - products will show empty state
            }
        };

        fetchData();
    }, []);

    // displaying only 4 random products using Fisher-Yates shuffle
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };
    const randomProducts = shuffleArray(products).slice(0, 4);

    return (
        <div className='m-8 mt-16'>
            <h1 className='text-5xl ml-8'>{heading ? heading : 'Popular Products'}</h1>
            <div className="flex justify-around m-auto my-8 flex-wrap w-[95%] lg:w-[85%]">
                {randomProducts.map((product) => (
                    <div className='myProductCard border border-white hover:border-gray-200' key={product._id}>
                        <Card item={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularProducts;
