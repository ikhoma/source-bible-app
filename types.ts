
export interface VerseToken {
  id: string; // unique internal id for the group (e.g. "v1-t0")
  text: string; // The full display text of the group (e.g. "і не стоїть ")
  anchorKey?: string; // The key for WORD_STUDY_DB (e.g. "стоїть")
}

export interface Verse {
  id: number;
  book: string;
  chapter: number;
  text: string; // Kept for Verse Study display
  tokens: VerseToken[]; // Structured data for interaction
}

export interface WordData {
  id: string; 
  text: string;
  cleanText: string; 
  strongs?: string;
  lemma?: string;
}

export type SelectionType = 'word' | 'verse' | null;

export interface SelectionCoordinates {
  x: number;
  y: number;
  yTop: number; 
}

export interface SelectionState {
  type: SelectionType;
  id: string | number | null; 
  text: string; // Display text of the selection
  dataKey?: string; // The anchor key for DB lookup (e.g. "блаженний")
  coordinates?: SelectionCoordinates | null;
}

export enum Tab {
  Verse = 'VERSE',
  Word = 'WORD'
}

export type NavTab = 'bible' | 'notes' | 'menu';

export interface WordStudyData {
  strongs?: string;
  original?: string;
  transliteration?: string;
  pronunciation?: string;
  partOfSpeech: string;
  semanticRange?: string[];
  definition?: string;
  notDefinition?: string;
  usages?: { ref: string; text: string }[];
  typicalConstruction?: string;
  origin?: {
    strongs: string;
    transliteration: string;
    original: string;
  };
  isFunctional?: boolean; 
}

export interface OriginalToken {
  original: string;
  transliteration: string;
  strongs: string;
  gloss: string;
  morphology?: string; // e.g. "Noun masc. plur."
  refKey?: string; // Key to open WordStudy
}

export interface VerseStudyData {
  verseId: number;
  parallels: string[];
  translations: { name: string; text: string }[];
  commentaries: { 
    author: string; 
    title: string; 
    image: string;
    subtitle?: string;
    preview?: string;
    body?: string;
  }[];
  originalTokens?: OriginalToken[];
}

export interface InductiveStudyData {
  observationPoints: string[];
  wordInsights: { word: string; original: string; text: string; refKey?: string }[];
  interpretationPoints: string[];
  applicationQuestions: string[];
  groupQuestions: string[];
}