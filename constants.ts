import { Verse, WordStudyData, VerseStudyData, InductiveStudyData } from './types';

// Helper to construct tokens easily
// We iterate manually in the array, but this helper keeps object creation tidy
const t = (v: number, idx: number, text: string, anchorKey?: string) => ({
  id: `v${v}-t${idx}`,
  text,
  anchorKey
});

export const PSALM_1: Verse[] = [
  {
    id: 1,
    book: "Псалом",
    chapter: 1,
    text: "Блаженний муж, який не ходить на раду нечестивих, і не стоїть на шляху грішних, і не сидить у зборищі злорік,",
    tokens: [
      t(1, 0, "Блаженний", "блаженний"), t(1, 1, " "),
      t(1, 2, "муж", "муж"), t(1, 3, ", "),
      t(1, 4, "який", "який"), t(1, 5, " "),
      t(1, 6, "не", "не"), t(1, 7, " "),
      t(1, 8, "ходить", "ходить"), t(1, 9, " "),
      t(1, 10, "на", "на"), t(1, 11, " "),
      t(1, 12, "раду", "раду"), t(1, 13, " "),
      t(1, 14, "нечестивих", "нечестивих"), t(1, 15, ", "),
      t(1, 16, "і", "і"), t(1, 17, " "),
      t(1, 18, "не", "не"), t(1, 19, " "),
      t(1, 20, "стоїть", "стоїть"), t(1, 21, " "),
      t(1, 22, "на", "на"), t(1, 23, " "),
      t(1, 24, "шляху", "шляху"), t(1, 25, " "),
      t(1, 26, "грішних", "грішних"), t(1, 27, ", "),
      t(1, 28, "і", "і"), t(1, 29, " "),
      t(1, 30, "не", "не"), t(1, 31, " "),
      t(1, 32, "сидить", "сидить"), t(1, 33, " "),
      t(1, 34, "у", "у"), t(1, 35, " "),
      t(1, 36, "зборищі", "зборищі"), t(1, 37, " "),
      t(1, 38, "злорік", "злорік"), t(1, 39, ",")
    ]
  },
  {
    id: 2,
    book: "Псалом",
    chapter: 1,
    text: "але в Законі Господнім насолода його, і про Закон Його він розмірковує вдень і вночі!",
    tokens: [
      t(2, 0, "але", "але"), t(2, 1, " "),
      t(2, 2, "в", "в"), t(2, 3, " "),
      t(2, 4, "Законі", "законі"), t(2, 5, " "),
      t(2, 6, "Господнім", "господнім"), t(2, 7, " "),
      t(2, 8, "насолода", "насолода"), t(2, 9, " "),
      t(2, 10, "його", "його"), t(2, 11, ", "),
      t(2, 12, "і", "і"), t(2, 13, " "),
      t(2, 14, "про", "про"), t(2, 15, " "),
      t(2, 16, "Закон", "законі"), t(2, 17, " "),
      t(2, 18, "Його", "його"), t(2, 19, " "),
      t(2, 20, "він", "він"), t(2, 21, " "),
      t(2, 22, "розмірковує", "розмірковує"), t(2, 23, " "),
      t(2, 24, "вдень", "вдень"), t(2, 25, " "),
      t(2, 26, "і", "і"), t(2, 27, " "),
      t(2, 28, "вночі", "вночі"), t(2, 29, "!")
    ]
  },
  {
    id: 3,
    book: "Псалом",
    chapter: 1,
    text: "І буде він, як дерево, посаджене біля потоків вод, що приносить свій плід своєчасно, і листя якого не в'яне, і в усьому, що він робить, матиме успіх!",
    tokens: [
      t(3, 0, "І", "і"), t(3, 1, " "),
      t(3, 2, "буде", "буде"), t(3, 3, " "),
      t(3, 4, "він", "він"), t(3, 5, ", "),
      t(3, 6, "як", "як"), t(3, 7, " "),
      t(3, 8, "дерево", "дерево"), t(3, 9, ", "),
      t(3, 10, "посаджене", "посаджене"), t(3, 11, " "),
      t(3, 12, "біля", "біля"), t(3, 13, " "),
      t(3, 14, "потоків", "потоків"), t(3, 15, " "),
      t(3, 16, "вод", "вод"), t(3, 17, ", "),
      t(3, 18, "що", "що"), t(3, 19, " "),
      t(3, 20, "приносить", "приносить"), t(3, 21, " "),
      t(3, 22, "свій", "свій"), t(3, 23, " "),
      t(3, 24, "плід", "плід"), t(3, 25, " "),
      t(3, 26, "своєчасно", "своєчасно"), t(3, 27, ", "),
      t(3, 28, "і", "і"), t(3, 29, " "),
      t(3, 30, "листя", "листя"), t(3, 31, " "),
      t(3, 32, "якого", "який"), t(3, 33, " "),
      t(3, 34, "не", "не"), t(3, 35, " "),
      t(3, 36, "в'яне", "в'яне"), t(3, 37, ", "),
      t(3, 38, "і", "і"), t(3, 39, " "),
      t(3, 40, "в", "в"), t(3, 41, " "),
      t(3, 42, "усьому", "усьому"), t(3, 43, ", "),
      t(3, 44, "що", "що"), t(3, 45, " "),
      t(3, 46, "він", "він"), t(3, 47, " "),
      t(3, 48, "робить", "робить"), t(3, 49, ", "),
      t(3, 50, "матиме", "матиме"), t(3, 51, " "),
      t(3, 52, "успіх", "успіх"), t(3, 53, "!")
    ]
  },
  {
    id: 4,
    book: "Псалом",
    chapter: 1,
    text: "Не так — нечестиві, вони — мов полова, що вітер розвіває.",
    tokens: [
      t(4, 0, "Не", "не"), t(4, 1, " "),
      t(4, 2, "так", "так"), t(4, 3, " — "),
      t(4, 4, "нечестиві", "нечестивих"), t(4, 5, ", "),
      t(4, 6, "вони", "вони"), t(4, 7, " — "),
      t(4, 8, "мов", "мов"), t(4, 9, " "),
      t(4, 10, "полова", "полова"), t(4, 11, ", "),
      t(4, 12, "що", "що"), t(4, 13, " "),
      t(4, 14, "вітер", "вітер"), t(4, 15, " "),
      t(4, 16, "розвіває", "розвіває"), t(4, 17, ".")
    ]
  },
  {
    id: 5,
    book: "Псалом",
    chapter: 1,
    text: "Тому не встоять нечестиві на суді, й грішні — у зібранні праведних.",
    tokens: [
      t(5, 0, "Тому", "тому"), t(5, 1, " "),
      t(5, 2, "не", "не"), t(5, 3, " "),
      t(5, 4, "встоять", "встоять"), t(5, 5, " "),
      t(5, 6, "нечестиві", "нечестивих"), t(5, 7, " "),
      t(5, 8, "на", "на"), t(5, 9, " "),
      t(5, 10, "суді", "суді"), t(5, 11, ", "),
      t(5, 12, "й", "і"), t(5, 13, " "),
      t(5, 14, "грішні", "грішних"), t(5, 15, " — "),
      t(5, 16, "у", "у"), t(5, 17, " "),
      t(5, 18, "зібранні", "зборищі"), t(5, 19, " "),
      t(5, 20, "праведних", "праведних"), t(5, 21, ".")
    ]
  },
  {
    id: 6,
    book: "Псалом",
    chapter: 1,
    text: "Бо знає Господь путь праведних, а путь нечестивих загине.",
    tokens: [
      t(6, 0, "Бо", "бо"), t(6, 1, " "),
      t(6, 2, "знає", "знає"), t(6, 3, " "),
      t(6, 4, "Господь", "господнім"), t(6, 5, " "),
      t(6, 6, "путь", "путь"), t(6, 7, " "),
      t(6, 8, "праведних", "праведних"), t(6, 9, ", "),
      t(6, 10, "а", "а"), t(6, 11, " "),
      t(6, 12, "путь", "путь"), t(6, 13, " "),
      t(6, 14, "нечестивих", "нечестивих"), t(6, 15, " "),
      t(6, 16, "загине", "загине"), t(6, 17, ".")
    ]
  }
];

