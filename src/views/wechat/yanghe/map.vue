<!--
 * @Date: 2022-06-06 11:58:27
 * @LastEditors: ocean 13620113564@qq.com
 * @LastEditTime: 2022-06-14 16:40:30
 * @FilePath: /wechat-vue/src/views/wechat/yanghe/map.vue
-->
<template>
  <div class="map">
    <div class="title bounceInDown">
      <img
        src="../static/wechat/yanghe/title.png"
        width="100%"
      />
    </div>
    <div class="map_box">
      <img
        src="../static/wechat/yanghe/map.png"
        width="100%"
      />
      <div class="point_list" v-show="mapBox">
        <div
          v-for="(map, key) in mapList"
          :key="key"
          :class="`point  ${map.css}`"
          @click="onOpen(map.id)"
        >
          {{ map.title }}
        </div>
      </div>
    </div>
    <div class="button_list fadeInUp">
      <div class="button" @click="openMap(1)">旅游景点</div>
      <div class="button" @click="onMapList(2)">餐饮美食</div>
      <div class="button" @click="onMapList(3)">美丽乡村</div>
      <div class="button" @click="onMapList(4)">其他场馆</div>
    </div>
    <div class="bottom">
      <img
        src="../static/wechat/yanghe/bottom.png"
        width="100%"
      />
    </div>
    <!-- <p class="copyright"></p> -->
    <div class="bg"></div>
    <div class="content" v-show="content">
      <div class="content_close" @click="onClose">
        <img
          src="../static/wechat/yanghe/yuyue_close.png"
          width="100%"
        />
      </div>
      <div class="con" id="sc">
        <h1>{{ mapInfo.title }}</h1>
        <div class="desc">{{ mapInfo.desc }}</div>
        <div class="daohang" @click="daoHang">一键导航</div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/styles/yanghe-map.scss";
import { getMapList, getMapInfo, getSignPackage } from "@/api/wechat";
import wx from "weixin-js-sdk";
export default {
  name: "map",
  components: {},
  data() {
    return {
      mapBox: false,
      content: false,
      lhsl: false,
      mapList: [],
      mapInfo: {
        title: "loading",
        desc: "loading",
        address: "loading",
        lng: 0,
        lat: 0,
      },
    };
  },
  created() {
    document.title = "地图服务";
    this.onMapList(1);
    this.init();
  },
  computed: {},
  methods: {
    onMapList(category) {
      getMapList({ category: category }).then((response) => {
        this.mapBox = true;
        this.mapList = response.data;
      });
    },
    onOpen(id) {
      getMapInfo({ id: id }).then((response) => {
        this.content = true;
        this.mapInfo = response.data;
      });
    },
    onClose() {
      this.content = false;
    },
    init() {
      getSignPackage()
        .then((response) => {
          if (response.data.status == 200) {
            setTimeout(function() {
              wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: "wx8641dbc373d685fb", // 必填，公众号的唯一标识
                timestamp: response.data.sign_package.timestamp, // 必填，生成签名的时间戳
                nonceStr: response.data.sign_package.nonceStr, // 必填，生成签名的随机串
                signature: response.data.sign_package.signature, // 必填，签名
                jsApiList: [
                  "updateTimelineShareData",
                  "updateAppMessageShareData",
                  "onMenuShareTimeline",
                  "onMenuShareAppMessage",
                  "openLocation",
                ],
              });
              let share_data = {
                title: "地图服务",
                desc: "",
                link: "1111",
                imgUrl: "../static/wechat/yanghe/map.png",
              };
              wx.ready(function() {
                wx.updateTimelineShareData(share_data);
                wx.updateAppMessageShareData(share_data);
                wx.onMenuShareTimeline(share_data);
                wx.onMenuShareAppMessage(share_data);
              });
            }, 1000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    daoHang() {
      wx.openLocation({
        latitude: Number(this.mapInfo.lat), // 纬度，浮点数，范围为90 ~ -90
        longitude: Number(this.mapInfo.lng), // 经度，浮点数，范围为180 ~ -180。
        name: this.mapInfo.title, // 位置名
        address: this.mapInfo.address, // 地址详情说明
        scale: 15, // 地图缩放级别,整型值,范围从1~28。默认为最大
        infoUrl: "", // 在查看位置界面底部显示的超链接,可点击跳转
      });
    },
  },
};
</script>
