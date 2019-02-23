const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodReadsService');

const parser = xml2js.Parser({ explicitArray: false });
function goodReadsService() {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=wiO0LRXHxaqLbfzJn55tfw`)
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(result);
              resolve(result.goodreadsResponse.book);
            }
          });
        })
        .catch((err) => {
          reject(err);
          debug(err);
        });
    });
  }
  return { getBookById };
}

module.exports = goodReadsService();
