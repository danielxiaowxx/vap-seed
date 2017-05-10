module.exports = {
  // route: data | get data function
  '/api/test/getName': (params) => {
    return {
      name: 'Daniel',
      params: params
    };
  },
  '/api/test/getMsg': {msg: 'Hello'},
  '/api/test/getJSONPTest': (params) => {
    return {result: 'jsonp result', params: params}
  }
};
