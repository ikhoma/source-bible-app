import React from 'react';
import { ChevronDown, Bookmark, Search } from 'lucide-react';

interface TopBarProps {
  onSearchClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onSearchClick }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] h-16 px-4 flex items-center justify-between transition-all duration-300 flex-none">
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-lg bg-stone-100/50 hover:bg-stone-100 active:bg-stone-200 text-primary font-medium text-sm transition-colors">
          Grom
          <ChevronDown className="w-4 h-4 text-muted" />
        </button>
        <button className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-lg bg-stone-100/50 hover:bg-stone-100 active:bg-stone-200 text-primary font-medium text-sm transition-colors">
          Псалом 1
          <ChevronDown className="w-4 h-4 text-muted" />
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button className="p-2.5 text-muted hover:text-primary hover:bg-stone-100 rounded-full transition-colors active:scale-95">
          <Bookmark size={22} strokeWidth={1.5} />
        </button>
        <button 
          onClick={onSearchClick}
          className="p-2.5 text-muted hover:text-primary hover:bg-stone-100 rounded-full transition-colors active:scale-95"
        >
          <Search size={22} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
};