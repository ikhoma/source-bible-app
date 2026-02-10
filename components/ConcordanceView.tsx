import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { WORD_STUDY_DB } from '../constants';

interface ConcordanceViewProps {
  wordKey: string;
  onBack: () => void;
  onNavigateToVerse?: (ref: string) => void;
}

export const ConcordanceView: React.FC<ConcordanceViewProps> = ({ 
  wordKey, 
  onBack,
  onNavigateToVerse
}) => {
  const wordData = WORD_STUDY_DB[wordKey.toLowerCase()];

  if (!wordData || !wordData.usages) {
    return <div className="h-full flex items-center justify-center text-stone-500">Інформація відсутня</div>;
  }

  // Highlighting helper (duplicated from WordStudyContent for isolation)
  const renderHighlightedText = (text: string, searchStem: string) => {
    if (!searchStem || searchStem.length < 2) return text;
    const len = searchStem.length;
    const root = len > 4 ? searchStem.slice(0, Math.ceil(len * 0.75)) : searchStem;
    const regex = new RegExp(`(${root}\\p{L}*)`, 'gui');
    const parts = text.split(regex);

    return parts.map((part, i) => {
      if (part.toLowerCase().startsWith(root)) {
        return (
          <span key={i} className="bg-blue-100 text-stone-900 rounded-[3px] px-[1px] py-0.5 box-decoration-clone">
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col animate-in slide-in-from-bottom-2 duration-300">
      
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] h-16 px-4 flex items-center gap-3 shrink-0">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
           <h1 className="text-lg font-bold text-stone-900">Симфонія</h1>
           <p className="text-xs text-stone-500">Всі вживання слова "{wordKey}"</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 pb-32 space-y-2">
        <div className="px-1 py-2 text-sm text-stone-400 font-medium uppercase tracking-wider mb-2">
           Знайдено {wordData.usages.length} віршів
        </div>
        
        {wordData.usages.map((u, i) => (
            <div 
              key={i} 
              className="p-4 rounded-xl border border-stone-100 bg-white shadow-sm hover:bg-stone-50 active:scale-[0.99] transition-all cursor-pointer"
              onClick={() => onNavigateToVerse && onNavigateToVerse(u.ref)}
            >
                <p className="text-xs font-bold text-stone-500 mb-2">{u.ref}</p>
                <p className="text-[15px] text-stone-800 leading-relaxed">
                  {renderHighlightedText(u.text, wordKey.toLowerCase())}
                </p>
            </div>
        ))}
        
        <div className="h-12" /> {/* Bottom spacer */}
      </div>
    </div>
  );
};