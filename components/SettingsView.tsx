import React from 'react';
import { useTheme } from './ThemeProvider';
import { Moon, Sun, Type } from 'lucide-react';
import { useTranslation } from './i18n';

export const SettingsView: React.FC = () => {
    const { theme, fontStyle, language, setTheme, setFontStyle, setLanguage } = useTheme();
    const t = useTranslation();

    return (
        <div className="flex flex-col h-full bg-stone-50 overflow-y-auto w-full transition-colors duration-300">
            {/* Header */}
            <div className="sticky top-0 bg-stone-50/90 backdrop-blur-md z-10 border-b border-stone-200/50 pt-safe transition-colors duration-300">
                <div className="h-[44px] flex items-center justify-between px-6">
                </div>
            </div>

            <div className="p-6 space-y-8 pb-32">
                <h1 className="text-3xl font-bold text-primary">{t('settings.title')}</h1>

                {/* Appearance Section */}
                <section>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-muted mb-4 px-1">{t('settings.appearance')}</h2>
                    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden transition-colors duration-300">

                        {/* Theme Toggle */}
                        <div className="flex items-center justify-between p-4 border-b border-stone-100 last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-stone-100 rounded-lg text-primary">
                                    {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                                </div>
                                <div>
                                    <p className="font-medium text-primary text-[15px]">{t('settings.theme')}</p>
                                    <p className="text-xs text-muted">{theme === 'dark' ? t('settings.theme.dark') : t('settings.theme.light')}</p>
                                </div>
                            </div>
                            <div className="flex bg-stone-100 p-1 rounded-xl">
                                <button
                                    onClick={() => setTheme('light')}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${theme === 'light' ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-primary'
                                        }`}
                                >
                                    {t('settings.theme.light')}
                                </button>
                                <button
                                    onClick={() => setTheme('dark')}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${theme === 'dark' ? 'bg-stone-800 text-stone-50 shadow-sm' : 'text-muted hover:text-primary'
                                        }`}
                                >
                                    {t('settings.theme.dark')}
                                </button>
                            </div>
                        </div>

                        {/* Font Toggle */}
                        <div className="flex items-center justify-between p-4 border-b border-stone-100 last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-stone-100 rounded-lg text-primary">
                                    <Type size={20} />
                                </div>
                                <div>
                                    <p className="font-medium text-primary text-[15px]">{t('settings.font')}</p>
                                    <p className="text-xs text-muted">
                                        {fontStyle === 'antique' ? 'Cormorant' : 'Sans-serif'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex bg-stone-100 p-1 rounded-xl">
                                <button
                                    onClick={() => setFontStyle('modern')}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all font-sans ${fontStyle === 'modern' ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-primary'
                                        }`}
                                >
                                    {t('settings.font.modern')}
                                </button>
                                <button
                                    onClick={() => setFontStyle('antique')}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all font-serif ${fontStyle === 'antique' ? 'bg-stone-800 text-stone-50 shadow-sm' : 'text-muted hover:text-primary'
                                        }`}
                                >
                                    {t('settings.font.classic')}
                                </button>
                            </div>
                        </div>

                        {/* Language Toggle */}
                        <div className="flex items-center justify-between p-4 border-b border-stone-100 last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-stone-100 rounded-lg text-primary">
                                    <span className="font-bold text-sm block text-center w-5 h-5 leading-5">A</span>
                                </div>
                                <div>
                                    <p className="font-medium text-primary text-[15px]">{t('settings.language')}</p>
                                    <p className="text-xs text-muted">{language === 'en' ? t('settings.language.en') : t('settings.language.ua')}</p>
                                </div>
                            </div>
                            <div className="flex bg-stone-100 p-1 rounded-xl">
                                <button
                                    onClick={() => setLanguage('ua')}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${language === 'ua' ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-primary'
                                        }`}
                                >
                                    Укр
                                </button>
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${language === 'en' ? 'bg-stone-800 text-stone-50 shadow-sm' : 'text-muted hover:text-primary'
                                        }`}
                                >
                                    Eng
                                </button>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </div>
    );
};
