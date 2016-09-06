import Vue from 'vue';

export function getTestName() {
  return Vue.http.get('/api/test/getName');
};

export function getTestMsg() {
  return Vue.http.get('/api/test/getMsg');
};






