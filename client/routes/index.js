/*const { Router } = require('express');
const path = require('path');
const express = require('express');
const v1 = require('./api/v1');

const distPath = path.join(path.resolve(__dirname, '../../'), 'src/app');

module.exports = () => {
  const app = Router();

  app.use('/v1', v1());

  
  app.use('/app', express.static(path.join(distPath, '..'),
    { redirect: false, maxage: '5d' }));

  app.use('/app', (req, res) => {
    res.status(404).send('Page not found');
  });

  app.get('*',
    (req, res) => {
      const pathToIndex = path.join(distPath, 'index.html');

      res.render(pathToIndex, { layout: false, envVars: { NI_SERVICE: '/v1/national-insurance' } });
    });

  return app;
};
*/