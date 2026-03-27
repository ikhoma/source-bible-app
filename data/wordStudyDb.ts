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

export const WORD_STUDY_DB_EN: Record<string, WordStudyData> = {
    // --- FUNCTIONAL WORDS / PARTICLES ---
    "which": {
        strongs: "834 (asher)",
        original: "אֲשֶׁר",
        transliteration: "asher",
        partOfSpeech: "Relative pronoun",
        definition: "Which, which, that. Indicates the relationship between the parts of the sentence.",
        semanticRange: ["which", "What", "where", "When"],
        isFunctional: true
    },
    "not": {
        strongs: "3808 (lo)",
        original: "לֹא",
        transliteration: "lo",
        partOfSpeech: "Particle",
        definition: "No, no. Absolute denial.",
        semanticRange: ["No", "not"],
        isFunctional: true
    },
    "and": {
        strongs: "— (ve)",
        original: "וְ",
        transliteration: "ve",
        partOfSpeech: "Conjunction (prefix)",
        definition: "And, and, but. Connects words or sentences (Bav sequence).",
        semanticRange: ["and", "and", "and"],
        isFunctional: true
    },
    "on": {
        strongs: "5921 (al) / (ba)",
        original: "עַל / בְּ",
        transliteration: "al / ba",
        partOfSpeech: "Preposition",
        definition: "On, in, at. Indicates location or direction.",
        semanticRange: ["on", "over", "against"],
        isFunctional: true
    },
    "in": {
        strongs: "— (be)",
        original: "בְּ",
        transliteration: "be",
        partOfSpeech: "Preposition (prefix)",
        definition: "In, in, inside.",
        semanticRange: ["in", "in", "among"],
        isFunctional: true
    },
    "in": {
        strongs: "— (be)",
        original: "בְּ",
        transliteration: "be",
        partOfSpeech: "Preposition (prefix)",
        definition: "In, in, with help.",
        semanticRange: ["in", "through"],
        isFunctional: true
    },
    "but": {
        strongs: "3588 (ki)",
        original: "כִּי",
        transliteration: "ki",
        partOfSpeech: "Conjunction",
        definition: "Because, but, because. Logical transition.",
        semanticRange: ["for", "but", "if"],
        isFunctional: true
    },
    "he": {
        strongs: "1931 (hu)",
        original: "הוּא",
        transliteration: "hu",
        partOfSpeech: "Pronoun",
        definition: "He, that Indicates a person.",
        semanticRange: ["he", "the same"],
        isFunctional: true
    },
    "about": {
        strongs: "—",
        original: "—",
        transliteration: "—",
        partOfSpeech: "Preposition",
        definition: "About, relatively. Used to indicate a topic.",
        isFunctional: true
    },
    "its": {
        strongs: "— (suffix)",
        original: "וֹ",
        transliteration: "o",
        partOfSpeech: "Pronoun (suffix)",
        definition: "His, belonging to him.",
        semanticRange: ["its"],
        isFunctional: true
    },

    // --- VERSE 1 ---
    "blessed": {
        strongs: "835 (esher')",
        original: "אֶשֶׁר",
        transliteration: "esher",
        pronunciation: "EH-sher",
        partOfSpeech: "Noun, plural (construct)",
        semanticRange: ["happiness", "bliss", "successful movement forward"],
        definition: "An exclamation describing the objective state of a person's blessing and happiness.",
        notDefinition: "Material wealth in itself or temporary joy.",
        usages: [
            { ref: "Psalms 1:1", text: "<mark>Blessed</mark> a man who does not walk in the counsel of the unjust, and does not stand in the way of sinners, and does not sit in the seat of evil-doers" },
            { ref: "Psalms 32:1", text: "<mark>Blessed</mark>, to whom crime is given, to whom sin is forgiven," },
            { ref: "Psalms 33:12", text: "<mark>Blessed</mark> that people whose God is the Lord, the people whom He chose for His inheritance!" },
            { ref: "Psalms 41:2", text: "<mark>Blessed</mark> who cares for the poor, the Lord will save him in the day of misfortune!" },
            { ref: "Psalms 84:5", text: "<mark>Blessed</mark> who dwell in Your house, they will praise You forever!" },
            { ref: "Proverbs 8:34", text: "<mark>Blessed</mark> the man who listens to Me, to watch at My door day by day, to keep watch at the gates of My entrance!" }
        ],
        typicalConstruction: "אֲשְׁרֵי + person",
        origin: {
            strongs: "H833",
            transliteration: "ashar",
            original: "אָשַׁר"
        }
    },
    "man": {
        strongs: "376 (ish)",
        original: "אִישׁ",
        transliteration: "ish",
        pronunciation: "eesh",
        partOfSpeech: "Noun masculine",
        semanticRange: ["man", "person", "warrior"],
        definition: "Denotes the man as an individual, often with an emphasis on his strength or character.",
        notDefinition: "Just \"mankind\" (like adam).",
        usages: [
            { ref: "Psalms 1:1", text: "Blessed is the <mark>man</mark> who does not walk in the counsel of the wicked, and does not stand in the way of sinners, and does not sit in the seat of scoffers" },
            { ref: "Genesis 2:23", text: "...she shall be called <mark>woman</mark>, because she was taken out of <mark>man</mark>." },
            { ref: "Job 1:1", text: "There was a <mark>man</mark> in the land of Uz, whose name was Job. And that <mark>man</mark> was blameless and upright..." },
            { ref: "Psalms 112:1", text: "Hallelujah! Blessed is the <mark>man</mark> who fears the Lord, who greatly delights in His commandments!" }
        ]
    },
    "walks": {
        strongs: "1980 (halak)",
        original: "הָלַךְ",
        transliteration: "halak",
        pronunciation: "haw-LAK",
        partOfSpeech: "Verb",
        semanticRange: ["go", "behave", "live"],
        definition: "Literally means to move, but is often used metaphorically to describe a way of life and behavior.",
        usages: [
            { ref: "Psalms 1:1", text: "Blessed is the man who does not follow the advice of the unjust..." },
            { ref: "Genesis 5:24", text: "And <mark>walked</mark> Enoch was with God, and he was no more, because God took him away." },
            { ref: "Genesis 6:9", text: "...Noah was a righteous and innocent man in his generations, Noah was with God <mark>walked</mark>." },
            { ref: "Psalms 15:2", text: "He who <mark>walks</mark> blamelessly, and does justice, and speaks the truth in his heart..." },
            { ref: "Proverbs 13:20", text: "He who <mark>walks</mark> with the wise becomes wise, but he who associates with the foolish will acquire misfortune." }
        ]
    },
    "council": {
        strongs: "6098 (etsah)",
        original: "עֵצָה",
        transliteration: "etsah",
        pronunciation: "ay-TSAW",
        partOfSpeech: "Noun feminine",
        semanticRange: ["advice", "plan", "plan"],
        definition: "A plan of action or way of thinking. It means adopting a worldview.",
        usages: [
            { ref: "Psalms 1:1", text: "Blessed is the man who does not follow the <mark>advice</mark> of the unjust..." },
            { ref: "Psalms 33:11", text: "<mark>Rada</mark> The Lord stands forever, the thoughts of His Heart from generation to generation." },
            { ref: "Proverbs 19:20", text: "Hear <mark>advice</mark> and accept reproof, that you may become wise at your end." },
            { ref: "Isaiah 46:10", text: "...My <mark>plan</mark> will come true, and I will do everything I want!" }
        ],
        origin: {
            strongs: "H3289",
            transliteration: "yaats",
            original: "יָעַץ"
        }
    },
    "wicked": {
        strongs: "7563 (rasha)",
        original: "רָשָׁע",
        transliteration: "rasha",
        pronunciation: "raw-SHAW",
        partOfSpeech: "Adjective",
        semanticRange: ["offender", "guilty", "unstable"],
        definition: "Morally unstable, one who actively violates God's order. In Ohienko's translation, it is most often \"unjust\" or \"godless\".",
        usages: [
            { ref: "Psalms 1:1", text: "Blessed is the man who does not follow the advice of the <mark>unjust</mark>..." },
            { ref: "Psalms 1:4", text: "Not so <mark>the wicked</mark>, for they are like chaff that the wind blows away!" },
            { ref: "Psalms 1:5", text: "That is why the <mark>godless</mark> will not stand in court..." },
            { ref: "Psalms 1:6", text: "...and the way <mark>of the wicked</mark> will perish!" },
            { ref: "Isaiah 57:20", text: "And the <mark>wicked</mark> is like a raging sea, when it cannot calm down..." }
        ],
        origin: {
            strongs: "H7561",
            transliteration: "rasha",
            original: "רָשַׁע"
        }
    },
    "is standing": {
        strongs: "5975 (amad)",
        original: "עָמַד",
        transliteration: "amad",
        pronunciation: "aw-MAD",
        partOfSpeech: "Verb",
        semanticRange: ["stand", "remain", "to be stable"],
        definition: "Take a position. Indicates a more permanent involvement in something than \"walking\".",
        usages: [
            { ref: "Psalms 1:1", text: "...and not <mark>stands</mark> in the way of sinners..." },
            { ref: "Psalms 24:3", text: "Who will ascend the Lord's mountain, and who will <mark>stand</mark> in His holy place?" },
            { ref: "Psalms 33:11", text: "The Lord's Council <mark>stands</mark> forever..." },
            { ref: "Psalms 130:3", text: "If, Lord, you will pay attention to iniquity, who <mark>resist</mark>, Lord?" }
        ]
    },
    "way": {
        strongs: "1870 (derek)",
        original: "דֶּרֶךְ",
        transliteration: "derek",
        pronunciation: "DEH-rek",
        partOfSpeech: "Noun masculine",
        semanticRange: ["road", "way", "lifestyle"],
        definition: "A trodden path. Metaphorically - a habitual way of life or behavior.",
        usages: [
            { ref: "Psalms 1:1", text: "...and does not stand in the <mark>path</mark> of sinners..." },
            { ref: "Psalms 1:6", text: "<mark>The way</mark> because the Lord knows the righteous, and <mark>the way</mark> the wicked will perish!" },
            { ref: "Psalms 119:1", text: "Blessed are the innocent in the <mark>road</mark> who walk in the Law of the Lord!" },
            { ref: "Proverbs 3:6", text: "Acknowledge him in all your <mark>roads</mark>, and he will make your paths straight." },
            { ref: "Isaiah 55:8", text: "For your thoughts are not my thoughts, but <mark>ways</mark> Mine are not your <mark>ways</mark>, says the Lord." }
        ],
        origin: {
            strongs: "H1869",
            transliteration: "darak",
            original: "דָּרַךְ"
        }
    },
    "sinners": {
        strongs: "2400 (chatta)",
        original: "חַטָּא",
        transliteration: "chatta",
        pronunciation: "khat-TAW",
        partOfSpeech: "Noun",
        semanticRange: ["sinner", "one who errs"],
        definition: "One who goes astray or misses the mark (God's will).",
        usages: [
            { ref: "Psalms 1:1", text: "...and does not stand in the way of <mark>sinners</mark>..." },
            { ref: "Psalms 1:5", text: "...nor <mark>sinners</mark> in the congregation of the righteous!" },
            { ref: "Psalms 51:7", text: "So I was born in iniquity, and in <mark>sin</mark> my mother conceived me." },
            { ref: "Proverbs 1:10", text: "My son, as <mark>sinners</mark> will persuade you, do not agree with them!" }
        ],
        origin: {
            strongs: "H2398",
            transliteration: "chata",
            original: "חָטָא"
        }
    },
    "is sitting": {
        strongs: "3427 (yashab)",
        original: "יָשַׁב",
        transliteration: "yashab",
        pronunciation: "yaw-SHAB",
        partOfSpeech: "Verb",
        semanticRange: ["sit", "live", "live"],
        definition: "Complete identification and settlement. The deepest level of involvement in sin is in this progression.",
        usages: [
            { ref: "Psalms 1:1", text: "...and not <mark>sits</mark> on the seat of evil-doers." },
            { ref: "Psalms 2:4", text: "He who <mark>sits</mark> in the heavens will laugh..." },
            { ref: "Psalms 91:1", text: "Who <mark>lives</mark> under the protection of the Most High, who dwells in the shadow of the Almighty..." },
            { ref: "Psalms 27:4", text: "One thing I ask from the Lord, I will long for <mark>stay</mark> me in the house of the Lord all the days of my life..." }
        ]
    },
    "assembly": {
        strongs: "4186 (moshab)",
        original: "מוֹשָׁב",
        transliteration: "moshab",
        pronunciation: "mo-SHAB",
        partOfSpeech: "Noun",
        semanticRange: ["seat", "meeting place", "settlement"],
        definition: "A place where people gather or live. Meeting, company. In Ohienko there is a ``seat''.",
        usages: [
            { ref: "Psalms 1:1", text: "...and does not sit on the <mark>seat</mark> of ill-wishers." },
            { ref: "Departure at 12:40", text: "And the time <mark>residence</mark> of the children of Israel, who were sitting in Egypt, four hundred and thirty years." },
            { ref: "Leviticus 25:29", text: "And when someone sells <mark>housing</mark> in a brick city..." },
            { ref: "Psalms 107:32", text: "Let them exalt Him in the assembly of the people, and let them praise Him in the <mark>meeting</mark> of the elders!" }
        ],
        origin: {
            strongs: "H3427",
            transliteration: "yashab",
            original: "יָשַׁב"
        }
    },
    "evil year": {
        strongs: "3887 (litz)",
        original: "לִיץ",
        transliteration: "litz",
        pronunciation: "leets",
        partOfSpeech: "Verb (participle)",
        definition: "Mockers, cynics who openly mock righteousness (in Ohienko: ``slanderers'').",
        semanticRange: ["scoffer", "fool"],
        usages: [
            { ref: "Psalms 1:1", text: "...and does not sit on the seat <mark>zlorikiv</mark>." },
            { ref: "Proverbs 3:34", text: "<mark>mockers</mark> He mocks, but gives mercy to the meek." },
            { ref: "Proverbs 9:7", text: "Whoever chastises <mark>a scoffer</mark> takes shame upon himself..." },
            { ref: "Proverbs 14:6", text: "He seeks <mark>mocker</mark> wisdom, but in vain, but knowledge is easy for the intelligent." }
        ]
    },

    // --- VERSE 2 ---
    "laws": {
        strongs: "8451 (torah)",
        original: "תּוֹרָה",
        transliteration: "torah",
        pronunciation: "to-RAH",
        partOfSpeech: "Noun feminine",
        semanticRange: ["teaching", "instruction", "law"],
        definition: "Divine instruction or teaching. Indicates the direction that God gives to man.",
        usages: [
            { ref: "Psalms 1:2", text: "But in the Lord's <mark>Law</mark> his delight, and about His <mark>Law</mark> day and night he meditates!" },
            { ref: "Psalms 19:8", text: "<mark>Law</mark> God's perfect, it revives the soul..." },
            { ref: "Psalms 119:97", text: "How I love Your <mark>Law</mark>, it is my conversation all day long!" },
            { ref: "Isaiah 2:3", text: "For the <mark>Law</mark> will go out of Zion, and the Word of the Lord from Jerusalem." }
        ],
        origin: {
            strongs: "H3384",
            transliteration: "yarah",
            original: "יָרָה"
        }
    },
    "Lord's": {
        strongs: "3068 (YHWH)",
        original: "יהוה",
        transliteration: "Yahweh",
        pronunciation: "yah-WEH",
        partOfSpeech: "Proper name",
        definition: "Personal name of the God of the Covenant. I AM That I Am.",
        semanticRange: ["the Lord", "Yahweh", "Mere"],
        usages: [
            { ref: "Psalms 1:2", text: "But in <mark>God's</mark> Law his delight..." },
            { ref: "Psalms 1:6", text: "For the righteous know the way <mark>God</mark>..." },
            { ref: "Exit 3:15", text: "...<mark>Lord</mark>, the God of your fathers... This is My Name forever..." },
            { ref: "Psalms 23:1", text: "<mark>Lord</mark> is my Shepherd, so I will not be in want..." }
        ]
    },
    "pleasure": {
        strongs: "2656 (chephets)",
        original: "חֵפֶץ",
        transliteration: "chephets",
        pronunciation: "KHAY-fets",
        partOfSpeech: "Noun",
        definition: "Deep desire, satisfaction, joy from something.",
        semanticRange: ["desire", "joy", "preferences"],
        usages: [
            { ref: "Psalms 1:2", text: "But in the Law of the Lord his <mark>pleasure</mark>..." },
            { ref: "Psalms 16:3", text: "To the saints on earth, to the nobles, to them all <mark>desire</mark> is mine!" },
            { ref: "Isaiah 53:10", text: "But the <mark>will</mark> of the Lord will turn out happily for him." },
            { ref: "Ecclesiastes 3:1", text: "There is a time for everything, and an hour for every <mark>business</mark> (desire) under heaven..." }
        ]
    },
    "ponders": {
        strongs: "1897 (hagah)",
        original: "הָגָה",
        transliteration: "hagah",
        pronunciation: "haw-GAH",
        partOfSpeech: "Verb",
        definition: "To mumble, to read softly, to think deeply. A low-pitched sound (like a lion growling).",
        semanticRange: ["meditate", "speak", "conceive"],
        usages: [
            { ref: "Psalms 1:2", text: "...and about His Law day and night he <mark>ponders</mark>!" },
            { ref: "Joshua 1:8", text: "Do not let the book of this Law depart from your mouth, but you will <mark>meditate</mark> on it day and night..." },
            { ref: "Psalms 2:1", text: "Why do the tribes rebel, and the nations <mark>conspire</mark> in vain?" },
            { ref: "Isaiah 31:4", text: "...Like a lion that <mark>snarls</mark>, and a lion cub over his prey..." }
        ]
    },
    "during the day": {
        strongs: "3117 (yom)",
        original: "יוֹם",
        transliteration: "yom",
        pronunciation: "yome",
        partOfSpeech: "Noun",
        definition: "Period of light, day. Metaphorically - the time of activity or life.",
        semanticRange: ["day", "time", "era"],
        usages: [
            { ref: "Psalms 1:2", text: "...in <mark>day</mark> and at night he ponders!" },
            { ref: "Genesis 1:5", text: "And God called the light <mark>day</mark>, and the darkness he called night." },
            { ref: "Psalms 19:2", text: "<mark>Day</mark> to the day announces the word..." },
            { ref: "Psalms 118:24", text: "This <mark>day</mark> that the Lord has created, let us rejoice and be glad in it!" }
        ]
    },
    "at night": {
        strongs: "3915 (laylah)",
        original: "לַיְלָה",
        transliteration: "laylah",
        pronunciation: "lay-LAW",
        partOfSpeech: "Noun",
        definition: "Night, the time of darkness. Metaphorically - a time of peace or trials.",
        semanticRange: ["night", "darkness"],
        usages: [
            { ref: "Psalms 1:2", text: "...day and <mark>night</mark> he ponders!" },
            { ref: "Genesis 1:5", text: "...and called the darkness <mark>night</mark>." },
            { ref: "Psalms 19:2", text: "...and <mark>night</mark> night shows thought." },
            { ref: "Psalms 119:55", text: "In<mark>night</mark> I remember Your Name, Lord, and I keep Your Law." }
        ]
    },

    // --- VERSE 3 ---
    "will be": {
        strongs: "1961 (hayah)",
        original: "הָיָה",
        transliteration: "hayah",
        pronunciation: "haw-YAH",
        partOfSpeech: "Verb",
        definition: "To become, to be, to happen.",
        semanticRange: ["be", "become"],
        usages: [
            { ref: "Psalms 1:3", text: "And he <mark>will</mark> be like a tree..." },
            { ref: "Genesis 1:3", text: "And God said: Let there be light! And <mark>happened</mark> light." },
            { ref: "Exodus 3:14", text: "And God said to Moses: I <mark>He Who Is</mark>." }
        ]
    },
    "tree": {
        strongs: "6086 (ets)",
        original: "עֵץ",
        transliteration: "ets",
        pronunciation: "ayts",
        partOfSpeech: "Noun",
        definition: "A plant with a solid trunk; also wood.",
        semanticRange: ["tree", "wood"],
        usages: [
            { ref: "Psalms 1:3", text: "And he will be like a <mark>tree</mark> planted over a stream of water..." },
            { ref: "Genesis 2:9", text: "And the Lord God grew out of the earth every <mark>tree</mark>, attractive in appearance and tasty for food, and <mark>tree</mark> life in the middle of paradise..." },
            { ref: "Psalms 92:12", text: "The righteous will flourish like a palm tree, will rise like a cedar (<mark>tree</mark>) in Lebanon." }
        ]
    },
    "planted": {
        strongs: "8362 (shathal)",
        original: "שָׁתַל",
        transliteration: "shathal",
        pronunciation: "shaw-THAL",
        partOfSpeech: "Verb (passive)",
        definition: "Transplanted. Indicates that the tree did not grow there by itself, but was purposefully placed there.",
        semanticRange: ["plant", "transplant"],
        usages: [
            { ref: "Psalms 1:3", text: "...like a tree, above a stream of water <mark>planted</mark>..." },
            { ref: "Jeremiah 17:8", text: "And he will be like that tree above the water <mark>planted</mark>..." },
            { ref: "Psalms 92:13", text: "<mark>Planted</mark> in the house of the Lord, blooming in the courtyards of our God!" }
        ]
    },
    "flows": {
        strongs: "6388 (peleg)",
        original: "פֶּלֶג",
        transliteration: "peleg",
        pronunciation: "PEH-leg",
        partOfSpeech: "Noun",
        definition: "Artificial irrigation canals or natural streams providing constant power.",
        semanticRange: ["flow", "channel", "stream"],
        usages: [
            { ref: "Psalms 1:3", text: "...above the water <mark>stream</mark> planted..." },
            { ref: "Psalms 46:4", text: "The river, its <mark>flows</mark> will cheer the city of God..." },
            { ref: "Psalms 65:9", text: "God's <mark>stream</mark> is full of water..." },
            { ref: "Isaiah 30:25", text: "And on every high mountain and on every high hill there will be <mark>streams</mark>..." }
        ]
    },
    "water": {
        strongs: "4325 (mayim)",
        original: "מַיִם",
        transliteration: "mayim",
        pronunciation: "MAH-yim",
        partOfSpeech: "Noun",
        definition: "Water, the source of life. Often symbolizes God's blessing or the Spirit.",
        semanticRange: ["water", "water"],
        usages: [
            { ref: "Psalms 1:3", text: "...planted above the <mark>water</mark> stream..." },
            { ref: "Genesis 1:2", text: "...and the Spirit of God hovered over the surface <mark>water</mark>." },
            { ref: "Isaiah 55:1", text: "Oh, all you who are thirsty, go to the <mark>water</mark>!" },
            { ref: "Psalms 42:1", text: "As that deer molts to the <mark>water</mark> streams, so my soul molts to You, O God..." }
        ]
    },
    "brings": {
        strongs: "5414 (nathan)",
        original: "נָתַן",
        transliteration: "nathan",
        pronunciation: "naw-THAN",
        partOfSpeech: "Verb",
        definition: "Give, produce, bring.",
        semanticRange: ["give", "bring"],
        usages: [
            { ref: "Psalms 1:3", text: "...that <mark>gives birth</mark> (brings) its fruit in due time..." },
            { ref: "Genesis 1:29", text: "Here <mark>gave</mark> I gave you the whole spring..." },
            { ref: "Psalms 84:11", text: "For the sun and shield is the Lord God, the Lord <mark>gives</mark> mercy and glory..." },
            { ref: "Isaiah 9:6", text: "For a Child was born to us, <mark>given</mark> to us a Son..." }
        ]
    },
    "fruit": {
        strongs: "6529 (peri)",
        original: "פְּרִי",
        transliteration: "peri",
        pronunciation: "peh-REE",
        partOfSpeech: "Noun",
        definition: "Result, harvest, offspring.",
        semanticRange: ["fruit", "fruit", "consequence"],
        usages: [
            { ref: "Psalms 1:3", text: "...which will bring forth its <mark>fruit</mark> in due time..." },
            { ref: "Genesis 1:11", text: "Let the earth bring forth... a <mark>vegetable</mark> tree, which according to its kind <mark>fruit</mark> brings..." },
            { ref: "Psalms 127:3", text: "Children are the inheritance of the Lord, <mark>fruit</mark> wombs are a reward!" },
            { ref: "Proverbs 11:30 am", text: "<mark>Fruit</mark> of the righteous is the tree of life, and the wise acquires life." }
        ]
    },
    "on time": {
        strongs: "6256 (eth)",
        original: "עֵת",
        transliteration: "eth",
        pronunciation: "ayth",
        partOfSpeech: "Noun",
        definition: "Time, season, season.",
        semanticRange: ["time", "season"],
        usages: [
            { ref: "Psalms 1:3", text: "...which will bring forth its fruit <mark>in due time</mark>..." },
            { ref: "Ecclesiastes 3:1", text: "For everything there is a <mark>time</mark>, and an <mark>hour</mark> for every matter under heaven..." },
            { ref: "Psalms 104:27", text: "All of them are waiting for the Lord to give them food <mark>in time</mark>." }
        ]
    },
    "withers": {
        strongs: "5034 (nabel)",
        original: "נָבֵל",
        transliteration: "nabel",
        pronunciation: "naw-BEL",
        partOfSpeech: "Verb",
        definition: "Wither, dry, decay.",
        semanticRange: ["wither", "dry"],
        usages: [
            { ref: "Psalms 1:3", text: "...and that the leaves do not <mark>wither</mark> his..." },
            { ref: "Isaiah 40:8", text: "The grass dries up, the flower <mark>withers</mark>, but the Word of our God stands forever!" },
            { ref: "Psalms 37:2", text: "For they will soon be withered like grass, and <mark>fade</mark> like a green potion!" }
        ]
    },
    "leaf": {
        strongs: "5929 (aleh)",
        original: "עָלֶה",
        transliteration: "aleh",
        pronunciation: "aw-LEH",
        partOfSpeech: "Noun",
        definition: "Leaf, tree leaves.",
        semanticRange: ["letter", "leaf"],
        usages: [
            { ref: "Psalms 1:3", text: "...and that <mark>leaves</mark> does not wither it..." },
            { ref: "Genesis 3:7", text: "And they sewed fig <mark>leaves</mark> together, and made belts for themselves." },
            { ref: "Genesis 8:11", text: "...until <mark>a leaf</mark> olive plucked in her beak." }
        ]
    },
    "does": {
        strongs: "6213 (asah)",
        original: "עָשָׂה",
        transliteration: "asah",
        pronunciation: "aw-SAH",
        partOfSpeech: "Verb",
        definition: "Do, create, perform.",
        semanticRange: ["do", "create"],
        usages: [
            { ref: "Psalms 1:3", text: "...and whatever he <mark>does</mark>, good luck to him!" },
            { ref: "Genesis 1:1", text: "In the beginning God <mark>created</mark> Heaven and earth." },
            { ref: "Genesis 1:26", text: "And God said: <mark>Let us</mark> man in Our image..." },
            { ref: "Psalms 115:3", text: "Our God is in heaven, everything He willed, He <mark>did</mark>!" }
        ]
    },
    "success": {
        strongs: "6743 (tsalach)",
        original: "צָלַח",
        transliteration: "tsalach",
        pronunciation: "tsaw-LAKH",
        partOfSpeech: "Verb",
        definition: "To prosper, to achieve a goal, to be successful.",
        semanticRange: ["flourish", "resort"],
        usages: [
            { ref: "Psalms 1:3", text: "...and everything he does, <mark>happy</mark> to him!" },
            { ref: "Genesis 39:2", text: "And the Lord was with Joseph, and he became a man who had <mark>success</mark>..." },
            { ref: "Joshua 1:8", text: "...for then you will make <mark>happy</mark> your ways, and then you will be <mark>happy</mark> to you." },
            { ref: "Psalms 118:25", text: "Please, Lord, save! Please, Lord, <mark>good luck</mark>!" }
        ]
    },

    // --- VERSE 4 ---
    "Yes": {
        strongs: "3651 (ken)",
        original: "כֵּן",
        transliteration: "ken",
        pronunciation: "ken",
        partOfSpeech: "Adverb",
        definition: "Thus, correctly, honestly.",
        semanticRange: ["Yes", "so"],
        usages: [
            { ref: "Psalms 1:4", text: "Not <mark>yes</mark> wicked..." },
            { ref: "Genesis 1:7", text: "...And it happened <mark>so</mark>." },
            { ref: "Exit 10:29", text: "And Moses said: <mark>Rightly</mark> you said..." }
        ]
    },
    "chaff": {
        strongs: "4671 (mots)",
        original: "מֹץ",
        transliteration: "mots",
        pronunciation: "mose",
        partOfSpeech: "Noun",
        definition: "A grain husk that is easily blown away by the wind. A symbol of worthlessness and instability.",
        semanticRange: ["husk", "chaff"],
        usages: [
            { ref: "Psalms 1:4", text: "...for they are like <mark>chaff</mark> that the wind blows away!" },
            { ref: "Psalms 35:5", text: "Let them become like <mark>chaff</mark> in the wind..." },
            { ref: "Isaiah 17:13", text: "...and he will be driven like that <mark>chaff</mark> on the mountains behind the wind..." },
            { ref: "Job 21:18", text: "They will be like that straw in the wind, and like that <mark>chaff</mark> that the storm caught it!" }
        ]
    },
    "wind": {
        strongs: "7307 (ruach)",
        original: "רוּחַ",
        transliteration: "ruach",
        pronunciation: "ROO-akh",
        partOfSpeech: "Noun",
        definition: "Breath, wind, spirit. The driving force.",
        semanticRange: ["wind", "spirit", "breath"],
        usages: [
            { ref: "Psalms 1:4", text: "...for they are like chaff that the <mark>wind</mark> blows away!" },
            { ref: "Genesis 1:2", text: "...and the <mark>Spirit</mark> of God hovered over the surface of the water." },
            { ref: "Psalms 104:4", text: "You make spirits Your angels, burning fire Your <mark>servants</mark> (wind)." },
            { ref: "Ecclesiastes 1:6", text: "It goes to the south and turns to the north, turns, turns <mark>wind</mark>, and returns to its circles <mark>wind</mark>..." }
        ]
    },
    "disperses": {
        strongs: "5086 (nadaph)",
        original: "נָדַף",
        transliteration: "nadaph",
        pronunciation: "naw-DAF",
        partOfSpeech: "Verb",
        definition: "Disperse, disperse, drive.",
        semanticRange: ["dispel", "drive"],
        usages: [
            { ref: "Psalms 1:4", text: "...for they are like chaff that the wind <mark>disperses</mark>!" },
            { ref: "Psalms 68:2", text: "As <mark>disperses</mark> smoke, so their <mark>disperse</mark>..." },
            { ref: "Proverbs 21:6", text: "Gaining treasures with a lying tongue is vanity that <mark>passes away</mark>, it is the seeking of death." }
        ]
    },

    // --- VERSE 5 ---
    "stand up": {
        strongs: "6965 (qum)",
        original: "קוּם",
        transliteration: "qum",
        pronunciation: "koom",
        partOfSpeech: "Verb",
        definition: "Get up, stand, rise.",
        semanticRange: ["get up", "stand"],
        usages: [
            { ref: "Psalms 1:5", text: "That is why the wicked do not <mark>stand</mark> in judgment..." },
            { ref: "Psalms 3:7", text: "<mark>Resurrect</mark>, Lord, save me, my God..." },
            { ref: "Isaiah 40:8", text: "The grass dries up, the flower withers, and the Word of our God <mark>stands</mark> forever!" },
            { ref: "Isaiah 60:1", text: "<mark>Arise</mark>, shine, Jerusalem, for your light has come..." }
        ]
    },
    "judge": {
        strongs: "4941 (mishpat)",
        original: "מִשְׁפָּט",
        transliteration: "mishpat",
        pronunciation: "mish-PAT",
        partOfSpeech: "Noun",
        definition: "Court, justice, sentence, justice.",
        semanticRange: ["court", "justice", "law"],
        usages: [
            { ref: "Psalms 1:5", text: "That is why the wicked will not stand in <mark>judgment</mark>..." },
            { ref: "Psalms 89:14", text: "Justice and <mark>justice</mark> the foundation of Your throne..." },
            { ref: "Isaiah 1:17", text: "Learn to do good, seek <mark>truth</mark>, save the oppressed..." },
            { ref: "Micah 6:8", text: "It has been revealed to you, O man, what is good, and what the Lord desires from you, nothing but to do <mark>justice</mark>, and to love mercy..." }
        ]
    },
    "the righteous": {
        strongs: "6662 (tsaddiq)",
        original: "צַדִּיק",
        transliteration: "tsaddiq",
        pronunciation: "tsad-DEEK",
        partOfSpeech: "Adjective",
        definition: "The one who is right, just, justified by God.",
        semanticRange: ["righteous", "fair"],
        usages: [
            { ref: "Psalms 1:5", text: "...nor sinners in the congregation of the <mark>righteous</mark>!" },
            { ref: "Psalms 1:6", text: "For the Lord knows the way <mark>the righteous</mark>..." },
            { ref: "Genesis 6:9", text: "...Noah was a man <mark>righteous</mark> and blameless in his generations..." },
            { ref: "Proverbs 10:7", text: "The memory of the <mark>righteous</mark> is a blessing, but the name of the wicked will rot." }
        ]
    },

    // --- VERSE 6 ---
    "knows": {
        strongs: "3045 (yada)",
        original: "יָדַע",
        transliteration: "yada",
        pronunciation: "yaw-DAH",
        partOfSpeech: "Verb",
        definition: "To know, to know. Includes personal experiences and relationships.",
        semanticRange: ["know", "cognize"],
        usages: [
            { ref: "Psalms 1:6", text: "The way of the righteous <mark>knows</mark> God..." },
            { ref: "Genesis 4:1", text: "And Adam <mark>recognized</mark> Eve, his wife..." },
            { ref: "Psalms 139:1", text: "Lord, You tested me and <mark>recognized</mark>..." },
            { ref: "Jeremiah 1:5", text: "While I was forming you in my mother's womb, I <mark>recognized</mark> was you..." }
        ]
    },
    "way": {
        strongs: "1870 (derek)",
        original: "דֶּרֶךְ",
        transliteration: "derek",
        pronunciation: "DEH-rek",
        partOfSpeech: "Noun",
        definition: "A road, a way, a way of life.",
        semanticRange: ["way", "road"],
        usages: [
            { ref: "Psalms 1:6", text: "<mark>The way</mark> because the Lord knows the righteous, and <mark>the way</mark> the wicked will perish!" },
            { ref: "Psalms 119:105", text: "Your word is a lamp for my feet, a light for my <mark>path</mark>." }
        ]
    },
    "will die": {
        strongs: "6 (abad)",
        original: "אָבַד",
        transliteration: "abad",
        pronunciation: "aw-BAD",
        partOfSpeech: "Verb",
        definition: "To perish, to disappear, to be destroyed.",
        semanticRange: ["perish", "disappear"],
        usages: [
            { ref: "Psalms 1:6", text: "...and the way of the wicked <mark>will perish</mark>!" },
            { ref: "Psalms 2:12", text: "Honor the Son, that He may not be angry, and that you may not <mark>perish</mark> on the way..." },
            { ref: "Job 3:3", text: "Let <mark>perish</mark> the day that I was born in it..." },
            { ref: "Psalms 119:92", text: "If it weren't for Your Law, my consolation, I would be <mark>perished</mark> in my misfortune!" }
        ]
    }
};
