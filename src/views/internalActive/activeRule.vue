<template>
  <div id="activeRule">
    <img src="../../assets/img/activeRule.png" alt="" />
  </div>
</template>
<script>
import { configShare } from "../../assets/js/getWx";
export default {
  name: "activeRule",
  created() {
    this.$emit("changeLoad", false);
  },
  mounted() {
    configShare(
      "聚剧JUJU内测活动",
      "瓜分万元大奖",
      "https://jupai-juju.oss-cn-beijing.aliyuncs.com/sys_pic/WechatIMG8.png"
    );
  },
};
</script>
<style lang="scss" scoped>
#activeRule {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
  }
}
</style>