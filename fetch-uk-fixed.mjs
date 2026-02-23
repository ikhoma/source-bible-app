import fs from 'fs';
import https from 'https';
import http from 'http';
import iconv from 'iconv-lite';

const crossRefs = JSON.parse(fs.readFileSync('./cross-references.json', 'utf-8'));

const BOOK_SLUGS = {
    'Genesis': 'ge',
    'Joshua': 'jos',
    'Leviticus': 'le',
    'Deuteronomy': 'de',
    'Job': 'job',
    'Psalm': 'ps',
    'Psalms': 'ps',
    'Proverbs': 'pr',
    'Isaiah': 'isa',
    'Jeremiah': 'jer',
    'Ezekiel': 'eze',
    'Daniel': 'da',
    'Hosea': 'ho',
    'Malachi': 'mal',
    'Matthew': 'mt',
    'Luke': 'lu',
    'John': 'joh',
    'Romans': 'ro',
    '1 Corinthians': '1co',
    '2 Corinthians': '2co',
    'Galatians': 'ga',
    'Ephesians': 'eph',
    'Colossians': 'col',
    '2 Thessalonians': '2th',
    '1 Timothy': '1ti',
    '2 Timothy': '2ti',
    '1 Peter': '1pe',
    'James': 'jas',
    '1 John': '1jo',
    'Revelation': 're',
};

function parseRef(ref) {
    const match = ref.match(/^(\d?\s?[A-Za-z]+)\s+(\d+):(\d+)(?:-(\d+))?$/);
    if (!match) return null;
    return {
        book: match[1].trim(),
        chapter: parseInt(match[2]),
        startVerse: parseInt(match[3]),
        endVerse: match[4] ? parseInt(match[4]) : parseInt(match[3]),
    };
}

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        const req = client.get(url, { timeout: 15000 }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                fetchUrl(res.headers.location).then(resolve).catch(reject);
                return;
            }
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => {
                const buffer = Buffer.concat(chunks);
                // allbible.info uses windows-1251
                const data = iconv.decode(buffer, 'win1251');
                resolve(data);
            });
        });
        req.on('error', reject);
        req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
    });
}

function extractVerses(html, startVerse, endVerse) {
    const verses = [];
    for (let v = startVerse; v <= endVerse; v++) {
        const patterns = [
            new RegExp(`<sup[^>]*>\\s*${v}\\s*</sup>([^<]+(?:<(?!sup|/p|br|div)[^>]*>[^<]*)*?)(?=<sup|</p|</div|$)`, 'i'),
            new RegExp(`<b>\\s*${v}\\s*</b>([^<]+(?:<(?!b>|/p|br|div)[^>]*>[^<]*)*?)(?=<b>|</p|</div|$)`, 'i'),
            new RegExp(`>\\s*${v}\\s*</span>([^<]+(?:<(?!/p|br|div)[^>]*>[^<]*)*?)(?=<span|</p|</div|$)`, 'i'),
        ];

        for (const pattern of patterns) {
            const match = html.match(pattern);
            if (match) {
                let text = match[1]
                    .replace(/<[^>]+>/g, '')
                    .replace(/&nbsp;/g, ' ')
                    .replace(/&quot;/g, '"')
                    .replace(/&amp;/g, '&')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&#\d+;/g, '')
                    .trim();
                if (text.length > 5) {
                    verses.push({ verse: v, text });
                    break;
                }
            }
        }
    }
    return verses;
}

async function main() {
    const allRefs = new Set();
    for (const verseData of Object.values(crossRefs.verses)) {
        for (const ref of verseData.crossReferences) {
            allRefs.add(ref);
        }
    }

    const chapterGroups = {};
    const refParsed = {};

    for (const ref of allRefs) {
        const parsed = parseRef(ref);
        if (!parsed) continue;
        refParsed[ref] = parsed;
        const slug = BOOK_SLUGS[parsed.book];
        if (!slug) continue;

        const key = `${slug}/${parsed.chapter}`;
        if (!chapterGroups[key]) chapterGroups[key] = [];
        chapterGroups[key].push({ ref, ...parsed });
    }

    const results = {};
    const chapters = Object.entries(chapterGroups);

    for (let i = 0; i < chapters.length; i++) {
        const [chapterKey, refs] = chapters[i];
        const url = `https://allbible.info/bible/ogienko/${chapterKey}/`;

        try {
            const html = await fetchUrl(url);

            for (const refInfo of refs) {
                const verses = extractVerses(html, refInfo.startVerse, refInfo.endVerse);
                if (verses.length > 0) {
                    results[refInfo.ref] = {
                        reference: refInfo.ref,
                        verses: verses,
                        fullText: verses.map(v => `${v.verse}. ${v.text}`).join(' ')
                    };
                } else {
                    const simplePattern = new RegExp(`${refInfo.startVerse}[.\\s]+([А-Яа-яіїєґІЇЄҐ''.,;:!?\\s-]+?)(?=\\d+[.\\s]|$)`, 'gm');
                    const simpleMatch = html.match(simplePattern);
                    if (simpleMatch) {
                        results[refInfo.ref] = {
                            reference: refInfo.ref,
                            verses: [{ verse: refInfo.startVerse, text: simpleMatch[0].trim() }],
                            fullText: simpleMatch[0].trim()
                        };
                    }
                }
            }
        } catch (err) { }

        await new Promise(r => setTimeout(r, 200));
    }

    fs.writeFileSync('./cross-references-ukrainian.json', JSON.stringify(results, null, 2), 'utf-8');
}

main().catch(console.error);
