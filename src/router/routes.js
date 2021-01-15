const routes = [{
        path: '/',
        name: 'Home',
        component: () => import( /* webpackChunkName: "vertical" */ '../views/vertical')
    },
    {
        path: '/cross',
        name: 'cross',
        component: () => import( /* webpackChunkName: "cross" */ '../views/cross')
    },
    {
        path: '/internalActive',
        name: 'internalActive',
        component: () => import('../views/internalActive/internalActive')
    },
    {
        path: '/activeRule',
        name: 'activeRule',
        component: () => import('../views/internalActive/activeRule')
    },
    {
        path: '/videoArticle',
        name: 'videoArticle',
        component: () => import('../views/videoArticle/videoArticle')
    },
    {
        path: '/downloadApp',
        name: 'downloadApp',
        component: () => import('../views/downloadApp')
    },
    {
        path: '/jumpDownload',
        name: 'jumpDownload',
        component: () => import('../views/jumpDownload')
    },
    {
        path: '/errorPage',
        name: 'errorPage',
        component: () => import('../views/errorPage')
    },
    {

        path: '/404',
        name: 'NotFound',
        hidden: true,
        component: () => import('@/views/NotFound')
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

export default routes