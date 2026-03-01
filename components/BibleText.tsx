import React, { useRef } from 'react';
import { Verse, SelectionState, SelectionCoordinates } from '../types';

interface BibleTextProps {
  verses: Verse[];
  selection: SelectionState;
  onSelectWord: (id: string, text: string, coords: SelectionCoordinates, anchorKey?: string) => void;
  onLongPressWord: (id: string, text: string, coords: SelectionCoordinates, anchorKey?: string) => void;
  onSelectVerse: (id: number, text: string, coords: SelectionCoordinates) => void;
  highlights: Set<string | number>;
}

export const BibleText: React.FC<BibleTextProps> = ({
  verses,
  selection,
  onSelectWord,
  onLongPressWord,
  onSelectVerse,
  highlights
}) => {
  const longPressTimer = useRef<number | null>(null);
  const isDragging = useRef(false);

  // Helper to render tokens
  const renderVerseTokens = (verse: Verse) => {
    return verse.tokens.map((token) => {
      // Only interactive if it has an anchorKey
      const isInteractive = !!token.anchorKey;
      const isSelected = selection.type === 'word' && selection.id === token.id;
      const isHighlighted = highlights.has(token.id);

      const handleTouchStart = (e: React.TouchEvent) => {
        if (!isInteractive) return;
        isDragging.current = false;
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        const coords: SelectionCoordinates = {
          x: rect.left + rect.width / 2,
          y: rect.bottom,
          yTop: rect.top
        };

        longPressTimer.current = window.setTimeout(() => {
          onLongPressWord(token.id, token.text, coords, token.anchorKey);
          isDragging.current = true; // prevent click trigger after long press
        }, 500);
      };

      const handleTouchEnd = () => {
        if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
          longPressTimer.current = null;
        }
      };

      const handleTouchMove = () => {
        if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
          longPressTimer.current = null;
          isDragging.current = true;
        }
      };

      const handleClick = (e: React.MouseEvent) => {
        if (!isInteractive) return;
        e.stopPropagation();
        if (isDragging.current) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const coords: SelectionCoordinates = {
          x: rect.left + rect.width / 2,
          y: rect.bottom,
          yTop: rect.top
        };
        onSelectWord(token.id, token.text, coords, token.anchorKey);
      };

      if (!isInteractive) {
        return (
          <span
            key={token.id}
            id={`token-${token.id}`}
            className={`inline py-0.5 box-decoration-clone ${isHighlighted ? 'bg-lime-300 dark:bg-lime-300/20 text-primary' : ''}`}
          >
            {token.text}
          </span>
        );
      }

      return (
        <span
          key={token.id}
          id={`token-${token.id}`}
          className={`
            inline py-0.5 px-[1px] rounded-[3px] transition-colors duration-200 cursor-pointer select-none box-decoration-clone
            ${isSelected ? 'bg-blue-500 !text-[#fff]' : (isHighlighted ? 'bg-lime-300 dark:bg-lime-300/20 text-primary' : 'active:bg-stone-200')}
          `}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          onMouseDown={() => { isDragging.current = false; }}
        >
          {token.text}
        </span>
      );
    });
  };

  return (
    <div className="pb-32 pt-6 px-4 max-w-md mx-auto">
      <div className="mb-4">
        <h3 className="text-muted font-medium text-sm mb-1">Книга Перша</h3>
        <h1 className="text-3xl font-bold text-primary">Псалом 1</h1>
      </div>

      <div className="space-y-2">
        {verses.map((verse) => {
          const isVerseSelected = selection.type === 'verse' && selection.id === verse.id;
          const isVerseHighlighted = highlights.has(verse.id);
          const containsSelectedWord = selection.type === 'word' && verse.tokens.some(t => t.id === selection.id);

          return (
            <div
              key={verse.id}
              id={`verse-${verse.id}`}
              className={`
                relative pl-6 pr-2 py-2 rounded-lg transition-colors duration-300 border-l-4
                ${isVerseSelected ? 'bg-blue-50 border-blue-400' : ''}
                ${containsSelectedWord ? 'bg-blue-50 border-blue-400' : ''}
                ${!isVerseSelected && !containsSelectedWord ? 'border-transparent' : ''}
              `}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const coords: SelectionCoordinates = {
                  x: rect.left + rect.width / 2,
                  y: rect.bottom,
                  yTop: rect.top
                };
                onSelectVerse(verse.id, verse.text, coords);
              }}
            >
              {/* Verse Number */}
              <span className={`
                absolute left-0 top-3 text-xs font-bold select-none w-4 text-center transition-colors
                ${isVerseSelected ? 'text-blue-600' : 'text-muted'}
              `}>
                {verse.id}
              </span>

              <p className={`
                text-lg leading-[1.25] text-primary font-normal whitespace-pre-wrap
              `}>
                <span className={`
                  ${isVerseHighlighted ? 'bg-yellow-300 dark:bg-yellow-300/20 box-decoration-clone py-0.5 rounded-[3px]' : ''}
                `}>
                  {renderVerseTokens(verse)}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};