<template>
  <el-table :data="fakeTableData" stripe style="width: 100%">
    <el-table-column type="index"></el-table-column>
    <el-table-column prop="name" label="名称"></el-table-column>
    <el-table-column prop="hashrate" label="算力"></el-table-column>
    <el-table-column prop="frequency" label="频率"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'MinerBoard',
  props: {
    tableData: {
      type: Array
    }
  },
  data () {
    return {
      fakeTableData: []
    }
  },
  mounted () {
    this.fakeTableData = [
      { name: 'ttyS1', hashrate: '241.12MH/S', frequency: '640MHz' },
      { name: 'ttyS2', hashrate: '243.12MH/S', frequency: '630MHz' },
      { name: 'ttyS3', hashrate: '242.12MH/S', frequency: '620MHz' },
      { name: 'ttyS4', hashrate: '240.12MH/S', frequency: '630MHz' }
    ]
  }
}
</script>

<style>
</style>
