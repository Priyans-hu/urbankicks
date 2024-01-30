// AuthContext.js
import React, { createContext, useReducer, useEffect } from 'react';

// Initial state for the authentication context
const initialState = {
    user: null,
    isAuthenticated: false,
    // Add other relevant authentication state properties here
};

// Action types
const SET_USER = 'SET_USER';
const SET_LOGOUT = 'SET_LOGOUT';

// Reducer function to handle state changes
const authReducer = (state, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload, isAuthenticated: true };
        case SET_LOGOUT:
            return { ...state, user: null, isAuthenticated: false };
        default:
            return state;
    }
};

// Load initial state from localStorage
const loadInitialState = () => {
    const storedState = localStorage.getItem('authState');
    return storedState ? JSON.parse(storedState) : initialState;
};

// Create the authentication context
export const AuthContext = createContext();

// AuthProvider component to wrap the app with the context
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState, loadInitialState);

    // Add any initialization logic here (e.g., check localStorage for saved user data)

    useEffect(() => {
        // Save state to localStorage whenever it changes
        localStorage.setItem('authState', JSON.stringify(state));
    }, [state]);

    // Method to handle login
    const login = (user) => {
        dispatch({ type: SET_USER, payload: user });
        // You can also perform additional login-related actions here
    };

    // Method to handle logout
    const logout = () => {
        dispatch({ type: SET_LOGOUT });
        // You can also perform additional logout-related actions here
    };

    const contextValue = {
        state,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
