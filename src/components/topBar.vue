<template>
  <div id="topBar">
    <div class="left">
      <img src="../assets/img/logo.png" alt="" />
      <!-- <div class="ellipsis-single-line">聚剧</div> -->
    </div>
    <div class="btn" @click="downloadDialog">
      <span>打开APP</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "topBar",
  methods: {
    downloadDialog() {
      this.$emit("downloadDialog");
    },
  },
};
</script>
<style lang="scss" scoped>
#topBar {
  width: 100%;
  height: 88px;
  padding: 0 32px;
  box-sizing: border-box;
  background: #1e1e28;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    max-width: 80%;
    flex-grow: 1;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    img {
      width: 250px;
      height: 50px;
      margin-right: 27px;
      background: #1e1e28;
    }
    > div {
      flex-shrink: 0;
      flex-grow: 0;
      width: 70%;
      display: block;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .btn {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 130px;
    height: 48px;
    background: #ea592d;
    border-radius: 24px;
    span {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
</style>