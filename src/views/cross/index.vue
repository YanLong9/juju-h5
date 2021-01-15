<!--
 * @Description: 文件描述
 * @Author: wjk
 * @Date: 2020-11-05 09:11:47
 * @LastEditors: wjk
 * @LastEditTime: 2020-11-18 17:56:44
 * @FilePath: \jushipin-h5\src\views\cross\index.vue
-->
<template>
  <div id="cross">
    <top-bar class="topBar" @downloadDialog="downloadDialog"> </top-bar>
    <vueMiniPlayer
      id="video"
      ref="vueMiniPlayer"
      :video="video"
      :mutex="true"
      @fullscreen="handleFullscreen"
    />
    <div class="content">
      <div class="videoInfo">
        <div class="info">
          <img :src="videoData.imageUrl" alt="" />
          <div class="center">
            <span>{{ videoData.nickName }}</span>
            <span v-if="videoData.videoNumber"
              >聚视频号：{{ videoData.videoNumber }}</span
            >
          </div>
          <div class="btn" @click="downloadDialog"><span>+ 关注</span></div>
        </div>
        <div class="describe ellipsis-double-line">{{ videoData.descrip }}</div>
        <div class="btnGroup">
          <div class="btn" @click="downloadDialog">
            <svg class="icon btnIcon" aria-hidden="true">
              <use xlink:href="#icon-dianzanshumob"></use>
            </svg>
            <span>{{ videoData.goodSize }}</span>
          </div>
          <div class="btn" @click="downloadDialog">
            <svg class="icon btnIcon" aria-hidden="true">
              <use xlink:href="#icon-pinglun"></use>
            </svg>
            <span>{{ videoData.commentSize }}</span>
          </div>
          <div class="btn" @click="changeGuide">
            <svg class="icon btnIcon" aria-hidden="true">
              <use xlink:href="#icon-wei"></use>
            </svg>
            <span>微信</span>
          </div>
          <div class="btn" @click="changeGuide">
            <svg class="icon btnIcon" aria-hidden="true">
              <use xlink:href="#icon-pengyouquan1"></use>
            </svg>
            <span>朋友圈</span>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="vedioList">
        <div
          class="li"
          v-for="(item, index) in videoList"
          :key="index"
          @click="downloadDialog"
        >
          <div class="left">
            <img :src="item.coverUrl" alt="" />
          </div>
          <div class="right">
            <div class="title ellipsis-double-line">{{ item.descrip }}</div>
            <div class="btnGroup">
              <div class="btn">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="`#icon-dianzanshumob`"></use>
                </svg>
                <span>{{ item.goodSize }}</span>
              </div>
              <div class="btn">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="`#icon-pinglun`"></use>
                </svg>
                <span>{{ item.commentSize }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <share-overlay :showGuide="showGuide" @changeGuide="changeGuide">
    </share-overlay>
    <download-app :showDialog="showDialog" @downloadDialog="downloadDialog">
    </download-app>
  </div>
</template>

<script>
import "vue-mini-player/lib/vue-mini-player.css";
import { configShare } from "../../assets/js/getWx";
import { getVideoData, getVideoList } from "../../assets/js/api";
import downloadApp from "../../components/downloadApp";
import shareOverlay from "../../components/shareOverlay";
import topBar from "../../components/topBar";
export default {
  components: { downloadApp, shareOverlay, topBar },
  data() {
    return {
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
      videoList: [],
      showLoad: true,
      showDialog: false,
      showGuide: false,
      videoId: 0,
    };
  },
  created() {
    this.videoId = Number(this.getUrlParam("video_id"));
    if (this.videoId) {
      this.getData();
      this.getList();
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
    getList() {
      const data = {
        videoId: this.videoId,
      };
      getVideoList(data).then((res) => {
        console.log(res);
        this.videoList = res.data;
      });
    },
    //组件方法
    handleFullscreen() {
      console.log("点我测试");
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
