import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Bookmark, Search, Check } from 'lucide-react';
import { useTheme, BibleTranslation } from './ThemeProvider';
import { useTranslation } from './i18n';

interface TopBarProps {
  onSearchClick?: () => void;
  onNavClick?: () => void;
  currentBookName?: string;
  currentChapter?: number;
}

export const TopBar: React.FC<TopBarProps> = ({ onSearchClick, onNavClick, currentBookName, currentChapter }) => {
  const { language, translation, setTranslation } = useTheme();
  const t = useTranslation();
  
  const [isTransOpen, setIsTransOpen] = useState(false);
  const transRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (transRef.current && !transRef.current.contains(e.target as Node)) {
        setIsTransOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const translations: BibleTranslation[] = ['GRM', 'RST+', 'NASB+'];

  return (
    <header className="sticky top-0 z-30 bg-stone-100 border-b border-stone-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] h-[44px] px-4 flex items-center justify-between transition-all duration-300 flex-none">
      <div className="flex items-center gap-2">
        <div className="relative" ref={transRef}>
          <button 
            onClick={() => setIsTransOpen(!isTransOpen)}
            className="flex items-center gap-1 pl-3 pr-2 py-1 rounded-lg bg-stone-200/50 border border-stone-300/30 hover:bg-stone-200 active:bg-stone-300 text-primary font-medium text-[15px] transition-colors"
          >
            {translation}
            <ChevronDown size={16} className="text-muted" />
          </button>

          {isTransOpen && (
            <div className="absolute top-full left-0 mt-1 w-32 bg-white rounded-xl shadow-lg border border-stone-200 py-1 z-50">
              {translations.map(tOption => (
                <button
                  key={tOption}
                  onClick={() => {
                    setTranslation(tOption);
                    setIsTransOpen(false);
                  }}
                  className="flex items-center justify-between w-full px-4 py-2 text-[15px] hover:bg-stone-50 transition-colors"
                >
                  <span className={translation === tOption ? 'font-medium text-blue-600' : 'text-primary'}>
                    {tOption}
                  </span>
                  {translation === tOption && <Check size={16} className="text-blue-600" />}
                </button>
              ))}
            </div>
          )}
        </div>
        <button 
          onClick={onNavClick}
          className="flex items-center gap-1 pl-3 pr-2 py-1 rounded-lg bg-stone-200/50 border border-stone-300/30 hover:bg-stone-200 active:bg-stone-300 text-primary font-medium text-[15px] transition-colors"
        >
          {currentBookName || t('bible.psalm')} {currentChapter || 1}
          <ChevronDown size={16} className="text-muted" />
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button className="p-2 text-muted hover:text-primary hover:bg-stone-200 rounded-full transition-colors active:scale-95">
          <Bookmark size={24} strokeWidth={1.5} />
        </button>
        <button
          onClick={onSearchClick}
          className="p-2 text-muted hover:text-primary hover:bg-stone-200 rounded-full transition-colors active:scale-95"
        >
          <Search size={24} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
};