const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  fs.mkdirSync('raw', { recursive: true });

  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: 'raw/',
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();

  // Hide the control bar so it doesn't appear in the video
  await page.addStyleTag({
    content: '#ctl { display: none !important; }'
  });

  console.log('Loading page…');
  await page.goto('https://pygm4li0n.github.io/VideoProm/', {
    waitUntil: 'load',
    timeout: 60000
  });

  console.log('Waiting for fonts and images…');
  await page.waitForTimeout(2500);

  console.log('Recording 60 seconds…');
  await page.waitForTimeout(60000);

  await context.close();
  await browser.close();

  console.log('Recording complete.');
})();
