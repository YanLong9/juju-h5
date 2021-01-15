<template>
  <div id="videoArticle">
    <top-bar class="topBar" @downloadDialog="downloadDialog"> </top-bar>
    <header>
      <p class="title ellipsis-double-line">
        {{ article.newsTitle }}
      </p>
      <div class="author">
        <div class="avatar">
          <img :src="article.imageUrl" alt="" />
        </div>
        <div class="authorInfo">
          <p class="name ellipsis-single-line">{{ article.nickName }}</p>
          <p class="videoNum ellipsis-single-line">
            聚视频号：{{ article.videoNumber }}
          </p>
        </div>
        <p class="watchBtn" @click="downloadDialog">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_jia"></use>
          </svg>
          <span>关注</span>
        </p>
      </div>
      <p class="time">发布时间：{{ article.createTime.slice(0, 10) }}</p>
    </header>
    <div class="content" v-html="article.newsContent"></div>
    <div class="btnGruop">
      <div class="btn" @click="downloadDialog">
        <svg class="icon btnIcon" aria-hidden="true">
          <use xlink:href="#icon-dianzanshumob"></use>
        </svg>
        <span>{{ article.goodSize }}</span>
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
    <div class="worksBox" @click="downloadDialog">
      <div class="poster">
        <img :src="article.worksPool.banners" alt="" />
      </div>
      <div class="videoInfo">
        <p class="title">
          <span class="name ellipsis-single-line">{{
            article.worksPool.workName
          }}</span>
          <span class="grade" v-if="article.worksPool.recommendIndex"
            >{{ article.worksPool.recommendIndex }}分</span
          >
        </p>
        <p class="info ellipsis-double-line">
          {{ article.worksPool.sketch }}
        </p>
      </div>
    </div>
    <p class="line"></p>
    <comment-box :articleId="articleId" @downloadDialog="downloadDialog">
    </comment-box>
    <download-app :showDialog="showDialog" @downloadDialog="downloadDialog">
    </download-app>
    <share-overlay :showGuide="showGuide" @changeGuide="changeGuide">
    </share-overlay>
  </div>
</template>
<script>
import downloadApp from "../../components/downloadApp";
import topBar from "../../components/topBar";
import shareOverlay from "../../components/shareOverlay";
import commentBox from "../../components/commentBox";
import { getArticleDetail, getCommentData } from "../../assets/js/api";
import { configShare } from "../../assets/js/getWx";

export default {
  name: "videoArticle",
  components: {
    topBar,
    downloadApp,
    shareOverlay,
    commentBox,
  },
  data() {
    return {
      showGuide: false,
      showDialog: false,
      articleId: 0,
      article: {
        createTime: "",
        worksPool: {},
      },
    };
  },
  created() {
    this.articleId = Number(this.getUrlParam("article_id"));
    if (this.articleId) {
      this.getData();
    } else {
      this.$router.push("errorPage");
    }
  },
  methods: {
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
      const data = {
        id: this.articleId,
      };
      getArticleDetail(data).then((res) => {
        console.log(res);
        configShare(res.data.newsTitle, res.data.newsDescription, res.data.banners);
        this.article = res.data;
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

<style lang="scss" scoped>
#videoArticle {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  // overflow: scroll;
  font-family: PingFang SC;
  .topBar {
    width: 100%;
    height: 88px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
  }
  header {
    width: 100%;
    padding: 100px 0 0;
    .title {
      width: 100%;
      line-height: 50px;
      font-size: 36px;
      font-weight: bold;
      color: #1e1e28;
    }
    .author {
      width: 100%;
      height: 80px;
      margin: 20px 0 0;
      padding: 0 20px;
      box-sizing: border-box;
      background: #f2f4f6;
      border-radius: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .avatar {
        flex-shrink: 0;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .authorInfo {
        flex-shrink: 0;
        flex-grow: 1;
        height: 100%;
        margin: 0 30px 0 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .name {
          font-size: 24px;
          font-weight: 600;
          color: #1e1e28;
        }
        .videoNum {
          font-size: 20px;
          color: #a1a1b9;
        }
      }
      .watchBtn {
        flex-shrink: 0;
        height: 40px;
        text-align: center;
        line-height: 40px;
        padding: 0 20px;
        background: linear-gradient(-90deg, #ea592d, #ff9147);
        border-radius: 20px;
        font-size: 24px;
        color: #ffffff;
        .icon {
          color: #ffffff;
        }
      }
    }
    .time {
      line-height: 60px;
      margin: 10px 0;
      padding: 0 20px;
      box-sizing: border-box;
      font-size: 24px;
      color: #a1a1b9;
    }
  }
  .content {
    width: 100%;
  }
  .btnGruop {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .btn {
      width: 160px;
      height: 50px;
      border: 1px solid #eeeef9;
      border-radius: 25px;
      font-size: 24px;
      color: #606071;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon {
      width: 28px;
      height: 28px;
    }
    .btnIcon {
      color: #606071;
    }
    span {
      margin-left: 20px;
    }
  }
  .worksBox {
    width: 100%;
    height: 120px;
    margin-bottom: 30px;
    padding: 10px;
    box-sizing: border-box;
    background: #f2f4f6;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .poster {
      flex-shrink: 0;
      width: 100px;
      height: 100px;
      border-radius: 6px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 6px;
      }
    }
    .videoInfo {
      flex-grow: 1;
      flex-shrink: 0;
      width: calc(100% - 140px);
      height: 100%;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .title {
        padding: 0 20px 0 0;
        font-size: 24px;
        color: #1e1e28;
        display: flex;
        justify-content: space-between;
        .name {
          width: 80%;
        }
        .grade {
          font-weight: 600;
          color: #ea592d;
        }
      }
      .info {
        font-size: 18px;
        color: #aaaaaa;
      }
    }
  }
  .line {
    width: 100vw;
    height: 20px;
    background: #f1f4f6;
    position: relative;
    top: 0;
    left: -20px;
    z-index: 5;
  }
}
</style>