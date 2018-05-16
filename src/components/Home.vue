<template>
  <div>
    <el-row type="flex" class="mb">
      <el-col><div class="mr">平台状态: <span>正常</span></div></el-col>
      <el-col><div class="mr">实时算力: <span>587 MH/S</span></div></el-col>
      <el-col><div class="mr">平均算力: <span>586 MH/S</span></div></el-col>
      <el-col>
        <el-row type="flex">
          <div class="mr">矿机: <span>20000</span></div>
          <div class="mr">正常: <span>19990</span></div>
          <div>异常: <span class="clr-danger">10</span></div>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="mb30 spline-wrap">
      <hashrate-spline :hashrateList="fakeDatas" title="总算力图表"></hashrate-spline>
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
      errorTableData: [
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
        }
      ],
      fakeErrorTableData: [
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
        }
      ],
      fullTableData: [
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
      fakeFullTableData: [
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
      errorMinerAmount: 0,
      pageSize: 2,
      allMinerAmount: 0,
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
    console.log('home created')
    this.errorMinerAmount = this.fakeErrorTableData.length
    this.errorTableData = this.getErrorMinerListBy(1, '')
    this.allMinerAmount = this.fakeFullTableData.length
    this.fullTableData = this.getFullMinerListBy(1, '')
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
  }
}
</script>

<style scoped>
</style>
