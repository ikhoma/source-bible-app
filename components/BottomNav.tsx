import React from 'react';
import { BookOpen, PenLine, ToggleLeft } from 'lucide-react';
import { NavTab } from '../types';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-stone-100 border-t border-stone-200 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.03)] pb-safe pt-2 px-6 flex justify-between items-center z-40 max-w-md mx-auto">
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
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 p-2 w-16 transition-colors duration-200 ${active ? 'text-primary' : 'text-muted'}`}
  >
    <div className={`rounded-full px-4 py-1 mb-1 transition-colors ${active ? 'bg-blue-100' : 'bg-transparent'}`}>
      {React.cloneElement(icon as React.ReactElement, { className: active ? 'text-primary stroke-[2.5px]' : 'stroke-[2px]' })}
    </div>
    <span className="text-[10px] font-medium tracking-wide">{label}</span>
  </button>
);