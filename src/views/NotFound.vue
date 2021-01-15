<template>
  <div class="not-found">抱歉，没有该页面</div>
</template>
<script>
import { configShare } from "../assets/js/getWx";

export default {
  name: "not-found",
  created() {
    this.$emit("changeLoad", false);
  },
  mounted() {
    configShare("JUJU-聚剧", "影视内容点评分享社区，影视爱好者的聚集地");
  },
};
</script>
<style lang="scss" scoped>
.not-found {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 700;
}
</style>
