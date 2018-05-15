<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <!-- <el-table-column prop="num" label="序号"></el-table-column> -->
    <el-table-column type="index"></el-table-column>
    <el-table-column prop="type" label="型号"></el-table-column>
    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <span :class="{'clr-danger': scope.row.status=='error'}">{{ scope.row.status }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="location" label="位置"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="viewMiner(scope.row.id)" type="text" size="small">查看</el-button>
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
    }
  },
  methods: {
    viewMiner (id) {
      this.$router.push('/miner-detail/' + id)
    }
  }
}
</script>

<style scoped>

</style>
