const https = require('https');

https.get('https://thequietus.com/reviews/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const matches = data.match(/#[A-Fa-f0-9]{3,6}/g);
    if (!matches) {
        console.log("no matches");
        return;
    }
    const counts = {};
    matches.forEach(m => {
      const color = m.toUpperCase();
      counts[color] = (counts[color] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]).slice(0, 20);
    sorted.forEach(([c, n]) => console.log(c + ": " + n));
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
