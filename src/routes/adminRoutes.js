const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

const books = [
  {
    title: 'War and peace',
    genre: 'Historical fiction',
    author: 'Tolstoy',
    bookId: 656,
    read: false,
  },
  {
    title: 'Less miserables',
    genre: 'Historical fiction',
    author: 'Victor Hugo',
    bookId: 24280,
    read: false,
  },
  {
    title: 'The time Machine',
    genre: 'Science fiction',
    author: 'H. G. Wells',
    read: false,
  },
];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          const db = client.db(dbName);
          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
