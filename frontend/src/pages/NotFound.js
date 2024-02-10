// NotFound.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFound = () => {
    return (
        <div>
            <Header />
            <div className="container mx-auto my-16 text-center min-h-[51vh] flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="text-gray-600">
                    Sorry, the requested page does not exist. Please check the URL or go
                    back to the <a href="/">homepage</a>.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default NotFound;
