import request from './request'

//cross页面内获取视频相关数据接口
export const getVideoData = (params) => {
    return request({
        method: 'get',
        params,
        url: `/app/home/videoDetails`,
    })
}

//cross页面内获取视频推荐列表相关数据接口
export const getVideoList = (params) => {
    return request({
        method: 'get',
        params,
        url: `/app/home/detailsList`,
    })
}

//页面内获取微信js验证config信息的相关接口
export const getWXConfig = (params) => {
    return request({
        method: 'get',
        params,
        url: `/app/wx/getJsapiTicket`,
    })
}

//内测活动页面，获取排名列表数据接口
export const getActiveList = (params) => {
    return request({
        method: 'get',
        params,
        url: "http://47.96.36.244:8010/app/list/ranking",
    })
}

//视频文章分享videoArticle页面，获取文章详情数据
export const getArticleDetail = (params) => {
    return request({
        method: 'get',
        params,
        url: `/app/video/news/${params.id}`,
    })
}

//视频文章分享videoArticle页面，获取评论详情数据
export const getCommentData = (params) => {
    return request({
        method: 'get',
        params,
        url: `/app/video/interact/comment`,
    })
}