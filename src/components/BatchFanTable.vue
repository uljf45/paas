<template>
<div>
  <el-table :data="fans" stripe style="width: 100%">
    <el-table-column type="index"></el-table-column>
    <el-table-column prop="name" width="140" label="名称"></el-table-column>
    <el-table-column prop="speed" label="转速">
      <template slot-scope="scope">
        <el-input style="width: 140px;" type="number"  placeholder="请输入转速" v-model.trim="scope.row.speed" size="small"></el-input>
      </template>
    </el-table-column>
  </el-table>
  <div style="text-align: center; margin-top: 15px;">
    <el-button @click="empty">清空</el-button>
    <el-button type="primary" @click="save">保存</el-button>
  </div>
</div>
</template>

<script>
export default {
  name: 'BatchFanTable',
  data () {
    return {
      fans: [
        {
          name: 'fan1',
          speed: ''
        },
        {
          name: 'fan2',
          speed: ''
        }
      ]
    }
  },
  methods: {
    empty () {
      this.fans[0].speed = ''
      this.fans[1].speed = ''
    },
    save () {
      let payload = [
        {
          name: 'fan1',
          speed: Number(this.fans[0].speed)
        },
        {
          name: 'fan2',
          speed: Number(this.fans[1].speed)
        }
      ]

      this.$emit('save', payload)
    }
  }
}
</script>

<style>
</style>
