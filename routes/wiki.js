const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');

router.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

router.post('/', (req, res, next) => {
  res.send('submit a new page to the database');
});

router.get('/add', (req, res, next) => {
  res.send(addPage(req.body.content));
});

module.exports = router;
