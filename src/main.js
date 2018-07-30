// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from 'axios'
import 'bulma/css/bulma.min.css'
import 'font-awesome/css/font-awesome.min.css'
import VueDisqus from 'vue-disqus'
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(mavonEditor)
Vue.use(Vuex)
Vue.use(VueDisqus)
/* eslint-disable no-new */

// http request 拦截器
axios.interceptors.request.use(
  config => {
      if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = store.state.token;
        //   console.log(config.headers.Authorization);
      }
      return config;
  },
  err => {
      return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
      return response;
  },
  error => {
      if (error.response) {
          switch (error.response.code) {
            case 401:
                // 返回 401 清除token信息并跳转到登录页面
                router.replace({
                    path: '/sysadmin/login',
                    query: {redirect: router.currentRoute.fullPath}
                })
          }
      }
      return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
