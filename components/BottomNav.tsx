import React from 'react';
import { BookOpen, PenLine, ToggleLeft } from 'lucide-react';
import { NavTab } from '../types';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-stone-100 border-t border-stone-200 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.03)] pb-safe z-40">
      <div className="w-full h-[49px] px-6 flex justify-between items-center">
        <NavItem
          icon={<BookOpen size={24} />}
          label="Біблія"
          active={activeTab === 'bible'}
          onClick={() => onTabChange('bible')}
        />
        <NavItem
          icon={<PenLine size={24} />}
          label="Нотатки"
          active={activeTab === 'notes'}
          onClick={() => onTabChange('notes')}
        />
        <NavItem
          icon={<ToggleLeft size={24} />}
          label="Налаштування"
          active={activeTab === 'settings'}
          onClick={() => onTabChange('settings')}
        />
      </div>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-16 h-full transition-colors duration-200 ${active ? 'text-primary' : 'text-muted'}`}
  >
    <div className={`rounded-full px-4 py-0.5 mb-0.5 transition-colors ${active ? 'bg-blue-100' : 'bg-transparent'}`}>
      {React.cloneElement(icon as React.ReactElement<any>, { className: active ? 'text-primary stroke-[2.5px]' : 'stroke-[2px]' })}
    </div>
    <span className="text-[10px] font-medium tracking-wide">{label}</span>
  </button>
);