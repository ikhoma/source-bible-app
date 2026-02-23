import { Verse, VerseStudyData, InductiveStudyData } from './types';
import { WORD_STUDY_DB } from './data/wordStudyDb';

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

export { WORD_STUDY_DB };

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
  {
    author: "Жан Кальвін",
    title: "Коментар до Псалмів",
    image: "/images/authors/calvin.png",
    subtitle: "XVI ст. • Текст і богослов’я",
    preview: "Кальвін підкреслює, що «блаженний муж» – це насамперед людина, чия радість укорінена в Божому Слові, а не в обставинах.",
    body: "Кальвін звертає увагу, що псалом відкривається не заповіддю, а описом стану: блаженний. Мова не про емоцію, а про об'єктивну реальність, у яку Бог вводить людину.\n\n«Блаженний муж» не означає безгрішний або безпроблемний. Це людина, яка відокремлена від поради нечестивих, способу життя грішників і спільноти насмішників. Вона не знаходить у цьому джерела ідентичності або радості.\n\nДля Кальвіна ключовою є думка, що істинне щастя пов'язане з постійним зануренням у Закон Господній. Таке читання та роздумування не є сухим обов'язком, а джерелом насолоди, яка формує характер і напрямок життя."
  },
  {
    author: "Меттью Генрі",
    title: "Коментар до Псалмів",
    image: "/images/authors/henry.png",
    subtitle: "XVIII ст. • Серце і застосування",
    preview: "Генрі читає цей псалом як запрошення перевірити, чим насправді наповнене серце та щоденні звички людини.",
    body: "Меттью Генрі бачить у першому псалмі своєрідні двері до всієї книги Псалмів. Тут представлено два шляхи – шлях благословення і шлях загибелі.\n\nДля Генрі важливо, що праведний не просто уникає зла, а активно шукає Божу присутність у Слові. Він проводить чітку різницю між тим, щоб випадково зіткнутися з гріховним впливом, і тим, щоб свідомо «ходити, стояти і сидіти» в ньому.\n\nГенрі заохочує читача поставити собі практичні запитання: з ким я по-справжньому по дорозі? Хто формує моє мислення? Де моє серце знаходить насолоду – у швидких розвагах чи в тихому роздумуванні над Божим Словом?"
  },
  {
    author: "Чарльз Сперджен",
    title: "Скарбниця Давида",
    image: "/images/authors/spurgeon.png",
    subtitle: "XIX ст. • Проповідь і образи",
    preview: "Сперджен бачить у цьому псалмі портрет дерева, яке стоїть проти вітру завдяки невидимим кореням у Божій благодаті.",
    body: "Чарльз Сперджен наголошує, що блаженство праведного не в тому, що навколо немає вітрів і бур, а в тому, де знаходяться корені. Людина, яка вкорінена біля потоків Божого Слова, може витримати те, що зламає поверхневу побожність.\n\nСперджен яскраво описує прогресію гріха: від прогулянки поруч із нечестивими до стійкого стояння з ними і, зрештою, до сидіння в їхньому колі. Кожен крок робить серце більш байдужим до Бога.\n\nУ своїх проповідях він закликає читачів не задовольнятися формальним читанням Біблії, а дозволити їй стати живим потоком, який постійно омиває думки, бажання і рішення людини."
  }
];

export const VERSE_STUDY_DB: Record<number, VerseStudyData> = {
  1: {
    verseId: 1,
    parallels: ["Єремія 17:7-8", "Ісуса Навина 1:8"],
    translations: [
      { name: "Огієнко", text: "Блаженний муж, що за радою несправедливих не ходить, і не стоїть на дорозі грішних, і не сидить на сидінні злоріків." },
      { name: "Турконяк", text: "Блаженна людина, яка не пішла за радою нечестивих, яка не стала на шлях грішних і не сіла на зборищі губителів." },
      { name: "King James", text: "Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful." },
      { name: "American Standard", text: "Blessed is the man that walketh not in the counsel of the wicked, Nor standeth in the way of sinners, Nor sitteth in the seat of scoffers:" }
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
      { name: "Турконяк", text: "Але в Законі Господньому його воля, і про Його Закон він розмірковуватиме вдень і вночі." },
      { name: "King James", text: "But his delight is in the law of the LORD; and in his law doth he meditate day and night." },
      { name: "American Standard", text: "But his delight is in the law of Jehovah; And on his law doth he meditate day and night." }
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
      { name: "Турконяк", text: "Він буде наче дерево, посаджене біля водних потоків, яке віддає свій плід у свій час, і листя якого не опаде. У всьому, що тільки робить, він матиме успіх." },
      { name: "King James", text: "And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper." },
      { name: "American Standard", text: "And he shall be like a tree planted by the streams of water, That bringeth forth its fruit in its season, Whose leaf also doth not wither; And whatsoever he doeth shall prosper." }
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
      { name: "Турконяк", text: "Не так нечестиві, [не так]! Вони — наче порох, який вітер змітає [з лиця землі]." },
      { name: "King James", text: "The ungodly are not so: but are like the chaff which the wind driveth away." },
      { name: "American Standard", text: "The wicked are not so, But are like the chaff which the wind driveth away." }
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
      { name: "Турконяк", text: "Тому нечестиві не встоять на суді, ані грішники — на раді праведних." },
      { name: "King James", text: "Therefore the ungodly shall not stand in the judgment, nor sinners in the congregation of the righteous." },
      { name: "American Standard", text: "Therefore the wicked shall not stand in the judgment, Nor sinners in the congregation of the righteous." }
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
      { name: "Турконяк", text: "Адже Господь знає шлях праведних, а шлях нечестивих загине." },
      { name: "King James", text: "For the LORD knoweth the way of the righteous: but the way of the ungodly shall perish." },
      { name: "American Standard", text: "For Jehovah knoweth the way of the righteous; But the way of the wicked shall perish." }
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