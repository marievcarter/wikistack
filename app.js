const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const layout = require('./views/layout');
const { db } = require('./models');
const wiki = require('./routes/wiki');
const user = require('./routes/user');

db.authenticate().then(() => {
  console.log('connected to the database');
});

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

app.use('/wiki', wiki);
app.use('/user', user);

// sample route
app.get('/', (req, res, next) => {
  res.send(layout());
});

const PORT = 1337;

// sync models
const init = async () => {
  await db.sync();

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
