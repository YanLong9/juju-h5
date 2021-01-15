/*
 * @Author: your name
 * @Date: 2020-10-29 11:43:10
 * @LastEditTime: 2020-11-05 14:07:40
 * @LastEditors: wjk
 * @Description: In User Settings Edit
 * @FilePath: \jushipin-h5\src\config\request.js
 */
import axios from 'axios'
import {
  Toast
} from 'vant';
import router from '@/router'
import store from '@/store'

//设置默认请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

let baseURL
if (process.env.NODE_ENV == 'development') { // 测试环境
  // baseURL = 'http://192.168.10.9:8080';
  baseURL = 'https://juju.jupaiaction.com';
} else { // 正式环境        
  baseURL = 'https://juju.jupaiaction.com';
}

const instance = axios.create({
  baseURL,
  timeout: 30000 // 请求超时时间
  // 'Content-Type': 'application/json'
})

instance.interceptors.request.use(config => {
  // console.log(config)
  const token = store.state.token
  config.headers['token'] = token
  return config
})

instance.interceptors.response.use((response) => {
  try {
    // console.log(response)
    if (response.status !== 200 || response.data.code !== 200) {
      // Message.error(response.data.message)
      Toast({
        // type: 'error',
        // title: '错误提示',
        message: response.data.message
      })
    }
    if (response.data.code === 400 && response.data.message === '未登录') {
      // router.replace({
      //   name: 'Login'
      // })
    }
    return response.data
  } catch (error) {
    console.log(error)
  }
}, err => {
  // Message.error(err)
  Toast({
    // type: 'error',
    // title: '错误提示',
    message: err
  })
  //   Toast({
  //     message: '网络不给力！请稍后再试',
  //     icon: 'none',
  //     duration: 3500
  // })
  return err
})


export default instance