export const INDUCTIVE_STUDY_DB: Record<number, InductiveStudyData> = {
  1: {
    observationPoints: [
      "Контраст: праведний ↔ нечестиві",
      "Повтор руху: ходить → стоїть → сидить",
      "Центр псалма: Закон Господній",
      "Образи: дерево ↔ полова",
      "Початок: «блаженний» → кінець: «загине»"
    ],
    wordInsights: [
      { word: "Блаженний", original: "אשרי", text: "стан, не емоція", refKey: "блаженний" },
      { word: "Шлях", original: "דרך", text: "образ життєвого напрямку", refKey: "шляху" },
      { word: "Знає", original: "ידע", text: "не інформативне, а стосункове знання", refKey: "знає" }
    ],
    interpretationPoints: [
      "Псалом описує не типи людей, а два способи життя.",
      "Поведінка — плід, а не причина.",
      "Закон Господній — джерело стабільності.",
      "Суд — неминучий результат обраного шляху."
    ],
    applicationQuestions: [
      "Де я ходжу, стою, сиджу щодня?",
      "Що формує моє мислення вдень і вночі?",
      "Яке «джерело води» живить моє життя?"
    ],
    groupQuestions: [
      "Назви один «потік води» у своєму житті.",
      "Назви один «вітер», який тебе відволікає.",
      "Про що цей псалом попереджає нас сьогодні?"
    ]
  }
};

