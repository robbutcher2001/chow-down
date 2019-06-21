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

module.exports = {
  success,
  fail
};