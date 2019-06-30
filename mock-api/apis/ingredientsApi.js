'use strict';

const { success, fail, cors } = require('../util/jsend');
const uuid = require('../util/uuid');
const { getIngredients, createIngredient } = require('../data/ingredients');

module.exports = app => {
  app.options('/api/ingredients', (request, response) => {
    cors(response).status(200).send();
  });

  app.get('/api/ingredients', (request, response) =>
    setTimeout(() => cors(response).json(success('ingredients', getIngredients())), 1000));

  app.post('/api/ingredients', (request, response) => {
    const ingredientInRequest = request.body.ingredient;

    if (ingredientInRequest) {
      const existingIngredient = getIngredients().find(ingredient =>
        ingredient.name === ingredientInRequest);
      if (!existingIngredient) {
        const newIngredient = createIngredient(uuid(), ingredientInRequest)
        setTimeout(() => cors(response).json(success('ingredient', newIngredient)), 600);
      }
      else {
        setTimeout(() => cors(response).status(409).json(fail('ingredient', 'exists')), 600);
      }
    }
    else {
      cors(response).status(409).json(fail('error', 'invalid_payload'));
    }
  });

  app.put('/api/ingredients/:id', (request, response) => {
    const id = request.params.id;
    const ingredientInRequest = request.body.ingredient;

    if (id && ingredientInRequest) {
      const existingIngredient = getIngredients().find(ingredient => ingredient.id === id);

      if (existingIngredient) {
        console.log('Upserting [' + JSON.stringify(existingIngredient) + ']');
        existingIngredient.name = ingredientInRequest;
        setTimeout(() => cors(response).json(success('ingredient', existingIngredient)), 600);
      }
      else {
        const newIngredient = createIngredient(id, ingredientInRequest);
        console.log('Created new ingredient [' + JSON.stringify(newIngredient) + ']');
        setTimeout(() => cors(response).json(success('ingredient', newIngredient)), 1200);
      }
    }
    else {
      cors(response).status(409).json(fail('error', 'invalid_payload'));
    }
  });
};