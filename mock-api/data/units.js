const { success } = require('../util/jsend');

const units = [{
  singular: 'gram',
  plural: 'grams'
}, {
  singular: 'ml',
  plural: 'ml'
}, {
  singular: 'cup',
  plural: 'cups'
}, {
  singular: 'teaspoon',
  plural: 'teaspoons'
}, {
  singular: 'tablespoon',
  plural: 'tablespoons'
}, {
  singular: 'large',
  plural: 'large'
}, {
  singular: 'medium',
  plural: 'medium'
}, {
  singular: 'small',
  plural: 'small'
}, {
  singular: 'pinch',
  plural: 'pinches'
}, {
  singular: 'bunch',
  plural: 'bunches'
}, {
  singular: 'punnet',
  plural: 'punnets'
}, {
  singular: 'cm',
  plural: 'cm'
}];

const validatePayload = payload => payload &&
  payload.singular && payload.plural ? true : false;

const getUnits = () => units;

const putUnit = newUnit => !units.some(unit =>
  unit.singular === newUnit.singular &&
  unit.plural === newUnit.plural
) ?
  units.push(newUnit) && true : false;

module.exports = {
  getUnits,
  validatePayload,
  putUnit
};