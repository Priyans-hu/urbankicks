import React from 'react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useThemeContext } from '../Context/themeContext';


const Header = () => {
    const { state } = useAuth();
    const { isDarkTheme, toggleTheme } = useThemeContext();
    const { user, logout } = useAuth();
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleLogout = () => {
        setShowConfirmation(true);
    };

    const confirmLogout = () => {
        logout();
        setShowConfirmation(false);
    };

    const cancelLogout = () => {
        setShowConfirmation(false);
    };


    const renderAuthButton = () => {
        if (state.isAuthenticated) {
            // User is authenticated, show Logout button
            return (
                <a href="/">
                    <div className='cursor-pointer bg-gray-300 p-2 rounded-full' onClick={handleLogout}>
                        <span role="img" aria-label="Logout">👋 Logout</span>
                    </div>
                </a>
            );
        } else {
            // User is not authenticated, show Login button
            return (
                <a href="/login">
                    <div className='cursor-pointer bg-gray-300 p-2 rounded-full'>
                        <span role="img" aria-label="Login">👤 Login</span>
                    </div>
                </a>
            );
        }
    };

    return (
        <header className="bg-white text-black p-4 px-8 flex items-center justify-between">
            <a href="/"><h1 className="text-4xl font-semibold">UrbanKicks</h1></a>

            <div className='flex items-center space-x-4'>
                <div className='cursor-pointer'>
                    <a href="/products/category/men">Men</a>
                </div>
                <div className='cursor-pointer'>
                    <a href="/products/category/women">Women</a>
                </div>
            </div>

            <div className='flex items-center space-x-4'>
                <button
                    className='cursor-pointer bg-gray-300 p-2 rounded-full'
                    onClick={toggleTheme}
                >
                    {isDarkTheme ? '☀️' : '🌙'}
                </button>
                <div className='cursor-pointer bg-gray-300 p-2 rounded-full'>
                    <span role="img" aria-label="Search">🔍</span>
                </div>
                <a href="/cart">
                    <div className='cursor-pointer bg-gray-300 p-2 rounded-full'>
                        <span role="img" aria-label="Cart">🛒</span>
                    </div>
                </a>

                {/* Conditionally render Login/Logout button */}
                {renderAuthButton()}

                {/* Confirmation dialog */}
                {showConfirmation && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md">
                        <p>{user ? `${user.username}, are you sure you want to logout?` : 'Are you sure you want to logout?'}</p>
                        <div className="flex justify-end mt-4">
                            <button className="mr-4 bg-gray-300 p-2 rounded-full" onClick={confirmLogout}>
                                Confirm
                            </button>
                            <button className="bg-gray-300 p-2 rounded-full" onClick={cancelLogout}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </header>
    );
};

export default Header;