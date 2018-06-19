var express = require('express');
var router = express.Router();
var pdfreader = require('pdfreader');


/* GET home page. */
router.get('/', function (req, res, next) {



  var rows = {}; // indexed by y-position

  function printRows() {
    Object.keys(rows) // => array of y-positions (type: float)
      .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
      .forEach((y) => console.log((rows[y] || []).join('')));
  }

  new pdfreader.PdfReader().parseFileItems('sample.pdf', function (err, item) {
    if (!item || item.page) {
      // end of file, or page
      printRows();
      console.log('PAGE:', item);
      rows = {}; // clear rows for next page
    }
    else if (item.text) {
      // accumulate text items into rows object, per line
      (rows[item.y] = rows[item.y] || []).push(item.text);
    }
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;



