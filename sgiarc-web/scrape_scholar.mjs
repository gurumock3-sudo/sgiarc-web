import { webkit } from 'playwright';
import fs from 'fs/promises';

async function scrapeScholar() {
  console.log('Launching WebKit...');
  const browser = await webkit.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15'
  });
  const page = await context.newPage();
  
  console.log('Navigating to Google Scholar profile...');
  await page.goto('https://scholar.google.com/citations?user=VBox-vcAAAAJ&hl=en', { waitUntil: 'domcontentloaded' });
  
  try {
    await page.waitForSelector('#gsc_a_b', { timeout: 10000 });
  } catch (e) {
    console.log('Failed to load table, dumping body...');
    const body = await page.content();
    await fs.writeFile('scholar_error.html', body);
    await browser.close();
    return;
  }
  
  console.log('Extracting publications...');
  
  let hasMore = true;
  while (hasMore) {
    const showMoreBtn = await page.$('#gsc_bpf_more');
    if (showMoreBtn) {
      const isDisabled = await showMoreBtn.getAttribute('disabled');
      if (isDisabled !== null) {
        hasMore = false;
      } else {
        console.log('Clicking Show More...');
        await showMoreBtn.click();
        await page.waitForTimeout(1500); // wait for network
      }
    } else {
      hasMore = false;
    }
  }

  const publications = await page.evaluate(() => {
    const rows = document.querySelectorAll('#gsc_a_b .gsc_a_tr');
    const results = [];
    rows.forEach(row => {
      const titleEl = row.querySelector('.gsc_a_t a');
      const authorVenueEls = row.querySelectorAll('.gsc_a_t .gs_gray');
      const citesEl = row.querySelector('.gsc_a_c a');
      const yearEl = row.querySelector('.gsc_a_y .gsc_a_h');

      if (titleEl) {
        results.push({
          title: titleEl.textContent || '',
          authors: authorVenueEls.length > 0 ? authorVenueEls[0].textContent || '' : '',
          venue: authorVenueEls.length > 1 ? authorVenueEls[1].textContent || '' : '',
          citations: citesEl ? citesEl.textContent || '' : '',
          year: yearEl ? yearEl.textContent || '' : ''
        });
      }
    });
    return results;
  });

  console.log(`Extracted ${publications.length} publications.`);
  
  await fs.writeFile('scholar_data.json', JSON.stringify(publications, null, 2));
  console.log('Data saved to scholar_data.json');
  
  await browser.close();
}

scrapeScholar().catch(console.error);
