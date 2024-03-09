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
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);

    // displaying only 4 random products out of total
    const shuffledProducts = products.slice().sort(() => Math.random() - 0.5);
    const randomProducts = shuffledProducts.slice(0, 4);

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
