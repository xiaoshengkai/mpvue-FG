<template>
  <div class = "merchant">
    	<div class = "header">
      <img class = "header-img" :src = "pic" alt="店铺头像"/>
    	  <div class = "merchant-content">
        <div class = "merchant-content-name">{{ name }}</div>
        <div class = "merchant-content-data">
          <span v-for = "(item, index) in rate" :key = "index" class = "active">★</span>
        </div>
    	  </div>
    	</div>
    <div class = "bodyer">
	  <div class = "react-b-1" v-for = "(item, index) in bodyArr" :key = "index" @click="goMap(item)">
	    <i class = "iconfont" :class = "item.i"></i>
	    <span>{{ item.text }}</span>
	    <i class = "iconfont icon-jiantou1-right" ></i>
	  </div>
	</div>
  </div>
</template>

<script>
import request from '../../utils/api'
export default {
  async onLoad () {
    this.init()
  },
  data () {
    return {
      pic: '',
      name: '',
      bodyArr: [],
      rate: []
    }
  },
  methods: {
    init () {
      let self = this
      wx.getStorage({
        key: 'cid',
        success (resData) {
          request('/info_Customer', {cid: resData.data}).then((data) => {
            // 渲染页面数据
            let res = data.jsonval.info_cus[0]
            self.pic = 'http://media.chihuogang.com/market/img/' + res.file
            self.name = res.company
            self.rate = []
            for (let i = 0; i < parseInt(res.score / 10); i++) {
              self.rate.push(i)
            }
            self.bodyArr = [
              {i: 'icon-weizhi', text: res.address, tip: 'address'},
              {i: 'icon-yongcan', text: res.product}
            ]
            self.$store.commit('changeState', {latitude: res.pos_lat})
            self.$store.commit('changeState', {longitude: res.pos_lon})
          })
        }
      })
    },
    goMap (obj) {
      if (obj.tip === 'address') {
        wx.navigateTo({
          url: '/pages/map/main'
        })
      }
    }
  }
}
</script>
<style scoped>
/*merchant 页面*/
.merchant {
   min-height: 100vh;
   background-color: #f2f2f2;
   font-size: 24rpx;
}
.header {
  background-color: #333;
  display: flex;
  align-items: center;
  padding: 0.266667rem 0.4rem;
}
.header-img {
  width: 2.4rem;
  height: 1.6rem;
  margin-right: 0.266667rem;
  border-radius: 0.133333rem;
}
.merchant-content {
  flex: 1;
  color: #fff
}
.merchant-content-data {
  /*display: flex;*/
  /*justify-content: space-between;*/
  margin-top: 0.266667rem
}
.merchant-content-data span{
  margin: 0 6rpx;
}
.bodyer {
  padding-left: 0.4rem;
  background-color: #fff
}
.bodyer div {
  height: 1.146667rem;
  line-height: 1.146667rem;
  display: flex;
  align-items: center; 
}
.bodyer div i {
  margin-right: 0.266667rem
}
.bodyer div i:last-child {
  flex: 1;
  text-align: right
}
.nodata {
  text-align: center;
  background-color: #fff;
  padding: 0.266667rem 0.4rem
}
.active {
	/*background-color: #f0b535;*/
}
</style>
