import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import MinerDetail from '@/components/MinerDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/miner-detail/:id',
      name: 'MinerDtail',
      component: MinerDetail
    }
  ]
})
