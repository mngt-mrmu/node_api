const express = require('express');
const router = express.Router();
const { getSuggestions } = require('../utils/keyword');

router.get('/suggestions', (req, res, nex) => {
  const query = req.query.query || req.params.query;
  const suggestions = getSuggestions({ query });
  res.json({ suggestions });
});

module.exports = router;
