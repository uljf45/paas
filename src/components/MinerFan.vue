<template>
  <el-table :data="fakeTableData" stripe style="width: 100%">
    <el-table-column type="index"></el-table-column>
    <el-table-column prop="name" label="名称"></el-table-column>
    <el-table-column prop="speed" label="转速"></el-table-column>
    <el-table-column prop="status" label="状态"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'MinerFan',
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
      { name: 'fan1', speed: '2000rpm', status: '正常' },
      { name: 'fan2', speed: '2000rpm', status: '正常' }
    ]
  }
}
</script>

<style>
</style>
