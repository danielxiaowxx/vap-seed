import {setAutoAdaption} from 'va-commonjs/src/app';
import Vue from 'vue';
import VueResource from 'vue-resource';
import $ from 'jquery'; // XXX if you don't use jquery, rm it

import App from './components/App.vue';

window.$ = $; // XXX if you don't use jquery, rm it  

setAutoAdaption();

Vue.use(VueResource);

// Bootstrap the app
new Vue({
  el: 'body',
  components: {
    app: App
  }
});

window.onerror = err => {
  console.error(err); // TODO Daniel: 将错误日志回传服务器
}
