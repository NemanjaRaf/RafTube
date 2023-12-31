import Vue from 'vue'
import App from './App.vue'
import moment from 'moment';
import BootstrapVue from 'bootstrap-vue'
import VueSocketIO from 'vue-socket.io';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import router from './router'
import store from './store'

import './global.css'
import { API_URL, CLOUD_URL, LOGIN_URL, SOCKET_URL } from './config';

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    timeAgo(date) {
      return moment(date).fromNow();
    }
  },
  data() {
    return {
      API_URL: API_URL,
      SOCKET_URL: SOCKET_URL,
      CLOUD_URL: CLOUD_URL,
      LOGIN_URL: LOGIN_URL,
      isLoggedIn: function () {
        const token = localStorage.getItem('token');
        if (!token) return null;

        const decoded = JSON.parse(window.atob(token.split('.')[1]));
        if (!decoded) return null;

        if (decoded.exp < (Date.now() / 1000)) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          return null;
        }

        return decoded
      }
    }
  }
})

Vue.use(new VueSocketIO({
  connection: SOCKET_URL,
}));
Vue.use(BootstrapVue);

new Vue({
  store,
  render: h => h(App),
  router
}).$mount('#app')
