import React from 'react';
import { Highlighter, PenLine, Share2 } from 'lucide-react';
import { SelectionState } from '../types';

interface FloatingActionBarProps {
    isVisible: boolean;
    sheetHeight: number; // in pixels or vh? Let's use percentage of viewport or simplified State
    isExpanded: boolean;
    selection: SelectionState;
    onToggleHighlight: (selection: SelectionState) => void;
    onOpenStudy: (selection: SelectionState) => void;
    onCreateNote: (selection: SelectionState) => void;
    onShare: (selection: SelectionState) => void;
    isHighlighted?: boolean;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
    isVisible,
    isExpanded,
    selection,
    onToggleHighlight,
    onOpenStudy,
    onCreateNote,
    onShare,
    isHighlighted = false
}) => {
    const isDisabled = !selection.type;

    // Calculate position: 
    // Anchored at the bottom center, floating above the sheet content
    const bottomPosition = 'bottom-8';

    return (
        <div
            className={`
        fixed inset-x-0 ${bottomPosition} z-[60] flex justify-center px-4 pointer-events-none transition-all duration-300
        ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
      `}
        >
            <div className="bg-white/30 backdrop-blur-xl border border-white/30 shadow-lg rounded-full px-2 py-1.5 flex items-center gap-1 pointer-events-auto max-w-fit">
                <ActionButton
                    icon={<Highlighter size={20} className={isHighlighted ? 'text-blue-600' : 'text-muted'} />}
                    label="Відмітити"
                    onClick={() => onToggleHighlight(selection)}
                    disabled={isDisabled}
                    isActive={isHighlighted}
                />
                <ActionButton
                    icon={<PenLine size={20} className="text-muted" />}
                    label="Нотатка"
                    onClick={() => onCreateNote(selection)}
                    disabled={isDisabled}
                />
                <ActionButton
                    icon={<Share2 size={20} className="text-muted" />}
                    label="Поділитись"
                    onClick={() => onShare(selection)}
                    disabled={isDisabled}
                />
            </div>
        </div>
    );
};

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    disabled?: boolean;
    isActive?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick, disabled, isActive }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        flex flex-col items-center justify-center min-w-[70px] py-1 px-2 rounded-2xl transition-all duration-200
        ${disabled ? 'opacity-30 grayscale cursor-not-allowed' : 'active:scale-90 active:bg-stone-100/50'}
        ${isActive ? 'bg-blue-100/40' : ''}
      `}
            aria-label={label}
        >
            <div className="mb-0.5">
                {icon}
            </div>
            <span className={`text-[11px] font-medium leading-tight ${isActive ? 'text-blue-600' : 'text-muted'}`}>
                {label}
            </span>
        </button>
    );
};
