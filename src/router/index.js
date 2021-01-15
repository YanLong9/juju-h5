/*
 * @Description: 文件描述
 * @Author: wjk
 * @Date: 2020-11-02 14:22:43
 * @LastEditors: wjk
 * @LastEditTime: 2020-11-19 17:49:32
 * @FilePath: \jushipin-h5\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./routes"

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router