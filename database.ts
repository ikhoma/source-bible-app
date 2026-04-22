import initSqlJs, { Database, SqlJsStatic } from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';

let SQL: SqlJsStatic | null = null;
const dbCache: Record<string, Database> = {};

export interface DbBook {
  book_number: number;
  short_name: string;
  long_name: string;
  book_color: string;
}

export interface DbVerse {
  book_number: number;
  chapter: number;
  verse: number;
  text: string;
}

export interface CrossReference {
  book: number;
  chapter: number;
  verse: number;
  verse_end: number;
  book_to: number;
  chapter_to: number;
  verse_to_start: number;
  verse_to_end: number;
  votes: number;
}

export async function initSql() {
  if (!SQL) {
    SQL = await initSqlJs({
      locateFile: () => sqlWasmUrl
    });
  }
  return SQL;
}

export async function getDb(translation: string): Promise<Database> {
  const sql = await initSql();
  if (!dbCache[translation]) {
    const response = await fetch(`/bible/${translation}/${translation}.SQLite3`);
    if (!response.ok) {
      throw new Error(`Failed to load database for translation ${translation}`);
    }
    const buffer = await response.arrayBuffer();
    dbCache[translation] = new sql.Database(new Uint8Array(buffer));
  }
  return dbCache[translation];
}

export async function getCommentariesDb(translation: string): Promise<Database | null> {
  const sql = await initSql();
  const cacheKey = `${translation}_commentaries`;
  if (dbCache[cacheKey] === undefined) {
    try {
      const response = await fetch(`/bible/${translation}/${translation}.commentaries.SQLite3`);
      if (!response.ok) {
        dbCache[cacheKey] = null as any; // Store null to prevent refetching
        return null;
      }
      const buffer = await response.arrayBuffer();
      dbCache[cacheKey] = new sql.Database(new Uint8Array(buffer));
    } catch {
      dbCache[cacheKey] = null as any;
    }
  }
  return dbCache[cacheKey] || null;
}

export async function getCrossReferencesDb(): Promise<Database> {
  const sql = await initSql();
  if (!dbCache['crossreferences']) {
    const response = await fetch(`/bible/GRM/GRM.crossreferences.SQLite3`);
    if (!response.ok) {
      throw new Error(`Failed to load crossreferences database`);
    }
    const buffer = await response.arrayBuffer();
    dbCache['crossreferences'] = new sql.Database(new Uint8Array(buffer));
  }
  return dbCache['crossreferences'];
}

export async function getBooks(translation: string): Promise<DbBook[]> {
  const db = await getDb(translation);
  const stmt = db.prepare('SELECT book_number, short_name, long_name, book_color FROM books');
  const books: DbBook[] = [];
  while (stmt.step()) {
    const row = stmt.getAsObject();
    books.push(row as unknown as DbBook);
  }
  stmt.free();
  return books;
}

export async function getChaptersData(translation: string, bookNumber: number): Promise<number[]> {
  const db = await getDb(translation);
  const stmt = db.prepare('SELECT DISTINCT chapter FROM verses WHERE book_number = $bookNumber ORDER BY chapter');
  stmt.bind({ $bookNumber: bookNumber });
  const chapters: number[] = [];
  while (stmt.step()) {
    const row = stmt.getAsObject();
    chapters.push(row.chapter as number);
  }
  stmt.free();
  return chapters;
}

export async function getVerses(translation: string, bookNumber: number, chapter: number): Promise<DbVerse[]> {
  const db = await getDb(translation);
  const stmt = db.prepare('SELECT book_number, chapter, verse, text FROM verses WHERE book_number = $bookNumber AND chapter = $chapter ORDER BY verse');
  stmt.bind({ $bookNumber: bookNumber, $chapter: chapter });
  const verses: DbVerse[] = [];
  while (stmt.step()) {
    const row = stmt.getAsObject();
    verses.push(row as unknown as DbVerse);
  }
  stmt.free();
  return verses;
}

export async function getCrossReferencesList(book: number, chapter: number, verse: number): Promise<CrossReference[]> {
  const db = await getCrossReferencesDb();
  const stmt = db.prepare('SELECT * FROM cross_references WHERE book = $book AND chapter = $chapter AND verse = $verse ORDER BY votes DESC');
  stmt.bind({ $book: book, $chapter: chapter, $verse: verse });
  const refs: CrossReference[] = [];
  while (stmt.step()) {
    const row = stmt.getAsObject();
    refs.push(row as unknown as CrossReference);
  }
  stmt.free();
  return refs;
}

export async function getCrossReferenceText(translation: string, ref: CrossReference): Promise<string> {
  const db = await getDb(translation);
  const stmt = db.prepare(`SELECT text FROM verses WHERE book_number = $book AND chapter = $chapter AND verse >= $start AND verse <= $end ORDER BY verse`);
  stmt.bind({ 
    $book: ref.book_to, 
    $chapter: ref.chapter_to, 
    $start: ref.verse_to_start, 
    $end: ref.verse_to_end || ref.verse_to_start 
  });
  
  let combined = [];
  while (stmt.step()) {
    const row = stmt.getAsObject();
    combined.push(row.text as string);
  }
  stmt.free();
  return combined.join(' ');
}

export async function getFootnoteText(translation: string, bookNumber: number, chapter: number, verse: number, marker: string): Promise<string | null> {
  const db = await getCommentariesDb(translation);
  if (!db) return null;
  
  // Note: we might need to remove parentheses from marker if they are passed.
  // Example: if marker is "(1)", SQLite matches it if it was saved like that, but usually it's just "1".
  const cleanMarker = marker.replace(/[\(\)]/g, '').trim();

  const stmt = db.prepare(`SELECT text FROM commentaries WHERE book_number = $book AND chapter_number_from = $chapter AND verse_number_from = $verse AND marker = $marker LIMIT 1`);
  stmt.bind({
    $book: bookNumber,
    $chapter: chapter,
    $verse: verse,
    $marker: cleanMarker
  });
  
  let text = null;
  if (stmt.step()) {
    const row = stmt.getAsObject();
    text = row.text as string;
  }
  stmt.free();
  return text;
}
