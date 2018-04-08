<template>
  <div class="index">
      <div class = "app" id = "app" style="{height: '12.68rem', overflow: 'auto'}">
        	<div class = "home">
            	<div class = "home-search">
            	    <i class = "iconfont icon-search"></i>
                <input type = "text" v-model = "value" placeholder = "搜索餐厅"/>
            	</div>
            <div class = "home-search-btn" @click = "search">搜索</div>
        </div>
        <div class = "home-content">
        	    <p class = "nodata" v-if = "homeArr.length === 0 ">暂无数据</p>
        	    <div @click="goMerchant(item)" v-for = "(item ,index) in homeArr" :key = "index">
        	    	  <HomeBox :obj = "item"></HomeBox>
        	    </div>
      	</div>
    </div>
  </div>
</template>

<script>
import HomeBox from '../../components/HomeBox'
import request from '../../utils/api'
export default {
  async onLoad () {
    this.getMerchantData()
  },
  /*
   * 小程序监听下拉动作
   */
  onPullDownRefresh () {
    wx.showNavigationBarLoading()
    this.start = 0
    this.getMerchantData()
  },
  /*
   * 小程序监听上拉动作
   */
  onReachBottom () {
    wx.showLoading({
      title: '玩命加载中'
    })
    this.start = this.start + 1
    this.getMerchantData()
  },
  data () {
    return {
      value: '',
      homeArr: [],
      mescroll: null,
      start: 0,
      company: ''
    }
  },
  methods: {
    search () {
      this.company = this.value
      this.start = 0
      this.getMerchantData()
    },
    getMerchantData () {
      request('/vague', {
        start: this.start,
        company: this.company
      }).then((data) => {
        let homeArr = data.jsonval.info_cus.map((item) => (
          {
            pic: 'http://media.chihuogang.com/market/img/' + item.file,
            name: item.company,
            rate: item.score / 10,
            price: item.people_money,
            type: item.product,
            cid: item.cid
          }
        ))
        if (this.start === 0) {
          this.homeArr = [...homeArr]
        } else {
          this.homeArr = [...this.homeArr, ...homeArr]
        }
        wx.stopPullDownRefresh()             // 下拉恢复
        wx.hideNavigationBarLoading()        //  loading 取消
        wx.hideLoading()                     //  loading 取消
      })
    },
    goMerchant (obj) {
      wx.setStorage({
        key: 'cid',
        data: obj.cid,
        success () {
          wx.navigateTo({
            url: '/pages/merchant/main'
          })
        }
      })
    }
  },
  components: {
    HomeBox
  }
}
</script>

<style scoped>
/*home 首页*/
.app {
   min-height: 100vh;
   background-color: #f2f2f2;
}
.home {
  background-color: #f2f2f2;
  padding: 0.266667rem 0;
  display: flex;
  align-items: center;
}
.home-search {
  height: 0.746667rem;
  margin-left: 0.4rem;
  display: flex;
  align-items: center;
  background-color: #fff;
  flex:1;
  border-radius: 0.133333rem;
}
.home-search-btn {
  margin: 0 20px;
  color: #ff5555;
  font-size: 12px;
}
.home-search input{
  width: 100%;
  /*height: 0.28rem;*/
  margin-left: 0.4rem;
  font-size: 12px;
}
.home-search input::-webkit-input-placeholder {
  color: #999;
  line-height: 0.466667rem;
}
.home-search i {
  margin-left: 0.266667rem;
}
.nodata {
	font-size: 24rpx;
	text-align: center;
}
</style>
