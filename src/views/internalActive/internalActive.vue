<template>
  <div id="internalActive">
    <header>
      <div class="imgBox">
        <img src="../../assets/img/activeBg.png" alt="" />
      </div>
      <router-link tag="button" to="activeRule">活动规则</router-link>
    </header>
    <div class="rankingList">
      <p class="division" v-if="!endTimeFlag">上次更新时间{{ updateTime }}</p>
      <p class="division" v-else>数据统计截止时间为2021年1月15日23时59分59秒</p>
      <div class="listHeader">
        <p class="rank">排名</p>
        <p class="talent">达人</p>
        <p class="hot">热度</p>
      </div>
      <div class="topList">
        <div class="listItem" v-for="(item, index) in topList" :key="index">
          <div class="rank">{{ item.sort }}</div>
          <div class="talent">
            <div class="avatar">
              <!-- <img
                :src="item.imageUrl ? item.imageUrl : defaultAvatar"
                alt=""
              /> -->
              <centerHead
                :width="80"
                :height="80"
                :head="item.imageUrl ? item.imageUrl : defaultAvatar"
              >
              </centerHead>
            </div>
            <div class="person">
              <p class="name ellipsis-single-line">
                {{ item.nickName }}
              </p>
              <p class="account ellipsis-single-line">
                {{ item.videoNumber }}
              </p>
            </div>
          </div>
          <div class="hot">
            <p class="hotNum ellipsis-single-line">
              {{ item.allHot }}
            </p>
            <p class="worksNum ellipsis-single-line">作品数:{{ item.works }}</p>
          </div>
        </div>
      </div>
      <p class="division">
        热度排名前20名且成功发布作品数达20部的创作者 将平均瓜分10000元现金奖励
      </p>
      <div class="bottomList">
        <div class="listItem" v-for="(item, index) in bottomList" :key="index">
          <div class="rank">{{ item.sort }}</div>
          <div class="talent">
            <div class="avatar">
              <centerHead
                :width="80"
                :height="80"
                :head="item.imageUrl ? item.imageUrl : defaultAvatar"
              >
              </centerHead>
              <!-- <img
                :src="item.imageUrl ? item.imageUrl : defaultAvatar"
                alt=""
              /> -->
            </div>
            <div class="person">
              <p class="name ellipsis-single-line">
                {{ item.nickName }}
              </p>
              <p class="account ellipsis-single-line">
                {{ item.videoNumber }}
              </p>
            </div>
          </div>
          <div class="hot">
            <p class="hotNum ellipsis-single-line">
              {{ item.allHot }}
            </p>
            <p class="worksNum ellipsis-single-line">作品数:{{ item.works }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getActiveList } from "../../assets/js/api";
import centerHead from "../../components/centerHead";
import { configShare } from "../../assets/js/getWx";

export default {
  name: "internalActive",
  components: { centerHead },
  data() {
    return {
      defaultAvatar: require("../../assets/img/avatar.jpg"),
      topList: [],
      bottomList: [],
      updateTime: "",
      endTimeFlag: false,
    };
  },
  created() {
    this.getData();
    this.getNowTime();
  },
  mounted() {
    configShare(
      "聚剧JUJU内测活动",
      "瓜分万元大奖",
      "https://jupai-juju.oss-cn-beijing.aliyuncs.com/sys_pic/WechatIMG8.png"
    );
  },
  methods: {
    //获取时间
    getNowTime() {
      let nowTime = new Date().getTime();
      let endTime = new Date(2021, 0, 15, 23, 59, 59).getTime();
      if (nowTime > endTime) {
        this.endTimeFlag = true;
      }
    },
    //获取页面数据
    getData() {
      getActiveList().then((res) => {
        console.log(res);
        //头部列表
        this.topList = res.data.list
          .slice(0, 20)
          .filter((value, index, array) => {
            return value.works >= 20;
          });
        // 底部列表
        this.bottomList = [
          ...res.data.list.slice(0, 20).filter((value, index, array) => {
            return value.works < 20;
          }),
          ...res.data.list.slice(20),
        ];
        //更新时间
        let update = new Date(res.data.time),
          year = update.getFullYear(),
          mouth = update.getMonth() + 1,
          day = update.getDate(),
          hours = update.getHours(),
          minutes = update.getMinutes();
        this.updateTime = `${year}年${mouth}月${day}日${hours}时${minutes}分`;
        this.$emit("changeLoad", false);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#internalActive {
  width: 100%;
  height: 100%;
  header {
    height: 480px;
    position: relative;
    button {
      position: absolute;
      top: 385px;
      left: 50%;
      margin-left: -180px;
      width: 360px;
      height: 80px;
      padding: 0;
      background: linear-gradient(0deg, #ffd77c, #ffffff);
      border-radius: 40px;
      border: none;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #ea592d;
    }
    .imgBox {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .rankingList {
    padding: 0 40px 80px;
    margin-top: 30px;
    background: #ffffff;
    .listHeader {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        flex-shrink: 0;
        height: 50px;
        line-height: 50px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #aaaaaa;
        &.talent {
          flex-grow: 1;
          margin-left: 50px;
        }
      }
    }
    .division {
      text-align: center;
      line-height: 40px;
      padding: 10px 60px;
      margin-bottom: 30px;
      background: rgba(234, 89, 45, 0.2);
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ea592d;
    }
    .topList,
    .bottomList {
      width: 100%;
      overflow: hidden;
    }
    .topList {
      margin-top: 30px;
    }
    .listItem {
      width: 100%;
      height: 100px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .rank {
        flex-shrink: 0;
        width: 60px;
        height: 100px;
        text-align: center;
        line-height: 100px;
      }
      .talent {
        flex-shrink: 0;
        flex-grow: 1;
        height: 100px;
        margin-left: 50px;
        font-family: PingFang SC;
        display: flex;
        align-items: center;
        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          // img {
          //   width: 80px;
          //   height: 80px;
          //   border-radius: 50%;
          // }
        }
        .person {
          height: 100px;
          margin-left: 25px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          .name {
            width: 250px;
            font-size: 28px;
            font-weight: 600;
            color: #1e1e28;
            line-height: 40px;
          }
          .account {
            width: 250px;
            font-size: 24px;
            font-weight: 400;
            color: #aaaaaa;
            line-height: 40px;
          }
        }
      }
      .hot {
        flex-shrink: 0;
        width: 150px;
        height: 100px;
        font-family: PingFang SC;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-end;
        p {
          width: 100%;
          text-align: right;
        }
        .hotNum {
          font-size: 32px;
          font-weight: 600;
          color: #1e1e28;
          line-height: 40px;
        }
        .worksNum {
          font-size: 24px;
          font-weight: 400;
          color: #aaaaaa;
          line-height: 40px;
        }
      }
    }
  }
}
</style>
