import {setAutoAdaption} from 'va-commonjs/src/app';
import Vue from 'vue';
import VueResource from 'vue-resource';

import App from './components/App.vue';

setAutoAdaption();

Vue.use(VueResource);

// Bootstrap the app
new Vue({
  el: 'body',
  components: {
    app: App
  }
});
