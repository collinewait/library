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
        const { recordset } = await request.query('select * from books');
        res.render(
          'bookListView',
          {
            title: 'Li   brary',
            nav,
            books: recordset,
          },
        );
      }());
    });
  bookRouter.route('/:id')
    .all((req, res, next) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = await request.input('id', sql.Int, id)
          .query('select * from books where id = @id');
        // eslint-disable-next-line prefer-destructuring
        req.book = recordset[0];
        next();
      }());
    })
    .get((req, res) => {
      res.render(
        'bookView',
        {
          title: 'Library',
          nav,
          book: req.book,
        },
      );
    });
  return bookRouter;
}


module.exports = router;
