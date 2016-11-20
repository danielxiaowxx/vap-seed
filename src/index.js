import Vue from 'vue';
import VueResource from 'vue-resource';

import App from './components/App.vue';

Vue.use(VueResource);

// Bootstrap the app
new Vue({
  el: 'body',
  ready() {
    this.$data.isResourceLoading = false;
  },
  data: {
    isResourceLoading: true
  },
  components: {
    app: App
  }
});

window.onerror = err => {
  console.error('>>>', err); // 可将错误日志回传服务器
};
