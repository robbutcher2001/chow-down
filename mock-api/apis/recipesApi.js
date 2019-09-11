'use strict';
const uuid = require('../util/uuid');

const { success, fail, cors } = require('../util/jsend');
const { getRecipes, createRecipe, getRecipeIngredients } = require('../data/recipes');

module.exports = app => {
  app.options('/api/recipes', (request, response) => cors(response).status(200).send());

  app.get('/api/recipes', (request, response) =>
    setTimeout(() => cors(response).json(success('recipes', getRecipes())), 1200));

  app.get('/api/recipes/:id/ingredients', (request, response) =>
    setTimeout(() => cors(response).json(success('ingredients', getRecipeIngredients())), 2000));

  app.post('/api/recipes', (request, response) => {
    const titleInRequest = request.body.title;
    const urlInRequest = request.body.url;
    const descriptionInRequest = request.body.description;
    const imageInRequest = request.body.image;

    if (titleInRequest && urlInRequest) {
      const existingRecipe = getRecipes().find(recipe =>
        recipe.title === titleInRequest && recipe.url === urlInRequest);

      if (!existingRecipe) {
        const newRecipe = createRecipe(
          uuid(),
          titleInRequest,
          urlInRequest,
          descriptionInRequest,
          imageInRequest
        );
        cors(response).json(success('recipe', newRecipe));
      }
      else {
        cors(response).status(409).json(fail('recipe', 'exists'));
      }
    }
    else {
      cors(response).status(409).json(fail('error', 'invalid_payload'));
    }
  });

  app.put('/api/recipes/:id', (request, response) => {
    const id = request.params.id;
    const titleInRequest = request.body.title;
    const urlInRequest = request.body.url;
    const descriptionInRequest = request.body.description;
    const imageInRequest = request.body.image;

    if (id) {
      const existingRecipe = getRecipes().find(recipe => recipe.id === id);

      if (existingRecipe) {
        console.log('Upserting [' + JSON.stringify(existingRecipe) + ']');

        existingRecipe.title = titleInRequest ? titleInRequest : existingRecipe.title;
        existingRecipe.url = urlInRequest ? urlInRequest : existingRecipe.url;
        existingRecipe.description = descriptionInRequest ? descriptionInRequest : existingRecipe.description;
        existingRecipe.image = imageInRequest ? imageInRequest : existingRecipe.image;
        setTimeout(() => cors(response).json(success('recipe', existingRecipe)), 800);
      }
      else {
        const newRecipe = createRecipe(
          uuid(),
          titleInRequest,
          urlInRequest,
          descriptionInRequest,
          imageInRequest
        );
        console.log('Created new recipe [' + JSON.stringify(newRecipe) + ']');

        setTimeout(() => cors(response).json(success('recipe', newRecipe)), 1600);
      }
    }
    else {
      cors(response).status(409).json(fail('error', 'invalid_payload'));
    }
  });
};