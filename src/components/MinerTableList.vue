<template>
  <div>
    <div class="clearfix">
      <div class="fl">
        <el-input placeholder="请输入搜索内容" v-model="searchText">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
      <div class="fr">
        <el-button type="primary" @click="reset">重置</el-button>
        <el-button type="primary" @click="exportTable">导出</el-button>
      </div>
    </div>
    <el-table :data="tableData" stripe class="table-container">
      <!-- <el-table-column prop="num" label="序号"></el-table-column> -->
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="type" label="型号"></el-table-column>
      <el-table-column prop="ip" label="IP"></el-table-column>
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
    <div class="pagination-container" v-show="total > 0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :page-count="11" layout="prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    viewMiner (id) {
      this.$router.push('/miner-detail/' + id)
    },
    search () {
      let text = this.searchText
      this.$emit('search', text)
    },
    reset () {
      this.searchText = ''
      this.search()
    },
    exportTable () {
      console.log(this.tableData)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.$emit('handleCurrentChange', val, this.searchText)
    }
  }
}
</script>

<style scoped>
  .table-container {
    margin-bottom: 10px;
  }
  .pagination-container {
    text-align: center;
  }
</style>
