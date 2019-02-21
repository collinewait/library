const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js',
  express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');
const books = [
  {
    title: 'War and peace',
    genre: 'Historical fiction',
    author: 'Tolstoy',
    read: false,
  },
  {
    title: 'Less miserables',
    genre: 'Historical fiction',
    author: 'Victor Hugo',
    read: false,
  },
  {
    title: 'The time Machine',
    genre: 'Science fiction',
    author: 'H. G. Wells',
    read: false,
  },
];
bookRouter.route('/')
  .get((req, res) => {
    res.render(
      'books',
      {
        title: 'Library',
        nav: [
          { link: '/books', title: 'Books' },
          { link: 'authors', title: 'Authors' },
        ],
        books,
      },
    );
  });
bookRouter.route('/single')
  .get((req, res) => {
    res.send('Hello single book');
  });
app.use('/books', bookRouter);
app.get('/', (req, res) => {
  res.render('index',
    {
      title: 'Library',
      nav: [
        { link: '/books', title: 'Books' },
        { link: 'authors', title: 'Authors' },
      ],
    });
});

app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
