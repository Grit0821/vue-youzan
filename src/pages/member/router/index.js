import Vue from 'vue'
import Router from 'vue-router'

import member from'../components/member.vue'
import address from'../components/address.vue'
import all from'../components/all.vue'
import form from'../components/form.vue'

Vue.use(Router)

let routes = [{
  /* 路由配置 */
  path:'/',
  component: member,
},{
  path: '/address',
  component: address,
  /* 嵌套路由 */
  children:[{
    path: '',
    redirect: 'all' /* 重定向跳转到/all */
  },{
    name:'all',
    path:'all',
    component:all,
  },{
    name: 'form',
    path:'form',
    component:form,
  }]
}]


/* 创建router实例 */
let router = new Router({
  routes
})

export default router
