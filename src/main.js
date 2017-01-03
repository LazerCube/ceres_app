// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import auth from './auth'
import Home from './components/Home.vue'
import Login from './components/Login.vue'

Vue.use(VueResource)
Vue.use(VueRouter)

// Check Auth at start
auth.checkAuth()

// Routes
const routes = [
  { path: '/home', component: Home },
  { path: '/login', component: Login },
  { path: '/sign-up', component: Home }
]

const router = new VueRouter({
  routes,
  saveScrollPosition: true,
  history: true
})

Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', ('Bearer ' + auth.getToken()))

  // continue to next interceptor
  next((response) => {
    if (response.status === 401) {
      // horrible hack fix at somepoint. Works somehow???
      if (router.path) {
        auth.logout(this, 'login')
      }
    }
  })
})

// Login and sign-up don't require authentication
router.beforeEach((to, from, next) => {
  if (auth.user.authenticated) {
    if (to.path === '/login' || to.path === '/sign-up') {
      next(false)
    } else {
      next()
    }
  } else {
    if (to.path === '/login' || to.path === '/sign-up') {
      next()
    } else {
      next('login')
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
