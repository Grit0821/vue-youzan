import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);

import Foot from 'components/Foot'
import Swipe from 'components/Swipe'

let app = new Vue({
  el: '#app',
  data: {
    lists: null,
    pageNum: 1,
    pageSize: 6,
    loading: false, // 表示可以继续拖动加载
    allLoaded: false,
    bannerLists: null,
  },
  created() {
    this.getLists()
    this.getBanner()
  },
  methods: {
    getLists() {
      if (this.allLoaded) return
      this.loading = true
      axios.get(url.hotLists, {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }).then(res => {
        let curLists = res.data.lists
        //判断所有的数据是否加载完成
        if (curLists.length < this.pageSize) {
          this.allLoaded = true
        }
        if (this.lists) {
          // 把新数组和原来的数组拼到一起
          this.lists = this.lists.concat(curLists)
        } else {
          // 第一次请求数据
          this.lists = curLists
        }
        this.loading = false
        this.pageNum++
      })
    },
    getBanner(){
      axios.get(url.banner).then(res=>{
        this.bannerLists = res.data.lists
      })
    },
  },
  components:{Foot,Swipe},

})
