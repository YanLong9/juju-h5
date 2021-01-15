<template>
  <van-dialog
    id="downloadApp"
    v-model="showDialog"
    :show-cancel-button="false"
    :show-confirm-button="false"
  >
    <template #title>
      <div class="titleBox">
        <p>温馨提示</p>
        <p class="iconBox" @click="closeDialog">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-guanbi4"></use>
          </svg>
        </p>
      </div>
    </template>
    <template>
      <div class="dialogBox">
        <p class="tip">请在JUJUAPP内打开</p>
        <p class="btnBox"><button @click="toDownload">下载app</button></p>
      </div>
    </template>
  </van-dialog>
</template>
<script>
export default {
  name: "downloadApp",
  props: ["showDialog"],
  methods: {
    closeDialog() {
      this.$emit("downloadDialog");
    },
    toDownload() {
      this.$emit("downloadDialog");
    },
  },
};
</script>
<style lang="scss" scoped>
#downloadApp {
  .titleBox {
    height: 90px;
    line-height: 90px;
    text-align: center;
    padding: 0;
    position: relative;
    .iconBox {
      width: 90px;
      height: 90px;
      position: absolute;
      top: -20px;
      right: 30px;
      // background: red;
      display: flex;
      justify-self: center;
      align-items: center;
      .icon {
        width: 50px;
        height: 50px;
        // background: blue;
        margin: 0 auto;
      }
    }
  }
  .dialogBox {
    height: 290px;
    font-size: 28px;
    font-family: PingFang SC;
    .tip {
      text-align: center;
      line-height: 150px;
      font-weight: 400;
      color: #555555;
    }
    .btnBox {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        width: 480px;
        height: 80px;
        line-height: 80px;
        background: #4caaf1;
        border-radius: 10px;
        border: 0;
        box-shadow: none;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
}
</style>