<template>
  <div>
    <el-row type="flex" class="mb">
      <el-col><div class="mr">矿机状态: <span>正常</span></div></el-col>
      <el-col><div class="mr">运行时间: <span>1d 4h 42m 33s</span></div></el-col>
      <el-col><div class="mr">实时算力: <span>487 MH/S</span></div></el-col>
      <el-col><div class="mr">平均算力: <span>486 MH/S</span></div></el-col>
    </el-row>
    <el-row class="mb30 spline-wrap">
      <hashrate-spline :hashrateList="fakeDatas" title="矿机算力图表"></hashrate-spline>
    </el-row>
    <el-row class="mb30 spline-wrap">
      <temperature-spline :temperatureList="temperatureList"></temperature-spline>
    </el-row>
    <el-row>
      <el-tabs type="border-card">
        <el-tab-pane label="矿机信息">
          <miner-table :table-data="tableData" @refresh="refreshMinerTable"></miner-table>
        </el-tab-pane>
        <el-tab-pane label="算力板">
          <miner-board></miner-board>
        </el-tab-pane>
        <el-tab-pane label="风扇">
          <miner-fan></miner-fan>
        </el-tab-pane>
        <el-tab-pane label="矿池">
          <miner-pool></miner-pool>
        </el-tab-pane>
        <el-tab-pane label="网络">
          <miner-network></miner-network>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import MinerTable from '@/components/MinerTable.vue'
import HashrateSpline from '@/components/HashrateSpline.vue'
import TemperatureSpline from '@/components/TemperatureSpline.vue'
import MinerBoard from '@/components/MinerBoard.vue'
import MinerFan from '@/components/MinerFan.vue'
import MinerPool from '@/components/MinerPool.vue'
import MinerNetwork from '@/components/MinerNetwork.vue'

export default {
  data () {
    return {
      temperatureList: [[1526957384175, 123], [1524367190076, 110]],
      tableData: null,
      fakeDatas: null
    }
  },
  components: {
    MinerTable: MinerTable,
    HashrateSpline: HashrateSpline,
    TemperatureSpline: TemperatureSpline,
    MinerBoard: MinerBoard,
    MinerFan: MinerFan,
    MinerPool: MinerPool,
    MinerNetwork: MinerNetwork
  },
  methods: {
    fetchData () {
      let ip = this.$route.query.ip
      let mac = this.$route.query.mac
      this.$ajax.get(`/v1/miner?ip=${ip}&mac=${mac}`)
        .then((response) => {
          this.tableData = [response.data.miner]
        })
    },
    refreshMinerTable (doneFn) {
      let ip = this.$route.query.ip
      let mac = this.$route.query.mac
      this.$ajax.get(`/v1/miner?ip=${ip}&mac=${mac}`)
        .then((response) => {
          this.tableData = [response.data.miner]
          doneFn()
        })
    }
  },
  created () {
    this.fetchData()
    this.$ajax.get('./static/json/totalHashrateList.json')
      .then((response) => {
        this.fakeDatas = response.data.list
      })
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
