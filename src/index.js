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


window.onerror = (msg, url, lineNo, columnNo, error) => {
  var msg = {
    msg: msg,
    stack: error.stack,
    url: location.href,
    ua: navigator.userAgent
  };
  console.error('>>>', JSON.stringify(msg)); // 可将错误日志回传服务器
};
