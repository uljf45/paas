<template>
  <div>
    <el-row type="flex" class="mb">
      <el-col><div class="mr">矿机状态: <span v-text="infoData.status"></span></div></el-col>
      <el-col><div class="mr">运行时间: <span v-text="infoData.duration"></span></div></el-col>
      <el-col><div class="mr">实时算力: <span v-text="infoData.curHashrate"></span></div></el-col>
      <el-col><div class="mr">平均算力: <span v-text="infoData.avgHashrate"></span></div></el-col>
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
          <miner-board :table-data="boardData"></miner-board>
        </el-tab-pane>
        <el-tab-pane label="风扇">
          <miner-fan :table-data="fanData"></miner-fan>
        </el-tab-pane>
        <el-tab-pane label="矿池">
          <miner-pool :table-data="poolData"></miner-pool>
        </el-tab-pane>
        <el-tab-pane label="网络">
          <miner-network :table-data="tableData"></miner-network>
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
  name: 'MinerDetail',
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
  computed: {
    infoData () {
      let rtn = {
        status: '',
        duration: '',
        curHashrate: '',
        avgHashrate: ''
      }
      if (this.tableData && this.tableData.length) {
        let data = this.tableData[0]
        rtn.status = data.status
        rtn.duration = this.$util.formatDuration(data.duration)
        rtn.curHashrate = this.$util.formatHashrate((data.mhs || 0) * 1024 * 1024).text
        rtn.avgHashrate = this.$util.formatHashrate((data.avg_mhs || 0) * 1024 * 1024).text
      }
      return rtn
    },
    poolData () {
      let rtn = []
      if (this.tableData && this.tableData.length) {
        let data = this.tableData[0]
        let pool1 = {name: 'pool1', addr: data.pool1_addr, miner_addr: data.pool1_miner_addr, password: data.pool1_password, status: data.pool1_status}
        let pool2 = {name: 'pool2', addr: data.pool2_addr, miner_addr: data.pool2_miner_addr, password: data.pool2_password, status: data.pool2_status}
        let pool3 = {name: 'pool3', addr: data.pool3_addr, miner_addr: data.pool3_miner_addr, password: data.pool3_password, status: data.pool3_status}
        rtn.push(pool1, pool2, pool3)
      }
      return rtn
    },
    fanData () {
      let rtn = []
      if (this.tableData && this.tableData.length) {
        let data = this.tableData[0]
        let fan1 = {name: 'fan1', speed: data.fan1_speed, status: data.fan1_status}
        let fan2 = {name: 'fan2', speed: data.fan2_speed, status: data.fan2_status}
        rtn.push(fan1, fan2)
      }
      return rtn
    },
    boardData () {
      let rtn = []
      if (this.tableData && this.tableData.length) {
        let data = this.tableData[0]
        let board1 = {name: 'board1', accept: data.board1_accept, frequency: data.board1_frequency, mhs: data.board1_mhs, reject: data.board1_reject, temperature: data.board1_temperate}
        let board2 = {name: 'board2', accept: data.board2_accept, frequency: data.board2_frequency, mhs: data.board2_mhs, reject: data.board2_reject, temperature: data.board2_temperate}
        let board3 = {name: 'board3', accept: data.board3_accept, frequency: data.board3_frequency, mhs: data.board3_mhs, reject: data.board3_reject, temperature: data.board3_temperate}
        let board4 = {name: 'board4', accept: data.board4_accept, frequency: data.board4_frequency, mhs: data.board4_mhs, reject: data.board4_reject, temperature: data.board4_temperate}
        rtn.push(board1, board2, board3, board4)
      }
      return rtn
    }
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
