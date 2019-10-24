'use strict';
const uuid = require('../util/uuid');

const { respond, cors } = require('../util/jsend');
const { getIngredients, createIngredient } = require('../data/ingredients');

module.exports = app => {
  app.options('/api/ingredients', (request, response) => cors(response).status(200).send());

  app.get('/api/ingredients', (request, response) =>
    setTimeout(() => cors(response).json(respond('ingredients', getIngredients())), 1000));

  app.post('/api/ingredients', (request, response) => {
    const nameInRequest = request.body.name;

    if (nameInRequest) {
      const existingIngredient = getIngredients().find(ingredient =>
        ingredient.name === nameInRequest);

      if (!existingIngredient) {
        const newIngredient = createIngredient(uuid(), nameInRequest)
        setTimeout(() => cors(response).json(respond('ingredient', newIngredient)), 600);
      }
      else {
        setTimeout(() => cors(response).status(409).json(respond('ingredient', 'exists')), 600);
      }
    }
    else {
      cors(response).status(409).json(respond('error', 'invalid_payload'));
    }
  });

  app.put('/api/ingredients/:id', (request, response) => {
    const id = request.params.id;
    const nameInRequest = request.body.name;

    if (id) {
      const existingIngredient = getIngredients().find(ingredient => ingredient.id === id);

      if (existingIngredient) {
        console.log('Upserting [' + JSON.stringify(existingIngredient) + ']');

        existingIngredient.name = nameInRequest ? nameInRequest : existingIngredient.name;
        setTimeout(() => cors(response).json(respond('ingredient', existingIngredient)), 600);
      }
      else {
        const newIngredient = createIngredient(id, nameInRequest);
        console.log('Created new ingredient [' + JSON.stringify(newIngredient) + ']');

        setTimeout(() => cors(response).json(respond('ingredient', newIngredient)), 1200);
      }
    }
    else {
      cors(response).status(409).json(respond('error', 'invalid_payload'));
    }
  });
};