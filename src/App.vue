<!--
 * @Author: your name
 * @Date: 2020-11-02 14:22:43
 * @LastEditTime: 2020-11-18 17:42:33
 * @LastEditors: wjk
 * @Description: In User Settings Edit
 * @FilePath: \jushipin-h5\src\App.vue
-->
<template>
  <div id="app">
    <router-view @changeLoad="changeLoad"> </router-view>
    <div class="appLoad" v-if="showLoad">
      <van-loading type="spinner" color="#1989fa" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showLoad: true,
    };
  },
  computed: {},
  methods: {
    changeLoad(flag) {
      this.showLoad = flag;
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
@import "./assets/css/reset.css";
body,
html,
#app {
  height: 100%;
}

.appLoad {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: white;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
