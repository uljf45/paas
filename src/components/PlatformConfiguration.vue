<template>
<div class="platform-configuration">
  <div class="common-box">
    <p class="platform-title">矿场名字</p>
    <el-input v-model.trim="platformName" style="width:300px;"></el-input>
  </div>
</div>
</template>

<script>
export default {
  name: 'PlatformConfiguration',
  data () {
    return {
      platformName: ''
    }
  }
}
</script>

<style>
  .platform-configuration .common-box {
    padding: 20px;
  }
  .platform-title {
    font-size: 16px;
    padding-bottom: 4px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ebeef5;
  }
</style>
