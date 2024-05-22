import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useRegister from '../hooks/useRegister'; // Import the useRegister hook
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation schema
const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
});

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // React Router's navigate function

    // Initialize the useRegister hook
    const { handleRegister, error, loading } = useRegister();

    // Initialize react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        try {
            await handleRegister(data);
            toast.success('Account created successfully!', { position: 'top-center' });
            navigate('/');
        } catch (error) {
            // Handle registration error
            toast.error(`Error: ${error.message || 'Registration failed'}`, { position: 'top-center' });
        }
    };

    return (
        <div>
            <Header toShow={false}/>
            <div className="flex flex-col-reverse md:flex-row h-screen">
                <div className='mb-8 sm:m-auto md:w-1/2 lg:h-screen'>

                    <div className="flex-1 md:p-8 bg-white md:h-[85vh] flex flex-col justify-center items-center">
                        <div>
                            <h2 className="text-5xl font-semibold m-4 mb-0">Get started!</h2>
                            <p className='m-4 mt-1 text-center'>Let's Shop together</p>
                        </div>
                        <form className='flex flex-col w-2/3 xl:w-1/2' onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <input 
                                    type="text" 
                                    id="email" 
                                    {...register('email')} 
                                    className={`mt-1 p-2 w-full border border-gray-700 rounded-full py-3 px-6 ${errors.email ? 'border-red-500' : ''}`} 
                                    placeholder='Email' 
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div className="mb-4">
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        {...register('password')}
                                        className={`mt-1 p-2 w-full border rounded-full py-3 px-6 ${errors.password ? 'border-red-500' : 'border-gray-800'}`}
                                        placeholder='Password'
                                    />
                                    <button
                                        type="button"
                                        onClick={handleTogglePassword}
                                        className="absolute inset-y-0 right-0 mx-5 flex justify-center items-center text-gray-500 cursor-pointer"
                                    >
                                        {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="bg-black text-white py-3 px-6 rounded-full focus:outline-none focus:ring focus:border-gray-600 w-full"
                                disabled={loading}
                            >
                                {loading ? 'Registering...' : 'Register'}
                            </button>
                        </form>

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

export default RegisterPage;