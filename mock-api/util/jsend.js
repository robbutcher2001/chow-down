'use strict';

const success = (key, json) => common(key, json, 'success');

const fail = (key, json) => common(key, json, 'failed');

const common = (key, json, status) => {
  const response = {
    status,
    data: {}
  };

  response.data[key] = json;

  return response;
};

//TODO: reject if Accept header is not passed to server, maybe do with cors middleware: https://expressjs.com/en/resources/middleware/cors.html
const cors = response => {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  return response;
};

module.exports = {
  success,
  fail,
  cors
};