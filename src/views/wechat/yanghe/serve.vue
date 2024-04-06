<template>
  <div class="main">
    <el-carousel height="20rem" :interval="5000" arrow="always">
      <el-carousel-item v-for="banner in bannerList" :key="banner">
        <el-image :src="`../` + banner.img"></el-image>
      </el-carousel-item>
    </el-carousel>
    <div class="list">
      <div
        :class="[menu.cateid == 0 ? 'cateTile' : 'menu']"
        :style="{ 'background-color': menu.bgcolor, color: menu.textcolor }"
        v-for="(menu, index) in menuList"
        :key="index"
      >
        <a :href="menu.url">
          <div class="title" v-if="menu.cateid == 0">
            <p>{{ menu.title }}</p>
          </div>
          <div class="button" v-else>
            <div class="left">
              <el-image :src="`../` + menu.img"></el-image>
            </div>
            <div class="right">{{ menu.title }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import "@/styles/yanghe-serve.scss";
import { getBannerList, getMenuList } from "@/api/wechat";
export default {
  name: "Serve",
  components: {},
  data() {
    return {
      bannerList: [],
      menuList: [],
    };
  },
  created() {
    document.title = "222";
    this.onBannerList();
    this.onMenuList();
  },
  computed: {},
  methods: {
    onBannerList() {
      getBannerList().then((response) => {
        this.bannerList = response.data;
      });
    },
    onMenuList() {
      getMenuList().then((response) => {
        this.menuList = response.data;
      });
    },
  },
};
</script>
