'use strict';

const { success, fail, cors } = require('../util/jsend');
const { getIngredients, putIngredient } = require('../data/ingredients');

module.exports = app => {
  app.get('/api/ingredients', (request, response) =>
    setTimeout(() => cors(response).json(success('ingredients', getIngredients())), 1000));

  app.options('/api/ingredient', (request, response) => {
    cors(response).status(200).send();
  });

  app.post('/api/ingredient', (request, response) => {
    if (putIngredient(request.body.ingredient)) {
      setTimeout(() => cors(response).json(success()), 600);
    }
    else {
      setTimeout(() => cors(response).status(409).json(fail('ingredient', 'exists')), 600);
    }
  });
};