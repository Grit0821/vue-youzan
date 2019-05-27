// 引入相关包
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import url from 'js/api.js'
import Address from 'js/addressService.js'
// 使用vuex插件
Vue.use(Vuex)

// 创建Store实例
const store = new Vuex.Store({
  state:{
    lists: null,
  },
  mutations:{
    // 同步操作
    init(state,lists){
      state.lists = lists
    },
    add(state,instance){
      state.lists.push(instance)
    },
    remove(state,id){
      let lists = state.lists
      let index =  lists.findIndex(item =>{
        return item.id == id
      })
      lists.splice(index, 1)
    },
    update(state,instance){
      let lists = JSON.parse(JSON.stringify(state.lists))
      let index = lists.findIndex(item => {
        return item.id == instance.id
      })
      lists[index] = instance
      state.lists = lists
    },
    setDefault(state,id){
      let lists = state.lists
      lists.forEach(item => {
        item.isDefault = item.id == id ? true:false
      })
    }
  },
  actions:{
    // 异步操作
    getLists(){
      axios.get(url.addressLists).then(res=>{
        // commit触发传入数据,触发init方法
        store.commit('init',res.data.lists)
      })
    },
    addAction({commit},instance){
      Address.add(instance).then(res => {
        // instance.id = parseInt(Math.random()*10000)
        commit('add',instance)
      })
    },
    removeAction({commit},id){
      Address.remove(id).then(res =>{
        commit('remove',id)
      })
    },
    updateAction({commit},instance){
      Address.update(instance).then(res => {
        // 实际开发使用
        // commit('update', res.data.data)
        // 测试使用

        // let data = instance
        // data.id = instance.id
        // data.isDefault = instance.isDefault
        commit('update', instance)
      })
    },
    setDefaultAction({commit},id){
      Address.setDefault(id).then(res => {
        commit('setDefault',id)
      })
    }
  }
})

export default store
