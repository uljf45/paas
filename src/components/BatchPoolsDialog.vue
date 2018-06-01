<template>
  <el-dialog :visible.sync="dialogVisible" :width="width">
    <el-table :data="pools" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column width="100" prop="name" label="名称">
        <template slot-scope="scope">
          <span v-text="scope.row.name"></span>
        </template>
      </el-table-column>
      <el-table-column width="400" prop="addr" label="矿池地址">
        <template slot-scope="scope">
          <el-input v-show="isEdit" placeholder="请输入矿池地址" v-model.trim="scope.row.addr" size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column width="200" prop="minerAddr" label="矿工名">
        <template slot-scope="scope">
          <el-input v-show="isEdit" placeholder="请输入矿工名" v-model.trim="scope.row.minerAddr" size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column width="200" prop="password" label="密码">
        <template slot-scope="scope">
          <el-input v-show="isEdit" placeholder="请输入密码" v-model.trim="scope.row.password" size="small"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center; margin-top: 15px;">
      <el-button v-show="isEdit" @click="empty">清空</el-button>
      <el-button v-show="isEdit" @click="cancel">取消</el-button>
      <el-button v-show="isEdit" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialogVisible: {
      get () {
        return this.visible
      },
      set () {
        this.$emit('cancel')
      }
    }
  },
  data () {
    return {
      isEdit: true,
      width: '1008px',
      pools: [
        {
          name: 'pool1',
          addr: '',
          minerAddr: '',
          password: ''
        },
        {
          name: 'pool2',
          addr: '',
          minerAddr: '',
          password: ''
        },
        {
          name: 'pool3',
          addr: '',
          minerAddr: '',
          password: ''
        }
      ]
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    save () {
      if (this.pools[0].addr === '') {
        alert('pool1的矿池地址不能为空!')
        return
      } else if (this.pools[0].minerAddr === '') {
        alert('pool1的矿工名不能为空!')
        return
      }
      this.$emit('save', this.pools)
    },
    empty () {
      this.pools.forEach((pool) => {
        pool.addr = ''
        pool.minerAddr = ''
        pool.password = ''
      })
    }
  }
}
</script>
