import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Companies from '../views/Companies.vue'
import Popular from '../views/Popular.vue'
import MessageBoard from '../views/MessageBoard.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/companies',
    name: 'Companies',
    component: Companies
  },
  {
    path: '/popular',
    name: 'Popular',
    component: Popular
  },
  {
    path: '/messageboard',
    name: 'MessageBoard',
    component: MessageBoard
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
