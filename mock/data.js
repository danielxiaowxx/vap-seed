
module.exports = {
  // route: data | get data function
  '/api/test/getName': () => {
    return {
      name: 'Daniel'
    };
  },
  '/api/test/getMsg': {msg: 'Hello'}
};
