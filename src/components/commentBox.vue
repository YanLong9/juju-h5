<template>
  <div id="commentBox">
    <div class="head">
      <p class="hotComment">热评</p>
      <p class="tip">评论数据由JUJU APP提供</p>
      <p class="commentBtn" @click="downloadDialog">发表热评</p>
    </div>
    <van-list
      v-if="commentList.length"
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="commentList">
        <div
          class="commentFirst"
          v-for="(item, index) in commentList"
          :key="index"
        >
          <div class="comment">
            <div class="avatar">
              <img :src="item.imageUrl ? item.imageUrl : avatar" alt="" />
            </div>
            <div class="commentInfo">
              <p class="name">{{ item.nickName }}</p>
              <p class="commentDetail">
                {{ item.content }}
              </p>
              <p class="tip">
                <span class="time">{{ item.createTimeStr }}</span>
                <span class="reply" @click="downloadDialog">回复</span>
              </p>
            </div>
          </div>
          <div class="commentSecond">
            <div class="secondBox" v-if="item.commentSonListCopy.length">
              <div
                class="comment"
                v-for="(sonItem, sonIndex) in item.commentSonListCopy"
                :key="sonIndex"
              >
                <div class="avatar">
                  <img
                    :src="sonItem.imageUrl ? sonItem.imageUrl : avatar"
                    alt=""
                  />
                </div>
                <div class="commentInfo">
                  <p class="name">{{ sonItem.nickName }}</p>
                  <p class="commentDetail">
                    {{ sonItem.content }}
                  </p>
                  <p class="tip">
                    <span class="time">{{ sonItem.createTimeStr }}</span>
                    <span class="reply" @click="downloadDialog">回复</span>
                  </p>
                </div>
              </div>
            </div>
            <p
              class="commetTip"
              v-if="
                item.commentSonList.length || item.commentSonListCopy.length
              "
            >
              <span class="color">——</span>
              <span v-if="!item.openFlag" @click="commentMore(index)"
                >展开{{ item.commentSonList.length }}条回复</span
              >
              <span
                v-if="item.openFlag && item.commentSonList.length"
                @click="commentMore(index)"
                >展开更多回复</span
              >
              <span
                v-if="item.openFlag && !item.commentSonList.length"
                @click="commentMinus(index)"
                >收起回复</span
              >
              <svg
                class="icon"
                aria-hidden="true"
                v-if="item.commentSonList.length"
              >
                <use xlink:href="#icon-qitaicon_4"></use>
              </svg>
              <svg
                class="icon"
                aria-hidden="true"
                v-if="!item.commentSonList.length"
              >
                <use xlink:href="#icon-qitaicon_4-copy"></use>
              </svg>
            </p>
          </div>
        </div>
      </div>
    </van-list>
    <div class="none" v-if="!commentList.length">
      ———— <span>暂无评论</span> ————
    </div>
  </div>
</template>
<script>
import { getCommentData } from "../assets/js/api";
export default {
  name: "commentBox",
  props: ["articleId"],
  data() {
    return {
      avatar: require("../assets/img/avatar.jpg"),
      commentList: [],
      loading: false,
      finished: false,
      page: 1,
    };
  },
  created() {
    this.getComment();
  },
  methods: {
    commentMore(index) {
      if (!this.commentList[index].openFlag) {
        this.commentList[index].openFlag = true;
        this.commentList[index].commentSonListCopy = this.commentList[
          index
        ].commentSonList.slice(0, 3);
        this.commentList[index].commentSonList = this.commentList[
          index
        ].commentSonList.slice(3);
      } else {
        this.commentList[index].commentSonListCopy.push(
          ...this.commentList[index].commentSonList.slice(0, 10)
        );
        this.commentList[index].commentSonList = this.commentList[
          index
        ].commentSonList.slice(10);
      }
    },
    commentMinus(index) {
      this.commentList[index].openFlag = false;
      this.commentList[index].commentSonList = this.commentList[
        index
      ].commentSonListCopy;
      this.commentList[index].commentSonListCopy = [];
    },
    getComment() {
      const data = {
        id: this.articleId,
        // id: 87,
        type: 1,
        page: this.page,
        num: 10,
      };
      getCommentData(data).then((res) => {
        console.log(res);
        let len = this.commentList.length;
        this.commentList = [...this.commentList, ...res.data.list];
        this.commentList.forEach((value, index, arr) => {
          if (index >= len) {
            this.$set(this.commentList[index], "openFlag", false);
            this.$set(this.commentList[index], "commentSonListCopy", []);
          }
        });
        this.loading = false;
        console.log(this.page);
        if (this.page >= res.data.totalPage) {
          this.finished = true;
        }
      });
    },
    onLoad() {
      ++this.page;
      this.getComment();
    },
    downloadDialog() {
      this.$emit("downloadDialog");
    },
  },
};
</script>
<style lang="scss" scoped>
#commentBox {
  width: 100%;
  padding: 0 0 50px;
  .head {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .hotComment {
      flex-shrink: 0;
      font-size: 28px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: bolder;
      color: #1e1e28;
    }
    .tip {
      flex-shrink: 0;
      flex-grow: 1;
      margin: 0 30px 0 20px;
      font-size: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #aaaaaa;
    }
    .commentBtn {
      flex-shrink: 0;
      height: 40px;
      text-align: center;
      line-height: 40px;
      padding: 0 35px;
      background: linear-gradient(270deg, #ff9147 0%, #ea592d 100%);
      border-radius: 30px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
  }
  .commentList {
    width: 100%;
    .commentFirst {
      width: 100%;
      margin-bottom: 40px;
      .comment {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .avatar {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .commentInfo {
          flex-shrink: 0;
          flex-grow: 1;
          width: calc(100% - 80px);
          margin: 0 0 0 20px;
          padding: 0 0 20px 0;
          .name {
            line-height: 40px;
            font-size: 24px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #606072;
          }
          .commentDetail {
            line-height: 50px;
            font-size: 28px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #1e1e28;
          }
          .tip {
            line-height: 40px;
            font-size: 24px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #aaaaaa;
            .time {
              margin-right: 35px;
            }
          }
        }
      }
      .commentSecond {
        width: 100%;
        padding: 0 0 0 80px;
        box-sizing: border-box;
        .commetTip {
          line-height: 40px;
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #606071;
          .color {
            color: #d5d5f1;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .none {
    height: 150px;
    line-height: 150px;
    text-align: center;
    color: #ccc;
    span {
      margin: 0 20px;
    }
  }
}
</style>