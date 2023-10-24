import puppeteer from 'puppeteer';

const RENDER_CACHE = new Map();

async function ssr(url) {
  // If already cached, return cached url
  if (RENDER_CACHE.has(url)) {
    return { html: RENDER_CACHE.get(url), ttRenderMs: 0 };
  }

  // Start timer to get a Rendering time
  const start = Date.now();

  // give true on headless so that Browser works without UI
  const browser = await puppeteer.launch();

  // Add new Browswer Page
  const page = await browser.newPage();
  try {
    // go to page within 0 ~ 500ms(networkidle0)
    await page.goto(url, { waitUntil: 'networkidle0' });

    // check html selector #post is in the page, if exist return
    await page.waitForSelector('#posts');
  } catch (err) {
    // if no #post on page
    console.error(err);

    // if exceeds 500ms
    throw new Error('page.goto/waitForSelector timed out.');
  }

  // Load content of HTML Page
  const html = await page.content();

  // Close Browser
  await browser.close();

  // Get a Rendering Time Cost
  const ttRenderMs = Date.now() - start;

  // cache html page on resource location(url)
  RENDER_CACHE.set(url, html);
  return { html, ttRenderMs };
}
export { ssr as default };
