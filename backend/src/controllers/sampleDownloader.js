import puppeteer from 'puppeteer';

let wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Custom wait for selector function
async function customWaitForSelector(page, selector, timeout = 10000) {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    const elementHandle = await page.$(selector); // Check if the selector exists
    console.log('elementHandle:', elementHandle);
    if (elementHandle) {
      return elementHandle; // Return the element if found
    }
    await wait(100); // Wait for a short interval before retrying
  }

  throw new Error(`Timeout waiting for selector: ${selector}`);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  // Listen to all network requests
  let downloadRequestUrl = null;

  page.on('request', (request) => {
    //console.log('Request:', request.url());
    const url = request.url();
    if (url.includes('videoplayback')) {
      downloadRequestUrl = url; // Capture the download URL when it matches
    }
  });

  // Navigate to the website
  await page.goto('https://ssyoutube.com/en789Jb', { waitUntil: 'domcontentloaded' });

  // Paste the video URL
  await page.type('input#id_url', 'https://youtu.be/tWe93wO0VmE?si=lTbVQRCJ77gBy0an');

  // Click the search button
  await page.click('button#search');

  // Wait for the download options to load
  await customWaitForSelector(page, '#download-mp4-360-audio', 10000);

  // Click the download button
  await page.click('#download-mp4-360-audio');

  // Wait briefly to ensure the network request is captured
  await wait(40000);

  // Log the intercepted download request URL
  if (downloadRequestUrl) {
    console.log('Download request URL:', downloadRequestUrl);
  } else {
    console.log('No download request URL found.');
  }

  await browser.close();
})();
