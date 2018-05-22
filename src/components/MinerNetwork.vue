<template>
  <el-table :data="fakeTableData" stripe style="width: 100%">
    <el-table-column type="index"></el-table-column>
    <el-table-column width="140" prop="protocol" label="Protocol"></el-table-column>
    <el-table-column prop="ip" label="IP"></el-table-column>
    <el-table-column prop="netmask" label="Netmask"></el-table-column>
    <el-table-column prop="gateway" label="Gateway"></el-table-column>
    <el-table-column prop="dns" label="DNS"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'MinerPool',
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
      { protocol: 'Static', ip: '192.168.6.72', netmask: '255.255.255.0', gateway: '192.168.6.254', dns: '202.96.134.133' }
    ]
  }
}
</script>
