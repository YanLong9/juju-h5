/*
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2020-03-25 10:37:23
 * @LastEditors: wjk
 * @LastEditTime: 2020-11-05 11:59:34
 */
import wx from "weixin-js-sdk"
import {
  getWXConfig
} from "./api"
import {
  WECHAT_API_LIST,
  WECHAT_HIDE_MENU_LIST,
  WECHAT_SHARE_OPTIONS,
} from "./wx";

export async function configShare(sharetitle = "",
  sharedesc = "",
  shareimg = "https://jupai-juju.oss-cn-beijing.aliyuncs.com/sys_pic/WechatIMG16.png",
  shareurl = window.location.href.replace(window.location.hash, "")) {
  //微信授权
  let url = window.location.href.replace(window.location.hash, "")
  let data = await getWXConfig({
    url
  })
  data = data.data
  if (!data) return
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: data.appId, // 必填，公众号的唯一标识
    timestamp: data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.nonceStr, // 必填，生成签名的随机串
    signature: data.signature, // 必填，签名
    jsApiList: WECHAT_API_LIST // 必填，需要使用的JS接口列表
  });
  wx.ready(() => {
    wx.hideMenuItems({
      menuList: WECHAT_HIDE_MENU_LIST // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    });
    wx.updateAppMessageShareData({
      title: sharetitle, // 分享标题
      desc: sharedesc, // 分享描述
      link: shareurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareimg, // 分享图标
      success: function () {
        // 设置成功
      }
    })
    wx.updateTimelineShareData({
      title: sharetitle, // 分享标题
      link: shareurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareimg, // 分享图标
      success: function () {
        // 设置成功
      }
    })
    // wx.onMenuShareTimeline({
    //   title: sharetitle, // 分享标题
    //   link: shareurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //   imgUrl: shareimg, // 分享图标
    //   success: function () {
    //     // 用户点击了分享后执行的回调函数
    //   }
    // })
    // wx.onMenuShareAppMessage({
    //   title: sharetitle, // 分享标题
    //   desc: sharedesc, // 分享描述
    //   link: shareurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //   imgUrl: shareimg, // 分享图标
    //   type: '', // 分享类型,music、video或link，不填默认为link
    //   dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    //   success: function () {
    //     // 用户点击了分享后执行的回调函数
    //   }
    // })
  });

}
/* eslint-enable */