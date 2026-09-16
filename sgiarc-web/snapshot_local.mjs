import { chromium } from 'playwright';

async function snapshotLocal() {
  console.log('Launching browser for local...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  
  // Wait for the hero animations to settle
  await page.waitForTimeout(4000);
  
  console.log('Taking full page snapshot of local...');
  await page.screenshot({ path: `stanford_snapshots/local_full_page.png`, fullPage: true });

  console.log('Local snapshot saved.');
  await browser.close();
}

snapshotLocal().catch(console.error);
