const express = require('express');

const bookRouter = express.Router();

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

module.exports = bookRouter;
