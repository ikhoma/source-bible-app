import React from 'react';
import { Highlighter, FilePenLine, Share2 } from 'lucide-react';
import { SelectionState } from '../types';

interface SheetActionBarProps {
    selection: SelectionState;
    onToggleHighlight: (selection: SelectionState) => void;
    onCreateNote: (selection: SelectionState) => void;
    onShare: (selection: SelectionState) => void;
    isHighlighted?: boolean;
}

export const SheetActionBar: React.FC<SheetActionBarProps> = ({
    selection,
    onToggleHighlight,
    onCreateNote,
    onShare,
    isHighlighted = false
}) => {
    const isDisabled = !selection.type;

    return (
        <div className="w-full bg-transparent border-t border-stone-200 dark:border-[#312E2B] min-h-[54px] py-1 flex items-center justify-around px-2 z-40 shrink-0">
            <ActionItem
                icon={<Highlighter size={22} />}
                label="Відмітити"
                onClick={() => onToggleHighlight(selection)}
                disabled={isDisabled}
                isActive={isHighlighted}
            />
            <ActionItem
                icon={<FilePenLine size={22} />}
                label="Нотатка"
                onClick={() => onCreateNote(selection)}
                disabled={isDisabled}
            />
            <ActionItem
                icon={<Share2 size={22} />}
                label="Поділитись"
                onClick={() => onShare(selection)}
                disabled={isDisabled}
            />
        </div>
    );
};

interface ActionItemProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    disabled?: boolean;
    isActive?: boolean;
}

const ActionItem: React.FC<ActionItemProps> = ({ icon, label, onClick, disabled, isActive }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                flex flex-col items-center justify-center w-16 h-full transition-colors duration-200
                ${disabled ? 'opacity-30 cursor-not-allowed text-muted' : (isActive ? 'text-primary' : 'text-muted hover:text-primary')}
            `}
        >
            <div className={`rounded-full px-4 py-0.5 mb-0.5 transition-colors ${isActive ? 'bg-blue-100' : 'bg-transparent'}`}>
                {React.cloneElement(icon as React.ReactElement<any>, { className: isActive ? 'text-blue-600 stroke-[2.5px]' : 'stroke-[2px]' })}
            </div>
            <span className={`text-[10px] font-medium tracking-wide ${isActive ? 'text-blue-600' : ''}`}>{label}</span>
        </button>
    );
};
