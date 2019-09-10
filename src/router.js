import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
    linkExactActiveClass: 'active',
    mode: 'history',
    routes: [{
            path: '/',
            redirect: 'dashboard',
            component: DashboardLayout,
            children: [{
                    path: '/dashboard',
                    name: 'dashboard',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () => import( /* webpackChunkName: "demo" */ './views/Dashboard.vue')
                },
                {
                    path: '/icons',
                    name: 'icons',
                    component: () => import( /* webpackChunkName: "demo" */ './views/Icons.vue')
                },
                {
                    path: '/profile',
                    name: 'profile',
                    component: () => import( /* webpackChunkName: "demo" */ './views/UserProfile.vue')
                },
                {
                    path: '/maps',
                    name: 'maps',
                    component: () => import( /* webpackChunkName: "demo" */ './views/Maps.vue')
                },
                {
                    path: '/tables',
                    name: 'tables',
                    component: () => import( /* webpackChunkName: "demo" */ './views/Tables.vue')
                },
                {
                    path: '/malwares',
                    name: 'malwares',
                    component: () => import( /* webpackChunkName: "demo" */ './views/Malwares.vue')
                },
                {
                    path: '/news',
                    name: 'news',
                    component: () => import( /* webpackChunkName: "demo" */ './views/News.vue')
                },
                {
                    path: '/board',
                    name: 'board',
                    component: () => import( /* webpackChunkName: "demo" */ './views/Board.vue')
                },
                {
                    path: '/board/view/:id',
                    name: 'boardview',
                    component: () => import( /* webpackChunkName: "demo" */ './views/BoardView.vue')
                },
                {
                    path: '/todo',
                    name: 'Todo',
                    component: () => import( /* webpackChunkName: "demo" */ './views/Todo.vue')
				},
				{
					path: '/vue',
					name: 'practice',
					component: () => import(/* webpackChunkName: "demo" */ './views/Practice/VuePractice.vue')
				},
				{
					path: '/component',
					name: 'component',
					component: () => import( /* webpackChunkName: "demo" */ './views/Practice/VueComponent.vue')
				}
            ]
        },
        {
            path: '/',
            redirect: 'login',
            component: AuthLayout,
            children: [{
                    path: '/login',
                    name: 'login',
                    component: () => import( /* webpackChunkName: "demo" */ './views/Login.vue')
                },
                {
                    path: '/register',
                    name: 'register',
                    component: () => import( /* webpackChunkName: "demo" */ './views/Register.vue')
                }
            ]
		}
    ]
})
