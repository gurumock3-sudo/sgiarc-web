const { chromium } = require('playwright');
const fs = require('fs');

async function analyzeStanfordAnimations() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.stanford.edu', { waitUntil: 'networkidle' });

  // Inject a script to observe IntersectionObserver or transition events
  const animationData = await page.evaluate(() => {
    const results = [];
    
    // Find all headings and images that might be animated
    const animatedElements = document.querySelectorAll('h1, h2, h3, img, .su-card');
    
    animatedElements.forEach(el => {
      const styles = window.getComputedStyle(el);
      const transition = styles.transition;
      const transform = styles.transform;
      const animation = styles.animation;
      
      // Look for custom classes that might indicate animations (e.g. aos, fade-up)
      const classes = Array.from(el.classList).filter(c => c.includes('fade') || c.includes('anim') || c.includes('reveal'));
      
      if (transition !== 'all 0s ease 0s' || classes.length > 0) {
        results.push({
          tag: el.tagName,
          classes: el.className,
          transition: transition,
          transform: transform,
          animation: animation,
          text: el.innerText ? el.innerText.substring(0, 30) : ''
        });
      }
    });

    return results;
  });

  fs.writeFileSync('stanford_animations.json', JSON.stringify(animationData, null, 2));
  console.log('Saved to stanford_animations.json');
  
  await browser.close();
}

analyzeStanfordAnimations().catch(console.error);
