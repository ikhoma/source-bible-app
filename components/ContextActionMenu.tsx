import React from 'react';
import { Highlighter, Brain, PenLine, Copy } from 'lucide-react';
import { SelectionState } from '../types';

interface ContextActionMenuProps {
  selection: SelectionState;
  onClear: () => void;
  onStudy: () => void;
}

export const ContextActionMenu: React.FC<ContextActionMenuProps> = ({ selection, onClear, onStudy }) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleAction = (callback?: () => void) => {
    if (callback) callback();
    // After action (except Study which opens sheet), we might want to clear selection or just close menu.
    if (callback !== onStudy) {
       onClear();
    }
  };

  if (!selection.coordinates) return null;

  // Estimated half-width based on 4 buttons (~64px each) + gaps + padding.
  // Total approx 290px. Half ~ 145px.
  const MENU_HALF_WIDTH = 145;
  const SCREEN_PADDING = 16;
  
  let leftPos = selection.coordinates.x;
  
  if (typeof window !== 'undefined') {
    const minX = MENU_HALF_WIDTH + SCREEN_PADDING;
    const maxX = window.innerWidth - MENU_HALF_WIDTH - SCREEN_PADDING;
    // Clamp the center position to ensure menu stays within bounds
    leftPos = Math.max(minX, Math.min(leftPos, maxX));
  }

  // Y Positioning
  const MENU_HEIGHT = 74; // Approx height of the menu
  const BOTTOM_NAV_HEIGHT = 80; // Safe area for bottom nav
  const GAP = 14;
  
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  
  // Calculate if we have space below
  // We need current Y (bottom of text) + Menu Height + Bottom Nav Height to be <= Window Height
  const spaceBelow = windowHeight - selection.coordinates.y;
  const shouldFlip = spaceBelow < (BOTTOM_NAV_HEIGHT + MENU_HEIGHT);

  // If flipping, we position above the selection top (yTop)
  // If no yTop is provided (shouldn't happen with updated types), fallback to y
  const yTop = selection.coordinates.yTop ?? selection.coordinates.y;
  
  const topPos = shouldFlip 
    ? yTop - MENU_HEIGHT - GAP // Position above
    : selection.coordinates.y + GAP; // Position below

  return (
    <div 
      className="fixed z-40 bg-white border border-stone-100 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-2xl flex items-center px-2 py-2 gap-1 animate-in zoom-in-95 duration-200"
      style={{
        top: topPos,
        left: leftPos,
        transform: 'translateX(-50%)'
      }}
      onMouseDown={handleMouseDown}
      onClick={(e) => e.stopPropagation()}
    >
      <ActionButton icon={<Highlighter size={24} />} label="Виділити" onClick={() => handleAction()} />
      
      <ActionButton icon={<Brain size={24} />} label="Дослідити" onClick={() => handleAction(onStudy)} />
      
      <ActionButton icon={<PenLine size={24} />} label="Нотатка" onClick={() => handleAction()} />
      
      <ActionButton icon={<Copy size={24} />} label="Скопіювати" onClick={() => handleAction()} />
    </div>
  );
};

const ActionButton: React.FC<{ icon: React.ReactNode; label: string; onClick?: () => void }> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-1 p-2 min-w-[64px] rounded-xl hover:bg-stone-50 active:bg-stone-100 transition-colors shrink-0 text-stone-500 hover:text-stone-900"
  >
    {React.cloneElement(icon as React.ReactElement, { className: 'stroke-[2px]' })}
    <span className="text-[10px] font-medium tracking-wide leading-none whitespace-nowrap">{label}</span>
  </button>
);