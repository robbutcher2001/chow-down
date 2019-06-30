'use strict';

const ingredients = [{
  id: '37e62e30-f132-4775-a379-ae066fdf2e07',
  name: 'tomatoes'
}, {
  id: '7cb1fd9b-51b1-4d24-811d-656774616520',
  name: 'mushrooms'
}, {
  id: 'efaf0add-ebf6-4d02-a98b-b8520446362d',
  name: 'peppers'
}, {
  id: 'ef642207-0e8b-41db-a168-82ae58ea7ef6',
  name: 'chicken'
}, {
  id: '13baead9-9b0b-4dca-b930-7c727b2e0be6',
  name: 'breadcrumbs'
}, {
  id: '2e6cf92b-0d86-43b9-b491-b852f46632ab',
  name: 'lettuce'
}, {
  id: '397ee64c-5c1d-462f-a28b-09cc61d562ea',
  name: 'steak'
}, {
  id: '11045b60-2c22-458c-b4ed-2bd28a059924',
  name: 'noodles'
}, {
  id: 'f294ff82-ae8c-4f8a-8821-3820dc0cadef',
  name: 'milk'
}, {
  id: 'c980c9a3-918b-4ef8-9863-617f45d0dcaa',
  name: 'cheese'
}];

const getIngredients = () => ingredients;

const createIngredient = (id, name) => {
  const newIngredient = { id, name };
  ingredients.push(newIngredient);
  return newIngredient;
};

module.exports = {
  getIngredients,
  createIngredient
};