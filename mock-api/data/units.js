'use strict';

const units = [{
  id: 'a566ce0d-39ae-4fa5-9ae6-84db7308f8c4',
  singular: 'gram',
  plural: 'grams'
}, {
  id: '4f32dcad-98f6-43ab-97ac-b157ea0637f4',
  singular: 'ml',
  plural: 'ml'
}, {
  id: '4e33a3a8-9bef-4e54-8c3a-58ebacefdfe5',
  singular: 'cup',
  plural: 'cups'
}, {
  id: '071b98ba-b8d4-485a-a3d1-c8fb56629c23',
  singular: 'teaspoon',
  plural: 'teaspoons'
}, {
  id: '2cdc1f80-50c5-48d9-a196-597b7cddc131',
  singular: 'tablespoon',
  plural: 'tablespoons'
}, {
  id: '95e8fbbe-bc65-4dee-8fa5-e52065ed0828',
  singular: 'large',
  plural: 'large'
}, {
  id: '743a1665-453e-4ab1-af94-ee92bd52ac3e',
  singular: 'medium',
  plural: 'medium'
}, {
  id: '1c77351a-f3f5-4587-83fd-0a12532c703e',
  singular: 'small',
  plural: 'small'
}, {
  id: '6260c7f3-bdc9-4dd0-952d-b4b378c7be22',
  singular: 'pinch',
  plural: 'pinches'
}, {
  id: 'a11c9c31-2e1d-429b-bc76-4bfed4374570',
  singular: 'bunch',
  plural: 'bunches'
}, {
  id: '471b89e7-d69b-4063-be40-c493e3964ce3',
  singular: 'punnet',
  plural: 'punnets'
}, {
  id: 'b0c604bf-22f3-42fa-a7f6-fd82f9aa51e7',
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