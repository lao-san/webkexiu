import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: () => import('../views/Home'),
    meta: {
      title: '科袖'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/pcenter',
    name: 'pcenter',
    component: () => import('../views/Personal_center')
  },

]

const router = new VueRouter({
  routes
})

export default router