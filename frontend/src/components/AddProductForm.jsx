import React, { useState } from 'react';
import ProductApiInstance from '../api/productApi';
import { toast } from 'react-toastify'; 

const AddProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        imgLink: '',
        quantity: '',
        color: '',
        size: '',
        category: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
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
                imgLink: '',
                quantity: '',
                color: '',
                size: '',
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
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                    <label htmlFor="description" className="block">Description:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2"></textarea>
                </div>
                <div>
                    <label htmlFor="price" className="block">Price:</label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                    <label htmlFor="imgLink" className="block">Image Link:</label>
                    <input type="text" id="imgLink" name="imgLink" value={formData.imgLink} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                    <label htmlFor="quantity" className="block">Quantity:</label>
                    <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                    <label htmlFor="color" className="block">Color:</label>
                    <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                    <label htmlFor="size" className="block">Size:</label>
                    <input type="text" id="size" name="size" value={formData.size} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                    <label htmlFor="category" className="block">Category:</label>
                    <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add Product</button>
            </form>
        </div>
    );
};

export default AddProductForm;
