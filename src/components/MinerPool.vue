<template>
  <el-table :data="fakeTableData" stripe style="width: 100%">
    <el-table-column type="index"></el-table-column>
    <el-table-column width="60" prop="name" label="">
      <template slot-scope="scope">
        <span v-text="scope.row.name + ':'"></span>
      </template>
    </el-table-column>
    <el-table-column width="300" prop="address" label="矿池地址"></el-table-column>
    <el-table-column width="200" prop="username" label="矿工名"></el-table-column>
    <el-table-column width="200" prop="password" label="密码"></el-table-column>
    <el-table-column prop="status" label="状态"></el-table-column>
    <el-table-column prop="accept" label="接收"></el-table-column>
    <el-table-column prop="reject" label="拒绝"></el-table-column>
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
      { name: 'pool1', 'address': 'stratum+tcp://stratum_ltc.bw.com:8888', username: 'jjyykk.292c', password: '123123', status: '正常', accept: '5189', reject: '12' },
      { name: 'pool2', 'address': 'stratum+tcp://stratum_ltc.bw.com:8888', username: 'jjyykk.292c', password: '123123', status: '正常', accept: '0', reject: '0' },
      { name: 'pool3', 'address': 'stratum+tcp://stratum_ltc.bw.com:8888', username: 'jjyykk.292c', password: '123123', status: '正常', accept: '0', reject: '0' }
    ]
  }
}
</script>
