import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import UserPosts from './views/UserPosts.vue'
import Authenticate from './views/Authenticate.vue'
import Followers from "@/views/Followers";
import Following from "@/views/Following";
import Messages from "@/views/Messages";
import UserMessages from "@/views/UserMessages";
import UserSearch from "@/views/UserSearch";
import PostDetails from "@/views/PostDetails";

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/authenticate',
            name: 'authenticate',
            component: Authenticate
        },
        {
            path: '/followers',
            name: 'followers',
            component: Followers
        },
        {
            path: '/following',
            name: 'following',
            component: Following
        },
        {
            path: '/posts/:id',
            component: UserPosts,
            props: true
        },
        {
            path: '/comments/:id',
            component: PostDetails,
            props: true
        },
        {
            path: '/messages',
            component: Messages,
            props: true
        },
        {
            path: '/messages/:id',
            component: UserMessages,
            props: true
        },
        {
            path: '/search/',
            component: UserSearch,
            props: true
        },

    ]
})

router.beforeEach((to, from, next) => {
    // redirect to login page if user is not logged in and trying to access a restricted page
    const publicPages = ['/authenticate', '/']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem('user')

    if (authRequired && !loggedIn) {
        return next('/authenticate')
    }

    next()
})

export default router
