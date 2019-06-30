'use strict';

const units = [{
  id: '',
  singular: 'gram',
  plural: 'grams'
}, {
  id: '',
  singular: 'ml',
  plural: 'ml'
}, {
  id: '',
  singular: 'cup',
  plural: 'cups'
}, {
  id: '',
  singular: 'teaspoon',
  plural: 'teaspoons'
}, {
  id: '',
  singular: 'tablespoon',
  plural: 'tablespoons'
}, {
  id: '',
  singular: 'large',
  plural: 'large'
}, {
  id: '',
  singular: 'medium',
  plural: 'medium'
}, {
  id: '',
  singular: 'small',
  plural: 'small'
}, {
  id: '',
  singular: 'pinch',
  plural: 'pinches'
}, {
  id: '',
  singular: 'bunch',
  plural: 'bunches'
}, {
  id: '',
  singular: 'punnet',
  plural: 'punnets'
}, {
  id: '',
  singular: 'cm',
  plural: 'cm'
}];

const getUnits = () => units;

const createUnit = (id, singular, plural) => {
  const newUnit = { id, singular, plural };
  units.push(newUnit);
  return newUnit;
};

module.exports = {
  getUnits,
  createUnit
};