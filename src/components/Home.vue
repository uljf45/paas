<template>
  <div>
    <el-row type="flex" class="mb">
      <!-- <el-col><div class="mr">平台状态: <span>正常</span></div></el-col> -->
      <el-col :span="6"><div class="mr">当前算力: <span>587 MH/S</span></div></el-col>
      <!-- <el-col><div class="mr">平均算力: <span>586 MH/S</span></div></el-col> -->
      <el-col>
        <el-row type="flex">
          <div class="mr">矿机: <span>20000</span></div>
          <div class="mr">正常: <span>19990</span></div>
          <div>异常: <span class="clr-danger">10</span></div>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="mb30 spline-wrap">
      <hashrate-spline ref="spline" :hashrateList="fakeDatas" title="总算力图表"></hashrate-spline>
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
      errorTableData: [],
      fakeErrorTableData: [],
      fullTableData: [],
      fakeFullTableData: [],
      errorMinerAmount: 0,
      allMinerAmount: 0,
      pageSize: 2,
      fakeDatas: {}
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
      this.errorTableData = this.getErrorMinerListBy(1, text)
    },
    searchFull (text) {
      this.fullTableData = this.getFullMinerListBy(1, text)
    },
    handleErrorCurrentChange (pageNum, searchText) {
      this.errorTableData = this.getErrorMinerListBy(pageNum, searchText)
    },
    handleAllCurrentChange (pageNum, searchText) {
      this.fullTableData = this.getFullMinerListBy(pageNum, searchText)
    }
  },
  created () {
    this.$ajax.get('/static/json/errorMinerList.json')
      .then((response) => {
        console.log(response)
        this.fakeErrorTableData = response.data.list
        this.errorTableData = this.getErrorMinerListBy(1, '')
        this.errorMinerAmount = this.fakeErrorTableData.length
      })

    this.$ajax.get('/static/json/fullMinerList.json')
      .then((response) => {
        console.log(response)
        this.fakeFullTableData = response.data.list
        this.fullTableData = this.getFullMinerListBy(1, '')
        this.allMinerAmount = this.fakeFullTableData.length
      })

    this.$ajax.get('/static/json/totalHashrateList.json')
      .then((response) => {
        this.fakeDatas = response.data.list
      })
  }
}
</script>

<style scoped>
</style>
