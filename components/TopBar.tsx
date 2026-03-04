import React from 'react';
import { ChevronDown, Bookmark, Search } from 'lucide-react';

interface TopBarProps {
  onSearchClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onSearchClick }) => {
  return (
    <header className="sticky top-0 z-30 bg-stone-100 border-b border-stone-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] h-[44px] px-4 flex items-center justify-between transition-all duration-300 flex-none">
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1 pl-3 pr-2 py-1 rounded-lg bg-stone-200/50 border border-stone-300/30 hover:bg-stone-200 active:bg-stone-300 text-primary font-medium text-[15px] transition-colors">
          Grom
          <ChevronDown size={16} className="text-muted" />
        </button>
        <button className="flex items-center gap-1 pl-3 pr-2 py-1 rounded-lg bg-stone-200/50 border border-stone-300/30 hover:bg-stone-200 active:bg-stone-300 text-primary font-medium text-[15px] transition-colors">
          Псалом 1
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