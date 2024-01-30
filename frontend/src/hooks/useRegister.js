import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import UserApi from '../api/userApi'; // Make sure to use the correct path to your UserApi

const useRegister = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (userData) => {
        try {
            // Start loading
            setLoading(true);

            // Call the registerUser method from the UserApi
            const response = await UserApi.registerUser(userData);

            // Update user state on successful registration
            login(response.user);

            // Reset error state
            setError(null);
        } catch (error) {
            // Handle registration error
            setError(error.message || 'Registration failed');
        } finally {
            // Stop loading, whether the registration was successful or not
            setLoading(false);
        }
    };

    return {
        handleRegister,
        error,
        loading,
    };
};

export default useRegister;
