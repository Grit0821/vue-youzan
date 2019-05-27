<template>
  <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block"
    v-if="lists&&lists.length">
      <a class="block-item js-address-item address-item"
         :key="list.id"
         @click="toEdit(list)" v-for="list in lists"
         :class="{'address-item-default':list.isDefault}">
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.directName}}{{list.address}}</p>
        <a class="address-edit" >修改</a>
      </a>
    </div>
    <div v-if="lists&&!lists.length">
      没有地址，请添加
    </div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn"
       :to="{name:'form',query:{type:'add'}}">
        新增地址
      </router-link>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from 'js/api.js'
  import Address from 'js/addressService.js' /* 只能处理post请求 */
  export default {
    name: "all.vue",
    // data(){
    //   return {
    //     lists: null,
    //   }
    // },
    computed:{
      lists(){
        return this.$store.state.lists
      }
    },
    created(){
      // this.getAddressList()
      if(!this.lists){
        this.$store.dispatch('getLists')
      }
    },
    methods:{
      // getAddressList(){
      //   axios.get(url.addressLists).then(res=>{
      //     this.lists = res.data.lists
      //   })
      // },
      toEdit(list){
        // this.$router.push({path:'/address/form'})
        // 编程式导航
        this.$router.push({name:'form',query:{
          type: 'edit',
          instance: list,
          }})
      },

    }
  }
</script>

<style scoped>
  @import './address_base.css';/*引入外部的css样式*/
  @import './address.css';
</style>
