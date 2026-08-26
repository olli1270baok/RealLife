const puppeteer = require('puppeteer');
const fs = require('fs');

async function capture() {
  if (!fs.existsSync('public/images')) {
    fs.mkdirSync('public/images', { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport to 16:10 aspect ratio (e.g., 1280x800)
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
  
  const routes = [
    { url: 'http://localhost:3000/abo-killer', name: 'app-abo-killer.jpg' },
    { url: 'http://localhost:3000/bahn-rebell', name: 'app-bahn-rebell.jpg' },
    { url: 'http://localhost:3000/nebenkosten-rebell', name: 'app-nebenkosten.jpg' },
    { url: 'http://localhost:3000/flug-rebell', name: 'app-flug-rebell.jpg' }
  ];

  for (const route of routes) {
    try {
      console.log(`Navigating to ${route.url}`);
      await page.goto(route.url, { waitUntil: 'networkidle0', timeout: 30000 });
      // Small delay to ensure animations/fonts finish
      await new Promise(r => setTimeout(r, 2000));
      
      const outPath = `public/images/${route.name}`;
      await page.screenshot({ path: outPath, type: 'jpeg', quality: 90 });
      console.log(`Saved screenshot to ${outPath}`);
    } catch (e) {
      console.error(`Failed to capture ${route.url}:`, e);
    }
  }

  await browser.close();
}

capture();
