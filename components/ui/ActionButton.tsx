import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
}

export const ActionButton: React.FC<ActionButtonProps> = ({
    label,
    icon: Icon,
    iconPosition = 'right',
    className = '',
    ...props
}) => {
    return (
        <button
            type="button"
            className={`
        inline-flex items-center justify-center 
        bg-blue-50 text-blue-600 
        px-4 py-1.5 rounded-full 
        text-xs font-bold 
        hover:bg-blue-100 active:bg-blue-200
        transition-colors duration-200
        w-max
        ${className}
      `}
            {...props}
        >
            {Icon && iconPosition === 'left' && <Icon size={14} className="mr-1.5" />}
            {label}
            {Icon && iconPosition === 'right' && <Icon size={14} className="ml-1.5" />}
        </button>
    );
};
