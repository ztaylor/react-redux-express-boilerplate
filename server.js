const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const calculateNI = require('./client/middleware/calculate-ni.js');
const setIncome = require('./client/middleware/set-income');
const setDate = require('./client/middleware/set-date');



const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '/client/build')));

// The "catch all" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`server listening on ${port}`); // eslint-disable-line no-console

app.post('/v1/national-insurance', (req, res, next) => {
  setIncome(req, res, next);

  try {
    var date = req.runDate;
    var data = JSON.stringify({ runDate: date });

    // write JSON string to a file
    fs.writeFileSync('./client/middleware/date.json', data, (err) => {
      if (err) {
        throw err;
      }
      console.log("JSON data is saved.");
    });

  } catch (e) {
    return next(new Error('Invalid date'));
  }

  calculateNI(req, res);
});
