import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        
        path: "*",
        component: () => import("@v/PC/Error.vue")
    },
    //用户
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/login",
        component: () => import("@v/PC/user/Login.vue")
    },
    {
        path: "/home",
        component: () => import("@v/PC/user/Home.vue"),
        children: [
            {
                path: "/",
                meta: {title: '首页'},
                component: () => import("@v/PC/user/children/Index.vue")
            },
            {
                path: "task",
                meta: {title: "发布任务"},
                component:()=>import('@v/PC/user/children/Task.vue')
            },
            {
                path: "published",
                meta: {title: "已发布任务"},
                component:()=>import('@v/PC/user/children/Published.vue')
            },
            {
                path: "accepted",
                meta: {title: "已接收任务"},
                component:()=>import('@v/PC/user/children/Accepted.vue')
            },
            {
                path: "myProfile",
                meta: {title: "个人信息"},
                component:()=>import('@v/PC/user/children/MyProfile.vue')
            }
        ]
    },
    //管理员
    {
        path: "/admin",
        component: () => import("@v/PC/admin/Login.vue"),
    },
    {
        path: "/admin/home",
        component: () => import("@v/PC/admin/Home.vue"),
        children:[
            {
                path: "/",
                meta:{title:"首页"},
                component:()=>import("@v/PC/admin/children/Index.vue")
            },
            {
                name: "adminSchool",
                path:"school",
                meta:{title:"学校"},
                component:() => import("@v/PC/admin/children/School.vue")
            },
            {
                name:"adminStudent",
                path:"student",
                meta:{title:"学生"},
                component:() => import("@v/PC/admin/children/Student.vue")
            },
            {
                name:"task",
                path:"task",
                meta:{title:"任务"},
                component:() => import("@v/PC/admin/children/Task.vue")
            }
        ]
    },
    {
        name: "mlogin",
        path: "/m/login",
        component: () => import("@v/Android/Login/Login.vue")
    },
    {
        name: 'mRegistered',
        path: '/m/registered',
        component:()=>import("@v/Android/Login/Registered.vue")
    },
    {
        name: 'mrelease',
        path: "/m/release",
        component:()=>import('@v/Android/Home/Release.vue')
    },
    {
        path: '/m/',
        redirect: '/m/login',
    },
    {
        path: '/m',
        component: () => import('@c/Android/BottomBar.vue'),
        children: [
            {
                path: 'home',
                name: 'mHome',
                component: () => import('@v/Android/Home/Home.vue')
            },
            {
                path: 'task',
                name: 'mTask',
                component: () => import('@v/Android/Task/Task.vue')
            },
            {
                path: 'me',
                name: 'mMe',
                component: () => import('@v/Android/User/Me.vue')
            },
        ]
    },
    {
        path: "/m/perfectInformation",
        name: 'PerfectInformation',
        component:()=>import('@v/Android/Home/PerfectInformation.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
