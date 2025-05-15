const puppeteer = require('puppeteer');

const searchTab4U = async (query) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const searchUrl = `https://www.tab4u.com/resultsSimple?tab=songs&q=${encodeURIComponent(query)}`;

  await page.goto(searchUrl, { waitUntil: 'networkidle0' });

  // Waiting for the links to load
  await page.waitForSelector('a.ruSongLink', { timeout: 30000 });

  // Extructing the results
  const results = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a.ruSongLink')).map(el => {
      const link = el.getAttribute('href');
      const slug = link.replace('tabs/songs/', '').replace('.html', '');
  
      const songNameElement = el.querySelector('.sNameI19');
      const artistNameElement = el.querySelector('.aNameI19');
  
      const name = songNameElement?.textContent.replace('/', '').trim() || '';
      const artist = artistNameElement?.textContent.trim() || '';
  
      return {
        slug,
        name,
        artist
      };
    });
  });  

  await browser.close();
  return results;
};

module.exports = { searchTab4U };
