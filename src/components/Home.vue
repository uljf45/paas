<template>
  <div>
    <el-row type="flex" class="mb">
      <!-- <el-col><div class="mr">平台状态: <span>正常</span></div></el-col> -->
      <el-col><div class="mr">当前算力: <span v-text="curHashrate"></span></div></el-col>
      <!-- <el-col><div class="mr">平均算力: <span>586 MH/S</span></div></el-col> -->
      <el-col>
        <el-row type="flex">
          <div class="mr">矿机: <span v-text="mining.total"></span></div>
          <div class="mr">正常: <span v-text="mining.normal"></span></div>
          <div>异常: <span class="clr-danger" v-text="mining.abnormal"></span></div>
        </el-row>
      </el-col>
      <el-col>温度: <span v-text="mining.temperature"></span><span style="font-size: 14px;">℃</span></el-col>
      <el-col>湿度: <span v-text="mining.humidity"></span></el-col>
    </el-row>
    <el-row class="mb30 spline-wrap">
      <hashrate-spline ref="spline" :hashrateList="fakeDatas" @switchTimeInterval="getHashrateListBy" title="总算力图表"></hashrate-spline>
    </el-row>
    <el-row>
      <el-tabs type="border-card">
        <el-tab-pane label="告警矿机">
          <miner-table-list :table-data="errorTableData" :page-size="pageSize" :total="errorMinerAmount" @search="searchError" @handleCurrentChange="handleErrorCurrentChange"></miner-table-list>
        </el-tab-pane>
        <el-tab-pane label="所有矿机">
          <miner-table-list :table-data="fullTableData" :page-size="pageSize" :total="allMinerAmount" @search="searchFull" @handleCurrentChange="handleAllCurrentChange"></miner-table-list>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import HashrateSpline from '@/components/HashrateSpline.vue'
import MinerTableList from '@/components/MinerTableList.vue'
export default {
  name: 'Home',
  data () {
    return {
      mining: {
        mhs: 0,
        total: 0,
        normal: 0,
        abnormal: 0
      },
      errorTableData: [],
      fullTableData: [],
      errorMinerAmount: 0,
      allMinerAmount: 0,
      pageSize: 50,
      fakeDatas: {}
    }
  },
  computed: {
    curHashrate () {
      return this.$util.formatHashrate(this.mining.mhs * 1024 * 1024).text
    }
  },
  components: {
    HashrateSpline: HashrateSpline,
    MinerTableList: MinerTableList
  },
  methods: {
    getErrorMinerListBy (pageNum, searchText = '') {
      let url = '/v1/miners/alerts?offset=' + ((pageNum - 1) * this.pageSize) + '&size=' + this.pageSize
      if (searchText) {
        url += '&' + searchText
      }
      this.$ajax.get(url) // 告警矿机
        .then((response) => {
          this.errorTableData = response.data.miners_alerts
          this.errorMinerAmount = response.data.total
        })
    },
    getFullMinerListBy (pageNum, searchText = '') {
      let url = '/v1/miners?offset=' + ((pageNum - 1) * this.pageSize) + '&size=' + this.pageSize
      if (searchText) {
        url += '&' + searchText
      }
      this.$ajax.get(url) // 所有矿机
        .then((response) => {
          console.log(response)
          this.fullTableData = response.data.miners
          this.allMinerAmount = response.data.total
        })
    },
    searchError (text) {
      this.getErrorMinerListBy(1, text)
    },
    searchFull (text) {
      this.getFullMinerListBy(1, text)
    },
    handleErrorCurrentChange (pageNum, searchText) {
      this.getErrorMinerListBy(pageNum, searchText)
    },
    handleAllCurrentChange (pageNum, searchText) {
      this.getFullMinerListBy(pageNum, searchText)
    },
    getHashrateListBy (interval) {
      this.$ajax.get('/v1/mining/mhs?period=' + interval) // 总算力天周月季半年年
        .then((response) => {
          let miningMhs = response.data.mining_mhs
          let res = []
          for (let i = 0; i < miningMhs.length; i++) {
            let item = miningMhs[i]
            res.push([new Date(item.date).getTime(), item.mhs])
          }
          this.fakeDatas = { // 暂时都显示一样的数据
            day: res,
            week: res,
            month: res,
            season: res,
            half: res,
            year: res
          }
        })
    },
    getMiningInfo () {
      this.$ajax.get('/v1/mining') // 平台信息
        .then((response) => {
          this.mining = response.data.mining[0]
        })
    }
  },
  created () {
    this.getMiningInfo()

    this.getErrorMinerListBy(1, '')

    this.getFullMinerListBy(1, '')

    this.getHashrateListBy('day')
  }
}
</script>

<style scoped>
</style>
