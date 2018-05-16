<template>
  <div>
    <el-row type="flex" class="mb">
      <el-col><div class="mr">矿机状态: <span>正常</span></div></el-col>
      <el-col><div class="mr">实时算力: <span>487 MH/S</span></div></el-col>
      <el-col><div class="mr">平均算力: <span>486 MH/S</span></div></el-col>
    </el-row>
    <el-row class="mb30 spline-wrap">
      <hashrate-spline :hashrateList="fakeDatas" title="矿机算力图表"></hashrate-spline>
    </el-row>
    <el-row>
      <el-tabs type="border-card">
        <el-tab-pane label="矿机信息">
          <miner-table :table-data="tableData"></miner-table>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import MinerTable from '@/components/MinerTable.vue'
import HashrateSpline from '@/components/HashrateSpline.vue'

export default {
  data () {
    return {
      tableData: null,
      fakeTalbeData: [
        {
          id: '12',
          type: 'bwminer2.60a',
          ip: '192.168.6.13',
          status: 'error',
          location: 'XX省XX市XX区XX街道XX号'
        },
        {
          id: '14',
          type: 'bwminer2.60b',
          ip: '192.168.6.14',
          status: 'error',
          location: 'XX省XX市XX区XX街道123号'
        },
        {
          id: '15',
          type: 'bwminer2.60c',
          ip: '192.168.6.15',
          status: 'error',
          location: 'XX省XX市XX区XX街道456号'
        },
        {
          id: '16',
          type: 'bwminer2.60d',
          ip: '192.168.6.16',
          status: 'active',
          location: 'XX省XX市XX区XX街道456号'
        },
        {
          id: '17',
          type: 'bwminer2.60e',
          ip: '192.168.6.17',
          status: 'active',
          location: 'XX省XX市XX区XX街道456号'
        }
      ],
      fakeDatas: null
    }
  },
  components: {
    MinerTable: MinerTable,
    HashrateSpline: HashrateSpline
  },
  methods: {
    fetchData () {
      let id = this.$route.params.id
      this.tableData = [this.fakeTalbeData.find(elm => elm.id === id)]
    }
  },
  created () {
    this.fetchData()
    let vm = this
    function fakingDatas () {
      vm.fakeDatas = {
        day: [],
        week: [],
        month: [],
        season: [],
        halfyear: [],
        year: []
      }
      let endTimespan = new Date().getTime()
      for (let i = 0; i < 24; i++) {
        vm.fakeDatas.day.push([ endTimespan - i * 60 * 60 * 1000, Math.random() * 100 ])
      }
      for (let i = 0; i < 28; i++) {
        vm.fakeDatas.week.push([ endTimespan - i * 6 * 60 * 60 * 1000, Math.random() * 100 ])
      }
      for (let i = 0; i < 30; i++) {
        vm.fakeDatas.month.push([ endTimespan - i * 24 * 60 * 60 * 1000, Math.random() * 100 ])
      }
      for (let i = 0; i < 30; i++) {
        vm.fakeDatas.season.push([ endTimespan - i * 3 * 24 * 60 * 60 * 1000, Math.random() * 100 ])
      }
      for (let i = 0; i < 26; i++) {
        vm.fakeDatas.halfyear.push([ endTimespan - i * 7 * 24 * 60 * 60 * 1000, Math.random() * 100 ])
      }
      for (let i = 0; i < 24; i++) {
        vm.fakeDatas.year.push([ endTimespan - i * 15 * 24 * 60 * 60 * 1000, Math.random() * 100 ])
      }
    }
    fakingDatas()
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
