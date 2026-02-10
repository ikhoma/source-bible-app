import React, { useState, useMemo } from 'react';
import { ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import { WORD_STUDY_DB } from '../../constants';

interface WordStudyContentProps {
  word?: string;
  onNavigateToWord?: (wordKey: string) => void;
  onOpenConcordance?: (wordKey: string) => void;
}

export const WordStudyContent: React.FC<WordStudyContentProps> = ({ 
  word = "", 
  onNavigateToWord,
  onOpenConcordance
}) => {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  // Normalize word (lowercase, remove punctuation) to find in DB
  const cleanInputWord = useMemo(() => {
    return word.toLowerCase().replace(/[^\p{L}]/gu, '');
  }, [word]);

  const wordData = useMemo(() => {
    return WORD_STUDY_DB[cleanInputWord];
  }, [cleanInputWord]);

  // Highlighting helper
  const renderHighlightedText = (text: string, searchStem: string) => {
    if (!searchStem || searchStem.length < 2) return text;

    // Create a heuristic root for matching inflections (approx 75% of word length for longer words)
    // This handles "Блаженний" -> "Блаженн" to match "Блаженна"
    const len = searchStem.length;
    const root = len > 4 ? searchStem.slice(0, Math.ceil(len * 0.75)) : searchStem;
    
    // Regex to match words starting with the root
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

  if (!wordData) {
    return (
      <div className="p-12 text-center text-stone-500 flex flex-col items-center justify-center h-full">
        <p className="font-medium text-lg mb-2">Інформація відсутня</p>
        <p className="text-sm opacity-70">Для цього слова ще немає детального розбору.</p>
      </div>
    );
  }

  // Slice usages to show only the first 3
  const displayedUsages = wordData.usages ? wordData.usages.slice(0, 3) : [];
  const hasMoreUsages = wordData.usages && wordData.usages.length > 0;

  return (
    <div className="pb-24 pt-4 px-4 animate-in fade-in duration-300">
      
      {/* Strong's Header */}
      {wordData.strongs && (
        <section className="pt-6 mt-6 border-t border-stone-200 first:border-0 first:mt-0 first:pt-0">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">Номери Стронга</h3>
          <div className="flex items-baseline gap-3">
             <span className="text-2xl font-serif font-bold text-stone-900">{wordData.strongs}</span>
             {wordData.original && (
               <span className="text-3xl font-serif text-stone-800" dir="rtl">{wordData.original}</span>
             )}
          </div>
        </section>
      )}

      {/* Semantic Range */}
      {wordData.semanticRange && wordData.semanticRange.length > 0 && (
        <section className="pt-6 mt-6 border-t border-stone-200 first:border-0 first:mt-0 first:pt-0">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">Семантичний діапазон</h3>
          <div className="leading-relaxed text-stone-800 text-[15px]">
            {wordData.semanticRange.map((item, i) => (
               <span key={item} className="inline-block">
                  <span className="font-medium">{item}</span>
                  {wordData.semanticRange && i < wordData.semanticRange.length - 1 && <span className="mx-2 text-stone-400">•</span>}
               </span>
            ))}
          </div>
        </section>
      )}

      {/* Lexical Data */}
      <section className="pt-6 mt-6 border-t border-stone-200 first:border-0 first:mt-0 first:pt-0">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">Лексичні дані</h3>
        <div className="space-y-2">
          {wordData.original && (
            <div className="grid grid-cols-[140px_1fr] gap-2 text-sm items-baseline">
              <span className="text-stone-500">Оригінальне слово:</span>
              <span className="font-medium text-stone-900 text-left" dir="rtl">{wordData.original}</span>
            </div>
          )}
          <div className="grid grid-cols-[140px_1fr] gap-2 text-sm items-baseline">
            <span className="text-stone-500">Частина мови:</span>
            <span className="font-medium text-stone-900">{wordData.partOfSpeech}</span>
          </div>
          {wordData.transliteration && (
            <div className="grid grid-cols-[140px_1fr] gap-2 text-sm items-baseline">
              <span className="text-stone-500">Транслітерація:</span>
              <span className="font-medium text-stone-900 font-mono text-xs">{wordData.transliteration}</span>
            </div>
          )}
          {wordData.pronunciation && (
            <div className="grid grid-cols-[140px_1fr] gap-2 text-sm items-baseline">
              <span className="text-stone-500">Вимова:</span>
              <span className="font-medium text-stone-900">{wordData.pronunciation}</span>
            </div>
          )}

          {(wordData.typicalConstruction || wordData.origin) && (
            <>
              {isDetailsExpanded && (
                <div className="space-y-2 animate-in slide-in-from-top-2 duration-300 fade-in">
                  {wordData.typicalConstruction && (
                    <div className="grid grid-cols-[140px_1fr] gap-2 text-sm items-baseline">
                      <span className="text-stone-500">Типова конструкція:</span>
                      <span className="font-medium text-stone-900 text-left">
                        <span dir="rtl">{wordData.typicalConstruction.split('+')[0].trim()}</span>
                        {' + '}
                        {wordData.typicalConstruction.split('+')[1]?.trim() || ''}
                      </span>
                    </div>
                  )}
                  {wordData.origin && (
                    <div className="grid grid-cols-[140px_1fr] gap-2 text-sm items-baseline">
                      <span className="text-stone-500">Походження слова:</span>
                      <button 
                        onClick={() => onNavigateToWord && onNavigateToWord(wordData.origin!.transliteration)}
                        className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 flex gap-1 items-baseline hover:text-blue-700 active:text-blue-800 transition-colors"
                      >
                        <span>{wordData.origin.strongs} ({wordData.origin.transliteration})</span>
                        <span dir="rtl" className="text-stone-900 no-underline">{wordData.origin.original}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-1">
                <button 
                  onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                  className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full inline-block transition-colors hover:bg-blue-100"
                >
                  {isDetailsExpanded ? 'Згорнути' : 'Детальніше'}
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Lexical Insight */}
      {wordData.definition && (
        <section className="pt-6 mt-6 border-t border-stone-200 first:border-0 first:mt-0 first:pt-0">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">Лексичний інсайт</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
               <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
               <div>
                 <span className="font-bold text-stone-900 text-sm">Означає:</span>
                 <p className="text-sm text-stone-700 mt-1 leading-relaxed">{wordData.definition}</p>
               </div>
            </div>
            {wordData.notDefinition && (
              <div className="flex gap-3">
                 <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                 <div>
                   <span className="font-bold text-stone-900 text-sm">Не означає:</span>
                   <p className="text-sm text-stone-700 mt-1 leading-relaxed">{wordData.notDefinition}</p>
                 </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Concordance */}
      {hasMoreUsages && (
        <section className="pt-6 mt-6 border-t border-stone-200 first:border-0 first:mt-0 first:pt-0">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">Вживання слова</h3>
          <div className="space-y-3">
            {displayedUsages.map((u, i) => (
              <div key={i} className="pb-3 border-b border-stone-100 last:border-0">
                 <p className="text-xs text-stone-400 mb-1 font-medium">{u.ref}</p>
                 <p className="text-sm text-stone-800 leading-relaxed">
                   {renderHighlightedText(u.text, cleanInputWord)}
                 </p>
              </div>
            ))}
            
            <button 
              onClick={() => onOpenConcordance && onOpenConcordance(cleanInputWord)}
              className="w-full py-3 mt-2 text-sm font-semibold text-stone-600 bg-stone-100 rounded-xl hover:bg-stone-200 transition-colors flex items-center justify-center gap-1"
            >
              Усі вживання
              <ChevronRight size={14} />
            </button>
          </div>
        </section>
      )}
    </div>
  );
};