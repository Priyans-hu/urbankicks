import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useRegister from '../hooks/useRegister';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useForm, FormProvider } from 'react-hook-form';
import StepOne from '../components/Registration/StepOne';
import StepTwo from '../components/Registration/StepTwo';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation schemas
const stepOneSchema = yup.object().shape({
    email: yup.string().matches(/^(?!-)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format').required('Email is required'),
    password: yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
});

const stepTwoSchema = yup.object().shape({
    phone_number: yup.string().required('Phone number is required'),
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    postal_code: yup.string().required('Postal code is required'),
    country: yup.string().required('Country is required'),
});

const schemas = [stepOneSchema, stepTwoSchema];

const MultiStepRegister = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const { handleRegister, error, loading } = useRegister();

    const methods = useForm({
        resolver: yupResolver(schemas[step - 1]),
    });

    const handleNext = (data) => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const onSubmit = async (data) => {
        try {
            await handleRegister(data);
            toast.success('Account created successfully!', { position: 'top-center' });
            navigate('/');
        } catch (error) {
            toast.error(`Error: ${error.message || 'Registration failed'}`, { position: 'top-center' });
        }
    };

    return (
        <div>
            <Header toShow={false} />
            <div className="flex flex-col-reverse md:flex-row min-h-screen">
                <div className='mb-8 sm:m-auto md:w-1/2 lg:h-screen'>
                    <div className="flex-1 md:p-8 bg-white md:h-[85vh] flex flex-col justify-center items-center">
                        <div>
                            <h2 className="text-5xl font-semibold m-4 mb-0">Get started!</h2>
                            <p className='m-4 mt-1 text-center'>Let's Shop together</p>
                        </div>
                        <FormProvider {...methods}>
                            <form className='flex flex-col w-2/3 xl:w-1/2' onSubmit={methods.handleSubmit(step === 2 ? onSubmit : handleNext)}>
                                {step === 1 && <StepOne />}
                                {step === 2 && <StepTwo />}
                                <div className="flex justify-between mt-4">
                                    {step > 1 && (
                                        <button type="button" onClick={handleBack} className="bg-gray-500 text-white py-3 px-6 rounded-full focus:outline-none focus:ring">
                                            Back
                                        </button>
                                    )}
                                    <button type="submit" className="bg-black  w-1/3 text-white py-3 px-6 rounded-full focus:outline-none focus:ring" disabled={loading}>
                                        {loading ? 'Processing...' : step === 2 ? 'Register' : 'Next'}
                                    </button>
                                </div>
                            </form>
                        </FormProvider>
                        {error && (
                            <p className="text-red-500 mt-2">
                                Error: {error}
                            </p>
                        )}
                        <p className="mt-4 text-sm">Already have an account! <a href="/login" className="text-blue-500">Login</a></p>
                    </div>
                </div>

                {/* Right Section - Image */}
                <div className="flex-1 flex justify-center items-center">
                    <div className='rounded-3xl max-h-[90%] max-w-[90%] overflow-hidden'>
                        <img
                            src='https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            alt=''
                            className='shadow-2xl shadow-gray-300'
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MultiStepRegister;