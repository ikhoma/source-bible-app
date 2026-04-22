import React from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { Book } from '../../data/books';

interface ChapterSelectionViewProps {
  book: Book;
  onBack: () => void;
  onClose: () => void;
  onSelectChapter: (chapterId: number) => void;
}

export const ChapterSelectionView: React.FC<ChapterSelectionViewProps> = ({ book, onBack, onClose, onSelectChapter }) => {
  // Generate an array of chapter numbers from 1 to book.chapters
  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);

  return (
    <div className="absolute inset-0 bg-stone-50 z-50 flex flex-col animate-in slide-in-from-right-2 duration-300 overflow-y-auto w-full transition-colors">
      {/* Header */}
      <div className="sticky top-0 bg-stone-50/90 backdrop-blur-md z-20 border-b border-stone-200/50 pt-safe transition-colors duration-300">
        <div className="h-[44px] flex items-center justify-between px-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1 -ml-2 p-2 rounded-lg text-primary transition-colors active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-full text-muted transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-32">
        <h1 className="text-3xl font-bold text-primary">{book.name}</h1>
        
        <div className="grid grid-cols-6 gap-2">
          {chapters.map(chapter => (
            <button
              key={chapter}
              onClick={() => onSelectChapter(chapter)}
              className="aspect-[4/3] flex items-center justify-center rounded-lg text-[12px] font-medium transition-all active:scale-95 shadow-sm bg-blue-500 text-white"
            >
              {chapter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
