import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import uselogin hook
import useLogin from '../hooks/useLogin';
// import toastify notifications
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { handleLogin, error, loading } = useLogin();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const email = e.target.email.value;
        const password = e.target.password.value;
    
        try {
            const res = await handleLogin({ email, password });
            console.log(res);
            // If handleLogin doesn't throw an error, consider it successful
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <div className="flex flex-row h-screen">
            <div className='w-1/2 text-left lg:h-screen'>
                <a href="/"><h1 className="text-4xl font-semibold m-4">UrbanKicks</h1></a>

                <div className="flex-1 p-8 bg-white h-[85vh] flex flex-col justify-center items-center text-center">
                    <div>
                        <h2 className="text-5xl font-semibold m-4 mb-0">Welcome back!</h2>
                        <p className='m-4 mt-1'>Continue Shopping</p>
                    </div>
                    <form className='flex flex-col w-2/3 xl:w-1/2' onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input type="text" id="email" name="email" className="mt-1 p-2 w-full border border-gray-700 rounded-full py-3 px-6" placeholder='Email' />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="mt-1 p-2 w-full border rounded-full py-3 px-6 border-gray-800"
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
                        </div>
                        <button
                            type="submit"
                            className="bg-black text-white py-3 px-6 rounded-full focus:outline-none focus:ring focus:border-gray-600 w-full"
                            disabled={loading}
                        >
                            {loading ? 'Logging In...' : 'Log In'}
                        </button>
                    </form>

                    {error && (
                        <p className="text-red-500 mt-2">
                            Error: {error}
                        </p>
                    )}

                    <p className="mt-4 text-sm">Not a member! <a href="/register" className="text-blue-500">Register now</a></p>
                </div>
            </div>

            {/* Right Section - Image */}
            <div className="flex-1 flex justify-center items-center">
                <div className='rounded-3xl max-h-[90%] max-w-[90%] overflow-hidden'>
                    <img
                        src='https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        alt=''
                        className='rounded-xl shadow-2xl shadow-gray-300'
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
