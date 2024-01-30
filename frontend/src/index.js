import React from 'react';
import ReactDOM from 'react-dom/client';

// importing toastify for notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// importing all the contexts
import { AuthProvider } from './Context/authContext';
import { ThemeProvider } from './Context/themeContext';
import { CartProvider }  from './Context/cartContext';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <ThemeProvider>
                <CartProvider>
                    {/* parent component for the whole application */}
                    <App />
                    {/* toastcontainer for showing popups like logged in and logout */}
                    <ToastContainer />
                </CartProvider>
            </ThemeProvider>
        </AuthProvider>
    </React.StrictMode>
);