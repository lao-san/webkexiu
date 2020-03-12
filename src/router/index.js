import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import( '../views/Home')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/login')
  },
  {
    path: '/pcenter',
    name: 'pcenter',
    component: () => import( '../views/Personal_center')
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import( '../views/demo.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
