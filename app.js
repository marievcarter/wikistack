const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const layout = require('./views/layout');
const { db } = require('./models');

db.authenticate().then(() => {
  console.log('connected to the database');
});

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

// sample route
app.get('/', (req, res, next) => {
  res.send(layout());
});

const PORT = 1337;
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
