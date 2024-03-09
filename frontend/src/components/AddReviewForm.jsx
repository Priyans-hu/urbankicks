import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; 
import { toast } from 'react-toastify';
import ReviewApiInstance from '../api/reviewApi'; 

const AddReviewForm = () => {
    const initialValues = {
        rating: '',
        reviewHead: '',
        reviewText: ''
    };

    const validationSchema = Yup.object({
        rating: Yup.number().required('Rating is required').min(1, 'Rating must be between 1 and 5').max(5, 'Rating must be between 1 and 5'),
        reviewHead: Yup.string().required('Review head is required'),
        reviewText: Yup.string().required('Review text is required')
    });

    const handleSubmit = async (values, { resetForm }) => {
        const userId = localStorage.getItem('userId');
        try {
            await ReviewApiInstance.createReview({ ...values, userId });
            resetForm();
            toast.success(`Review submitted successfully`, {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div className="container mx-auto my-8 min-h-[51vh]">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form className="space-y-4 w-1/2 m-auto text-left">
                    <div>
                        <label htmlFor="rating" className="block">Rating:</label>
                        <Field type="number" id="rating" name="rating" min="1" max="5" className="w-full border border-gray-300 rounded px-3 py-2" />
                        <ErrorMessage name="rating" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="reviewHead" className="block">Review Head:</label>
                        <Field type="text" id="reviewHead" name="reviewHead" className="w-full border border-gray-300 rounded px-3 py-2" />
                        <ErrorMessage name="reviewHead" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="reviewText" className="block">Review Text:</label>
                        <Field as="textarea" id="reviewText" name="reviewText" rows="3" className="w-full border border-gray-300 rounded px-3 py-2" />
                        <ErrorMessage name="reviewText" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md w-1/2">Submit Review</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default AddReviewForm;
