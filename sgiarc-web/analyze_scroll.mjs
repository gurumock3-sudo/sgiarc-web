import { chromium } from 'playwright';

async function analyzeScroll() {
  console.log('Launching browser to analyze Stanford scroll animations...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('https://www.stanford.edu/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  
  // Wait a moment for JS to bind
  await page.waitForTimeout(3000);

  // We will evaluate the page and listen to scroll, measuring how DOM elements transform.
  const animationData = await page.evaluate(async () => {
    return new Promise((resolve) => {
      const results = {
        heroParallax: [],
        headerBehavior: [],
        textReveals: [],
        dividerParallax: []
      };

      const heroImg = document.querySelector('picture img, .hero img, video');
      const header = document.querySelector('header');
      const textElements = document.querySelectorAll('h2');
      const massiveImages = document.querySelectorAll('img'); // find a large one halfway down
      
      let largeImg = null;
      massiveImages.forEach(img => {
        if (img.clientHeight > 500 && img.getBoundingClientRect().top > 1000) {
          largeImg = img;
        }
      });

      // Take initial state
      const initialState = { scrollY: window.scrollY };
      if (heroImg) initialState.heroTransform = window.getComputedStyle(heroImg).transform;
      if (header) initialState.headerTransform = window.getComputedStyle(header).transform;

      // Scroll a bit and measure
      window.scrollTo(0, 500);
      
      setTimeout(() => {
        if (heroImg) results.heroParallax.push(window.getComputedStyle(heroImg).transform);
        if (header) {
          results.headerBehavior.push({
            transform: window.getComputedStyle(header).transform,
            position: window.getComputedStyle(header).position,
            top: window.getComputedStyle(header).top
          });
        }
        
        // Check text reveals
        textElements.forEach(h2 => {
          results.textReveals.push({
            text: h2.innerText.substring(0, 20),
            transform: window.getComputedStyle(h2).transform,
            opacity: window.getComputedStyle(h2).opacity,
            transition: window.getComputedStyle(h2).transition
          });
        });

        resolve(results);
      }, 500); // wait for transforms to apply
    });
  });

  console.log('Analysis Results:');
  console.dir(animationData, { depth: null });
  
  await browser.close();
}

analyzeScroll().catch(console.error);
