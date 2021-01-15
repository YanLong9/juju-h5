/*
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2020-04-10 15:10:53
 * @LastEditors: wjk
 * @LastEditTime: 2020-12-04 14:48:42
 */

/**
 * @fileOverview consts
 * @author Max
 */

/**
 * @fileOverview consts
 * @author wjk
 */
export const WECHAT_API_LIST = [
  // 'onMenuShareAppMessage',
  'chooseImage',
  'hideOptionMenu',
  'showOptionMenu',
  'hideMenuItems',
  'showMenuItems',
  'hideAllNonBaseMenuItem',
  'showAllNonBaseMenuItem',
  // "onMenuShareTimeline",
  "openAddress",
  "chooseWXPay",
  "updateAppMessageShareData",
  "updateTimelineShareData"
];
export const WECHAT_HIDE_MENU_LIST = [
  'menuItem:share:qq',
  'menuItem:share:weiboApp',
  'menuItem:share:facebook',
  'menuItem:share:QZone',
  "menuItem:copyUrl",
  'menuItem:openWithQQBrowser',
  'menuItem:openWithSafari',
  'menuItem:share:email',
  'menuItem:share:brand'
];

export const WECHAT_SHARE_OPTIONS = {
  imgUrl: '',
  title: '',
  desc: ''
};