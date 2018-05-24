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
      <hashrate-spline ref="spline" :hashrateList="fakeDatas" @switchTimeInterval="switchTimeInterval" title="总算力图表"></hashrate-spline>
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
      fakeErrorTableData: [],
      fullTableData: [],
      fakeFullTableData: [],
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
      let res = []

      if (/^\s*$/.test(searchText)) {
        res = this.fakeErrorTableData
      } else {
        this.fakeErrorTableData.forEach((v) => {
          if (v.ip.indexOf(searchText) >= 0) {
            res.push(v)
          }
        })
      }
      this.errorMinerAmount = res.length
      let startIndex = this.pageSize * pageNum - this.pageSize
      let endIndex = Math.min(this.pageSize * pageNum - 1, this.errorMinerAmount - 1)

      let ret = []
      if (startIndex <= this.errorMinerAmount - 1) {
        for (let i = startIndex; i <= endIndex; i++) {
          ret.push(res[i])
        }
      }

      return ret
    },
    getFullMinerListBy (pageNum, searchText = '') {
      let res = []

      if (/^\s*$/.test(searchText)) {
        res = this.fakeFullTableData
      } else {
        this.fakeFullTableData.forEach((v) => {
          if (v.ip.indexOf(searchText) >= 0) {
            res.push(v)
          }
        })
      }
      this.allMinerAmount = res.length
      let startIndex = this.pageSize * pageNum - this.pageSize
      let endIndex = Math.min(this.pageSize * pageNum - 1, this.allMinerAmount - 1)

      let ret = []
      if (startIndex <= this.allMinerAmount - 1) {
        for (let i = startIndex; i <= endIndex; i++) {
          ret.push(res[i])
        }
      }

      return ret
    },
    searchError (text) {
      // this.errorTableData = this.getErrorMinerListBy(1, text)
    },
    searchFull (text) {
      // this.fullTableData = this.getFullMinerListBy(1, text)
    },
    handleErrorCurrentChange (pageNum, searchText) {
      // this.errorTableData = this.getErrorMinerListBy(pageNum, searchText)
      this.$ajax.get('/v1/miners/alerts?offset=' + ((pageNum - 1) * this.pageSize) + '&size=' + this.pageSize) // 告警矿机
        .then((response) => {
          console.log(response)
          this.errorTableData = response.data.miners_alerts
          this.errorMinerAmount = response.data.total
        })
    },
    handleAllCurrentChange (pageNum, searchText) {
      this.$ajax.get('/v1/miners?offset=' + ((pageNum - 1) * this.pageSize) + '&size=' + this.pageSize) // 所有矿机
        .then((response) => {
          console.log(response)
          this.fullTableData = response.data.miners
          this.allMinerAmount = response.data.total
        })
    },
    switchTimeInterval (interval) {
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
    }
  },
  created () {
    this.$ajax.get('/v1/mining') // 平台信息
      .then((response) => {
        console.log(response)
        this.mining = response.data.mining[0]
      })

    this.$ajax.get('/v1/miners/alerts?offset=0&size=' + this.pageSize) // 告警矿机
      .then((response) => {
        console.log(response)
        this.errorTableData = response.data.miners_alerts
        this.errorMinerAmount = response.data.total
      })

    this.$ajax.get('/v1/miners?offset=0&size=' + this.pageSize) // 所有矿机
      .then((response) => {
        console.log(response)
        this.fakeFullTableData = response.data.miners
        this.fullTableData = this.getFullMinerListBy(1, '')
        this.allMinerAmount = response.data.total
      })

    this.$ajax.get('/v1/mining/mhs') // 总算力天周月季半年年
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
  }
}
</script>

<style scoped>
</style>
