module.exports = (key, json) => {
  const response = {
    status: 'success',
    data: {}
  };

  response.data[key] = json;

  return response;
};