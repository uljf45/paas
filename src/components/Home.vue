<template>
  <div>
    <el-row type="flex" class="mb">
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
    <el-row class="mb spline-wrap">
      <hashrate-spline></hashrate-spline>
    </el-row>
    <el-row>
      <el-tabs type="border-card">
        <el-tab-pane label="告警矿机">
          <miner-table-list :table-data="errorTableData"></miner-table-list>
        </el-tab-pane>
        <el-tab-pane label="所有矿机">
          <miner-table-list :table-data="fullTableData"></miner-table-list>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import HashrateSpline from '@/components/HashrateSpline.vue'
import MinerTableList from '@/components/MinerTableList.vue'
export default {
  name: 'Home',
  data () {
    return {
      errorTableData: [
        {
          id: '12',
          type: 'bwminer2.60a',
          status: 'error',
          location: 'XX省XX市XX区XX街道XX号'
        },
        {
          id: '14',
          type: 'bwminer2.60b',
          status: 'error',
          location: 'XX省XX市XX区XX街道123号'
        },
        {
          id: '15',
          type: 'bwminer2.60c',
          status: 'error',
          location: 'XX省XX市XX区XX街道456号'
        }
      ],
      fullTableData: [
        {
          id: '12',
          type: 'bwminer2.60a',
          status: 'error',
          location: 'XX省XX市XX区XX街道XX号'
        },
        {
          id: '14',
          type: 'bwminer2.60b',
          status: 'error',
          location: 'XX省XX市XX区XX街道123号'
        },
        {
          id: '15',
          type: 'bwminer2.60c',
          status: 'error',
          location: 'XX省XX市XX区XX街道456号'
        },
        {
          id: '16',
          type: 'bwminer2.60d',
          status: 'active',
          location: 'XX省XX市XX区XX街道456号'
        },
        {
          id: '17',
          type: 'bwminer2.60e',
          status: 'active',
          location: 'XX省XX市XX区XX街道456号'
        }
      ]
    }
  },
  components: {
    HashrateSpline: HashrateSpline,
    MinerTableList: MinerTableList
  }
}
</script>

<style scoped>
  .mr {
    margin-right: 10px;
  }
  .mb {
    margin-bottom: 20px;
  }
  .spline-wrap {
    background: #fff;
    padding: 20px 0;
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
</style>
