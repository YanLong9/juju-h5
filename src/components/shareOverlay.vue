<template>
  <van-overlay
    :show="showGuide"
    @click="changeGuide"
    z-index="100"
    id="shareOverlay"
  >
    <template>
      <div class="guideBox">
        <div class="imgBox">
          <img src="../assets/img/guide.png" alt="" />
        </div>
        <p class="tip">点击右上角，分享好友</p>
        <div class="guideBtn">我知道了</div>
      </div>
    </template>
  </van-overlay>
</template>
<script>
export default {
  name: "shareOverlay",
  props: ["showGuide"],
  methods: {
    changeGuide() {
      this.$emit("changeGuide");
    },
  },
};
</script>
<style lang="scss" scoped>
#shareOverlay {
  width: 100%;
  height: 100%;
  .guideBox {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: PingFang SC;
    font-weight: 400;
    .imgBox {
      width: 100%;
      height: 90px;
      text-align: right;
      img {
        width: 100px;
        height: 100%;
        margin-right: 60px;
      }
    }
    .tip {
      height: 50px;
      text-align: right;
      line-height: 50px;
      margin-right: 60px;
      font-size: 30px;
      color: #ffffff;
    }
    .guideBtn {
      width: 320px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      margin: 300px auto 0;
      border: 2px dashed #ffffff;
      border-radius: 45px;
      font-size: 30px;
      color: #ffffff;
    }
  }
}
</style>