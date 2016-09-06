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
      getTestMsg().then(data => {
        this.remoteMsg += data.json().msg;
        return getTestName();
      }).then(data => {
        this.remoteMsg += ' ' + data.json().name;
      });
    }
  }
}
