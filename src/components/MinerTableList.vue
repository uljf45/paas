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
    <el-table :data="tableData" stripe style="width: 100%">
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
  </div>
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
    }
  }
}
</script>

<style scoped>

</style>
