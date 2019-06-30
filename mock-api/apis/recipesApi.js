'use strict';

const { success, fail, cors } = require('../util/jsend');
const { getRecipes } = require('../data/recipes');

module.exports = app => {
  app.get('/api/recipes', (request, response) =>
    setTimeout(() => cors(response).json(success('recipes', getRecipes())), 1200)
  );
};