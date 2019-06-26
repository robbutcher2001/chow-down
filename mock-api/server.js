const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const { success, fail } = require('./util/jsend');
const { getIngredients, putIngredient } = require('./data/ingredients');
const { getUnits, validatePayload, putUnit } = require('./data/units');
const { getRecipes } = require('./data/recipes');

app.use(bodyParser.json());

//TODO: reject if Accept header is not passed to server, maybe do with cors middleware: https://expressjs.com/en/resources/middleware/cors.html
const wrapResponse = response => {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  return response;
};

app.get('/', (request, response) => response.send('Mock API server'));

// Ingredients
app.get('/api/ingredients', (request, response) =>
  setTimeout(() => wrapResponse(response).json(success('ingredients', getIngredients())), 1000)
);

app.options('/api/ingredient', (request, response) => {
  wrapResponse(response).status(200).send();
});

app.post('/api/ingredient', (request, response) => {
  if (putIngredient(request.body.ingredient)) {
    setTimeout(() => wrapResponse(response).json(success()), 600)
  }
  else {
    setTimeout(() => wrapResponse(response).status(409).json(fail('ingredient', 'exists')), 600)
  }
});

// Units
app.get('/api/units', (request, response) =>
  setTimeout(() => wrapResponse(response).json(success('units', getUnits())), 200)
);

app.options('/api/unit', (request, response) => {
  wrapResponse(response).status(200).send();
});

app.post('/api/unit', (request, response) => {
  const unit = request.body.unit;
  if (validatePayload(unit)) {
    if (putUnit(unit)) {
      wrapResponse(response).json(success());
    }
    else {
      wrapResponse(response).status(409).json(fail('unit', 'exists'));
    }
  }
  else {
    wrapResponse(response).status(409).json(fail('error', 'invalid_payload'));
  }
});

// Recipes
app.get('/api/recipes', (request, response) =>
  setTimeout(() => wrapResponse(response).json(success('recipes', getRecipes())), 1200)
);

// App
app.listen(port, (err) => {
  if (err) {
    return console.log('Mock API server couldn\'t start', err);
  }

  console.log(`Mock API server listening on port ${port}`);
});
