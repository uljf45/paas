<template>
  <div>
    <div class="config-input-line">
      <span class="config-input-text" style="color: #606266;">温度告警门限(℃): </span>
      <el-input type="number" size="small" placeholder="请输入温度告警门限" v-model="temperature_threshould" style="width: 180px;"></el-input>
    </div>
    <div style="text-align: center; margin-top: 15px;">
      <el-button @click="empty">清空</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BatchThreshold',
  data () {
    return {
      temperature_threshould: ''
    }
  },
  methods: {
    empty () {
      this.temperature_threshould = ''
    },
    save () {
      this.$emit('save', Number(this.temperature_threshould))
    }
  }
}
</script>

<style>
  .config-input-line {
    border-bottom: 1px solid #ebeef5;
    padding: 12px 0;
    text-align: center;
  }
  .config-input-text {
    margin-right: 100px;
  }
</style>
