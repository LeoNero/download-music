'use strict';

const apiController = require('../controllers/api');

module.exports = app => {
  app.get('/', (req, res) => {
    res.render('index.html');
  });

  app.get('/api/search/:q', apiController.search);
  app.get('/api/download/mp3/:videoId/:videoTitle', apiController.download);
};
