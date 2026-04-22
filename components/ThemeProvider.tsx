import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type FontStyle = 'modern' | 'antique';
type Language = 'ua' | 'en';

interface ThemeContextType {
    theme: Theme;
    fontStyle: FontStyle;
    language: Language;
    setTheme: (theme: Theme) => void;
    setFontStyle: (fontStyle: FontStyle) => void;
    setLanguage: (lang: Language) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSearchParam = (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    return new URLSearchParams(window.location.search).get(key);
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const forced = getSearchParam('theme');
        if (forced === 'light' || forced === 'dark') return forced;
        const saved = localStorage.getItem('app-theme');
        // Default to dark mode based on current state
        return (saved as Theme) || 'dark';
    });

    const [fontStyle, setFontStyle] = useState<FontStyle>(() => {
        const forced = getSearchParam('font');
        if (forced === 'modern' || forced === 'antique') return forced;
        const saved = localStorage.getItem('app-font');
        // Default to antique (Cormorant) based on current state
        return (saved as FontStyle) || 'antique';
    });

    const [language, setLanguage] = useState<Language>(() => {
        const forced = getSearchParam('lang');
        if (forced === 'ua' || forced === 'en') return forced;
        const saved = localStorage.getItem('app-language');
        return (saved as Language) || 'ua';
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

    useEffect(() => {
        localStorage.setItem('app-language', language);
    }, [language]);

    return (
        <ThemeContext.Provider value={{ theme, fontStyle, language, setTheme, setFontStyle, setLanguage }}>
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
