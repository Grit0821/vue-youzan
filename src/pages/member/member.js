import Vue from 'vue'
import router from './router'
import store from './vuex'

new  Vue({
  el: '#app',
  router, // 注入router实例
  store, // 注入vuex仓库
})
