'use strict';

const respond = (key, json) => {
  const response = {
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
  respond,
  cors
};