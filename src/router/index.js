import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
  },
  {
    path: '/add-news',
    name: 'AddNews',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddNews.vue')
  },
  {
    path: '/preview-news/:id',
    name: 'PreviewNews',
    component: () => import(/* webpackChunkName: "about" */ '../views/PreviewNews.vue')
  },
  {
    path: '/new-user',
    name: 'NewUser',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewUser.vue')
  },
  {
    path: '/edit-user/:id',
    name: 'EditUser',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditUser.vue')
  },
  {
    path: '/edit-news/:id',
    name: 'EditNews',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditNews.vue')
  },
  {
    path: '/add-comment/:id',
    name: 'AddComment',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddComment.vue')
  },
  {
    path:'*',
    name:'PageNotFound',
    component: () => import(/* webpackChunkName: "about" */ '../views/PageNotFound.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
