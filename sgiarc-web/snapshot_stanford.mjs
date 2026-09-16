import { chromium } from 'playwright';
import fs from 'fs/promises';

async function snapshotStanford() {
  console.log('Launching browser for Stanford...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('https://www.stanford.edu/', { waitUntil: 'networkidle', timeout: 60000 });
  
  // Wait for the hero animation to settle
  await page.waitForTimeout(3000);
  
  const dir = 'stanford_snapshots';
  await fs.mkdir(dir, { recursive: true });

  console.log('Taking full page snapshot...');
  await page.screenshot({ path: `${dir}/full_page.png`, fullPage: true });

  console.log('Taking incremental scroll snapshots...');
  const scrolls = 10;
  for (let i = 0; i < scrolls; i++) {
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${dir}/scroll_${i}.png` });
  }

  console.log('Stanford snapshots saved.');
  await browser.close();
}

snapshotStanford().catch(console.error);
