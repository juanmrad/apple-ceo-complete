const express = require('express');
const es6Renderer = require('express-es6-template-engine')
const app = express();
const db = require('./db');

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/ceos', (req, res) => {
  res.render('ceo-list', { locals: { list: db } });
})

app.get('/ceos/:slug', (req, res) => {
  console.log(req.params.slug);
  // const slug = req.params.slug;
  const { slug } = req.params;

  const found_ceo = db.find(ceo => ceo.slug === slug);

  if (!found_ceo) {
    res.send('ceo not found')
    return;
  }

  res.render('ceo-details', { locals: { ceo: found_ceo } });
})

app.listen(3000, () => {
  console.log('app started')
})