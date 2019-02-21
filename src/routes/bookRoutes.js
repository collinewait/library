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
      'bookListView',
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
bookRouter.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    res.render(
      'bookView',
      {
        title: 'Library',
        nav: [
          { link: '/books', title: 'Books' },
          { link: 'authors', title: 'Authors' },
        ],
        book: books[id],
      },
    );
  });

module.exports = bookRouter;
