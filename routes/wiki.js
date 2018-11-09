const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const { Page } = require('../models');

router.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
  });
  console.log('BODY', req.body);
  try {
    await page.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
  //res.send('submit a new page to the database');
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
