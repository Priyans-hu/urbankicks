import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useThemeContext } from '../Context/themeContext';


const Header = () => {
    const {state}=useAuth();
    const { isDarkTheme, toggleTheme } = useThemeContext();
    const { user, logout } = useAuth();

    const renderAuthButton = () => {
        if (state.isAuthenticated) {
            // User is authenticated, show Logout button
            return (
                <a href="/">
                    <div className='cursor-pointer bg-gray-300 p-2 rounded-full' onClick={logout}>
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
                    <a href="/category/men">Men</a>
                </div>
                <div className='cursor-pointer'>
                    <a href="/category/women">Women</a>
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
            </div>
        </header>
    );
};

export default Header;