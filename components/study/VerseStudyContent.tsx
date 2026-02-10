import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { VERSE_STUDY_DB, PARALLEL_VERSES_DATA, PSALM_1 } from '../../constants';

interface VerseStudyContentProps {
  verseId?: number;
  onOpenWord: (key: string) => void;
  onOpenExtended: (verseId: number) => void;
}

export const VerseStudyContent: React.FC<VerseStudyContentProps> = ({ 
  verseId = 1, 
  onOpenWord,
  onOpenExtended 
}) => {
  const data = VERSE_STUDY_DB[verseId];
  const [activeParallel, setActiveParallel] = useState<string | null>(null);
  const [activeOriginalIndex, setActiveOriginalIndex] = useState<number>(0);

  useEffect(() => {
    setActiveParallel(null);
    setActiveOriginalIndex(0);
  }, [verseId]);

  const activeOriginalToken = useMemo(() => {
    return data?.originalTokens?.[activeOriginalIndex];
  }, [data, activeOriginalIndex]);

  if (!data) return <div className="p-8 text-center text-stone-500">Інформація відсутня</div>;

  const handleParallelClick = (ref: string) => {
    setActiveParallel(prev => prev === ref ? null : ref);
  };

  return (
    <div className="pb-24 pt-4 px-4 animate-in fade-in duration-300">
      
      {/* Parallel Passages */}
      <section className="pt-6 mt-6 border-t border-stone-200 first:border-0 first:mt-0 first:pt-0">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">Паралельні місця</h3>
        <div className="flex flex-wrap gap-2">
          {data.parallels.map((ref) => {
            const isActive = activeParallel === ref;
            return (
              <button 
                key={ref} 
                onClick={() => handleParallelClick(ref)}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-stone-900 text-white shadow-sm' 
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 active:scale-95'
                  }
                `}
              >
                {ref}
              </button>
            );
          })}
        </div>

        {/* Inline Preview */}
        {activeParallel && (
          <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
             <div className="group cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-stone-900 leading-relaxed text-[15px]">
                    {PARALLEL_VERSES_DATA[activeParallel] || "Текст вірша..."}
                  </p>
                  <ChevronRight size={16} className="text-stone-300 group-hover:text-stone-500 transition-colors mt-0.5 shrink-0" />
                </div>
                <div className="h-[1px] bg-stone-100 mt-4" />
             </div>
          </div>
        )}
      </section>

      {/* Translations */}
      <section className="pt-6 mt-6 border-t border-stone-200 first:border-0 first:mt-0 first:pt-0">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">Порівняння перекладів</h3>
        <div className="space-y-4">
          {data.translations.map((t) => (
            <div key={t.name} className="group">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-xs font-bold text-stone-500">{t.name}</span>
                <ChevronRight size={14} className="text-stone-300 group-hover:text-stone-500 transition-colors" />
              </div>
              <p className="text-stone-800 leading-relaxed text-[15px]">{t.text}</p>
              <div className="h-[1px] bg-stone-100 mt-4" />
            </div>
          ))}
        </div>
      </section>

      {/* Original Text - Translation Anchored */}
      {data.originalTokens && (
        <section className="pt-6 mt-6 border-t border-stone-200 first:border-0 first:mt-0 first:pt-0">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">Оригінал: слово за словом</h3>
          
          {/* Lexical Chips (LTR Order - Ukrainian Gloss) */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 -mx-4 px-4 mask-fade-x">
            {data.originalTokens.map((token, idx) => {
              const isActive = activeOriginalIndex === idx;
              return (
                 <button
                   key={idx}
                   onClick={() => setActiveOriginalIndex(idx)}
                   className={`
                     px-3 py-1.5 rounded-lg text-[15px] font-medium transition-all duration-200 whitespace-nowrap shrink-0
                     ${isActive 
                       ? 'bg-stone-900 text-white shadow-sm' 
                       : 'bg-stone-100 text-stone-700 hover:bg-stone-200 active:scale-95'
                     }
                   `}
                 >
                   <span>{token.gloss}</span>
                 </button>
              );
            })}
          </div>

          {/* Inline Preview */}
          {activeOriginalToken && (
             <div className="mt-2 animate-in fade-in duration-300">
               <button 
                 onClick={() => activeOriginalToken.refKey && onOpenWord(activeOriginalToken.refKey)}
                 disabled={!activeOriginalToken.refKey}
                 className="w-full text-left group"
               >
                 <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                       <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-serif text-xl font-bold text-stone-900" dir="rtl">{activeOriginalToken.original}</span>
                          <span className="text-sm text-stone-500 font-mono">({activeOriginalToken.transliteration})</span>
                       </div>
                       
                       <div className="text-xs text-stone-500 font-medium">
                          {activeOriginalToken.morphology && <span>{activeOriginalToken.morphology.split('|')[0].trim()}</span>}
                          {activeOriginalToken.morphology && <span> · </span>}
                          <span>Стронга {activeOriginalToken.strongs}</span>
                       </div>
                    </div>
                    {activeOriginalToken.refKey && (
                      <ChevronRight size={18} className="text-stone-300 group-hover:text-stone-500 transition-colors mt-2" />
                    )}
                 </div>
               </button>
               
               <div className="h-[1px] bg-stone-100 mt-4 mb-4" />
               
               {/* Secondary Action */}
               <button 
                 onClick={() => onOpenExtended(verseId)}
                 className="w-full py-3 text-sm font-semibold text-stone-600 bg-stone-100 rounded-xl hover:bg-stone-200 active:bg-stone-300 transition-colors"
               >
                 Розширений розбір
               </button>
             </div>
          )}
        </section>
      )}

      {/* Commentaries */}
      <section className="pt-6 mt-6 border-t border-stone-200 first:border-0 first:mt-0 first:pt-0">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">Коментарі</h3>
        <div className="space-y-3">
          {data.commentaries.map((c) => (
            <button key={c.author} className="w-full flex items-center gap-4 text-left p-2 rounded-xl hover:bg-stone-50 active:bg-stone-100 transition-colors">
              <img 
                src={c.image} 
                alt={c.title}
                className="w-10 h-14 rounded shadow-sm object-cover bg-stone-200" 
              />
              <div>
                <h4 className="font-semibold text-stone-900 text-sm leading-tight mb-0.5">{c.title}</h4>
                <p className="text-xs text-stone-500">{c.author}</p>
              </div>
              <ChevronRight size={16} className="ml-auto text-stone-300" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};