<template>
  <div id="errorPage">
    抱歉!该视频链接相关参数缺失，播放视频获取参数错误，页面创建失败，请重新获取视频分享链接。
  </div>
</template>
http://192.168.10.13:8082/?video_id=120
<script>
import { configShare } from "../assets/js/getWx";

export default {
  created() {
    this.$emit("changeLoad", false);
  },
   mounted() {
    configShare("JUJU-聚剧","影视内容点评分享社区，影视爱好者的聚集地");
  },
};
</script>
<style lang="scss" scoped>
#errorPage {
  margin-top: 100px;
  padding: 0 100px;
  text-align: center;
  font-size: 48px;
  font-weight: 900;
}
</style>