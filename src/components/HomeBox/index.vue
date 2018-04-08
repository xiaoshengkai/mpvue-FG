<template>
	<div class = "homeBox">
      	<img class = "homeImg" :src = "obj.pic" alt = "店图" />
        <div class = "homeBox-content">
            <div class = "homeBox-content-name">{{ obj.name }}</div>
            <div class = "homeBox-content-rate">
                <!--<Rate style = {{ fontSize: 12 }} disabled defaultValue={this.props.homeArr.rate} />-->
                <span v-if = "obj.price">￥{{ obj.price }}/人</span>
                <span else>暂无均价信息</span>
            </div>
            <div class = "homeBox-content-type"> 
                <span>{{ obj.type }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    obj: Object
  }
}
</script>

<style scoped>
/*homeBox 组件*/
.homeBox {
  background-color: #fff;
  display: flex;
  padding: 0 0.4rem;
  align-items: center;
  font-size: 12px;
  margin-bottom: 0.266667rem;
  color: #999;
  font-size: 12px;
}
.homeImg {
  width: 2.4rem;
  height: 1.6rem;
  margin-right:0.266667rem;
}
.homeBox-content-name {
  font-size: 14px;
  margin-top: 0.233333rem;
  width: 4rem;
  overflow: hidden;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333;
  font-size: 14px;
  font-weight: 600
}
.homeBox-content {
  flex: 1
}
.homeBox-content-rate {
  margin: 0.263333rem 0;
}
.homeBox-content-type {
  padding-bottom: 0.2rem;
}
.homeBox-content-solt {
  transform: translateY(0.133333rem);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.homeBox-content-solt >span:first-child {
  background-color: #ff5555;
  color: #fff;
  padding: 0.026667rem 0.106667rem;
  border-radius: 0.133333rem;
  margin-right: 0.266667rem
}
</style>