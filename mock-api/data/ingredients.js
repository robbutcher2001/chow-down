const { success } = require('../util/jsend');

const ingredients = [
  'tomatoes',
  'mushrooms',
  'peppers',
  'chicken',
  'breadcrumbs',
  'lettuce',
  'steak',
  'noodles',
  'milk',
  'cheese'
];

const getIngredients = () => ingredients;

const putIngredient = ingredient =>
  !ingredients.includes(ingredient) ? ingredients.push(ingredient) && true : false;

module.exports = {
  getIngredients,
  putIngredient
};