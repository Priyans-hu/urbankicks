// useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../Context/authContext';

// Custom hook to access the authentication context
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
