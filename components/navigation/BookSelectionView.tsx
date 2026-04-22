import React, { useState } from 'react';
import { X, LayoutGrid, List as ListIcon, ChevronRight } from 'lucide-react';
import { useTranslation } from '../i18n';
import { DbBook, getBooks } from '../../database';
import { useTheme } from '../ThemeProvider';

interface BookSelectionViewProps {
  onBack: () => void;
  onSelectBook: (book: DbBook) => void;
}

export const BookSelectionView: React.FC<BookSelectionViewProps> = ({ onBack, onSelectBook }) => {
  const t = useTranslation();
  const { translation } = useTheme();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [books, setBooks] = useState<DbBook[]>([]);

  React.useEffect(() => {
    let active = true;
    getBooks(translation).then(dbBooks => {
      if (active) setBooks(dbBooks);
    });
    return () => { active = false; };
  }, [translation]);

  return (
    <div className="absolute inset-0 bg-stone-50 z-50 flex flex-col animate-in slide-in-from-bottom-2 duration-300 overflow-y-auto w-full transition-colors">
      {/* Header */}
      <div className="sticky top-0 bg-stone-50/90 backdrop-blur-md z-20 border-b border-stone-200/50 pt-safe transition-colors duration-300">
        <div className="h-[44px] flex items-center justify-between px-4">
          <div className="text-lg font-bold text-primary"></div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(prev => prev === 'grid' ? 'list' : 'grid')}
              className="p-2 rounded-full text-muted hover:bg-stone-200/50 transition-colors"
            >
              {viewMode === 'grid' ? <ListIcon size={20} /> : <LayoutGrid size={20} />}
            </button>
            <button
              onClick={onBack}
              className="p-2 -mr-2 rounded-full text-muted hover:bg-stone-200/50 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-32">
        <h1 className="text-3xl font-bold text-primary">Книги</h1>
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-6 gap-2">
            {books.map(book => (
              <button
                key={book.book_number}
                onClick={() => onSelectBook(book)}
                className={`aspect-[4/3] flex items-center justify-center rounded-lg text-[12px] font-medium transition-all active:scale-95 shadow-sm ${
                  book.book_color === '#ff8080' 
                    ? 'bg-yellow-500 text-stone-900' 
                    : 'bg-blue-500 text-white'
                }`}
              >
                {book.short_name}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {books.map(book => (
              <button
                key={book.book_number}
                onClick={() => onSelectBook(book)}
                className="w-full flex items-center justify-between p-3 rounded-xl transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${book.book_color === '#ff8080' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                  <span className="text-primary font-medium">{book.long_name}</span>
                </div>
                <ChevronRight size={18} className="text-muted" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
