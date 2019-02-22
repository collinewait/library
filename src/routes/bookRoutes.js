const express = require('express');
const sql = require('mssql');

const bookRouter = express.Router();

function router(nav) {
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
      (async function query() {
        const request = new sql.Request();

        const result = await request.query('select * from books');
        res.render(
          'bookListView',
          {
            title: 'Li   brary',
            nav,
            books: result.recordset,
          },
        );
      }());
    });
  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render(
        'bookView',
        {
          title: 'Library',
          nav,
          book: books[id],
        },
      );
    });
  return bookRouter;
}


module.exports = router;
