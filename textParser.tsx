import React from 'react';
import { Verse, Token } from './types';
import { DbVerse } from './database';

/**
 * Parses raw MyBible text into an array of React elements or strings.
 * Handles Strong's numbers <S>1234</S>, paragraph breaks <pb/>, and italics <i>...</i>
 */
export const parseVerseText = (
  rawText: string,
  verseId?: number,
  onFootnoteClick?: (marker: string, event: React.MouseEvent, verseId: number) => void
) => {
  if (!rawText) return [];

  // Replace <pb/> with a specific delimiter or just br
  // MyBible sometimes has <e>... </e> or <f>...</f> 
  // A regex that matches <S>number</S>, <pb/>, <i>...</i>, <t>...</t> and <f>...</f> (with fallbacks for typos like ›)
  const regex = /(<[Ss]>\s*\d+\s*<\/[Ss]>)|(<pb\/>)|(<i>.*?<\/i>)|(<t>.*?<\/t>)|(<[Ff][^>›]*[>›].*?<\/[Ff][>›]?)/g;
  
  const parts = rawText.split(regex).filter(p => p !== undefined && p !== '');

  return parts.map((part, index) => {
    if (part === '<pb/>') {
      return <br key={`pb-${index}`} className="mb-2 block content-['']" />;
    }
    
    if (/^<[Ss]>/.test(part)) {
      const number = part.replace(/^<[Ss]>\s*/, '').replace(/\s*<\/[Ss]>$/, '');
      return (
        <span 
          key={`strong-${index}`} 
          className="text-[10px] text-muted align-super ml-0.5 cursor-default select-none pointer-events-none"
        >
          {number}
        </span>
      );
    }

    if (/^<[Ff][^>›]*[>›]/.test(part)) {
      const marker = part.replace(/^<[Ff][^>›]*[>›]/, '').replace(/<\/[Ff][>›]?$/, '');
      return (
        <sup 
          key={`f-${index}`} 
          className="text-blue-500 font-bold ml-0.5 cursor-pointer hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            if (onFootnoteClick && verseId !== undefined) {
              onFootnoteClick(marker, e, verseId);
            }
          }}
        >
          {marker}
        </sup>
      );
    }

    if (part.startsWith('<i>') && part.endsWith('</i>')) {
      return <i key={`i-${index}`}>{part.slice(3, -4)}</i>;
    }

    if (part.startsWith('<t>') && part.endsWith('</t>')) {
      // Typically words added by translators
      return <span key={`t-${index}`} className="text-muted/80 italic">{part.slice(3, -4)}</span>;
    }

    // Normal text
    // Replace non-breaking spaces or handle words.
    // For Word-level interactivity (that already exists in the app), 
    // the previous logic separated by spaces and created token spans.
    // We will leave the text as is here, and the BibleText component 
    // will need to adapt to wrapped components.
    return part;
  });
};

/**
 * Helper to generate simple word tokens if needed
 */
export const generateTokensFromDbVerse = (verse: DbVerse): Verse => {
  // To keep compatibility with the existing Token system used in `BibleText` and `constants.ts`
  // We can roughly tokenize everything, but since Strong tags should go with the preceding word,
  // we do a naive pass.
  
  const tokens: Token[] = [];
  
  // Here we just attach the raw text to a single token for simplicity if we don't need word-level study right now,
  // OR we can split by spaces and preserve tags.
  // The user said: "Поки що не клікабельні. Там цілі слова клікабельні зараз."
  // So we split text by space. But wait, if we have "God<S>430</S>", it's a single "word" for splitting by space.

  const words = verse.text.split(/(\s+)/); // split but keep spaces
  
  words.forEach((w, idx) => {
    if (!w) return;
    tokens.push({
      id: `v${verse.verse}-t${idx}`,
      text: w,
      anchorKey: w.trim() ? w.replace(/<[^>]+>/g, '').toLowerCase() : undefined // extremely simple anchor
    });
  });

  return {
    id: verse.verse,
    book: '', // will be populated outside
    chapter: verse.chapter,
    text: verse.text,
    tokens
  };
};
