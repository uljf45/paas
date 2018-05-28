<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column width="100" prop="name" label="名称">
        <template slot-scope="scope">
          <span v-text="scope.row.name + ':'"></span>
        </template>
      </el-table-column>
      <el-table-column width="400" prop="addr" label="矿池地址"></el-table-column>
      <el-table-column width="200" prop="miner_addr" label="矿工名"></el-table-column>
      <el-table-column width="200" prop="password" label="密码"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <!-- <el-table-column prop="accept" label="接收"></el-table-column>
      <el-table-column prop="reject" label="拒绝"></el-table-column> -->
    </el-table>
    <div style="text-align: center; margin-top: 15px;">
      <el-button v-show="!isEdit" type="primary" @click="edit">编辑</el-button>
      <el-button v-show="isEdit" @click="cancel">取消</el-button>
      <el-button v-show="isEdit" type="primary" @click="save">保存</el-button>
    </div>
  </div>
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
      isEdit: false
    }
  },
  methods: {
    edit: function () {
      this.isEdit = true
    },
    cancel: function () {
      this.isEdit = false
    },
    save: function () {
      console.log('save')
      this.isEdit = false
    }
  },
  mounted () {
  }
}
</script>
