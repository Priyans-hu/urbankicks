import React, { useState } from 'react';
import ProductApiInstance from '../api/productApi';
import { toast } from 'react-toastify';

const AddProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        productImgs: [],
        quantity: '',
        color: '',
        sizes: [],
        category: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'sizes' ? [...formData.sizes, value] : name === 'productImgs' ? [...formData.productImgs, value] : value
        });
    };

    const handleSizeChange = (e) => {
        const { value, checked } = e.target;
        setFormData({
            ...formData,
            sizes: checked ? [...formData.sizes, value] : formData.sizes.filter(size => size !== value)
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ProductApiInstance.createProduct(formData);
            toast.success(`Product created successfully`, {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
            setFormData({
                name: '',
                description: '',
                price: '',
                productImgs: [],
                quantity: '',
                color: '',
                sizes: [],
                category: ''
            });
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className="container mx-auto my-8 min-h-[75vh]">
            <h2 className="text-4xl font-bold mb-4 text-center">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4 w-1/2 m-auto">
                <div>
                    <label htmlFor="name" className="block">Product Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
                </div>
                <div>
                    <label htmlFor="description" className="block">Description:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required></textarea>
                </div>
                <div>
                    <label htmlFor="price" className="block">Price:</label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
                </div>
                <div>
                    <label htmlFor="productImgs" className="block">Image Links:</label>
                    <input type="text" id="productImgs" name="productImgs" value={formData.productImgs.join(', ')} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                    <p className='text-xs text-gray-500'>Enter multiple image links separated by commas</p>
                </div>
                <div>
                    <label htmlFor="quantity" className="block">Quantity:</label>
                    <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
                </div>
                <div>
                    <label htmlFor="color" className="block">Color:</label>
                    <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div className=''>
                    <label className="block">Sizes:</label>
                    <div className='w-2/3 my-4 text-lg flex justify-between items-center'>
                        <label className="inline-block">
                            <input type="checkbox" name="sizes" value="5" onChange={handleSizeChange} checked={formData.sizes.includes('5')} /> 5
                        </label>
                        <label className="inline-block mr-4">
                            <input type="checkbox" name="sizes" value="6" onChange={handleSizeChange} checked={formData.sizes.includes('6')} /> 6
                        </label>
                        <label className="inline-block mr-4">
                            <input type="checkbox" name="sizes" value="7" onChange={handleSizeChange} checked={formData.sizes.includes('7')} /> 7
                        </label>
                        <label className="inline-block mr-4">
                            <input type="checkbox" name="sizes" value="8" onChange={handleSizeChange} checked={formData.sizes.includes('8')} /> 8
                        </label>
                        <label className="inline-block">
                            <input type="checkbox" name="sizes" value="9" onChange={handleSizeChange} checked={formData.sizes.includes('9')} /> 9
                        </label>
                        <label className="inline-block">
                            <input type="checkbox" name="sizes" value="10" onChange={handleSizeChange} checked={formData.sizes.includes('10')} /> 10
                        </label>
                    </div>
                </div>
                <div>
                    <label htmlFor="category" className="block">Category:</label>
                    <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                    <p className='text-xs text-gray-500'>Use ',' seperated values</p>
                </div>
                <div className='flex justify-center'>
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md w-1/2">Add Product</button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;
