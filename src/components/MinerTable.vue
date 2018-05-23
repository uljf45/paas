<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <!-- <el-table-column prop="num" label="序号"></el-table-column> -->
    <el-table-column type="index"></el-table-column>
    <el-table-column prop="type" label="型号"></el-table-column>
    <el-table-column prop="version" label="版本"></el-table-column>
    <el-table-column prop="mac" label="MAC"></el-table-column>
    <el-table-column prop="ip" label="IP"></el-table-column>
    <!-- <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <span :class="{'clr-danger': scope.row.status=='error'}">{{ minerStatusMap[scope.row.status] }}</span>
      </template>
    </el-table-column> -->
    <el-table-column prop="status" label="状态"></el-table-column>
    <el-table-column prop="location" label="位置"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="editMiner(scope.row.id)" type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array
    }
  },
  data () {
    return {
      minerStatusMap: window.PublicKeys.minerStatus
    }
  },
  methods: {
    editMiner (id) {
      console.log(id)
    }
  }
}
</script>

<style scoped>

</style>
