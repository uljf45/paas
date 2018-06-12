<template>
  <div>
    <div class="config-input-line">
      <span class="config-input-text" style="color: #606266;">温度告警门限(℃): </span>
      <el-input type="number" size="small" placeholder="请输入温度告警门限" v-model="temperature_threshould" style="width: 180px;"></el-input>
    </div>
    <div class="config-input-line">
      <span class="config-input-text" style="color: #606266;">算力告警门限(MHS): </span>
      <el-input type="number" size="small" placeholder="请输入算力告警门限" v-model="mhs_threshould" style="width: 180px;"></el-input>
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
      temperature_threshould: '',
      mhs_threshould: ''
    }
  },
  methods: {
    empty () {
      this.temperature_threshould = ''
      this.mhs_threshould = ''
    },
    save () {
      let payload = {
        temperature_threshould: Number(this.temperature_threshould),
        mhs_threshould: Number(this.mhs_threshould)
      }
      this.$emit('save', payload)
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
    display: inline-block;
    width: 160px;
  }
</style>
