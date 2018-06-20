<template>
  <div class="advanced-configuration">
    <div class="common-box">
      <p class="platform-title">日志</p>
      <el-button type="primary">导出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdvancedConfiguration',
  data () {
    return {
    }
  }
}
</script>

<style>
  .advanced-configuration .common-box {
    padding: 20px;
  }

  .platform-title {
    font-size: 16px;
    padding-bottom: 4px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ebeef5;
  }
</style>
