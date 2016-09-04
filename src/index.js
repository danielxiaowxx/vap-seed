import Vue from 'vue';
import VueResource from 'vue-resource';

import App from './components/App.vue';

Vue.use(VueResource);

// Bootstrap the app
new Vue({
  el: 'body',
  components: {
    app: App
  }
});