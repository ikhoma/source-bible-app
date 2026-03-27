import { useTheme } from './ThemeProvider';

export const dictionaries = {
  ua: {
    // Navigation
    'nav.bible': 'Біблія',
    'nav.notes': 'Нотатки',
    'nav.settings': 'Налаштування',

    // Settings
    'settings.title': 'Налаштування',
    'settings.appearance': 'Вигляд',
    'settings.theme': 'Тема',
    'settings.theme.dark': 'Темна',
    'settings.theme.light': 'Світла',
    'settings.font': 'Шрифт',
    'settings.font.modern': 'Сучасний',
    'settings.font.classic': 'Класичний',
    'settings.language': 'Мова',
    'settings.language.ua': 'Українська',
    'settings.language.en': 'English',

    // Bottom Sheet & Action Bar
    'sheet.verse': 'Вірш',
    'sheet.word': 'Слово',
    'action.highlight': 'Відмітити',
    'action.note': 'Нотатка',
    'action.share': 'Поділитись',

    // Bible Reference
    'bible.book1': 'Книга Перша',
    'bible.psalm': 'Псалом',

    // Search
    'search.title': 'Пошук',
    'search.keyword': 'За словом',
    'search.smart': 'Розумний пошук',
    'search.placeholder.keyword': 'Пошук слова...',
    'search.placeholder.ai': 'Запитайте про ідею...',
    'search.listening': 'Слухаю...',
    'search.no_support': 'Ваш браузер не підтримує голосове введення.',
    'search.empty': 'Нічого не знайдено',
    'search.ask_ideas': 'Запитайте про ідеї',
    'search.ask_hint': 'Спробуйте: «Де говориться про успіх?», «Що сказано про нечестивих?», або натисніть мікрофон.',
    'search.ai_answer': 'AI Відповідь',
    'search.found_verses': 'Знайдені вірші',

    // Study
    'study.no_info': 'Інформація відсутня',
    'study.no_word_info': 'Для цього слова ще немає детального розбору.',
    'study.parallels': 'Паралельні',
    'study.translations': 'Переклади',
    'study.original': 'Оригінал',
    'study.commentary': 'Коментарі',
    'study.word.meaning': 'Значення',
    'study.word.usage': 'Вживання',
    'study.word.strongs': 'Номер Стронга',
    'study.word.semantic_range': 'Семантичний діапазон',
    'study.word.lexical': 'Лексичні дані',
    'study.word.original': 'Оригінальне слово:',
    'study.word.pos': 'Частина мови:',
    'study.word.transliteration': 'Транслітерація:',
    'study.word.pronunciation': 'Вимова:',
    'study.word.typical_construction': 'Типова конструкція:',
    'study.word.origin': 'Походження слова:',
    'study.word.expand': 'Детальніше',
    'study.word.collapse': 'Згорнути',
    'study.word.insight': 'Лексичний інсайт',
    'study.word.means': 'Означає:',
    'study.word.not_means': 'Не означає:',
    'study.word.no_usage': 'Немає збережених вживань для цього слова.',
    'study.word.usages_count_1': 'ВЖИВАННЯ СЛОВА',
    'study.word.usages_count_many': 'ВЖИВАНЬ СЛОВА',
    'study.notes_dev': 'Нотатки (в розробці)'
  },
  en: {
    // Navigation
    'nav.bible': 'Bible',
    'nav.notes': 'Notes',
    'nav.settings': 'Settings',

    // Settings
    'settings.title': 'Settings',
    'settings.appearance': 'Appearance',
    'settings.theme': 'Theme',
    'settings.theme.dark': 'Dark',
    'settings.theme.light': 'Light',
    'settings.font': 'Font',
    'settings.font.modern': 'Modern',
    'settings.font.classic': 'Classic',
    'settings.language': 'Language',
    'settings.language.ua': 'Українська',
    'settings.language.en': 'English',

    // Bottom Sheet & Action Bar
    'sheet.verse': 'Verse',
    'sheet.word': 'Word',
    'action.highlight': 'Highlight',
    'action.note': 'Note',
    'action.share': 'Share',

    // Bible Reference
    'bible.book1': 'Book I',
    'bible.psalm': 'Psalm',

    // Search
    'search.title': 'Search',
    'search.keyword': 'Keyword',
    'search.smart': 'Smart Search',
    'search.placeholder.keyword': 'Search word...',
    'search.placeholder.ai': 'Ask about an idea...',
    'search.listening': 'Listening...',
    'search.no_support': 'Your browser does not support voice input.',
    'search.empty': 'Nothing found',
    'search.ask_ideas': 'Ask about ideas',
    'search.ask_hint': "Try: 'Where does it speak of success?', 'What is said about the wicked?', or press the microphone.",
    'search.ai_answer': 'AI Answer',
    'search.found_verses': 'Found verses',

    // Study
    'study.no_info': 'No information available',
    'study.no_word_info': 'There is no detailed breakdown for this word yet.',
    'study.parallels': 'Parallels',
    'study.translations': 'Translations',
    'study.original': 'Original',
    'study.commentary': 'Commentary',
    'study.word.meaning': 'Meaning',
    'study.word.usage': 'Usage',
    'study.word.strongs': "Strong's Number",
    'study.word.semantic_range': 'Semantic Range',
    'study.word.lexical': 'Lexical Data',
    'study.word.original': 'Original word:',
    'study.word.pos': 'Part of speech:',
    'study.word.transliteration': 'Transliteration:',
    'study.word.pronunciation': 'Pronunciation:',
    'study.word.typical_construction': 'Typical construction:',
    'study.word.origin': 'Word origin:',
    'study.word.expand': 'Expand',
    'study.word.collapse': 'Collapse',
    'study.word.insight': 'Lexical Insight',
    'study.word.means': 'Means:',
    'study.word.not_means': 'Does not mean:',
    'study.word.no_usage': 'No saved usages for this word.',
    'study.word.usages_count_1': 'WORD USAGE',
    'study.word.usages_count_many': 'WORD USAGES',
    'study.notes_dev': 'Notes (in development)'
  }
};

export type TranslationKey = keyof typeof dictionaries['ua'];

export const useTranslation = () => {
  const { language } = useTheme();

  return (key: TranslationKey): string => {
    return dictionaries[language][key] || dictionaries['ua'][key] || key;
  };
};
