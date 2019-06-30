'use strict';

const { success, fail, cors } = require('../util/jsend');
const { getUnits, validatePayload, putUnit } = require('../data/units');

module.exports = app => {
  app.options('/api/units', (request, response) => {
    cors(response).status(200).send();
  });

  app.get('/api/units', (request, response) =>
    setTimeout(() => cors(response).json(success('units', getUnits())), 200)
  );

  app.post('/api/units', (request, response) => {
    const unit = request.body.unit;
    if (validatePayload(unit)) {
      if (putUnit(unit)) {
        cors(response).json(success());
      }
      else {
        cors(response).status(409).json(fail('unit', 'exists'));
      }
    }
    else {
      cors(response).status(409).json(fail('error', 'invalid_payload'));
    }
  });
};