export const WORD_STUDY_DB: Record<string, WordStudyData> = {
  // --- FUNCTIONAL WORDS / PARTICLES ---
  "який": {
    strongs: "834 (asher)",
    original: "אֲשֶׁר",
    transliteration: "asher",
    partOfSpeech: "Відносний займенник",
    definition: "Який, котрий, що. Вказує на зв'язок між частинами речення.",
    semanticRange: ["який", "що", "де", "коли"]
  },
  "не": {
    strongs: "3808 (lo)",
    original: "לֹא",
    transliteration: "lo",
    partOfSpeech: "Частка",
    definition: "Ні, не. Абсолютне заперечення.",
    semanticRange: ["ні", "не"]
  },
  "і": {
    strongs: "— (ve)",
    original: "וְ",
    transliteration: "ve",
    partOfSpeech: "Сполучник (префікс)",
    definition: "І, та, але. З'єднує слова або речення (Вав-послідовність).",
    semanticRange: ["і", "а", "та"]
  },
  "на": {
    strongs: "5921 (al) / (ba)",
    original: "עַל / בְּ",
    transliteration: "al / ba",
    partOfSpeech: "Прийменник",
    definition: "На, в, при. Вказує на місцезнаходження або напрямок.",
    semanticRange: ["на", "над", "проти"]
  },
  "у": {
    strongs: "— (be)",
    original: "בְּ",
    transliteration: "be",
    partOfSpeech: "Прийменник (префікс)",
    definition: "В, у, всередині.",
    semanticRange: ["в", "у", "серед"]
  },
  "в": {
    strongs: "— (be)",
    original: "בְּ",
    transliteration: "be",
    partOfSpeech: "Прийменник (префікс)",
    definition: "В, у, за допомогою.",
    semanticRange: ["в", "через"]
  },
  "але": {
    strongs: "3588 (ki)",
    original: "כִּי",
    transliteration: "ki",
    partOfSpeech: "Сполучник",
    definition: "Бо, але, тому що. Логічний перехід.",
    semanticRange: ["бо", "але", "якщо"]
  },
  "він": {
    strongs: "1931 (hu)",
    original: "הוּא",
    transliteration: "hu",
    partOfSpeech: "Займенник",
    definition: "Він, той. Вказує на особу.",
    semanticRange: ["він", "той сам"]
  },
  "про": {
    strongs: "—",
    original: "—",
    transliteration: "—",
    partOfSpeech: "Прийменник",
    definition: "Про, відносно. Використовується для позначення теми."
  },
  "його": {
    strongs: "— (suffix)",
    original: "וֹ",
    transliteration: "o",
    partOfSpeech: "Займенник (суфікс)",
    definition: "Його, належність йому.",
    semanticRange: ["його"]
  },

  // --- VERSE 1 ---
  "блаженний": {
    strongs: "835 (esher')",
    original: "אֶשֶׁר",
    transliteration: "esher",
    pronunciation: "EH-sher",
    partOfSpeech: "Іменник, множина (конструкція)",
    semanticRange: ["щастя", "блаженство", "успішний рух вперед"],
    definition: "Вигук, що описує об'єктивний стан благословення та щастя людини.",
    notDefinition: "Матеріальне багатство саме по собі або тимчасова радість.",
    usages: [
      { ref: "Псалми 1:1", text: "Блаженний муж, що за радою несправедливих не ходить..." },
      { ref: "Псалми 32:1", text: "Блаженний, кому прощено переступ, кому прикрито гріх!" },
      { ref: "Псалми 33:12", text: "Блаженний той люд, що Богом у нього Господь..." },
      { ref: "Псалми 41:1", text: "Блаженний, хто дбає про вбогого, в день нещастя Господь порятує його!" },
      { ref: "Псалми 84:5", text: "Блаженна людина, що в Тобі має силу свою, що дороги до Тебе в їхньому серці!" },
      { ref: "Приповісті 8:34", text: "Блаженна людина, яка слухає Мене, щоб пильнувати біля дверей Моїх день-у-день..." }
    ],
    typicalConstruction: "אֲשְׁרֵי + особа",
    origin: {
      strongs: "H833",
      transliteration: "ashar",
      original: "אָשַׁר"
    }
  },
  "муж": {
    strongs: "376 (ish)",
    original: "אִישׁ",
    transliteration: "ish",
    pronunciation: "eesh",
    partOfSpeech: "Іменник чоловічий рід",
    semanticRange: ["чоловік", "особа", "воїн"],
    definition: "Позначає чоловіка як особистість, часто з акцентом на його силу або характер.",
    notDefinition: "Просто «людство» (як adam).",
    usages: [
      { ref: "Буття 2:23", text: "Вона буде зватися жінкою, бо взята від мужа..." },
      { ref: "Йов 1:1", text: "Був муж у землі Уц..." },
    ]
  },
  "ходить": {
    strongs: "1980 (halak)",
    original: "הָלַךְ",
    transliteration: "halak",
    pronunciation: "haw-LAK",
    partOfSpeech: "Дієслово",
    semanticRange: ["іти", "поводитися", "жити"],
    definition: "Буквально означає пересуватися, але часто використовується метафорично для опису способу життя та поведінки.",
    usages: [
      { ref: "Буття 5:24", text: "І ходив Енох з Богом..." },
      { ref: "Псалми 15:2", text: "Той, хто ходить непорочно..." }
    ]
  },
  "раду": {
    strongs: "6098 (etsah)",
    original: "עֵצָה",
    transliteration: "etsah",
    pronunciation: "ay-TSAW",
    partOfSpeech: "Іменник жіночий рід",
    semanticRange: ["порада", "план", "задум"],
    definition: "План дій або спосіб мислення. Означає перейняття світогляду.",
    usages: [
      { ref: "Псалми 33:11", text: "Рада Господня стоїть віки..." },
    ],
    origin: {
      strongs: "H3289",
      transliteration: "yaats",
      original: "יָעַץ"
    }
  },
  "нечестивих": {
    strongs: "7563 (rasha)",
    original: "רָשָׁע",
    transliteration: "rasha",
    pronunciation: "raw-SHAW",
    partOfSpeech: "Прикметник",
    semanticRange: ["злочинець", "винний", "нестабільний"],
    definition: "Морально нестабільний, той, хто активно порушує Божий порядок.",
    usages: [
      { ref: "Ісая 57:20", text: "А нечестиві — як море розбурхане..." },
    ],
    origin: {
      strongs: "H7561",
      transliteration: "rasha",
      original: "רָשַׁע"
    }
  },
  "стоїть": {
    strongs: "5975 (amad)",
    original: "עָמַד",
    transliteration: "amad",
    pronunciation: "aw-MAD",
    partOfSpeech: "Дієслово",
    semanticRange: ["стояти", "залишатися", "бути стійким"],
    definition: "Займати позицію. Вказує на більш сталу участь у чомусь, ніж «ходити».",
    usages: [
      { ref: "Псалми 130:3", text: "Хто встоїть, Господи?" }
    ]
  },
  "шляху": {
    strongs: "1870 (derek)",
    original: "דֶּרֶךְ",
    transliteration: "derek",
    pronunciation: "DEH-rek",
    partOfSpeech: "Іменник чоловічий рід",
    semanticRange: ["дорога", "шлях", "спосіб життя"],
    definition: "Протоптана стежка. Метафорично — звичний спосіб життя або поведінки.",
    usages: [
      { ref: "Псалми 119:1", text: "Блаженні непорочні в дорозі..." }
    ],
    origin: {
      strongs: "H1869",
      transliteration: "darak",
      original: "דָּרַךְ"
    }
  },
  "грішних": {
    strongs: "2400 (chatta)",
    original: "חַטָּא",
    transliteration: "chatta",
    pronunciation: "khat-TAW",
    partOfSpeech: "Іменник",
    semanticRange: ["грішник", "той, хто хибить"],
    definition: "Той, хто збивається зі шляху або не влучає в ціль (Божу волю).",
    usages: [
      { ref: "Псалми 51:5", text: "В гріху породила мене мати моя..." }
    ],
    origin: {
      strongs: "H2398",
      transliteration: "chata",
      original: "חָטָא"
    }
  },
  "сидить": {
    strongs: "3427 (yashab)",
    original: "יָשַׁב",
    transliteration: "yashab",
    pronunciation: "yaw-SHAB",
    partOfSpeech: "Дієслово",
    semanticRange: ["сидіти", "проживати", "мешкати"],
    definition: "Повне ототожнення та осілість. Найглибший рівень залучення до гріха в цій прогресії.",
    usages: [
      { ref: "Псалми 2:4", text: "Той, Хто на небесах сидить..." }
    ]
  },
  "зборищі": {
    strongs: "4186 (moshab)",
    original: "מוֹשָׁב",
    transliteration: "moshab",
    pronunciation: "mo-SHAB",
    partOfSpeech: "Іменник",
    semanticRange: ["сидіння", "місце зборів", "поселення"],
    definition: "Місце, де люди збираються або живуть. Вказує на спільноту.",
    usages: [
      { ref: "Вихід 12:40", text: "Час перебування синів Ізраїлевих..." }
    ],
    origin: {
      strongs: "H3427",
      transliteration: "yashab",
      original: "יָשַׁב"
    }
  },
  "злорік": {
    strongs: "3887 (litz)",
    original: "לִיץ",
    transliteration: "litz",
    pronunciation: "leets",
    partOfSpeech: "Дієслово (партицип)",
    definition: "Насмішники, циніки, які відкрито глузують з праведності.",
    semanticRange: ["насмішник", "глузій"],
    usages: [{ ref: "Приповісті 3:34", text: "З насмішників Він насміхається..." }]
  },

  // --- VERSE 2 ---
  "законі": {
    strongs: "8451 (torah)",
    original: "תּוֹרָה",
    transliteration: "torah",
    pronunciation: "to-RAH",
    partOfSpeech: "Іменник жіночий рід",
    semanticRange: ["навчання", "інструкція", "закон"],
    definition: "Божественна інструкція або вчення. Вказує на напрямок, який Бог дає людині.",
    usages: [{ ref: "Псалми 19:7", text: "Закон Господній досконалий..." }],
    origin: {
      strongs: "H3384",
      transliteration: "yarah",
      original: "יָרָה"
    }
  },
  "господнім": {
    strongs: "3068 (YHWH)",
    original: "יהוה",
    transliteration: "Yahweh",
    pronunciation: "yah-WEH",
    partOfSpeech: "Власна назва",
    definition: "Особисте ім'я Бога Заповіту. Я Є Той, Хто Є.",
    semanticRange: ["Господь", "Яхве", "Сущий"],
    usages: [{ ref: "Вихід 3:14", text: "І сказав Бог Мойсеєві: Я є Той, Хто є." }]
  },
  "насолода": {
    strongs: "2656 (chephets)",
    original: "חֵפֶץ",
    transliteration: "chephets",
    pronunciation: "KHAY-fets",
    partOfSpeech: "Іменник",
    definition: "Глибоке бажання, задоволення, радість від чогось.",
    semanticRange: ["бажання", "радість", "уподобання"],
    usages: [{ ref: "Ісая 53:10", text: "Воля (уподобання) Господнє рукою його здійсниться..." }]
  },
  "розмірковує": { 
    strongs: "1897 (hagah)",
    original: "הָגָה",
    transliteration: "hagah",
    pronunciation: "haw-GAH",
    partOfSpeech: "Дієслово",
    definition: "Бурмотіти, читати напівголосно, глибоко роздумувати. Звук низького тону (як гарчання лева).",
    semanticRange: ["роздумувати", "говорити", "задумувати"],
    usages: [{ ref: "Ісуса Навина 1:8", text: "Нехай не відходить ця книга... але роздумуй про неї..." }]
  },
  "вдень": {
    strongs: "3117 (yom)",
    original: "יוֹם",
    transliteration: "yom",
    pronunciation: "yome",
    partOfSpeech: "Іменник",
    definition: "Період світла, день. Метафорично - час активності або життя.",
    semanticRange: ["день", "час", "доба"],
    usages: [{ ref: "Буття 1:5", text: "І назвав Бог світло днем..." }]
  },
  "вночі": {
    strongs: "3915 (laylah)",
    original: "לַיְלָה",
    transliteration: "laylah",
    pronunciation: "lay-LAW",
    partOfSpeech: "Іменник",
    definition: "Ніч, час темряви. Метафорично - час спокою або випробувань.",
    semanticRange: ["ніч", "темрява"],
    usages: [{ ref: "Псалми 19:2", text: "І ніч ночі звіщає знання." }]
  },

  // --- VERSE 3 ---
  "буде": {
    strongs: "1961 (hayah)",
    original: "הָיָה",
    transliteration: "hayah",
    pronunciation: "haw-YAH",
    partOfSpeech: "Дієслово",
    definition: "Ставати, бути, траплятися.",
    semanticRange: ["бути", "ставати"]
  },
  "дерево": {
    strongs: "6086 (ets)",
    original: "עֵץ",
    transliteration: "ets",
    pronunciation: "ayts",
    partOfSpeech: "Іменник",
    definition: "Рослина з твердим стовбуром; також деревина.",
    semanticRange: ["дерево", "деревина"]
  },
  "посаджене": {
    strongs: "8362 (shathal)",
    original: "שָׁתַל",
    transliteration: "shathal",
    pronunciation: "shaw-THAL",
    partOfSpeech: "Дієслово (пасив)",
    definition: "Пересаджене. Вказує на те, що дерево не виросло там само по собі, а було цілеспрямовано поміщене туди.",
    semanticRange: ["саджати", "пересаджувати"]
  },
  "потоків": {
    strongs: "6388 (peleg)",
    original: "פֶּלֶג",
    transliteration: "peleg",
    pronunciation: "PEH-leg",
    partOfSpeech: "Іменник",
    definition: "Штучні зрошувальні канали або природні струмки, що забезпечують постійне живлення.",
    semanticRange: ["потік", "канал", "струмок"]
  },
  "вод": {
    strongs: "4325 (mayim)",
    original: "מַיִם",
    transliteration: "mayim",
    pronunciation: "MAH-yim",
    partOfSpeech: "Іменник",
    definition: "Вода, джерело життя. Часто символізує Боже благословення або Духа.",
    semanticRange: ["вода", "води"],
    usages: [{ ref: "Ісая 55:1", text: "О, всі спраглі, йдіть до води!" }]
  },
  "приносить": {
    strongs: "5414 (nathan)",
    original: "נָתַן",
    transliteration: "nathan",
    pronunciation: "naw-THAN",
    partOfSpeech: "Дієслово",
    definition: "Давати, виробляти, приносити.",
    semanticRange: ["давати", "приносити"]
  },
  "плід": {
    strongs: "6529 (peri)",
    original: "פְּרִי",
    transliteration: "peri",
    pronunciation: "peh-REE",
    partOfSpeech: "Іменник",
    definition: "Результат, урожай, нащадок.",
    semanticRange: ["фрукт", "плід", "наслідок"]
  },
  "своєчасно": {
    strongs: "6256 (eth)",
    original: "עֵת",
    transliteration: "eth",
    pronunciation: "ayth",
    partOfSpeech: "Іменник",
    definition: "Час, пора, сезон.",
    semanticRange: ["час", "сезон"]
  },
  "в'яне": {
    strongs: "5034 (nabel)",
    original: "נָבֵל",
    transliteration: "nabel",
    pronunciation: "naw-BEL",
    partOfSpeech: "Дієслово",
    definition: "В'янути, сохнути, занепадати.",
    semanticRange: ["в'янути", "сохнути"]
  },
  "робить": {
    strongs: "6213 (asah)",
    original: "עָשָׂה",
    transliteration: "asah",
    pronunciation: "aw-SAH",
    partOfSpeech: "Дієслово",
    definition: "Робити, творити, виконувати.",
    semanticRange: ["робити", "творити"]
  },
  "успіх": {
    strongs: "6743 (tsalach)",
    original: "צָלַח",
    transliteration: "tsalach",
    pronunciation: "tsaw-LAKH",
    partOfSpeech: "Дієслово",
    definition: "Процвітати, досягати мети, бути успішним.",
    semanticRange: ["процвітати", "вдаватися"]
  },
  
  // --- VERSE 4 ---
  "так": {
    strongs: "3651 (ken)",
    original: "כֵּן",
    transliteration: "ken",
    pronunciation: "ken",
    partOfSpeech: "Прислівник",
    definition: "Таким чином, правильно, чесно.",
    semanticRange: ["так", "таким чином"]
  },
  "полова": {
    strongs: "4671 (mots)",
    original: "מֹץ",
    transliteration: "mots",
    pronunciation: "mose",
    partOfSpeech: "Іменник",
    definition: "Лушпиння від зерна, яке легко здувається вітром. Символ нікчемності та нестійкості.",
    semanticRange: ["лушпиння", "полова"],
    usages: [{ ref: "Осія 13:3", text: "...і як полова, що вітер з току розвіває." }]
  },
  "вітер": {
    strongs: "7307 (ruach)",
    original: "רוּחַ",
    transliteration: "ruach",
    pronunciation: "ROO-akh",
    partOfSpeech: "Іменник",
    definition: "Дихання, вітер, дух. Сила, що приводить в рух.",
    semanticRange: ["вітер", "дух", "подих"]
  },
  "розвіває": {
    strongs: "5086 (nadaph)",
    original: "נָדַף",
    transliteration: "nadaph",
    pronunciation: "naw-DAF",
    partOfSpeech: "Дієслово",
    definition: "Розганяти, розвіювати, гнати.",
    semanticRange: ["розвіювати", "гнати"]
  },

  // --- VERSE 5 ---
  "встоять": {
    strongs: "6965 (qum)",
    original: "קוּם",
    transliteration: "qum",
    pronunciation: "koom",
    partOfSpeech: "Дієслово",
    definition: "Вставати, стояти, підніматися.",
    semanticRange: ["вставати", "стояти"]
  },
  "суді": {
    strongs: "4941 (mishpat)",
    original: "מִשְׁפָּט",
    transliteration: "mishpat",
    pronunciation: "mish-PAT",
    partOfSpeech: "Іменник",
    definition: "Суд, справедливість, вирок, правосуддя.",
    semanticRange: ["суд", "справедливість", "закон"]
  },
  "праведних": {
    strongs: "6662 (tsaddiq)",
    original: "צַדִּיק",
    transliteration: "tsaddiq",
    pronunciation: "tsad-DEEK",
    partOfSpeech: "Прикметник",
    definition: "Той, хто правий, справедливий, виправданий Богом.",
    semanticRange: ["праведний", "справедливий"]
  },
  
  // --- VERSE 6 ---
  "знає": {
    strongs: "3045 (yada)",
    original: "יָדַע",
    transliteration: "yada",
    pronunciation: "yaw-DAH",
    partOfSpeech: "Дієслово",
    definition: "Знати, пізнавати. Включає в себе особистий досвід та стосунки.",
    semanticRange: ["знати", "пізнавати"],
    usages: [{ ref: "Буття 4:1", text: "І пізнав Адам Єву..." }]
  },
  "путь": {
    strongs: "1870 (derek)",
    original: "דֶּרֶךְ",
    transliteration: "derek",
    pronunciation: "DEH-rek",
    partOfSpeech: "Іменник",
    definition: "Дорога, шлях, спосіб життя.",
    semanticRange: ["шлях", "дорога"]
  },
  "загине": {
    strongs: "6 (abad)",
    original: "אָבַד",
    transliteration: "abad",
    pronunciation: "aw-BAD",
    partOfSpeech: "Дієслово",
    definition: "Гинути, зникати, бути знищеним.",
    semanticRange: ["гинути", "зникати"]
  }
};

