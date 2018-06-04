<template>
  <el-container id="app">
    <el-header class="wrap bg-header" style="height: 52px;">
      <top-header class="innerwrap"></top-header>
    </el-header>
    <top-navigation class="innerwrap top-navigation"></top-navigation>
    <el-main class="wrap">
      <div class="innerwrap">
        <router-view/>
      </div>
    </el-main>
    <el-footer class="wrap">
     <bottom-footer class="innerwrap"></bottom-footer>
    </el-footer>
  </el-container>
</template>

<script>
import TopHeader from '@/components/TopHeader.vue'
import TopNavigation from '@/components/TopNavigation.vue'
import BottomFooter from '@/components/BottomFooter.vue'

export default {
  name: 'App',
  components: {
    TopHeader,
    BottomFooter,
    TopNavigation
  }
}
</script>

<style scoped>
  .wrap {
    width: 100%;
    min-width: 1220px;
  }
  .innerwrap {
    width: 1180px;
    margin: 0 auto;
  }
  .bg-header {
    background: #111;
  }
  .top-navigation {
    padding-top: 10px;
  }
</style>
