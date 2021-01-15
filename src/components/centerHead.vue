<!--
 * @Description: 文件描述
 * @Author: wjk
 * @Date: 2020-12-11 11:49:41
 * @LastEditors: wjk
 * @LastEditTime: 2020-12-18 15:42:16
 * @FilePath: \jushipin-manage\src\components\Center-Head\index.vue
-->
<template>
  <div
    class="headParent"
    :style="{ height: height / 7.5 + 'vw', width: width / 7.5 + 'vw' }"
  >
    <img ref="headImg" :src="head" />
  </div>
</template>

<script>
export default {
  props: ["height", "width", "head"],
  data() {
    return {};
  },
  created() {
    //实例挂载之后
  },
  mounted() {
    //dom加载完成
    let w = window.innerWidth;
    let width = this.width / 7.5;
    let height = this.height / 7.5;
    let headImg = this.$refs.headImg;
    let img = new Image();
    img.src = this.head;
    img.onload = () => {
      // 打印
      if (img.width > img.height) {
        //宽大于高，以高为缩放
        headImg.style.height = `${height}vw`;
        setTimeout(() => {
          let off =
            ((headImg.width / w) * 100 - (headImg.height / w) * 100) / 2;
          headImg.style.left = "-" + off + "vw";
        }, 150);
      } else if (img.width < img.height) {
        headImg.style.width = `${width}vw`;
        setTimeout(() => {
          let off =
            ((headImg.height / w) * 100 - (headImg.width / w) * 100) / 2;
          headImg.style.top = "-" + off + "vw";
        }, 150);
      } else {
        setTimeout(() => {
          headImg.style.height = `${height}vw`;
          headImg.style.width = `${width}vw`;
        }, 150);
      }
    };
  },
  methods: {
    //组件方法
  },
};
</script>

<style scoped lang="scss">
.headParent {
  border-radius: 50%;
  overflow: hidden;
  img {
    position: relative;
  }
}
</style>
