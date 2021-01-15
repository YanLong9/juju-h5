<template>
  <div id="downloadApp">
    <van-swipe @change="onChange" :autoplay="3000">
      <van-swipe-item
        ><img src="../assets/img/download1.png" alt=""
      /></van-swipe-item>
      <van-swipe-item
        ><img src="../assets/img/download2.png" alt=""
      /></van-swipe-item>
      <van-swipe-item
        ><img src="../assets/img/download3.png" alt=""
      /></van-swipe-item>
      <van-swipe-item
        ><img src="../assets/img/download4.png" alt=""
      /></van-swipe-item>
    </van-swipe>
    <div class="downloadBox">
      <p>想找剧，刷聚剧</p>
      <p class="downloadBtn">打开聚剧app</p>
    </div>
  </div>
</template>
<script>
import { configShare } from "../assets/js/getWx";

export default {
  name: "downloadApp",
  created() {
    configShare("JUJU-聚剧", "影视内容点评分享社区，影视爱好者的聚集地");
    this.$emit("changeLoad", false);
  },
  methods: {
    onChange(index) {
      // console.log(index);
    },
  },
};
</script>
<style lang="scss" scoped>
#downloadApp {
  width: 100%;
  height: 100%;
  ::v-deep .van-swipe {
    width: 100%;
    height: 100%;
    .van-swipe-item {
      width: 100vw !important;
      height: 100vh;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .van-swipe__indicators {
      position: absolute;
      top: 40px;
      bottom: auto;
    }
  }
  .downloadBox {
    width: 100%;
    height: 80px;
    padding: 0 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    background: rgba(30, 30, 40, 0.6);
    color: white;
    font-size: 22px;
    .downloadBtn {
      height: 60px;
      padding: 0 30px;
      text-align: center;
      line-height: 70px;
      border-radius: 10px;
      background: #ea592d;
    }
  }
}
</style>