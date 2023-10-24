import puppeteer from 'puppeteer';

const RENDER_CACHE = new Map();

async function ssr(url) {
  // 캐싱이 되어있으면 캐싱된 url 반환
  if (RENDER_CACHE.has(url)) {
    return { html: RENDER_CACHE.get(url), ttRenderMs: 0 };
  }

  // Rendering 시간을 식별하기 위해 타이머 시작
  const start = Date.now();

  // headerless true 값을 줘 Browser UI 없이 작동되게 설정
  const browser = await puppeteer.launch({ headless: true });

  // 새로운 Browser 페이지 추가
  const page = await browser.newPage();

  try {
    // networkidle0:500ms 안에 page로 이동하기
    await page.goto(url, { waitUntil: 'networkidle0' });

    // #post(html selector)가 페이지에 있는지 확인, 이미 있을 시 바로 return
    await page.waitForSelector('#posts');
  } catch (err) {
    // #post가 페이지에 없을 시
    console.error(err);

    // 500ms 초과할시
    throw new Error('page.goto/waitForSelector timed out.');
  }

  // HTML page content 로드하기
  const html = await page.content();

  // 브라우저 닫기
  await browser.close();

  // 렌더링 시간 계산
  const ttRenderMs = Date.now() - start;

  // url => 리소스 위치에 html page 캐싱하기
  RENDER_CACHE.set(url, html);

  return { html, ttRenderMs };
}
export { ssr as default };
