import React from 'react';
import ReactDOM from 'react-dom/client';

// importing toastify for notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// importing all the contexts
import { AuthProvider } from './Context/authContext';
import { ThemeProvider } from './Context/themeContext';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <ThemeProvider>
                {/* parent component for the whole application */}
                <App />
                {/* toastcontainer for showing popups like logged in and logout */}
                <ToastContainer />
            </ThemeProvider>
        </AuthProvider>
    </React.StrictMode>
);