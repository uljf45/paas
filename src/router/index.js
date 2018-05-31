import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import MinerDetail from '@/components/MinerDetail'
import BatchConfiguration from '@/components/BatchConfiguration'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/miner-detail',
      name: 'MinerDtail',
      component: MinerDetail
    },
    {
      path: '/batch-configuration',
      name: 'BatchConfiguration',
      component: BatchConfiguration
    }
  ]
})
