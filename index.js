'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

app.set('port', 3000);

require('./routes/api')(app);

const server = app.listen(app.get('port'), () => {
  console.log('Server on!');
});
