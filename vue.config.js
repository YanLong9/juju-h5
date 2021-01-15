/*
 * @Description: 文件配置
 * @Author: wjk
 * @Date: 2020-11-05 10:56:53
 * @LastEditors: wjk
 * @LastEditTime: 2020-11-05 10:57:34
 * @FilePath: \jushipin-h5\vue.config.js
 */

module.exports = {
    devServer: {
        port: 8081,
        disableHostCheck: true,
        // https: true, // https:{type:Boolean}

    },
    lintOnSave: false,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require("postcss-px-to-viewport")({
                        unitToConvert: "px",
                        viewportWidth: 750,
                        unitPrecision: 3,
                        propList: ["*"],
                        viewportUnit: "vw",
                        fontViewportUnit: "vw",
                        selectorBlackList: [],
                        minPixelValue: 1,
                        mediaQuery: false,
                        replace: true,
                        exclude: /(\/|\\)(node_modules)(\/|\\)/,
                    })
                ]
            }
        }
    },
    publicPath: '/',
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '聚剧',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    },
}