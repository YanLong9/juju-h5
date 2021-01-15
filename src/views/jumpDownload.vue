<template>
  <div id="jumpDownload">
    <div class="box">
      <p class="tip">请长按网址复制后使用浏览器访问并下载</p>
      <p class="website">
        https://jumijupai.oss-cn-beijing.aliyuncs.com/newtime/newTimeVideo.apk
      </p>
      <p class="websiteTip">（安卓下载链接）</p>
    </div>
  </div>
</template>
<script>
import { configShare } from "../assets/js/getWx";

export default {
  name: "jumpDownload",
  created() {
    this.$emit("changeLoad", false);
  },
  mounted() {
    configShare("JUJU-聚剧", "影视内容点评分享社区，影视爱好者的聚集地");
  },
};
</script>
<style lang="scss" scoped>
#jumpDownload {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .box {
    margin-top: 200px;
    text-align: center;
    line-height: 40px;
    font-size: 32px;
    color: #555555;
    .tip {
      color: #070707;
    }
    .website {
      width: 80%;
      margin: 30px auto 0;
      word-break: break-all;
    }
  }
}
</style>