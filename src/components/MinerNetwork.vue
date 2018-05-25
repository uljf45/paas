<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column type="index"></el-table-column>
    <el-table-column width="140" prop="ip_type" label="Protocol"></el-table-column>
    <el-table-column prop="ip" label="IP"></el-table-column>
    <el-table-column prop="netmask" label="Netmask"></el-table-column>
    <el-table-column prop="gateway" label="Gateway"></el-table-column>
    <el-table-column prop="dns" label="DNS"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'MinerNetwork',
  props: {
    tableData: {
      type: Array
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>
