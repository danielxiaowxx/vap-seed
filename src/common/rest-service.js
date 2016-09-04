import Vue from 'vue';

export function getHello(msg) {
  return Vue.http.get('/api');
};

export function getTest() {
  return Vue.http.get('/test');
};