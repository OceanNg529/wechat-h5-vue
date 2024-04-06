<template>
  <div class="detail_map">
    <div class="detail_map_bg">
      <img
        ref="myImg"
        :style="{ transform: `matrix(${scale},0,0,${scale},${X},${Y})` }"
        src="../static/images/wechat/yanghe/detail_map.jpg"
        alt=""
      />
    </div>
    <div class="detail_map_tabbar">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item icon="search">标签</van-tabbar-item>
        <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import AlloyFinger from "alloyfinger";
import { Tabbar, TabbarItem } from "vant";
//禁止页面拖动
document.addEventListener(
  "touchmove",
  function(e) {
    e.preventDefault();
  },
  { passive: false }
);
export default {
  data() {
    return {
      scale: 2,
      X: 0,
      Y: 0,
      initScale: 2,
    };
  },
  mounted() {
    new AlloyFinger(this.$refs.myImg, {
      pinch: (e) => {
        this.scale = this.initScale * e.scale;
      },
      pressMove: (e) => {
        this.X = this.X + e.deltaX;
        this.Y = this.Y + e.deltaY;
      },
      multipointStart: () => {
        this.initScale = this.scale; //记录下放大的倍数，在此基础上放大缩小
      },
    });
  },
  methods: {},
};
</script>

<style scoped>
.detail_map {
  background: #fefbda;
  width: 100vw;
  height: 100vh;
}
</style>
