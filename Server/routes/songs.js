const express = require('express');
const authenticateToken = require('../middleware/middleware');
const { search, fetchSong } = require('../controllers/songs');
const router = express.Router();

router.get('/search', authenticateToken, search);
  
router.get('/fetch/:slug', authenticateToken, fetchSong);
module.exports = router;
