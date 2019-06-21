const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const { success, fail } = require('./util/jsend');
const { getIngredients, putIngredient } = require('./data/ingredients');
const { getUnits, validatePayload, putUnit } = require('./data/units');

app.use(bodyParser.json());

const wrapResponse = response => {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  return response;
};

app.get('/', (request, response) => response.send('Mock API server'));

app.get('/api/ingredients', (request, response) =>
  setTimeout(() => wrapResponse(response).json(success('ingredients', getIngredients())), 1000)
);

app.post('/api/ingredient', (request, response) => {
  if (putIngredient(request.body.ingredient)) {
    wrapResponse(response).json(success());
  }
  else {
    wrapResponse(response).status(409).json(fail('ingredient', 'exists'));
  }
});

app.get('/api/units', (request, response) =>
  setTimeout(() => wrapResponse(response).json(success('units', getUnits())), 200)
);

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

app.listen(port, (err) => {
  if (err) {
    return console.log('Mock API server couldn\'t start', err);
  }

  console.log(`Mock API server listening on port ${port}`);
});
