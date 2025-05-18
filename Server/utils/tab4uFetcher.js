const puppeteer = require('puppeteer');

const fetchTab4USong = async (slug) => {
  const url = `https://www.tab4u.com/tabs/songs/${slug}.html`;

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/opt/render/project/src/Server/.cache/puppeteer/chrome/linux-136.0.7103.92/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });

  await page.waitForSelector('td.song', { timeout: 50000 });

  const data = await page.evaluate((slug) => {
    let name = '';
    let artist = '';

    const slugParts = slug.split('_');
    const id = slugParts[0];
    const rest = slugParts.slice(1).join('_');
    const separator = '_-_';
    const sepIndex = rest.indexOf(separator);

    if (sepIndex !== -1) {
      artist = rest.substring(0, sepIndex).replace(/_/g, ' ').trim();
      name = rest.substring(sepIndex + separator.length).replace(/_/g, ' ').trim();
    } else {
      artist = rest.replace(/_/g, ' ').trim();
    }

    const chordLines = Array.from(document.querySelectorAll('td.chords_en')).map(el =>
      el.textContent.replace(/\u00a0/g, ' ').trim()
    );

    const lyricLines = Array.from(document.querySelectorAll('td.song')).map(el =>
      el.textContent.replace(/\u00a0/g, ' ').trim()
    );

    return {
      name,
      artist,
      lyrics: lyricLines.join('\n'),
      chords: chordLines.join('\n')
    };
  }, slug);

  await browser.close();
  return data;
};

module.exports = { fetchTab4USong };
