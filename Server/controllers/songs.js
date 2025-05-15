const { searchTab4U } = require('../utils/tab4uPuppeteer');
const { fetchTab4USong } = require('../utils/tab4uFetcher');

const search = async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ message: 'Missing query parameter' });

  try {
    const results = await searchTab4U(query);
    res.json(results);
  } catch (err) {
    console.error('Error in search controller:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const fetchSong = async (req, res) => {
  const { slug } = req.params;

  if (!slug) return res.status(400).json({ message: 'Missing slug' });

  try {
    const data = await fetchTab4USong(slug);
    res.json(data);
  } catch (error) {
    console.error('Fetch song error:', error.message);
    res.status(500).json({ message: 'Failed to fetch song' });
  }
};

module.exports = { search, fetchSong };
