// useLogin.js
import { useState } from 'react';
import userApi from '../api/userApi';
import { useAuth } from '../hooks/useAuth';

// import toastify notifications
import { toast } from 'react-toastify';

const useLogin = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (credentials) => {
        try {
            // Start loading
            setLoading(true);

            const response = await userApi.loginUser(credentials);
            // console.log("this is in uselogin " + response.json());
            if (response.user) {
                // Update user state on successful login
                login(response.user);
                toast.success('Login successful!', { position: 'top-center' });
            }

            // Reset error state
            setError(null);
        } catch (error) {
            // Handle login error
            setError(error.message || 'Login failed');
        } finally {
            // Stop loading, whether the login was successful or not
            setLoading(false);
        }
    };

    return {
        handleLogin,
        error,
        loading,
    };
};

export default useLogin;