export const PARALLEL_VERSES_DATA: Record<string, string> = {
  "Єремія 17:7-8": "Блаженна людина, що на Господа покладається... Бо вона буде як дерево, над водним потоком посаджене...",
  "Ісуса Навина 1:8": "Нехай книга цього Закону не відійде від твоїх уст, але будеш роздумувати про неї вдень та вночі...",
  "Псалми 92:12": "Праведний цвістиме, як пальма, підійметься, мов кедр на Ливані.",
  "Псалми 119:1": "Блаженні непорочні в дорозі, що ходять Законом Господнім.",
  "Псалми 119:97": "Як я кохаю Закона Твого! Він цілий день — моя розмова.",
  "Об'явлення 22:2": "Посеред його вулиці, і по цей бік і по той бік ріки — дерево життя, що родить дванадцять раз плоди...",
  "Єзекіїль 47:12": "А над потоком виросте... всяке дерево їстівне... не в'янутиме лист його...",
  "Матвія 3:12": "В Його руці віячка, і перечистить Свій тік... а полову спалить огнем невгасимим.",
  "Йова 21:18": "Вони стануть, як та солома перед вітром, і як та полова, що вітер її розвіває.",
  "Псалми 5:5": "Бо Ти Бог, що не хоче несправедливости, і злий не буде жити з Тобою.",
  "Івана 10:14": "Я Пастир Добрий, і знаю Своїх, і Свої Мене знають.",
  "2 Тимофію 2:19": "Та стоїть міцна Божа основа, та має печатку оцю: Господь знає тих, хто Його..."
};

