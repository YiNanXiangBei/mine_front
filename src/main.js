// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import iview from 'iview'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from 'axios'
import VueDisqus from 'vue-disqus'
import Highlight from './util/highlight.js'
Vue.use(Highlight)
Vue.config.productionTip = false
Vue.use(mavonEditor)
Vue.use(VueDisqus)

/**
 * 关闭生产环境下的调试信息
 */
const isDebugMode = process.env.NODE_ENV !== "production";
Vue.config.debug = isDebugMode;
Vue.config.devtools = isDebugMode;
Vue.config.productionTip = isDebugMode;
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
      return Promise.reject(error)   // 返回接口返回的错误信息
  });

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
