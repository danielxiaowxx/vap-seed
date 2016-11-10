import {getTestName, getTestMsg} from '../../common/rest-service';

export default {
  data () {
    return {
      msg: 'Hello daniel',
      remoteMsg: ''
    }
  },

  methods: {
    getHello() {
      getTestMsg().then(res => {
        this.remoteMsg += res.data.msg;
        return getTestName();
      }).then(res => {
        this.remoteMsg += ' ' + res.data.name;
      });
    }
  }
}
