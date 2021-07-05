const express = require('express');
const morgan = require('morgan');
const path = require('path');
const storeData = require('./client/middleware/store-data');
const getData = require('./client/middleware/get-data');

const app = express(); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '/client')));

 
console.log(__dirname)

// The "catch all" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res, next) => {
 getData(req, res, next);
});

const port = process.env.PORT || 5000;
app.listen(port); 

console.log(`server listening on ${port}`); // eslint-disable-line no-console

app.post('/v1/user/register', (req, res, next) =>
  storeData(req, res, next)
)
 
app.get('/v1/user/?', (req, res, next) =>
  getData(req, res, next)
)

