import React, { useState, useMemo, useEffect } from 'react';
import { ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import { WORD_STUDY_DB } from '../../constants';
import { useScrollToTop } from '../BottomSheet';

interface WordStudyContentProps {
  word?: string;
  onNavigateToWord?: (wordKey: string) => void;
}

export const WordStudyContent: React.FC<WordStudyContentProps> = ({
  word = "",
  onNavigateToWord
}) => {
  type SectionTab = 'meaning' | 'usage';
  const [activeSection, setActiveSection] = useState<SectionTab>('meaning');
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  // Normalize word (lowercase, remove punctuation) to find in DB
  const cleanInputWord = useMemo(() => {
    return word.toLowerCase().replace(/[^\p{L}]/gu, '');
  }, [word]);

  const wordData = useMemo(() => {
    return WORD_STUDY_DB[cleanInputWord];
  }, [cleanInputWord]);

  const scrollToTop = useScrollToTop();

  useEffect(() => {
    scrollToTop();
  }, [activeSection, cleanInputWord, scrollToTop]);

  useEffect(() => {
    setActiveSection('meaning');
    setIsDetailsExpanded(false);
  }, [cleanInputWord]);

  // Highlighting helper
  const renderHighlightedText = (text: string) => {
    if (!text) return text;

    // Parse <mark> tags from DB
    const parts = text.split(/(<mark>.*?<\/mark>)/gi);

    return parts.map((part, i) => {
      if (part.toLowerCase().startsWith('<mark>')) {
        const innerText = part.replace(/<\/?mark>/gi, '');
        return (
          <span key={i} className="bg-blue-100 text-primary rounded-[3px] px-[1px] py-0.5 box-decoration-clone font-medium">
            {innerText}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  if (!wordData) {
    return (
      <div className="p-12 text-center text-muted flex flex-col items-center justify-center h-full">
        <p className="font-medium text-lg mb-2">Інформація відсутня</p>
        <p className="text-base opacity-70">Для цього слова ще немає детального розбору.</p>
      </div>
    );
  }

  // Show all usages
  const displayedUsages = wordData.usages || [];
  const hasMoreUsages = wordData.usages && wordData.usages.length > 0;

  // Helper for pluralization
  const getUsageLabel = (count: number) => {
    const mod100 = count % 100;
    const mod10 = count % 10;
    if (mod100 >= 11 && mod100 <= 19) return `${count} ВЖИВАНЬ СЛОВА`;
    if (mod10 === 1) return `${count} ВЖИВАННЯ СЛОВА`;
    if (mod10 >= 2 && mod10 <= 4) return `${count} ВЖИВАННЯ СЛОВА`;
    return `${count} ВЖИВАНЬ СЛОВА`;
  };

  return (
    <div className="pb-24 px-4 animate-in fade-in duration-300">

      {/* Section Pills (Meaning / Usage) */}
      <div className="sticky top-0 z-10 bg-stone-100 mb-4 -mx-4 pt-2 pb-4 font-sans border-b border-stone-200 shadow-sm">
        <div className="flex overflow-x-auto no-scrollbar gap-2 px-4">
          <button
            onClick={() => setActiveSection('meaning')}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 border
              ${activeSection === 'meaning'
                ? 'bg-[#CFCBC9] text-primary border-[#C5C2BE] dark:bg-stone-300 dark:text-primary dark:border-stone-400'
                : 'bg-stone-200 text-muted hover:bg-stone-300 active:scale-95 border-stone-300/50'
              }
            `}
          >
            Значення
          </button>
          <button
            onClick={() => setActiveSection('usage')}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 border
              ${activeSection === 'usage'
                ? 'bg-[#CFCBC9] text-primary border-[#C5C2BE] dark:bg-stone-300 dark:text-primary dark:border-stone-400'
                : 'bg-stone-200 text-muted hover:bg-stone-300 active:scale-95 border-stone-300/50'
              }
            `}
          >
            Вживання
          </button>
        </div>
      </div>

      {/* MEANING TAB */}
      {activeSection === 'meaning' && (
        <div className="animate-in fade-in duration-300">
          {/* Strong's Header */}
          {wordData.strongs && (
            <section className="pt-2 mt-2 border-t border-stone-200/50 first:border-0 first:mt-0 first:pt-0">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Номер Стронга</h3>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-serif font-bold text-primary">{wordData.strongs}</span>
                {wordData.original && (
                  <span className="text-3xl font-serif text-primary" dir="rtl">{wordData.original}</span>
                )}
              </div>
            </section>
          )}

          {/* Semantic Range */}
          {wordData.semanticRange && wordData.semanticRange.length > 0 && (
            <section className="pt-6 mt-6 border-t border-stone-200/50 first:border-0 first:mt-0 first:pt-0">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Семантичний діапазон</h3>
              <div className="leading-[1.4] text-primary text-base">
                {wordData.semanticRange.map((item, i) => (
                  <span key={item} className="inline-block">
                    <span className="font-medium">{item}</span>
                    {wordData.semanticRange && i < wordData.semanticRange.length - 1 && <span className="mx-2 text-muted">•</span>}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Lexical Data */}
          <section className="pt-6 mt-6 border-t border-stone-200/50 first:border-0 first:mt-0 first:pt-0">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Лексичні дані</h3>
            <div className="space-y-2">
              {wordData.original && (
                <div className="grid grid-cols-[140px_1fr] gap-2 text-sm items-baseline">
                  <span className="text-muted">Оригінальне слово:</span>
                  <span className="font-medium text-primary text-left" dir="rtl">{wordData.original}</span>
                </div>
              )}
              <div className="grid grid-cols-[140px_1fr] gap-2 text-sm items-baseline">
                <span className="text-muted">Частина мови:</span>
                <span className="font-medium text-primary">{wordData.partOfSpeech}</span>
              </div>
              {wordData.transliteration && (
                <div className="grid grid-cols-[140px_1fr] gap-2 text-sm items-baseline">
                  <span className="text-muted">Транслітерація:</span>
                  <span className="font-medium text-primary font-mono text-xs">{wordData.transliteration}</span>
                </div>
              )}
              {wordData.pronunciation && (
                <div className="grid grid-cols-[140px_1fr] gap-2 text-sm items-baseline">
                  <span className="text-muted">Вимова:</span>
                  <span className="font-medium text-primary">{wordData.pronunciation}</span>
                </div>
              )}

              {(wordData.typicalConstruction || wordData.origin) && (
                <>
                  {isDetailsExpanded && (
                    <div className="space-y-2 animate-in slide-in-from-top-2 duration-300 fade-in">
                      {wordData.typicalConstruction && (
                        <div className="grid grid-cols-[140px_1fr] gap-2 text-sm items-baseline">
                          <span className="text-muted">Типова конструкція:</span>
                          <span className="font-medium text-primary text-left">
                            <span dir="rtl">{wordData.typicalConstruction.split('+')[0].trim()}</span>
                            {' + '}
                            {wordData.typicalConstruction.split('+')[1]?.trim() || ''}
                          </span>
                        </div>
                      )}
                      {wordData.origin && (
                        <div className="grid grid-cols-[140px_1fr] gap-2 text-sm items-baseline">
                          <span className="text-muted">Походження слова:</span>
                          <button
                            onClick={() => onNavigateToWord && onNavigateToWord(wordData.origin!.transliteration)}
                            className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 flex gap-1 items-baseline hover:text-blue-700 active:text-blue-800 transition-colors"
                          >
                            <span>{wordData.origin.strongs} ({wordData.origin.transliteration})</span>
                            <span dir="rtl" className="text-primary no-underline">{wordData.origin.original}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="pt-1">
                    <button
                      onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                      className="text-xs font-bold text-white bg-blue-500 px-3 py-1.5 rounded-full inline-block transition-colors hover:bg-blue-600 active:bg-blue-700"
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
            <section className="pt-6 mt-6 border-t border-stone-200/50 first:border-0 first:mt-0 first:pt-0">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Лексичний інсайт</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-primary text-sm">Означає:</span>
                    <p className="text-base text-muted mt-1 leading-[1.4]">{wordData.definition}</p>
                  </div>
                </div>
                {wordData.notDefinition && (
                  <div className="flex gap-3">
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-primary text-sm">Не означає:</span>
                      <p className="text-base text-muted mt-1 leading-[1.4]">{wordData.notDefinition}</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      )}

      {/* USAGE TAB */}
      {activeSection === 'usage' && (
        <div className="animate-in fade-in duration-300">
          {/* Concordance */}
          {hasMoreUsages ? (
            <section className="pt-2 mt-2 border-t border-stone-200/50 first:border-0 first:mt-0 first:pt-0">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
                {getUsageLabel(displayedUsages.length)}
              </h3>
              <div className="space-y-3">
                {displayedUsages.map((u, i) => (
                  <div key={i} className="pb-4 mt-4 border-b border-stone-200/50 last:border-0 first:mt-0">
                    <p className="text-xs font-bold text-muted mb-1">{u.ref}</p>
                    <p className="text-primary leading-[1.4] text-base">
                      {renderHighlightedText(u.text)}
                    </p>
                  </div>
                ))}


              </div>
            </section>
          ) : (
            <div className="pt-8 text-center text-muted flex flex-col items-center justify-center">
              <p className="text-base opacity-70">Немає збережених вживань для цього слова.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};