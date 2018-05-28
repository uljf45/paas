<template>
  <el-table :data="tableDataView" stripe style="width: 100%" v-loading="loading" element-loading-text="保存中">
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
    <el-table-column prop="position" label="位置">
      <template slot-scope="scope">
        <span v-show="!isEdit">{{ scope.row.position }}</span>
        <el-input v-show="isEdit" placeholder="请输入矿机位置" v-model.trim="scope.row.position" size="small"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button v-show="!isEdit" @click="editMiner(scope.row.id)" type="text" size="small">编辑</el-button>
        <el-button v-show="isEdit" @click="cancel" type="text" size="small">取消</el-button>
        <el-button v-show="isEdit" @click="save(scope.row.id)" type="text" size="small">保存</el-button>
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
      minerStatusMap: window.PublicKeys.minerStatus,
      isEdit: false,
      copy: null,
      loading: false
    }
  },
  computed: {
    tableDataView () {
      return this.isEdit ? [this.copy] : this.tableData
    }
  },
  methods: {
    editMiner (id) {
      this.copy = Object.assign({}, this.tableData[0])
      this.isEdit = true
      console.log(id)
    },
    cancel () {
      this.isEdit = false
    },
    save (id) {
      console.log(id)
      if (this.tableData[0].position && (this.copy.position.trim() === this.tableData[0].position.trim())) {
        this.cancel()
        return
      }
      this.loading = true
      let vm = this
      this.$ajax.patch('/v1/miner', {
        patchAction: 'setPosition',
        id: this.copy.id,
        ip: this.copy.ip,
        mac: this.copy.mac,
        position: this.copy.position.trim()
      })
        .then((response) => {
          this.$emit('refresh', function () {
            vm.isEdit = false
            vm.loading = false
          })
        })
        .catch(function (error) {
          alert(error)
          vm.loading = false
        })
    }
  }
}
</script>

<style scoped>

</style>
