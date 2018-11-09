const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const { Page } = require('../models');
const layout = require('../views/layout');
const wikipage = require('../views/wikipage');

router.get('/', (req, res, next) => {
  res.send(layout());
  //res.redirect('/wiki');
});

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
  //res.send('submit a new page to the database');
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const foundSlug = await Page.findOne({
      where: { slug: req.params.slug },
    });
    res.send(wikipage(foundSlug));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
