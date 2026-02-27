import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { VERSE_STUDY_DB, PARALLEL_VERSES_DATA, WORD_STUDY_DB } from '../../constants';
import { ActionButton } from '../ui/ActionButton';
import { useScrollToTop } from '../BottomSheet';

import crossRefsEn from '../../data/cross-references.json';
import crossRefsUk from '../../data/cross-references-ukrainian.json';
import commentaryHenry from '../../data/commentary-henry.json';
import commentaryCalvin from '../../data/commentary-calvin.json';
import commentarySpurgeon from '../../data/commentary-spurgeon.json';
import ReactMarkdown from 'react-markdown';

type CrossRefsUkData = Record<string, { reference: string, fullText: string }>;

interface VerseStudyContentProps {
  verseId?: number;
  onOpenWord: (key: string) => void;
}

export const VerseStudyContent: React.FC<VerseStudyContentProps> = ({
  verseId = 1,
  onOpenWord
}) => {
  type SectionTab = 'crossRefs' | 'commentary' | 'translations' | 'original';

  const data = VERSE_STUDY_DB[verseId];
  const [activeSection, setActiveSection] = useState<SectionTab>('crossRefs');
  const [activeParallel, setActiveParallel] = useState<string | null>(null);
  const [commentaryMode, setCommentaryMode] = useState<'list' | 'detail'>('list');
  const [activeCommentaryIndex, setActiveCommentaryIndex] = useState<number | null>(null);

  const scrollToTop = useScrollToTop();

  useEffect(() => {
    scrollToTop();
  }, [activeSection, verseId, scrollToTop]);

  useEffect(() => {
    // Reset parallel state when verse changes
    setActiveParallel(null);

    // Safety check: if active commentary index is out of bounds for the new verse, reset it
    if (activeCommentaryIndex !== null && (!data || !data.commentaries || activeCommentaryIndex >= data.commentaries.length)) {
      setCommentaryMode('list');
      setActiveCommentaryIndex(null);
    }
  }, [verseId, data, activeCommentaryIndex]);

  if (!data) return <div className="p-8 text-center text-muted">Інформація відсутня</div>;

  const verseRefsInfo = (crossRefsEn.verses as Record<string, any>)[verseId.toString()];
  const currentRefs = verseRefsInfo ? verseRefsInfo.crossReferences : (data.parallels || []);
  const ukData = crossRefsUk as CrossRefsUkData;

  type CommentaryMeta = typeof data.commentaries[number];

  const CommentaryHeader: React.FC<{ item: CommentaryMeta }> = ({ item }) => (
    <div className="flex items-start gap-3">
      <img
        src={item.image}
        alt={item.title}
        className="w-10 h-10 rounded-full shadow-sm object-cover bg-stone-200"
      />
      <div>
        <h4 className="font-semibold text-primary text-sm leading-tight mb-0.5">
          {item.author}
        </h4>
        <p className="text-[11px] text-muted">
          {item.title}
          {item.subtitle ? ` • ${item.subtitle}` : ''}
        </p>
      </div>
    </div>
  );

  const handleParallelClick = (ref: string) => {
    setActiveParallel(ref);
  };

  // Reusable row component for Translations and Parallel Places
  const ReferenceRow: React.FC<{
    title: string;
    text: string;
    onClick?: () => void;
  }> = ({ title, text, onClick }) => (
    <div className="group" onClick={onClick}>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs font-bold text-muted">{title}</span>
        <ChevronRight size={14} className="text-muted group-hover:text-muted transition-colors" />
      </div>
      <p className="text-primary leading-relaxed text-[15px]">{text}</p>
      <div className="h-[1px] bg-stone-200 mt-4" />
    </div>
  );

  const UK_BOOK_NAMES: Record<string, string> = {
    'Genesis': 'Буття',
    'Joshua': 'Ісуса Навина',
    'Leviticus': 'Левит',
    'Deuteronomy': 'Повторення Закону',
    'Job': 'Йов',
    'Psalm': 'Псалми',
    'Psalms': 'Псалми',
    'Proverbs': 'Приповісті',
    'Isaiah': 'Ісая',
    'Jeremiah': 'Єремія',
    'Ezekiel': 'Єзекіїль',
    'Daniel': 'Даниїл',
    'Hosea': 'Осія',
    'Malachi': 'Малахії',
    'Matthew': 'Матвія',
    'Luke': 'Луки',
    'John': 'Івана',
    'Romans': 'Римлян',
    '1 Corinthians': '1 Коринтян',
    '2 Corinthians': '2 Коринтян',
    'Galatians': 'Галатів',
    'Ephesians': 'Ефесян',
    'Colossians': 'Колоссян',
    '2 Thessalonians': '2 Солунян',
    '1 Timothy': '1 Тимофію',
    '2 Timothy': '2 Тимофію',
    '1 Peter': '1 Петра',
    'James': 'Якова',
    '1 John': '1 Івана',
    'Revelation': 'Об\'явлення',
  };

  function translateReferenceTitle(ref: string): string {
    const match = ref.match(/^(\d?\s?[A-Za-z]+)\s+(.+)$/);
    if (!match) return ref;
    const book = match[1].trim();
    const rest = match[2];
    const translatedBook = UK_BOOK_NAMES[book] || book;
    return `${translatedBook} ${rest}`;
  }

  return (
    <div className="pb-24 px-4 animate-in fade-in duration-300">
      {/* Section Pills (Cross-Refs / Commentary / Translations / Original) */}
      <div className="sticky top-0 z-20 bg-stone-100 -mx-4 pt-2 pb-4 font-sans border-b border-stone-200 shadow-sm">
        <div className="flex overflow-x-auto no-scrollbar gap-2 px-4">
          <button
            onClick={() => setActiveSection('crossRefs')}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 border
              ${activeSection === 'crossRefs'
                ? 'bg-[#CFCBC9] text-primary border-[#C5C2BE] dark:bg-stone-300 dark:text-primary dark:border-stone-400'
                : 'bg-stone-200 text-muted hover:bg-stone-300 active:scale-95 border-stone-300/50'}
            `}
          >
            Паралельні
          </button>
          <button
            onClick={() => setActiveSection('translations')}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 border
              ${activeSection === 'translations'
                ? 'bg-[#CFCBC9] text-primary border-[#C5C2BE] dark:bg-stone-300 dark:text-primary dark:border-stone-400'
                : 'bg-stone-200 text-muted hover:bg-stone-300 active:scale-95 border-stone-300/50'}
            `}
          >
            Переклади
          </button>
          <button
            onClick={() => setActiveSection('original')}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 border
              ${activeSection === 'original'
                ? 'bg-[#CFCBC9] text-primary border-[#C5C2BE] dark:bg-stone-300 dark:text-primary dark:border-stone-400'
                : 'bg-stone-200 text-muted hover:bg-stone-300 active:scale-95 border-stone-300/50'}
            `}
          >
            Оригінал
          </button>
          <button
            onClick={() => setActiveSection('commentary')}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 border
              ${activeSection === 'commentary'
                ? 'bg-[#CFCBC9] text-primary border-[#C5C2BE] dark:bg-stone-300 dark:text-primary dark:border-stone-400'
                : 'bg-stone-200 text-muted hover:bg-stone-300 active:scale-95 border-stone-300/50'}
            `}
          >
            Коментарі
          </button>
        </div>
      </div>

      {/* CROSS-REFS TAB */}
      {activeSection === 'crossRefs' && (
        <section className="pt-4">
          <div className="space-y-4">
            {currentRefs.map((ref: string) => {
              const ukText = ukData[ref]?.fullText;
              const fallbackText = PARALLEL_VERSES_DATA[ref] || "Текст вірша...";
              const displayTitle = translateReferenceTitle(ref);

              // Remove standalone verse numbers (like "12.", "15", or "6\n7")
              let displayText = ukText || fallbackText;
              displayText = displayText
                .split(/\s+/)
                .filter(word => !/^\d+\.?$/.test(word))
                .join(' ')
                .trim();

              return (
                <ReferenceRow
                  key={ref}
                  title={displayTitle}
                  text={displayText}
                  onClick={() => handleParallelClick(ref)}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* COMMENTARY TAB */}
      {activeSection === 'commentary' && (
        <section className="relative min-h-[220px]">
          {/* List view */}
          <div
            className={`
              transition-all duration-300
              ${commentaryMode === 'list'
                ? 'opacity-100 translate-x-0 relative'
                : 'opacity-0 -translate-x-4 pointer-events-none absolute inset-0'}
            `}
          >
            <div className="divide-y divide-stone-200">
              {data.commentaries.map((c, idx) => (
                <button
                  key={c.author}
                  onClick={() => {
                    setActiveCommentaryIndex(idx);
                    setCommentaryMode('detail');
                  }}
                  className="w-full text-left py-4 group"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between w-full">
                      <CommentaryHeader item={c} />
                      <ChevronRight size={18} className="text-muted group-hover:text-muted transition-colors shrink-0" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail view */}
          <div
            className={`
              transition-all duration-300
              ${commentaryMode === 'detail'
                ? 'opacity-100 translate-x-0 relative'
                : 'opacity-0 translate-x-4 pointer-events-none absolute inset-0'}
            `}
          >
            {commentaryMode === 'detail' && activeCommentaryIndex !== null && data.commentaries[activeCommentaryIndex] && (
              <div className="pt-0">
                <div className="sticky top-[57px] -mx-4 px-4 bg-stone-100 z-10 py-3 mb-2 border-b border-stone-200 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setCommentaryMode('list');
                      setActiveCommentaryIndex(null);
                    }}
                    className="flex items-center gap-3 w-full text-left group"
                  >
                    <div className="p-1.5 -ml-1.5 rounded-full transition-colors text-muted group-hover:text-primary bg-transparent group-hover:bg-stone-50 shrink-0">
                      <ChevronLeft size={24} />
                    </div>

                    <CommentaryHeader item={data.commentaries[activeCommentaryIndex]} />
                  </button>
                </div>

                <div className="text-[15px] leading-relaxed text-primary space-y-3 mt-2">
                  {['Меттью Генрі', 'Жан Кальвін', 'Чарльз Сперджен'].includes(data.commentaries[activeCommentaryIndex].author) ? (
                    <div className="space-y-4">
                      <ReactMarkdown
                        components={{
                          p: ({ node, ...props }) => <p className="mb-3 leading-relaxed" {...props} />,
                          ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-3 space-y-2" {...props} />,
                          ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-3 space-y-2" {...props} />,
                          li: ({ node, ...props }) => <li {...props} />,
                          strong: ({ node, ...props }) => {
                            const textStr = Array.isArray(props.children) ? props.children.join('') : String(props.children);
                            const isHeadingRegex = /^(вірш|вірші|стих|стихи|аргумент|вступ|заголовок|композиція|псалом)(?:\s|$)/i;
                            const isRomanNumeralHeading = /^[IVX]+\.\s/i.test(textStr);
                            const isHeading = isHeadingRegex.test(textStr) || isRomanNumeralHeading;

                            if (isHeading) {
                              return <strong className="block mt-4 text-xs font-bold text-muted mb-2" {...props} />;
                            }
                            return <strong className="font-semibold text-primary" {...props} />;
                          },
                          em: ({ node, ...props }) => <em className="italic text-muted" {...props} />,
                          hr: ({ node, ...props }) => <hr className="my-6 border-stone-200" {...props} />
                        }}
                      >
                        {(() => {
                          const author = data.commentaries[activeCommentaryIndex].author;
                          const commentarySource =
                            author === 'Жан Кальвін' ? commentaryCalvin :
                              author === 'Чарльз Сперджен' ? commentarySpurgeon :
                                commentaryHenry;

                          let parts = [];
                          if (verseId === 1) {
                            const intro = commentarySource.sections.find(s => s.id === 'intro');
                            if (intro) parts.push(intro.content_md);
                          }
                          const section = commentarySource.sections.find((s: any) => s.verses?.includes(verseId));
                          if (section) parts.push(section.content_md);

                          return parts.length > 0 ? parts.join('\n\n---\n\n') : data.commentaries[activeCommentaryIndex].body;
                        })()}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    (data.commentaries[activeCommentaryIndex].body || data.commentaries[activeCommentaryIndex].preview || '')
                      .split('\n\n')
                      .map((para, i) => (
                        <p key={i}>{para}</p>
                      ))
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* TRANSLATIONS TAB */}
      {activeSection === 'translations' && (
        <section className="pt-4">
          <div className="space-y-4">
            {data.translations.map((t) => (
              <ReferenceRow
                key={t.name}
                title={t.name}
                text={t.text}
              />
            ))}
          </div>
        </section>
      )}

      {/* ORIGINAL LANGUAGE TAB */}
      {activeSection === 'original' && data.originalTokens && (
        <section className="pt-4">
          <div className="space-y-4">
            {data.originalTokens.map((token, idx) => {
              const wordData = token.refKey ? (WORD_STUDY_DB[token.refKey] || null) : null;

              return (
                <div
                  key={idx}
                  className={`
                    group rounded-xl p-4 border border-stone-300/50 bg-transparent transition-colors text-left
                    ${token.refKey ? 'active:bg-stone-100 cursor-pointer' : ''}
                  `}
                  onClick={() => token.refKey && onOpenWord(token.refKey)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      {/* Token Header */}
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="text-2xl font-serif text-primary" dir="rtl">{token.original}</span>
                        <span className="text-sm text-muted font-mono tracking-tight">{token.transliteration}</span>
                      </div>

                      {/* Morphology */}
                      {token.morphology && (
                        <div className="mb-2 text-xs font-medium text-muted">
                          {token.morphology}
                        </div>
                      )}
                    </div>

                    {/* Strong's */}
                    <div className="shrink-0 mt-1">
                      <ActionButton
                        label={`Стронга ${token.strongs}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (token.refKey) onOpenWord(token.refKey);
                        }}
                      />
                    </div>
                  </div>

                  {/* Extended Definition */}
                  <div className="text-sm leading-relaxed text-primary border-t border-stone-300/50 pt-3 mt-1">
                    {/* Primary Gloss */}
                    <p className="font-semibold mb-1">{token.gloss}</p>

                    {/* Lexical Data */}
                    {wordData && wordData.definition ? (
                      <p className="text-muted font-normal leading-relaxed mt-1">
                        {wordData.definition}
                      </p>
                    ) : (
                      <p className="text-muted text-xs mt-1 italic">
                        Детального розбору ще немає.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};