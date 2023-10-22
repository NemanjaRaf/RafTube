import Vue from 'vue'
import App from './App.vue'
import moment from 'moment';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import router from '../router'
import store from '../store'

import './global.css'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    timeAgo(date) {
      return moment(date).fromNow();
    }
  },
  data() {
    return {
      API_URL: 'http://localhost:3000/api',
      CLOUD_URL: 'https://raftube.fra1.cdn.digitaloceanspaces.com/'
    }
  }
})

Vue.use(BootstrapVue);

new Vue({
  store,
  render: h => h(App),
  router
}).$mount('#app')
