<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column type="index"></el-table-column>
    <el-table-column width="100" prop="name" label="名称">
      <template slot-scope="scope">
        <span v-text="scope.row.name + ':'"></span>
      </template>
    </el-table-column>
    <el-table-column width="400" prop="addr" label="矿池地址"></el-table-column>
    <el-table-column width="300" prop="miner_addr" label="矿工名"></el-table-column>
    <!-- <el-table-column width="200" prop="password" label="密码"></el-table-column> -->
    <el-table-column prop="status" label="状态"></el-table-column>
    <!-- <el-table-column prop="accept" label="接收"></el-table-column>
    <el-table-column prop="reject" label="拒绝"></el-table-column> -->
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
    }
  },
  mounted () {
  }
}
</script>
