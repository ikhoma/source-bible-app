import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { VERSE_STUDY_DB, WORD_STUDY_DB } from '../constants';
import { OriginalToken } from '../types';

interface ExtendedOriginalViewProps {
  verseId: number;
  onBack: () => void;
  onOpenWord: (key: string) => void;
}

export const ExtendedOriginalView: React.FC<ExtendedOriginalViewProps> = ({ 
  verseId, 
  onBack,
  onOpenWord 
}) => {
  const data = VERSE_STUDY_DB[verseId];

  if (!data || !data.originalTokens) {
    return <div className="h-full flex items-center justify-center text-stone-500">Інформація відсутня</div>;
  }

  // Helper to get extended info from WORD_STUDY_DB if available
  const getExtendedInfo = (token: OriginalToken) => {
    if (!token.refKey) return null;
    return WORD_STUDY_DB[token.refKey];
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
        <h1 className="text-lg font-bold text-stone-900">Псалом 1:{verseId} — оригінал</h1>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 pb-32 space-y-4">
        {data.originalTokens.map((token, idx) => {
          const wordData = getExtendedInfo(token);
          
          return (
            <div 
              key={idx} 
              className={`
                group rounded-xl p-4 border border-stone-100 bg-white shadow-sm transition-all text-left
                ${token.refKey ? 'active:bg-stone-50 cursor-pointer' : ''}
              `}
              onClick={() => token.refKey && onOpenWord(token.refKey)}
            >
              {/* Token Header */}
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-2xl font-serif font-bold text-stone-900" dir="rtl">{token.original}</span>
                <span className="text-sm text-stone-500 font-mono tracking-tight">{token.transliteration}</span>
              </div>

              {/* Morphology */}
              <div className="mb-2 text-xs font-medium text-stone-500">
                {token.morphology}
              </div>

              {/* Strong's */}
              <div className="mb-3">
                 <button className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded hover:bg-blue-100 transition-colors">
                   Стронга {token.strongs}
                 </button>
              </div>

              {/* Extended Definition */}
              <div className="text-sm leading-relaxed text-stone-800 border-t border-stone-100 pt-3 mt-1">
                 {/* Primary Gloss */}
                 <p className="font-semibold mb-1">{token.gloss}</p>
                 
                 {/* Lexical Data */}
                 {wordData && wordData.definition ? (
                   <p className="text-stone-600 font-normal leading-relaxed mt-1">
                     {wordData.definition}
                   </p>
                 ) : (
                   <p className="text-stone-400 text-xs mt-1 italic">
                     Детального розбору ще немає.
                   </p>
                 )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};