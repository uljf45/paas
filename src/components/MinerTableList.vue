<template>
  <div>
    <div class="clearfix">
      <div class="fl">
        <el-input :placeholder="searchTextPlaceholder" v-model.trim="searchText" @keyup.enter.native="search" class="input-with-select" >
          <el-select v-model="select" slot="prepend" class="search-select" @change="selectChange">
            <el-option label="IP" value="ip"></el-option>
            <el-option label="位置" value="position"></el-option>
            <el-option label="编号" value="number"></el-option>
            <el-option label="状态" value="status"></el-option>
            <el-option label="版本" value="version"></el-option>
          </el-select>
          <div slot="append" style="display: flex;">
            <span v-if="multipleSelect && isIpSelected" v-show="!showSearchTextNext" class="el-icon-d-arrow-right" @click="arrowRight"></span>
            <span v-if="multipleSelect && isIpSelected" v-show="showSearchTextNext" class="el-icon-d-arrow-left" @click="arrowLeft"></span>
            <el-input v-if="isIpSelected" placeholder="请输入结束IP" v-show="showSearchTextNext" class="search-text-next" v-model.trim="searchTextNext"></el-input>
            <el-button v-show="!(isIpSelected && showSearchTextNext)" class="search-btn" icon="el-icon-search" @click="search"></el-button>
            <el-button v-show="isIpSelected && showSearchTextNext" class="search-btn" icon="el-icon-plus" @click="addIpRange"></el-button>
          </div>
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
      <el-table-column prop="ip" label="IP" width="110"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span :class="{'clr-danger': scope.row.status !== 'running'}" v-text="scope.row.status"></span>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="编号"></el-table-column>
      <el-table-column prop="position" label="位置"></el-table-column>
      <el-table-column label="当前算力"></el-table-column>
      <el-table-column label="平均算力"></el-table-column>
      <el-table-column label="运行时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="viewMiner(scope.row.ip, scope.row.mac)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column v-if="showProgress" prop="progress" label="进度">
        <template slot-scope="scope">
          <el-progress v-show="scope.row.percentage !== undefined" :text-inside="true" :stroke-width="18" :percentage="scope.row.percentage"></el-progress>
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
    },
    showProgress: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchText: '',
      searchTextNext: '',
      showSearchTextNext: false,
      minerStatusMap: window.PublicKeys.minerStatus,
      select: 'ip',
      currentPage: 1,
      multipleSelection: [],
      isIpSelected: true
    }
  },
  computed: {
    searchQueryText () {
      if (this.searchText) {
        return this.select + '=' + this.searchText
      }
      return ''
    },
    searchTextPlaceholder () {
      let text = '请输入搜索内容'
      if (this.showSearchTextNext) {
        text = '请输入起始IP'
      }
      return text
    }
  },
  methods: {
    ...mapActions({
      setBatchSelection: 'setBatchSelection'
    }),
    viewMiner (ip, mac) {
      this.$router.push(`/miner-detail?mac=${mac}`)
    },
    selectChange (val) {
      console.log(val)
      if (val !== 'ip') {
        this.isIpSelected = false
      } else {
        this.isIpSelected = true
      }
    },
    search () {
      if (this.isIpSelected && this.showSearchTextNext) { // 如果是选择IP 且点开了ip范围 则不搜索
        return
      }
      this.currentPage = 1
      this.$emit('search', this.searchQueryText)
    },
    arrowRight () {
      this.showSearchTextNext = true
    },
    arrowLeft () {
      this.showSearchTextNext = false
    },
    addIpRange () {
      let startIp = this.searchText
      let endIp = this.searchTextNext
      let startIpLegal = this.$util.checkip(startIp)
      let endIpLegal = this.$util.checkip(endIp)
      if (!startIpLegal || !endIpLegal) {
        let msg1 = !startIpLegal ? '起始IP' : ''
        let msg2 = !endIpLegal ? '结束IP' : ''
        let msg = msg1 + (msg1 === '' ? '' : '和') + msg2 + '格式错误!'

        this.$alert(msg, '提示')
        return
      }

      let compareResult = this.$util.compareIP(startIp, endIp)
      let result = startIp
      if (compareResult < 0) result += '~' + endIp
      else if (compareResult > 0) result = endIp + '~' + startIp

      this.$emit('addIpRange', result)
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
  .input-with-select .el-input-group__append {
    padding: 0;
  }
  .input-with-select .el-input-group__append .search-btn {
    margin: 0 0 0 -1px;
    border-left: 1px solid #dcdfe6;
    border-radius: 0;
  }
  .input-with-select .el-input-group__append .el-icon-d-arrow-right,
  .input-with-select .el-input-group__append .el-icon-d-arrow-left {
    padding: 12px 5px;
    cursor: pointer;
  }
  .search-select {
    width: 80px;
  }
  .input-with-select .el-input-group__append .search-text-next {
    width: 146px;
    margin: -1px;
  }
</style>
