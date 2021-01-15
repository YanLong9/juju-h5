/*
 * @Description: 文件描述
 * @Author: wjk
 * @Date: 2020-11-02 14:22:43
 * @LastEditors: wjk
 * @LastEditTime: 2020-11-18 17:56:28
 * @FilePath: \jushipin-h5\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// import Vconsole from 'vconsole';
// new Vconsole();
//播放器插件
import vueMiniPlayer from 'vue-mini-player'
Vue.use(vueMiniPlayer)

import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)
//引入vant相关样式
import 'vant/lib/index.css';
import {
  Loading,
  Dialog,
  Overlay,
  List,
  Swipe,
  SwipeItem
} from 'vant';
// 全局注册
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(Overlay);
Vue.use(List);
//引入registerServiceWorker
import './assets/js/registerServiceWorker'

//将全局变量绑定到vue实例根组件上
let Global = {}
Vue.$global = Vue.prototype.$global = Global;
var ua = navigator.userAgent.toLowerCase(); //判断是否是微信浏览器
Vue.$global.isWX = ua.match(/MicroMessenger/i) == "micromessenger";
Vue.$global.isPhone = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
Vue.$global.isAndroid = /(Android)/i.test(navigator.userAgent);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')