<template>
  <div>
    <div class="clearfix">
      <div class="fl">
        <el-input placeholder="请输入搜索内容" v-model.trim="searchText" class="input-with-select">
          <el-select v-model="select" slot="prepend" class="search-select">
            <el-option label="IP" value="ip"></el-option>
            <el-option label="位置" value="position"></el-option>
            <el-option label="编号" value="number"></el-option>
            <el-option label="状态" value="status"></el-option>
            <el-option label="版本" value="version"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
      <div class="fr">
        <slot name="operation"></slot>
        <el-button type="primary" @click="reset">重置</el-button>
        <el-button type="primary" @click="exportTable">导出</el-button>
      </div>
    </div>

    <el-table :data="tableData" stripe class="mtl-table-container" @selection-change="handleSelectionChange">
      <el-table-column v-if="multipleSelect" type="selection" width="55"></el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="type" label="型号"></el-table-column>
      <el-table-column prop="version" label="版本"></el-table-column>
      <el-table-column prop="ip" label="IP"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="number" label="编号"></el-table-column>
      <el-table-column prop="position" label="位置"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="viewMiner(scope.row.ip, scope.row.mac)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="mtl-pagination-container" v-show="total > 0">
      <el-pagination :current-page="currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :page-count="11" layout="prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  props: {
    minerType: { // alert all
      type: String,
      default: ''
    },
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
    },
    multipleSelect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchText: '',
      minerStatusMap: window.PublicKeys.minerStatus,
      select: 'ip',
      currentPage: 1,
      multipleSelection: []
    }
  },
  computed: {
    searchQueryText () {
      if (this.searchText) {
        return this.select + '=' + this.searchText
      }
      return ''
    }
  },
  methods: {
    ...mapActions({
      setBatchSelection: 'setBatchSelection'
    }),
    viewMiner (ip, mac) {
      this.$router.push(`/miner-detail?mac=${mac}`)
    },
    search () {
      // if (!this.searchText) {
      //   console.log('empty')
      //   return
      // }
      this.currentPage = 1
      this.$emit('search', this.searchQueryText)
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
      this.currentPage = val
      this.$emit('handleCurrentChange', val, this.searchQueryText)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.setBatchSelection({type: this.minerType, selection: this.multipleSelection})
    }
  },
  beforeDestroy () {
    if (this.multipleSelect) {
      this.setBatchSelection({type: this.minerType, selection: []})
    }
  }
}
</script>

<style>
  .mtl-table-container {
    margin-bottom: 10px;
  }
  .mtl-pagination-container {
    text-align: center;
  }
  .input-with-select .el-input-group__prepend {
    background: #fff;
  }
  .search-select {
    width: 80px;
  }
</style>
