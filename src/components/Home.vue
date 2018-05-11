<template>
  <div>
    <el-row type="flex">
      <el-col><div class="mr">平台状态: <span>正常</span></div></el-col>
      <el-col><div class="mr">实时算力: <span>587 MH/S</span></div></el-col>
      <el-col><div class="mr">平均算力: <span>586 MH/S</span></div></el-col>
      <el-col>
        <el-row type="flex">
          <div class="mr">矿机: <span>20000</span></div>
          <div class="mr">正常: <span>19990</span></div>
          <div>异常: <span class="clr-danger">10</span></div>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <hashrate-spline></hashrate-spline>
    </el-row>
  </div>
</template>

<script>
import HashrateSpline from '@/components/HashrateSpline.vue'
export default {
  name: 'Home',
  components: {
    HashrateSpline: HashrateSpline
  }
}
</script>

<style scoped>
  .mr {
    margin-right: 10px;
  }
</style>
