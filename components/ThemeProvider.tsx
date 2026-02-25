import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type FontStyle = 'modern' | 'antique';

interface ThemeContextType {
    theme: Theme;
    fontStyle: FontStyle;
    setTheme: (theme: Theme) => void;
    setFontStyle: (fontStyle: FontStyle) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('app-theme');
        // Default to dark mode based on current state
        return (saved as Theme) || 'dark';
    });

    const [fontStyle, setFontStyle] = useState<FontStyle>(() => {
        const saved = localStorage.getItem('app-font');
        // Default to antique (Cormorant) based on current state
        return (saved as FontStyle) || 'antique';
    });

    useEffect(() => {
        localStorage.setItem('app-theme', theme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('app-font', fontStyle);
        document.documentElement.classList.remove('font-modern', 'font-antique');
        document.documentElement.classList.add(`font-${fontStyle}`);
    }, [fontStyle]);

    return (
        <ThemeContext.Provider value={{ theme, fontStyle, setTheme, setFontStyle }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
