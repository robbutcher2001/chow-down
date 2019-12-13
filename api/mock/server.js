'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const ingredientsApi = require('./apis/ingredientsApi');
const unitsApi = require('./apis/unitsApi');
const recipesApi = require('./apis/recipesApi');

app.use(bodyParser.json());

app.get('/', (request, response) => response.send('Mock API server'));

ingredientsApi(app);
unitsApi(app);
recipesApi(app);

app.listen(port, (err) => {
  if (err) {
    return console.log('Mock API server couldn\'t start', err);
  }

  console.log(`Mock API server listening on port ${port}`);
});