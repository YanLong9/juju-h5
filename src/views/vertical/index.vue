<!--
 * @Description: 文件描述
 * @Author: wjk
 * @Date: 2020-11-05 09:11:47
 * @LastEditors: wjk
 * @LastEditTime: 2020-11-19 11:39:52
 * @FilePath: \jushipin-h5\src\views\vertical\index.vue
-->
<template>
  <div id="vertical">
    <div class="topBar">
      <div class="left">
        <img src="../../assets/img/logo.png" alt="" />
        <div class="ellipsis-single-line">聚剧</div>
      </div>
      <div class="btn" @click="downloadDialog">
        <span>打开APP</span>
      </div>
    </div>
    <vueMiniPlayer
      id="video"
      ref="vueMiniPlayer"
      :video="video"
      :mutex="true"
    />
    <div class="tool">
      <div class="head" @click="downloadDialog">
        <div class="avatar">
          <img :src="videoData.imageUrl" alt="" />
        </div>
        <div class="add">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="`#icon-icon_jia`"></use>
          </svg>
        </div>
      </div>
      <div class="btn" @click="downloadDialog">
        <p class="iconBox">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="`#icon-dianzanshupinglun`"></use>
          </svg>
        </p>
        <p class="tip">{{ videoData.goodSize }}</p>
      </div>
      <div class="btn" @click="downloadDialog">
        <p class="iconBox">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="`#icon-pinglun2`"></use>
          </svg>
        </p>
        <p class="tip">{{ videoData.commentSize }}</p>
      </div>
      <div class="btn" @click="changeGuide">
        <p class="iconBox">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="`#icon-zhuanfa`"></use>
          </svg>
        </p>
        <p class="tip">{{ videoData.forward }}</p>
      </div>
    </div>
    <div class="info">
      <p class="name">@{{ videoData.nickName }}</p>
      <p class="description ellipsis-double-line">
        {{ videoData.descrip }}
      </p>
    </div>
    <share-overlay :showGuide="showGuide" @changeGuide="changeGuide">
    </share-overlay>
    <download-app :showDialog="showDialog" @downloadDialog="downloadDialog">
    </download-app>
  </div>
</template>

<script>
import "vue-mini-player/lib/vue-mini-player.css";
import { getVideoData } from "../../assets/js/api";
import downloadApp from "../../components/downloadApp";
import shareOverlay from "../../components/shareOverlay";
import { configShare } from "../../assets/js/getWx";

export default {
  name: "vertical",
  components: { downloadApp, shareOverlay },
  data() {
    return {
      showDialog: false,
      showGuide: false,
      video: {
        url: "",
        cover: "",
        muted: false,
        loop: false,
        preload: "auto",
        poster: "",
        volume: 1,
        autoplay: false,
      },
      videoData: {},
      videoId: 0,
    };
  },
  created() {
    this.videoId = Number(this.getUrlParam("video_id"));
    if (this.videoId) {
      this.getData();
    } else {
      this.$router.push("errorPage");
    }
  },
  mounted() {},
  methods: {
    //获取地址栏参数,没有对应的参数则返回false
    getUrlParam(name) {
      let urlParam = window.location.search.substr(1).split("&");
      for (let i = 0; i < urlParam.length; i++) {
        if (urlParam[i].split("=")[0] == name) {
          return urlParam[i].split("=")[1];
        }
      }
      return false;
    },
    getData() {
      this.$emit("changeLoad", true);
      const data = {
        videoId: this.videoId,
      };
      getVideoData(data).then((res) => {
        configShare(res.data.descrip, res.data.descrip, res.data.coverUrl);
        console.log(res);
        this.videoData = res.data;
        this.video.url = res.data.aliyunUrl;
        this.video.cover = res.data.firstFrame;
        this.video.poster = res.data.firstFrame.imageUrl;
        this.$emit("changeLoad", false);
      });
    },
    downloadDialog() {
      // this.showDialog = !this.showDialog;
      this.$router.push("downloadApp");
    },
    changeGuide() {
      if (this.$global.isWX) {
        this.showGuide = !this.showGuide;
      } else {
        this.downloadDialog();
      }
    },
  },
};
</script>

<style src="./index.scss" scoped lang="scss" >
</style>
