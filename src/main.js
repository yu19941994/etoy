import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios' // 主要的 AJAX 套件
import VueAxios from 'vue-axios' // 將它轉為 Vue 的套件
import 'bootstrap';
import Loading from 'vue-loading-overlay'; // 載入 overlay 套件
import 'vue-loading-overlay/dist/vue-loading.css'; // overlay 的 css
import './bus'; // 將 event bus 掛載進來
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';// 載入 vee-validate
import { required } from 'vee-validate/dist/rules'; // required 規則
import * as rules from 'vee-validate/dist/rules'; // 其他規則

import currency from './filters/currency';
import date from './filters/date';
import formatDate from './filters/formatDate';
import Vuex from 'vuex';
import store from './store';


extend('required', {
  ...required,
  message: 'This field is required'
});

for (let rule in rules) {
  extend(rule, rules[rule]);
} // 引入其他規則


Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true;
Vue.use(Vuex);
Vue.component('Loading', Loading);
Vue.filter('currency', currency);
Vue.filter('date', date);
Vue.filter('formatDate', formatDate);

new Vue({
  router,
  Vuex,
  store,
  render: h => h(App)
}).$mount('#app');


// 導航守衛
router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next);
  if(to.meta.requiresAuth){
    // console.log('這裡需要驗證');
    const api = `${process.env.VUE_APP_API}/api/user/check`;
    const vm = this;
    axios.post(api).then((response) => {
      console.log(response.data);
      if(response.data.success){
        next();
      }else{
        next({
          path: '/login'
        })
      }
    })
  }else{
    next();
  }
})