const COMMON_COMMENTARIES = [
  { author: "Жан Кальвін", title: "Коментар до Псалмів", image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&q=80&w=100" },
  { author: "Метью Генрі", title: "Коментар до Псалмів", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=100" },
  { author: "Чарльз Сперджен", title: "Скарбниця Давида", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=100" }
];

export const VERSE_STUDY_DB: Record<number, VerseStudyData> = {
  1: {
    verseId: 1,
    parallels: ["Єремія 17:7-8", "Ісуса Навина 1:8"],
    translations: [
      { name: "Огієнко", text: "Блаженний муж, що за радою несправедливих не ходить, і не стоїть на дорозі грішних, і не сидить на сидінні злоріків." },
      { name: "Турконяк", text: "Блаженна людина, яка не пішла за радою нечестивих, яка не стала на шлях грішних і не сіла на зборищі губителів." }
    ],
    commentaries: COMMON_COMMENTARIES,
    originalTokens: [
      { original: "אַשְׁרֵי", transliteration: "ashrei", strongs: "835", gloss: "Блаженний", morphology: "Іменник | мн.", refKey: "блаженний" },
      { original: "הָאִישׁ", transliteration: "ha-ish", strongs: "376", gloss: "муж", morphology: "Іменник | одн.", refKey: "муж" },
      { original: "אֲשֶׁר", transliteration: "asher", strongs: "834", gloss: "який", morphology: "Займенник", refKey: "який" },
      { original: "לֹא", transliteration: "lo", strongs: "3808", gloss: "не", morphology: "Частка", refKey: "не" },
      { original: "הָלַךְ", transliteration: "halak", strongs: "1980", gloss: "ходить", morphology: "Дієслово", refKey: "ходить" },
      { original: "בַּעֲצַת", transliteration: "ba-atzat", strongs: "6098", gloss: "на раді", morphology: "Іменник", refKey: "раду" },
      { original: "רְשָׁעִים", transliteration: "reshaim", strongs: "7563", gloss: "нечестивих", morphology: "Прикметник", refKey: "нечестивих" },
      { original: "וּבְדֶרֶךְ", transliteration: "u-ve-derek", strongs: "1870", gloss: "і на шляху", morphology: "Іменник", refKey: "шляху" },
      { original: "חַטָּאִים", transliteration: "chattaim", strongs: "2400", gloss: "грішних", morphology: "Іменник", refKey: "грішних" },
      { original: "לֹא", transliteration: "lo", strongs: "3808", gloss: "не", morphology: "Частка", refKey: "не" },
      { original: "עָמָד", transliteration: "amad", strongs: "5975", gloss: "стоїть", morphology: "Дієслово", refKey: "стоїть" },
      { original: "וּבְמוֹשַׁב", transliteration: "u-ve-moshab", strongs: "4186", gloss: "і в зборищі", morphology: "Іменник", refKey: "зборищі" },
      { original: "לֵצִים", transliteration: "letsim", strongs: "3887", gloss: "злоріків", morphology: "Дієслово", refKey: "злорік" },
      { original: "לֹא", transliteration: "lo", strongs: "3808", gloss: "не", morphology: "Частка", refKey: "не" },
      { original: "יָשָׁב", transliteration: "yashab", strongs: "3427", gloss: "сидить", morphology: "Дієслово", refKey: "сидить" }
    ]
  },
  2: {
    verseId: 2,
    parallels: ["Ісуса Навина 1:8", "Псалми 119:1", "Псалми 119:97"],
    translations: [
      { name: "Огієнко", text: "Але в Законі Господнім його насолода, і про Закон Його вдень та вночі він роздумує!" },
      { name: "Турконяк", text: "Але в Законі Господньому його воля, і про Його Закон він розмірковуватиме вдень і вночі." }
    ],
    commentaries: COMMON_COMMENTARIES,
    originalTokens: [
      { original: "כִּי", transliteration: "ki", strongs: "3588", gloss: "але", morphology: "Сполучник", refKey: "але" },
      { original: "אִם", transliteration: "im", strongs: "518", gloss: "тільки", morphology: "Сполучник" },
      { original: "בְּתוֹרַת", transliteration: "be-torat", strongs: "8451", gloss: "в Законі", morphology: "Іменник", refKey: "законі" },
      { original: "יְהוָה", transliteration: "YHWH", strongs: "3068", gloss: "Господнім", morphology: "Ім'я", refKey: "господнім" },
      { original: "חֶפְצוֹ", transliteration: "cheptso", strongs: "2656", gloss: "насолода його", morphology: "Іменник", refKey: "насолода" },
      { original: "וּבְתוֹרָתוֹ", transliteration: "u-ve-torato", strongs: "8451", gloss: "і в Законі Його", morphology: "Іменник", refKey: "законі" },
      { original: "יֶהְגֶּה", transliteration: "yehgeh", strongs: "1897", gloss: "розмірковує", morphology: "Дієслово", refKey: "розмірковує" },
      { original: "יוֹמָם", transliteration: "yomam", strongs: "3119", gloss: "вдень", morphology: "Прислівник", refKey: "вдень" },
      { original: "וָלָיְלָה", transliteration: "va-laylah", strongs: "3915", gloss: "і вночі", morphology: "Іменник", refKey: "вночі" }
    ]
  },
  3: {
    verseId: 3,
    parallels: ["Єремія 17:8", "Об'явлення 22:2", "Єзекіїль 47:12"],
    translations: [
       { name: "Огієнко", text: "І він буде, як дерево, над водним потоком посаджене, що родить свій плід своєчасно, і що листя не в'яне його, і все, що він чинить, щаститься йому!" },
       { name: "Турконяк", text: "Він буде наче дерево, посаджене біля водних потоків, яке віддає свій плід у свій час, і листя якого не опаде. У всьому, що тільки робить, він матиме успіх." }
    ],
    commentaries: COMMON_COMMENTARIES,
    originalTokens: [
      { original: "וְהָיָה", transliteration: "ve-hayah", strongs: "1961", gloss: "і буде він", morphology: "Дієслово", refKey: "буде" },
      { original: "כְּעֵץ", transliteration: "ke-ets", strongs: "6086", gloss: "як дерево", morphology: "Іменник", refKey: "дерево" },
      { original: "שָׁתוּל", transliteration: "shathul", strongs: "8362", gloss: "посаджене", morphology: "Дієслово", refKey: "посаджене" },
      { original: "עַל", transliteration: "al", strongs: "5921", gloss: "біля", morphology: "Прийменник", refKey: "на" },
      { original: "פַּלְגֵי", transliteration: "palgei", strongs: "6388", gloss: "потоків", morphology: "Іменник", refKey: "потоків" },
      { original: "מָיִם", transliteration: "mayim", strongs: "4325", gloss: "вод", morphology: "Іменник", refKey: "вод" },
      { original: "אֲשֶׁר", transliteration: "asher", strongs: "834", gloss: "що", morphology: "Займенник", refKey: "який" },
      { original: "פִּרְיוֹ", transliteration: "piryo", strongs: "6529", gloss: "плід свій", morphology: "Іменник", refKey: "плід" },
      { original: "יִתֵּן", transliteration: "yiten", strongs: "5414", gloss: "приносить", morphology: "Дієслово", refKey: "приносить" },
      { original: "בְּעִתּוֹ", transliteration: "be-ito", strongs: "6256", gloss: "своєчасно", morphology: "Іменник", refKey: "своєчасно" },
      { original: "וְעָלֵהוּ", transliteration: "ve-alehu", strongs: "5929", gloss: "і листя його", morphology: "Іменник", refKey: "листя" },
      { original: "לֹא", transliteration: "lo", strongs: "3808", gloss: "не", morphology: "Частка", refKey: "не" },
      { original: "יִבּוֹל", transliteration: "yibol", strongs: "5034", gloss: "в'яне", morphology: "Дієслово", refKey: "в'яне" },
      { original: "וְכֹל", transliteration: "ve-chol", strongs: "3605", gloss: "і все", morphology: "Іменник" },
      { original: "אֲשֶׁר", transliteration: "asher", strongs: "834", gloss: "що", morphology: "Займенник", refKey: "який" },
      { original: "יַעֲשֶׂה", transliteration: "yaaseh", strongs: "6213", gloss: "робить", morphology: "Дієслово", refKey: "робить" },
      { original: "יַצְלִיחַ", transliteration: "yatsliach", strongs: "6743", gloss: "матиме успіх", morphology: "Дієслово", refKey: "успіх" }
    ]
  },
  4: {
    verseId: 4,
    parallels: ["Матвія 3:12", "Йова 21:18", "Псалми 35:5"],
    translations: [
       { name: "Огієнко", text: "Не так нечестиві, бо вони як полова, що вітер її розвіває!" },
       { name: "Турконяк", text: "Не так нечестиві, [не так]! Вони — наче порох, який вітер змітає [з лиця землі]." }
    ],
    commentaries: COMMON_COMMENTARIES,
    originalTokens: [
      { original: "לֹא", transliteration: "lo", strongs: "3808", gloss: "не", morphology: "Частка", refKey: "не" },
      { original: "כֵן", transliteration: "ken", strongs: "3651", gloss: "так", morphology: "Прислівник", refKey: "так" },
      { original: "הָרְשָׁעִים", transliteration: "ha-reshaim", strongs: "7563", gloss: "нечестиві", morphology: "Прикметник", refKey: "нечестивих" },
      { original: "כִּי", transliteration: "ki", strongs: "3588", gloss: "бо", morphology: "Сполучник", refKey: "але" },
      { original: "אִם", transliteration: "im", strongs: "518", gloss: "як", morphology: "Сполучник" },
      { original: "כַּמֹּץ", transliteration: "ka-mots", strongs: "4671", gloss: "полова", morphology: "Іменник", refKey: "полова" },
      { original: "אֲשֶׁר", transliteration: "asher", strongs: "834", gloss: "що", morphology: "Займенник", refKey: "який" },
      { original: "תִּדְּפֶנּוּ", transliteration: "tiddefennu", strongs: "5086", gloss: "розвіває її", morphology: "Дієслово", refKey: "розвіває" },
      { original: "רוּחַ", transliteration: "ruach", strongs: "7307", gloss: "вітер", morphology: "Іменник", refKey: "вітер" }
    ]
  },
  5: {
    verseId: 5,
    parallels: ["Псалми 5:5", "Псалми 24:3"],
    translations: [
       { name: "Огієнко", text: "Ось тому то не встоять безбожні на суді, ані грішники у зборі праведних!" },
       { name: "Турконяк", text: "Тому нечестиві не встоять на суді, ані грішники — на раді праведних." }
    ],
    commentaries: COMMON_COMMENTARIES,
    originalTokens: [
      { original: "עַל", transliteration: "al", strongs: "5921", gloss: "тому", morphology: "Прийменник", refKey: "на" },
      { original: "כֵּן", transliteration: "ken", strongs: "3651", gloss: "так", morphology: "Прислівник", refKey: "так" },
      { original: "לֹא", transliteration: "lo", strongs: "3808", gloss: "не", morphology: "Частка", refKey: "не" },
      { original: "יָקֻמוּ", transliteration: "yaqumu", strongs: "6965", gloss: "встоять", morphology: "Дієслово", refKey: "встоять" },
      { original: "רְשָׁעִים", transliteration: "reshaim", strongs: "7563", gloss: "нечестиві", morphology: "Прикметник", refKey: "нечестивих" },
      { original: "בַּמִּשְׁפָּט", transliteration: "ba-mishpat", strongs: "4941", gloss: "на суді", morphology: "Іменник", refKey: "суді" },
      { original: "וְחַטָּאִים", transliteration: "ve-chattaim", strongs: "2400", gloss: "і грішні", morphology: "Іменник", refKey: "грішних" },
      { original: "בַּעֲדַת", transliteration: "ba-adat", strongs: "5712", gloss: "у зібранні", morphology: "Іменник", refKey: "зборищі" },
      { original: "צַדִּיקִים", transliteration: "tsaddiqim", strongs: "6662", gloss: "праведних", morphology: "Прикметник", refKey: "праведних" }
    ]
  },
  6: {
    verseId: 6,
    parallels: ["Псалми 37:18", "Івана 10:14", "2 Тимофію 2:19"],
    translations: [
       { name: "Огієнко", text: "Дорогу бо праведних знає Господь, а дорога безбожних загине!" },
       { name: "Турконяк", text: "Адже Господь знає шлях праведних, а шлях нечестивих загине." }
    ],
    commentaries: COMMON_COMMENTARIES,
    originalTokens: [
      { original: "כִּי", transliteration: "ki", strongs: "3588", gloss: "бо", morphology: "Сполучник", refKey: "але" },
      { original: "יוֹדֵעַ", transliteration: "yodea", strongs: "3045", gloss: "знає", morphology: "Дієслово", refKey: "знає" },
      { original: "יְהוָה", transliteration: "YHWH", strongs: "3068", gloss: "Господь", morphology: "Ім'я", refKey: "господнім" },
      { original: "דֶּרֶךְ", transliteration: "derek", strongs: "1870", gloss: "путь", morphology: "Іменник", refKey: "путь" },
      { original: "צַדִּיקִים", transliteration: "tsaddiqim", strongs: "6662", gloss: "праведних", morphology: "Прикметник", refKey: "праведних" },
      { original: "וְדֶרֶךְ", transliteration: "ve-derek", strongs: "1870", gloss: "а путь", morphology: "Іменник", refKey: "путь" },
      { original: "רְשָׁעִים", transliteration: "reshaim", strongs: "7563", gloss: "нечестивих", morphology: "Прикметник", refKey: "нечестивих" },
      { original: "תֹּאבֵד", transliteration: "tobed", strongs: "6", gloss: "загине", morphology: "Дієслово", refKey: "загине" }
    ]
  }
};