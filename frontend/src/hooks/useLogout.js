// useLogout.js
import { useState } from 'react';
import userApi from '../api/userApi';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

const useLogout = () => {
    const { logout } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            // Start loading
            setLoading(true);

            await userApi.logoutUser();

            // Clear user state on successful logout
            logout();
            toast.info('Logout successful!', { position: 'top-center' });

            // Reset error state
            setError(null);
        } catch (error) {
            // Handle logout error
            setError(error.message || 'Logout failed');
        } finally {
            // Stop loading, whether the logout was successful or not
            setLoading(false);
        }
    };

    return {
        handleLogout,
        error,
        loading,
    };
};

export default useLogout;
