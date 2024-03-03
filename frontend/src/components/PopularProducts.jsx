import React, { useState, useEffect } from 'react';
import ProductApi from '../api/productApi';
import Card from './Card';

const PopularProducts = () => {
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

    // displaying the only top 4 products out of total
    const PopularProducts = products.slice(0,4);

    return (
        <div className='m-8 mt-16'>
            <h1 className='text-5xl ml-8'>Popular Products</h1>
            <div className="flex justify-around m-auto my-8 flex-wrap w-[90%] lg:w-[85%]">
                {PopularProducts.map((product) => (
                    <Card key={product._id} item={product} />
                ))}
            </div>
        </div>
    );
};

export default PopularProducts;
