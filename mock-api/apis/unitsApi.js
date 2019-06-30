'use strict';

const { success, fail, cors } = require('../util/jsend');
const uuid = require('../util/uuid');
const { getUnits, createUnit } = require('../data/units');

module.exports = app => {
  app.options('/api/units', (request, response) => cors(response).status(200).send());

  app.get('/api/units', (request, response) =>
    setTimeout(() => cors(response).json(success('units', getUnits())), 200));

  app.post('/api/units', (request, response) => {
    const singularInRequest = request.body.singular;
    const pluralInRequest = request.body.plural;

    if (singularInRequest && pluralInRequest) {
      const existingUnit = getUnits().find(unit =>
        unit.singular === singularInRequest && unit.plural === pluralInRequest);

      if (!existingUnit) {
        const newUnit = createUnit(uuid(), singularInRequest, pluralInRequest);
        cors(response).json(success('unit', newUnit));
      }
      else {
        cors(response).status(409).json(fail('unit', 'exists'));
      }
    }
    else {
      cors(response).status(409).json(fail('error', 'invalid_payload'));
    }
  });

  app.put('/api/units/:id', (request, response) => {
    const id = request.params.id;
    const singularInRequest = request.body.singular;
    const pluralInRequest = request.body.plural;

    if (id) {
      const existingUnit = getUnits().find(unit => unit.id === id);

      if (existingUnit) {
        console.log('Upserting [' + JSON.stringify(existingUnit) + ']');

        existingUnit.singular = singularInRequest ? singularInRequest : existingUnit.singular;
        existingUnit.plural = pluralInRequest ? pluralInRequest : existingUnit.plural;
        setTimeout(() => cors(response).json(success('unit', existingUnit)), 400);
      }
      else {
        const newUnit = createUnit(id, singularInRequest, pluralInRequest);
        console.log('Created new unit [' + JSON.stringify(newUnit) + ']');

        setTimeout(() => cors(response).json(success('unit', newUnit)), 800);
      }
    }
    else {
      cors(response).status(409).json(fail('error', 'invalid_payload'));
    }
  });
};