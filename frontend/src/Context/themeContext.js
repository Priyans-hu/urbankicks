import React, { createContext, useContext, useState } from 'react';
import themes from './themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.light);

    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === themes.light ? themes.dark : themes.light
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    return useContext(ThemeContext);
};
