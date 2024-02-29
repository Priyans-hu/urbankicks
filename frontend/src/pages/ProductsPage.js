import React, { useState, useEffect } from 'react';
import ProductApi from '../api/productApi';
import Card from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ProductApi.getAllProducts();
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Error fetching products. Please try again later.');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Header />
            <div className='m-8'>
                <h1 className='text-5xl ml-8 font-bold text-center'>Our Products</h1>
                {error ? (
                    <p className="text-red-500 text-center mt-4">{error}</p>
                ) : (
                    <div className="flex flex-wrap justify-around m-auto my-16 w-[75%]">
                        {products.map((product) => (
                            <Card key={product._id} item={product} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ProductsPage;
