import { getTestName, getTestMsg, getJSONPTest } from '../../common/rest-service';

export default {
  data() {
    return {
      msg: 'Hello daniel',
      remoteMsg: '',
      jsonpRes: ''
    }
  },

  methods: {
    getHello() {
      getTestMsg().then(res => {
        this.$data.remoteMsg += res.data.msg;
        return getTestName();
      }).then(res => {
        this.$data.remoteMsg += ' ' + res.data.name;
      });
    },
    getJSONPTest() {
      getJSONPTest().then(res => {
        console.log(res.data);
        this.$data.jsonpRes = res.data.result;
      });
    }
  }
}
