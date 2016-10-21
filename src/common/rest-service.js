import Vue from 'vue';

var jsonpServer = '';

export function getTestName() {
  return Vue.http.get('/api/test/getName');
};

export function getTestMsg() {
  return Vue.http.get('/api/test/getMsg');
};

export function getJSONPTest() {
  return Vue.http.jsonp(jsonpServer + '/api/test/getJSONPTest');
}






