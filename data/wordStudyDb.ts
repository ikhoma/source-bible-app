import { WordStudyData } from '../types';

export const WORD_STUDY_DB: Record<string, WordStudyData> = {
    // --- FUNCTIONAL WORDS / PARTICLES ---
    "який": {
        strongs: "834 (asher)",
        original: "אֲשֶׁר",
        transliteration: "asher",
        partOfSpeech: "Відносний займенник",
        definition: "Який, котрий, що. Вказує на зв'язок між частинами речення.",
        semanticRange: ["який", "що", "де", "коли"],
        isFunctional: true
    },
    "не": {
        strongs: "3808 (lo)",
        original: "לֹא",
        transliteration: "lo",
        partOfSpeech: "Частка",
        definition: "Ні, не. Абсолютне заперечення.",
        semanticRange: ["ні", "не"],
        isFunctional: true
    },
    "і": {
        strongs: "— (ve)",
        original: "וְ",
        transliteration: "ve",
        partOfSpeech: "Сполучник (префікс)",
        definition: "І, та, але. З'єднує слова або речення (Вав-послідовність).",
        semanticRange: ["і", "а", "та"],
        isFunctional: true
    },
    "на": {
        strongs: "5921 (al) / (ba)",
        original: "עַל / בְּ",
        transliteration: "al / ba",
        partOfSpeech: "Прийменник",
        definition: "На, в, при. Вказує на місцезнаходження або напрямок.",
        semanticRange: ["на", "над", "проти"],
        isFunctional: true
    },
    "у": {
        strongs: "— (be)",
        original: "בְּ",
        transliteration: "be",
        partOfSpeech: "Прийменник (префікс)",
        definition: "В, у, всередині.",
        semanticRange: ["в", "у", "серед"],
        isFunctional: true
    },
    "в": {
        strongs: "— (be)",
        original: "בְּ",
        transliteration: "be",
        partOfSpeech: "Прийменник (префікс)",
        definition: "В, у, за допомогою.",
        semanticRange: ["в", "через"],
        isFunctional: true
    },
    "але": {
        strongs: "3588 (ki)",
        original: "כִּי",
        transliteration: "ki",
        partOfSpeech: "Сполучник",
        definition: "Бо, але, тому що. Логічний перехід.",
        semanticRange: ["бо", "але", "якщо"],
        isFunctional: true
    },
    "він": {
        strongs: "1931 (hu)",
        original: "הוּא",
        transliteration: "hu",
        partOfSpeech: "Займенник",
        definition: "Він, той. Вказує на особу.",
        semanticRange: ["він", "той сам"],
        isFunctional: true
    },
    "про": {
        strongs: "—",
        original: "—",
        transliteration: "—",
        partOfSpeech: "Прийменник",
        definition: "Про, відносно. Використовується для позначення теми.",
        isFunctional: true
    },
    "його": {
        strongs: "— (suffix)",
        original: "וֹ",
        transliteration: "o",
        partOfSpeech: "Займенник (суфікс)",
        definition: "Його, належність йому.",
        semanticRange: ["його"],
        isFunctional: true
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
            { ref: "Псалми 1:1", text: "<mark>Блаженний</mark> муж, що за радою несправедливих не ходить, і не стоїть на дорозі грішних, і не сидить на сидінні злоріків" },
            { ref: "Псалми 32:1", text: "<mark>Блаженний</mark>, кому подарований злочин, кому гріх закрито," },
            { ref: "Псалми 33:12", text: "<mark>Блаженний</mark> той люд, що Богом у нього Господь, народ, що Його Він обрав на спадок Собі!" },
            { ref: "Псалми 41:2", text: "<mark>Блаженний</mark>, хто дбає про вбогого, в день нещастя Господь порятує його!" },
            { ref: "Псалми 84:5", text: "<mark>Блаженні</mark>, хто мешкає в домі Твоїм, вони будуть повіки хвалити Тебе!" },
            { ref: "Приповісті 8:34", text: "<mark>Блаженна</mark> людина, яка слухає Мене, щоб пильнувати біля дверей Моїх день у день, щоб стерегти біля одвірків входу Мого!" }
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
            { ref: "Псалми 1:1", text: "Блаженний <mark>муж</mark>, що за радою несправедливих не ходить, і не стоїть на дорозі грішних, і не сидить на сидінні злоріків" },
            { ref: "Буття 2:23", text: "...вона <mark>Мужевою</mark> буде зватися, бо взята вона від <mark>Мужа</mark>." },
            { ref: "Йов 1:1", text: "Був <mark>муж</mark> у країні Уц, на ім'я йому Йов. І був <mark>муж</mark> цей невинний та праведний..." },
            { ref: "Псалми 112:1", text: "Алілуя! Блаженний той <mark>муж</mark>, що боїться він Господа, що заповіді Його дуже любі йому!" }
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
            { ref: "Псалми 1:1", text: "Блаженний муж, що за радою несправедливих не <mark>ходить</mark>..." },
            { ref: "Буття 5:24", text: "І <mark>ходив</mark> Енох з Богом, і не стало його, бо забрав його Бог." },
            { ref: "Буття 6:9", text: "...Ной був чоловік праведний і невинний у своїх поколіннях, Ной з Богом <mark>ходив</mark>." },
            { ref: "Псалми 15:2", text: "Той, хто <mark>ходить</mark> непорочно, і чинить справедливість, і правду говорить у серці своїм..." },
            { ref: "Приповісті 13:20", text: "Хто з мудрими <mark>ходить</mark>, той мудрим стає, а хто товаришує з безумним, той лиха набуде." }
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
            { ref: "Псалми 1:1", text: "Блаженний муж, що за <mark>радою</mark> несправедливих не ходить..." },
            { ref: "Псалми 33:11", text: "<mark>Рада</mark> Господня стоїть віки, думки Серця Його з роду в рід." },
            { ref: "Приповісті 19:20", text: "Слухай <mark>ради</mark> й картання приймай, щоб мудрим ти став при своєму кінці." },
            { ref: "Ісая 46:10", text: "...Мій <mark>задум</mark> здійсниться, і все, що бажаю, зроблю!" }
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
        definition: "Морально нестабільний, той, хто активно порушує Божий порядок. У перекладі Огієнка найчастіше ''несправедливий'' або ''безбожний''.",
        usages: [
            { ref: "Псалми 1:1", text: "Блаженний муж, що за радою <mark>несправедливих</mark> не ходить..." },
            { ref: "Псалми 1:4", text: "Не так <mark>нечестиві</mark>, бо вони як полова, що вітер її розвіває!" },
            { ref: "Псалми 1:5", text: "Ось тому то не встоять <mark>безбожні</mark> на суді..." },
            { ref: "Псалми 1:6", text: "...а дорога <mark>безбожних</mark> загине!" },
            { ref: "Ісая 57:20", text: "А <mark>нечестиві</mark> як море розбурхане, коли втихомиритись не може воно..." }
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
            { ref: "Псалми 1:1", text: "...і не <mark>стоїть</mark> на дорозі грішних..." },
            { ref: "Псалми 24:3", text: "Хто на гору Господню зійде, і хто буде <mark>стояти</mark> на місці святому Його?" },
            { ref: "Псалми 33:11", text: "Рада Господня <mark>стоїть</mark> віки..." },
            { ref: "Псалми 130:3", text: "Якщо, Господи, будеш зважати на беззаконня, хто <mark>встоїть</mark>, Владико?" }
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
            { ref: "Псалми 1:1", text: "...і не стоїть на <mark>дорозі</mark> грішних..." },
            { ref: "Псалми 1:6", text: "<mark>Дорогу</mark> бо праведних знає Господь, а <mark>дорога</mark> безбожних загине!" },
            { ref: "Псалми 119:1", text: "Блаженні непорочні в <mark>дорозі</mark>, що ходять Законом Господнім!" },
            { ref: "Приповісті 3:6", text: "Пізнавай ти Його на всіх <mark>дорогах</mark> своїх, і Він випростує твої стежки." },
            { ref: "Ісая 55:8", text: "Бо ваші думки не Мої це думки, а <mark>дороги</mark> Мої то не ваші <mark>дороги</mark>, говорить Господь." }
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
            { ref: "Псалми 1:1", text: "...і не стоїть на дорозі <mark>грішних</mark>..." },
            { ref: "Псалми 1:5", text: "...ані <mark>грішники</mark> у зборі праведних!" },
            { ref: "Псалми 51:7", text: "Отож я в беззаконні народжений, і в <mark>гріху</mark> зачала мене мати моя." },
            { ref: "Приповісті 1:10", text: "Мій сину, як <mark>грішники</mark> будуть тебе намовляти, то з ними не згоджуйся ти!" }
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
            { ref: "Псалми 1:1", text: "...і не <mark>сидить</mark> на сидінні злоріків." },
            { ref: "Псалми 2:4", text: "Той, Хто <mark>сидить</mark> на небесах, посміється..." },
            { ref: "Псалми 91:1", text: "Хто <mark>живе</mark> під покровом Всевишнього, хто в тіні Всемогутнього мешкає..." },
            { ref: "Псалми 27:4", text: "Одного прошу я від Господа, буду жадати того, щоб <mark>перебувати</mark> мені в домі Господнім по всі дні життя мого..." }
        ]
    },
    "зборищі": {
        strongs: "4186 (moshab)",
        original: "מוֹשָׁב",
        transliteration: "moshab",
        pronunciation: "mo-SHAB",
        partOfSpeech: "Іменник",
        semanticRange: ["сидіння", "місце зборів", "поселення"],
        definition: "Місце, де люди збираються або живуть. Зібрання, компанія. В Огієнка тут - ``сидіння``.",
        usages: [
            { ref: "Псалми 1:1", text: "...і не сидить на <mark>сидінні</mark> злоріків." },
            { ref: "Вихід 12:40", text: "А час <mark>перебування</mark> синів Ізраїлевих, що сиділи в Єгипті, чотириста тридцять літ." },
            { ref: "Левит 25:29", text: "А коли хто продасть <mark>оселю</mark> в мурованім місті..." },
            { ref: "Псалми 107:32", text: "Нехай превозносять Його на народному зборі, і нехай вихваляють Його на <mark>засіданні</mark> старших!" }
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
        definition: "Насмішники, циніки, які відкрито глузують з праведності (в Огієнка: ``злоріків``).",
        semanticRange: ["насмішник", "глузій"],
        usages: [
            { ref: "Псалми 1:1", text: "...і не сидить на сидінні <mark>злоріків</mark>." },
            { ref: "Приповісті 3:34", text: "З <mark>насмішників</mark> Він насміхається, а покірливим милість дає." },
            { ref: "Приповісті 9:7", text: "Хто картає <mark>насмішника</mark>, той собі ганьбу бере..." },
            { ref: "Приповісті 14:6", text: "Шукає <mark>насмішник</mark> премудрости, та надаремно, а розумному знання легке." }
        ]
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
        usages: [
            { ref: "Псалми 1:2", text: "Але в <mark>Законі</mark> Господнім його насолода, і про <mark>Закон</mark> Його вдень та вночі він роздумує!" },
            { ref: "Псалми 19:8", text: "<mark>Закон</mark> Господній досконалий, він відживлює душу..." },
            { ref: "Псалми 119:97", text: "Як я кохаю <mark>Закона</mark> Твого, цілий день він розмова моя!" },
            { ref: "Ісая 2:3", text: "Бо піде з Сіону <mark>Закон</mark>, і Слово Господнє з Єрусалиму." }
        ],
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
        usages: [
            { ref: "Псалми 1:2", text: "Але в Законі <mark>Господнім</mark> його насолода..." },
            { ref: "Псалми 1:6", text: "Дорогу бо праведних знає <mark>Господь</mark>..." },
            { ref: "Вихід 3:15", text: "...<mark>Господь</mark>, Бог батьків ваших... Це Ім'я Моє навіки..." },
            { ref: "Псалми 23:1", text: "<mark>Господь</mark> то мій Пастир, тому в недостатку не буду..." }
        ]
    },
    "насолода": {
        strongs: "2656 (chephets)",
        original: "חֵפֶץ",
        transliteration: "chephets",
        pronunciation: "KHAY-fets",
        partOfSpeech: "Іменник",
        definition: "Глибоке бажання, задоволення, радість від чогось.",
        semanticRange: ["бажання", "радість", "уподобання"],
        usages: [
            { ref: "Псалми 1:2", text: "Але в Законі Господнім його <mark>насолода</mark>..." },
            { ref: "Псалми 16:3", text: "До святих, що на землі, до шляхетних, до них все <mark>жадання</mark> моє!" },
            { ref: "Ісая 53:10", text: "Та <mark>воля</mark> Господня на ньому складеться щасливо." },
            { ref: "Екклезіяста 3:1", text: "Для всього свій час, і година своя кожній <mark>справі</mark> (бажанню) під небом..." }
        ]
    },
    "розмірковує": {
        strongs: "1897 (hagah)",
        original: "הָגָה",
        transliteration: "hagah",
        pronunciation: "haw-GAH",
        partOfSpeech: "Дієслово",
        definition: "Бурмотіти, читати напівголосно, глибоко роздумувати. Звук низького тону (як гарчання лева).",
        semanticRange: ["роздумувати", "говорити", "задумувати"],
        usages: [
            { ref: "Псалми 1:2", text: "...і про Закон Його вдень та вночі він <mark>роздумує</mark>!" },
            { ref: "Ісуса Навина 1:8", text: "Нехай книга цього Закону не відійде від твоїх уст, але будеш <mark>роздумувати</mark> про неї вдень та вночі..." },
            { ref: "Псалми 2:1", text: "Нащо племена бунтують, а народи <mark>замишляють</mark> марне?" },
            { ref: "Ісая 31:4", text: "...Як лев той <mark>гарчить</mark>, і левчук над своєю здобиччю..." }
        ]
    },
    "вдень": {
        strongs: "3117 (yom)",
        original: "יוֹם",
        transliteration: "yom",
        pronunciation: "yome",
        partOfSpeech: "Іменник",
        definition: "Період світла, день. Метафорично - час активності або життя.",
        semanticRange: ["день", "час", "доба"],
        usages: [
            { ref: "Псалми 1:2", text: "...в <mark>день</mark> та вночі він роздумує!" },
            { ref: "Буття 1:5", text: "І назвав Бог світло <mark>днем</mark>, а темряву назвав ніччю." },
            { ref: "Псалми 19:2", text: "<mark>День</mark> дневі звіщає слово..." },
            { ref: "Псалми 118:24", text: "Це <mark>день</mark>, що його створив Господь, радіймо та тішмося в нім!" }
        ]
    },
    "вночі": {
        strongs: "3915 (laylah)",
        original: "לַיְלָה",
        transliteration: "laylah",
        pronunciation: "lay-LAW",
        partOfSpeech: "Іменник",
        definition: "Ніч, час темряви. Метафорично - час спокою або випробувань.",
        semanticRange: ["ніч", "темрява"],
        usages: [
            { ref: "Псалми 1:2", text: "...вдень та <mark>вночі</mark> він роздумує!" },
            { ref: "Буття 1:5", text: "...а темряву назвав <mark>ніччю</mark>." },
            { ref: "Псалми 19:2", text: "...а <mark>ніч</mark> ночі показує думку." },
            { ref: "Псалми 119:55", text: "У<mark>ночі</mark> Твоє Ймення я згадую, Господи, і держуся Закону Твого." }
        ]
    },

    // --- VERSE 3 ---
    "буде": {
        strongs: "1961 (hayah)",
        original: "הָיָה",
        transliteration: "hayah",
        pronunciation: "haw-YAH",
        partOfSpeech: "Дієслово",
        definition: "Ставати, бути, траплятися.",
        semanticRange: ["бути", "ставати"],
        usages: [
            { ref: "Псалми 1:3", text: "І він <mark>буде</mark>, як дерево..." },
            { ref: "Буття 1:3", text: "І сказав Бог: Нехай <mark>станеться</mark> світло! І <mark>сталося</mark> світло." },
            { ref: "Вихід 3:14", text: "І сказав Бог Мойсеєві: Я <mark>Той, Хто Є</mark>." }
        ]
    },
    "дерево": {
        strongs: "6086 (ets)",
        original: "עֵץ",
        transliteration: "ets",
        pronunciation: "ayts",
        partOfSpeech: "Іменник",
        definition: "Рослина з твердим стовбуром; також деревина.",
        semanticRange: ["дерево", "деревина"],
        usages: [
            { ref: "Псалми 1:3", text: "І він буде, як <mark>дерево</mark>, над водним потоком посаджене..." },
            { ref: "Буття 2:9", text: "І зростив Господь Бог із землі кожне <mark>дерево</mark>, принадне на вигляд і на їжу смачне, і <mark>дерево</mark> життя посеред раю..." },
            { ref: "Псалми 92:12", text: "Праведний цвістиме, як пальма, підійметься, мов кедр (<mark>дерево</mark>) на Ливані." }
        ]
    },
    "посаджене": {
        strongs: "8362 (shathal)",
        original: "שָׁתַל",
        transliteration: "shathal",
        pronunciation: "shaw-THAL",
        partOfSpeech: "Дієслово (пасив)",
        definition: "Пересаджене. Вказує на те, що дерево не виросло там само по собі, а було цілеспрямовано поміщене туди.",
        semanticRange: ["саджати", "пересаджувати"],
        usages: [
            { ref: "Псалми 1:3", text: "...як дерево, над водним потоком <mark>посаджене</mark>..." },
            { ref: "Єремія 17:8", text: "І він буде, як дерево те, над водою <mark>посаджене</mark>..." },
            { ref: "Псалми 92:13", text: "<mark>Посаджені</mark> в домі Господнім, цвітуть на подвір'ях нашого Бога!" }
        ]
    },
    "потоків": {
        strongs: "6388 (peleg)",
        original: "פֶּלֶג",
        transliteration: "peleg",
        pronunciation: "PEH-leg",
        partOfSpeech: "Іменник",
        definition: "Штучні зрошувальні канали або природні струмки, що забезпечують постійне живлення.",
        semanticRange: ["потік", "канал", "струмок"],
        usages: [
            { ref: "Псалми 1:3", text: "...над водним <mark>потоком</mark> посаджене..." },
            { ref: "Псалми 46:4", text: "Річка, її <mark>потоки</mark> будуть веселити місто Боже..." },
            { ref: "Псалми 65:9", text: "Божий <mark>потік</mark> повний води..." },
            { ref: "Ісая 30:25", text: "І на кожній горі високій та на кожнім піднесенім пагірку будуть <mark>потоки</mark>..." }
        ]
    },
    "вод": {
        strongs: "4325 (mayim)",
        original: "מַיִם",
        transliteration: "mayim",
        pronunciation: "MAH-yim",
        partOfSpeech: "Іменник",
        definition: "Вода, джерело життя. Часто символізує Боже благословення або Духа.",
        semanticRange: ["вода", "води"],
        usages: [
            { ref: "Псалми 1:3", text: "...над <mark>водним</mark> потоком посаджене..." },
            { ref: "Буття 1:2", text: "...і Дух Божий ширяв над поверхнею <mark>води</mark>." },
            { ref: "Ісая 55:1", text: "О, всі спраглі, йдіть до <mark>води</mark>!" },
            { ref: "Псалми 42:1", text: "Як лине той олень до <mark>водних</mark> потоків, так лине до Тебе, о Боже, душа моя..." }
        ]
    },
    "приносить": {
        strongs: "5414 (nathan)",
        original: "נָתַן",
        transliteration: "nathan",
        pronunciation: "naw-THAN",
        partOfSpeech: "Дієслово",
        definition: "Давати, виробляти, приносити.",
        semanticRange: ["давати", "приносити"],
        usages: [
            { ref: "Псалми 1:3", text: "...що <mark>родить</mark> (приносить) свій плід своєчасно..." },
            { ref: "Буття 1:29", text: "Оце <mark>дав</mark> Я вам усю ярину..." },
            { ref: "Псалми 84:11", text: "Бо сонце та щит Господь Бог, Господь <mark>дає</mark> милість та славу..." },
            { ref: "Ісая 9:6", text: "Бо Дитя народилося нам, <mark>даний</mark> нам Син..." }
        ]
    },
    "плід": {
        strongs: "6529 (peri)",
        original: "פְּרִי",
        transliteration: "peri",
        pronunciation: "peh-REE",
        partOfSpeech: "Іменник",
        definition: "Результат, урожай, нащадок.",
        semanticRange: ["фрукт", "плід", "наслідок"],
        usages: [
            { ref: "Псалми 1:3", text: "...що родить свій <mark>плід</mark> своєчасно..." },
            { ref: "Буття 1:11", text: "Нехай земля вродить... дерево <mark>овочеве</mark>, що за родом своїм <mark>плід</mark> приносить..." },
            { ref: "Псалми 127:3", text: "Діти спадщина Господня, <mark>плід</mark> утроби нагорода!" },
            { ref: "Приповісті 11:30", text: "<mark>Плід</mark> праведного дерево життя, і мудрий життя набуває." }
        ]
    },
    "своєчасно": {
        strongs: "6256 (eth)",
        original: "עֵת",
        transliteration: "eth",
        pronunciation: "ayth",
        partOfSpeech: "Іменник",
        definition: "Час, пора, сезон.",
        semanticRange: ["час", "сезон"],
        usages: [
            { ref: "Псалми 1:3", text: "...що родить свій плід <mark>своєчасно</mark>..." },
            { ref: "Екклезіяста 3:1", text: "Для всього свій <mark>час</mark>, і <mark>година</mark> своя кожній справі під небом..." },
            { ref: "Псалми 104:27", text: "Усі вони Пана чекають, щоб поживу їм дав <mark>своєчасно</mark>." }
        ]
    },
    "в'яне": {
        strongs: "5034 (nabel)",
        original: "נָבֵל",
        transliteration: "nabel",
        pronunciation: "naw-BEL",
        partOfSpeech: "Дієслово",
        definition: "В'янути, сохнути, занепадати.",
        semanticRange: ["в'янути", "сохнути"],
        usages: [
            { ref: "Псалми 1:3", text: "...і що листя не <mark>в'яне</mark> його..." },
            { ref: "Ісая 40:8", text: "Трава засихає, квіт <mark>в'яне</mark>, а Слово нашого Бога стоїть повік!" },
            { ref: "Псалми 37:2", text: "Бо підтяті вони будуть скоро, як трава, і <mark>зів'януть</mark>, як зілля зелене!" }
        ]
    },
    "листя": {
        strongs: "5929 (aleh)",
        original: "עָלֶה",
        transliteration: "aleh",
        pronunciation: "aw-LEH",
        partOfSpeech: "Іменник",
        definition: "Лист, листя дерева.",
        semanticRange: ["лист", "листя"],
        usages: [
            { ref: "Псалми 1:3", text: "...і що <mark>листя</mark> не в'яне його..." },
            { ref: "Буття 3:7", text: "І зшили вони фіґові <mark>листя</mark>, і зробили опаски собі." },
            { ref: "Буття 8:11", text: "...аж ось <mark>листочок</mark> оливний зірваний в дзьобі її." }
        ]
    },
    "робить": {
        strongs: "6213 (asah)",
        original: "עָשָׂה",
        transliteration: "asah",
        pronunciation: "aw-SAH",
        partOfSpeech: "Дієслово",
        definition: "Робити, творити, виконувати.",
        semanticRange: ["робити", "творити"],
        usages: [
            { ref: "Псалми 1:3", text: "...і все, що він <mark>чинить</mark>, щаститься йому!" },
            { ref: "Буття 1:1", text: "На початку Бог <mark>створив</mark> Небо та землю." },
            { ref: "Буття 1:26", text: "І сказав Бог: <mark>Створімо</mark> людину за образом Нашим..." },
            { ref: "Псалми 115:3", text: "Бог же наш на небесах, усе, що хотів, Він <mark>учинив</mark>!" }
        ]
    },
    "успіх": {
        strongs: "6743 (tsalach)",
        original: "צָלַח",
        transliteration: "tsalach",
        pronunciation: "tsaw-LAKH",
        partOfSpeech: "Дієслово",
        definition: "Процвітати, досягати мети, бути успішним.",
        semanticRange: ["процвітати", "вдаватися"],
        usages: [
            { ref: "Псалми 1:3", text: "...і все, що він чинить, <mark>щаститься</mark> йому!" },
            { ref: "Буття 39:2", text: "І був Господь з Йосипом, і він став чоловіком, що мав <mark>успіх</mark>..." },
            { ref: "Ісуса Навина 1:8", text: "...бо тоді зробиш <mark>щасливими</mark> дороги свої, і тоді буде <mark>щастити</mark> тобі." },
            { ref: "Псалми 118:25", text: "Просимо, Господи, спаси! Просимо, Господи, <mark>пощасти</mark>!" }
        ]
    },

    // --- VERSE 4 ---
    "так": {
        strongs: "3651 (ken)",
        original: "כֵּן",
        transliteration: "ken",
        pronunciation: "ken",
        partOfSpeech: "Прислівник",
        definition: "Таким чином, правильно, чесно.",
        semanticRange: ["так", "таким чином"],
        usages: [
            { ref: "Псалми 1:4", text: "Не <mark>так</mark> нечестиві..." },
            { ref: "Буття 1:7", text: "...І сталося <mark>так</mark>." },
            { ref: "Вихід 10:29", text: "І сказав Мойсей: <mark>Слушно</mark> ти сказав..." }
        ]
    },
    "полова": {
        strongs: "4671 (mots)",
        original: "מֹץ",
        transliteration: "mots",
        pronunciation: "mose",
        partOfSpeech: "Іменник",
        definition: "Лушпиння від зерна, яке легко здувається вітром. Символ нікчемності та нестійкості.",
        semanticRange: ["лушпиння", "полова"],
        usages: [
            { ref: "Псалми 1:4", text: "...бо вони як <mark>полова</mark>, що вітер її розвіває!" },
            { ref: "Псалми 35:5", text: "Нехай стануть вони, як <mark>полова</mark> на вітрі..." },
            { ref: "Ісая 17:13", text: "...і буде гнаний, немов та <mark>полова</mark> на горах за вітром..." },
            { ref: "Йов 21:18", text: "Вони будуть, немов та солома на вітрі, і немов та <mark>полова</mark>, що буря схопила її!" }
        ]
    },
    "вітер": {
        strongs: "7307 (ruach)",
        original: "רוּחַ",
        transliteration: "ruach",
        pronunciation: "ROO-akh",
        partOfSpeech: "Іменник",
        definition: "Дихання, вітер, дух. Сила, що приводить в рух.",
        semanticRange: ["вітер", "дух", "подих"],
        usages: [
            { ref: "Псалми 1:4", text: "...бо вони як полова, що <mark>вітер</mark> її розвіває!" },
            { ref: "Буття 1:2", text: "...і <mark>Дух</mark> Божий ширяв над поверхнею води." },
            { ref: "Псалми 104:4", text: "Ти робиш духів анголами Своїми, палючий огонь Своїми <mark>слугами</mark> (вітром)." },
            { ref: "Екклезіяста 1:6", text: "Іде на південь і обертається на північ, крутиться, крутиться <mark>вітер</mark>, і на круги свої вертається <mark>вітер</mark>..." }
        ]
    },
    "розвіває": {
        strongs: "5086 (nadaph)",
        original: "נָדַף",
        transliteration: "nadaph",
        pronunciation: "naw-DAF",
        partOfSpeech: "Дієслово",
        definition: "Розганяти, розвіювати, гнати.",
        semanticRange: ["розвіювати", "гнати"],
        usages: [
            { ref: "Псалми 1:4", text: "...бо вони як полова, що вітер її <mark>розвіває</mark>!" },
            { ref: "Псалми 68:2", text: "Як <mark>розвіюється</mark> дим, так їх <mark>розвій</mark>..." },
            { ref: "Приповісті 21:6", text: "Здобування скарбів лживим язиком це марнота, що <mark>минає</mark>, це шукання смерти." }
        ]
    },

    // --- VERSE 5 ---
    "встоять": {
        strongs: "6965 (qum)",
        original: "קוּם",
        transliteration: "qum",
        pronunciation: "koom",
        partOfSpeech: "Дієслово",
        definition: "Вставати, стояти, підніматися.",
        semanticRange: ["вставати", "стояти"],
        usages: [
            { ref: "Псалми 1:5", text: "Ось тому то не <mark>встоять</mark> безбожні на суді..." },
            { ref: "Псалми 3:7", text: "<mark>Воскресни</mark>, Господи, спаси мене, Боже мій..." },
            { ref: "Ісая 40:8", text: "Трава засихає, квіт в'яне, а Слово нашого Бога <mark>стоїть</mark> повік!" },
            { ref: "Ісая 60:1", text: "<mark>Уставай</mark>, світися, Єрусалиме, бо прийшло твоє світло..." }
        ]
    },
    "суді": {
        strongs: "4941 (mishpat)",
        original: "מִשְׁפָּט",
        transliteration: "mishpat",
        pronunciation: "mish-PAT",
        partOfSpeech: "Іменник",
        definition: "Суд, справедливість, вирок, правосуддя.",
        semanticRange: ["суд", "справедливість", "закон"],
        usages: [
            { ref: "Псалми 1:5", text: "Ось тому то не встоять безбожні на <mark>суді</mark>..." },
            { ref: "Псалми 89:14", text: "Правосуддя й <mark>справедливість</mark> підстава престолу Твого..." },
            { ref: "Ісая 1:17", text: "Навчіться чинити добро, шукайте <mark>правди</mark>, рятуйте пригнобленого..." },
            { ref: "Михея 6:8", text: "Було тобі виявлено, о людино, що добре, і чого жадає від тебе Господь, нічого, а тільки чинити <mark>правосуддя</mark>, і милосердя любити..." }
        ]
    },
    "праведних": {
        strongs: "6662 (tsaddiq)",
        original: "צַדִּיק",
        transliteration: "tsaddiq",
        pronunciation: "tsad-DEEK",
        partOfSpeech: "Прикметник",
        definition: "Той, хто правий, справедливий, виправданий Богом.",
        semanticRange: ["праведний", "справедливий"],
        usages: [
            { ref: "Псалми 1:5", text: "...ані грішники у зборі <mark>праведних</mark>!" },
            { ref: "Псалми 1:6", text: "Дорогу бо <mark>праведних</mark> знає Господь..." },
            { ref: "Буття 6:9", text: "...Ной був чоловік <mark>праведний</mark> і невинний у своїх поколіннях..." },
            { ref: "Приповісті 10:7", text: "Пам'ять <mark>праведного</mark> на благословення, а ім'я нечестивих згниє." }
        ]
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
        usages: [
            { ref: "Псалми 1:6", text: "Дорогу бо праведних <mark>знає</mark> Господь..." },
            { ref: "Буття 4:1", text: "І Адам <mark>пізнав</mark> Єву, жінку свою..." },
            { ref: "Псалми 139:1", text: "Господи, випробував Ти мене та й <mark>пізнав</mark>..." },
            { ref: "Єремія 1:5", text: "Ще поки тебе вформував в утробі матерній, Я <mark>пізнав</mark> був тебе..." }
        ]
    },
    "путь": {
        strongs: "1870 (derek)",
        original: "דֶּרֶךְ",
        transliteration: "derek",
        pronunciation: "DEH-rek",
        partOfSpeech: "Іменник",
        definition: "Дорога, шлях, спосіб життя.",
        semanticRange: ["шлях", "дорога"],
        usages: [
            { ref: "Псалми 1:6", text: "<mark>Дорогу</mark> бо праведних знає Господь, а <mark>дорога</mark> безбожних загине!" },
            { ref: "Псалми 119:105", text: "Для моєї ноги Твоє слово світильник, то світло для <mark>стежки</mark> моєї." }
        ]
    },
    "загине": {
        strongs: "6 (abad)",
        original: "אָבַד",
        transliteration: "abad",
        pronunciation: "aw-BAD",
        partOfSpeech: "Дієслово",
        definition: "Гинути, зникати, бути знищеним.",
        semanticRange: ["гинути", "зникати"],
        usages: [
            { ref: "Псалми 1:6", text: "...а дорога безбожних <mark>загине</mark>!" },
            { ref: "Псалми 2:12", text: "Шануйте Сина, щоб Він не розгнівався, і щоб вам не <mark>загинути</mark> в дорозі..." },
            { ref: "Йов 3:3", text: "Нехай <mark>згине</mark> той день, що я в ньому родився..." },
            { ref: "Псалми 119:92", text: "Коли б не Закон Твій, розрада моя, то я був би <mark>загинув</mark> в недолі своїй!" }
        ]
    }
};
