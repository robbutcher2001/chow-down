const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const ingredients = require('./data/ingredients');

app.use(bodyParser.json());

const wrapResponse = response => {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  return response;
};

app.get('/', (request, response) => response.send('Mock API server'));

app.get('/api/ingredients', (request, response) =>
  setTimeout(() => wrapResponse(response).json(ingredients()), 1000)
);

app.listen(port, (err) => {
  if (err) {
    return console.log('Mock API server couldn\'t start', err);
  }

  console.log(`Mock API server listening on port ${port}`);
});
