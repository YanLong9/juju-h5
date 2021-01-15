/*
 * @Description: 文件描述
 * @Author: wjk
 * @Date: 2020-11-02 14:22:43
 * @LastEditors: wjk
 * @LastEditTime: 2020-11-18 17:55:49
 * @FilePath: \jushipin-h5\babel.config.js
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
