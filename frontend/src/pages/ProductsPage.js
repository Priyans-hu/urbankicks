import React, { useState, useEffect } from 'react';
import ProductApi from '../api/productApi';
import Card from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

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

    useEffect(() => {
        let sortedProducts = [...products];

        if (sortOption === 'price-low-to-high') {
            sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-high-to-low') {
            sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'a-z') {
            sortedProducts = sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === 'z-a') {
            sortedProducts = sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        } else {
            sortedProducts = sortedProducts.sort(() => Math.random() - 0.5);
        }

        setSortedProducts(sortedProducts);
    }, [sortOption, products]);

    useEffect(() => {
        if (!searchQuery) {
            setFilteredProducts([]);
            return;
        }

        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div>
            <Header />
            <div className='m-8'>
                <h1 className='text-5xl ml-8 font-bold text-center'>Our Products</h1>
                <div className="m-auto lg:-mt-8 w-[92%]">
                    <div className='flex flex-col md:flex-row justify-end items-center md:mx-8 my-4 lg:mb-4'>
                        <div className='flex items-center mx-4'>
                            <label htmlFor='sort'>Sort by:</label>
                            <select id='sort' value={sortOption} onChange={handleSortChange} className='ml-2 p-1 border border-gray-300 rounded'>
                                <option value=''>Popularity</option>
                                <option value='price-low-to-high'>Price: Low to High</option>
                                <option value='price-high-to-low'>Price: High to Low</option>
                                <option value='a-z'>Alphabetically: A-Z</option>
                                <option value='z-a'>Alphabetically: Z-A</option>
                            </select>
                        </div>
                        <input type='text' placeholder='Search by name' className='w-[75%] md:w-auto p-1 my-4 md:my-auto outline-gray-400 border border-gray-300 rounded' value={searchQuery} onChange={handleSearchChange} />
                    </div>
                </div>
                {error ? (
                    <p className="text-red-500 text-center mt-4">{error}</p>
                ) : (
                    <div className="flex flex-wrap justify-around m-auto my-16 w-full md:w-[92%]">
                        {(searchQuery ? filteredProducts : sortedProducts).map((product) => (
                            <div className='myProductCard border border-white hover:border-gray-200 m-2' key={product._id}>
                                <Card item={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ProductsPage;
