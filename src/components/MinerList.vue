<template>
  <el-tabs type="border-card">
    <el-tab-pane label="告警矿机">
      <miner-table-list miner-type="alert" :multiple-select="true" :table-data="errorTableData" :page-size="pageSize" :total="errorMinerAmount" @search="searchError" @handleCurrentChange="handleErrorCurrentChange"></miner-table-list>
    </el-tab-pane>
    <el-tab-pane label="所有矿机">
      <miner-table-list miner-type="all" :multiple-select="true" :table-data="fullTableData" :page-size="pageSize" :total="allMinerAmount" @search="searchFull" @handleCurrentChange="handleAllCurrentChange"></miner-table-list>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import MinerTableList from '@/components/MinerTableList.vue'

export default {
  name: 'MinerList',
  data () {
    return {
      errorTableData: [],
      fullTableData: [],
      errorMinerAmount: 0,
      allMinerAmount: 0,
      pageSize: 50
    }
  },
  components: {
    MinerTableList
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
    }
  },
  created () {
    this.getErrorMinerListBy(1, '')

    this.getFullMinerListBy(1, '')
  }
}
</script>
