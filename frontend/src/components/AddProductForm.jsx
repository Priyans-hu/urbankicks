import React from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import ProductApiInstance from '../api/productApi'; // Ensure this is correctly imported
import { toast } from 'react-toastify';

const SizesField = () => {
    const { values, setFieldValue } = useFormikContext();

    const handleSizeChange = (e) => {
        const { value, checked } = e.target;
        const selectedSizes = [...values.sizes];
        if (checked) {
            selectedSizes.push(value);
        } else {
            const index = selectedSizes.indexOf(value);
            if (index > -1) {
                selectedSizes.splice(index, 1);
            }
        }
        setFieldValue('sizes', selectedSizes);
    };

    return (
        <div>
            <label className="block">Sizes:</label>
            <div className='w-2/3 my-4 text-lg flex justify-between items-center'>
                {[5, 6, 7, 8, 9, 10].map(size => (
                    <label key={size} className="inline-block mr-4">
                        <input
                            type="checkbox"
                            name="sizes"
                            value={size}
                            checked={values.sizes.includes(size.toString())}
                            className="mr-1"
                            onChange={handleSizeChange}
                        />
                        {size}
                    </label>
                ))}
            </div>
            <ErrorMessage name="sizes" component="div" className="text-red-500" />
        </div>
    );
};

const AddProductForm = () => {
    const initialValues = {
        name: '',
        description: '',
        price: '',
        productImg: '',
        quantity: '',
        color: '',
        sizes: [],
        category: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Product Name is required'),
        description: Yup.string().required('Description is required'),
        price: Yup.number().required('Price is required').positive('Price must be positive'),
        quantity: Yup.number().required('Quantity is required').integer('Quantity must be an integer').positive('Quantity must be positive'),
        productImg: Yup.string().required('Image links are required'),
        color: Yup.string(),
        sizes: Yup.array().required('Sizes are required').min(1, 'Please select at least one size'),
        category: Yup.string()
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await ProductApiInstance.createProduct(values);
            toast.success('Product created successfully', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
            resetForm();
        } catch (error) {
            console.error('Error creating product:', error);
            toast.error(`Error creating product: ${error.message}`, {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        }
    };

    return (
        <div className="container mx-auto my-8 min-h-[75vh]">
            <h2 className="text-4xl font-bold mb-4 text-center">Add Product</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ dirty, isValid }) => (
                    <Form className="space-y-4 w-1/2 m-auto">
                        <div>
                            <label htmlFor="name" className="block">Product Name:</label>
                            <Field type="text" id="name" name="name" className="w-full border border-gray-300 rounded px-3 py-2" required />
                            <ErrorMessage name="name" component="div" className="text-red-500" />
                        </div>
                        <div>
                            <label htmlFor="description" className="block">Description:</label>
                            <Field as="textarea" id="description" name="description" className="w-full border border-gray-300 rounded px-3 py-2" required />
                            <ErrorMessage name="description" component="div" className="text-red-500" />
                        </div>
                        <div>
                            <label htmlFor="price" className="block">Price:</label>
                            <Field type="number" id="price" name="price" className="w-full border border-gray-300 rounded px-3 py-2" required />
                            <ErrorMessage name="price" component="div" className="text-red-500" />
                        </div>
                        <div>
                            <label htmlFor="productImg" className="block">Image Links:</label>
                            <Field type="text" id="productImg" name="productImg" className="w-full border border-gray-300 rounded px-3 py-2" />
                            <p className='text-xs text-gray-500'>Enter multiple image links separated by commas</p>
                            <ErrorMessage name="productImg" component="div" className="text-red-500" />
                        </div>
                        <div>
                            <label htmlFor="quantity" className="block">Quantity:</label>
                            <Field type="number" id="quantity" name="quantity" className="w-full border border-gray-300 rounded px-3 py-2" required />
                            <ErrorMessage name="quantity" component="div" className="text-red-500" />
                        </div>
                        <div>
                            <label htmlFor="color" className="block">Color:</label>
                            <Field type="text" id="color" name="color" className="w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <SizesField />
                        <div>
                            <label htmlFor="category" className="block">Category:</label>
                            <Field type="text" id="category" name="category" className="w-full border border-gray-300 rounded px-3 py-2" />
                            <p className='text-xs text-gray-500'>Use ',' separated values</p>
                        </div>
                        <div className='flex justify-center'>
                            <button type="submit" disabled={!dirty || !isValid} className="bg-green-500 hover:bg-green-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-md w-1/2">Add Product</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddProductForm;