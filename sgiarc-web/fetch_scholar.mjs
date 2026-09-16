import https from 'https';
import fs from 'fs';

const url = "https://scholar.google.com/citations?user=VBox-vcAAAAJ&hl=en&cstart=0&pagesize=100";

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
  }
};

https.get(url, options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scholar_raw.html', data);
    console.log('Saved scholar_raw.html');
    
    const results = [];
    // Super basic regex parsing for Scholar
    const regex = /<tr class="gsc_a_tr">(.*?)<\/tr>/gs;
    let match;
    while ((match = regex.exec(data)) !== null) {
      const row = match[1];
      const titleMatch = row.match(/class="gsc_a_at"[^>]*>(.*?)<\/a>/);
      const authorsMatch = row.match(/<div class="gs_gray">(.*?)<\/div>/);
      // second gs_gray is venue
      const venueMatch = row.match(/<div class="gs_gray">.*?<\/div>.*?<div class="gs_gray">(.*?)<span/);
      const yearMatch = row.match(/class="gsc_a_y[^>]*>.*?<span class="gsc_a_h gsc_a_hc[^>]*>(.*?)<\/span>/);
      
      if (titleMatch) {
        let venue = venueMatch ? venueMatch[1].replace(/<\/?[^>]+(>|$)/g, "") : '';
        results.push({
          title: titleMatch[1],
          authors: authorsMatch ? authorsMatch[1] : '',
          venue: venue.trim(),
          year: yearMatch ? yearMatch[1] : ''
        });
      }
    }
    fs.writeFileSync('scholar_parsed.json', JSON.stringify(results, null, 2));
    console.log(`Parsed ${results.length} publications.`);
  });
}).on('error', err => console.error(err));
