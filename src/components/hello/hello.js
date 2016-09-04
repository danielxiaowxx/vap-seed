import {getHello, getTest} from '../../common/rest-service';

export default {
  data () {
    return {
      msg: 'Hello daniel yeah!'
    }
  },

  methods: {
    getHello() {
      getHello('daniel').then(data => {
        this.msg = data.text();
      });
      getTest().then(data => {
        console.log(data.json());
      });
    }
  }
}