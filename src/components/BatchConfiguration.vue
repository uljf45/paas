<template>
<div class="batch-container">
  <miner-list class="mb" @addIps="addSelectedIps"></miner-list>
  <el-row type="flex" class="common-box mb">
    <ip-range ref="ipRange"></ip-range>
  </el-row>
  <el-tabs type="border-card">
    <el-tab-pane label="矿池">
      <batch-pools-table :option="batchPoolTableOption" @save="saveBatchPools"></batch-pools-table>
    </el-tab-pane>
    <el-tab-pane label="网络">
    </el-tab-pane>
    <el-tab-pane label="风扇">
    </el-tab-pane>
    <el-tab-pane label="告警门限">
    </el-tab-pane>
    <el-tab-pane label="工作频率">
    </el-tab-pane>
    <el-tab-pane label="上报周期">
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import MinerList from '@/components/MinerList'
import IpRange from '@/components/IpRange'
import BatchPoolsTable from '@/components/BatchPoolsTable.vue'

export default {
  data () {
    return {
      batchPoolsChecked: false,
      batchPoolTableOption: {
        cancel: {
          visible: false
        }
      }
    }
  },
  components: {
    BatchPoolsTable,
    MinerList,
    IpRange
  },
  computed: {
    checkedIps () {
      return this.$refs.ipRange.checkedIps
    }
  },
  methods: {
    addSelectedIps (ipList) {
      this.$refs.ipRange.addSelectedIps(ipList)
    },
    saveBatchPools (pools, openByDialog) {
      if (this.checkedIps.length === 0) {
        this.$alert('请添加 IP 范围')
        return
      }
      this.$ajax.put('/v1/batch/pools', {
        ips: this.checkedIps,
        pools
      })
        .then((response) => {
          if (response.data.result === 'success') {
            this.$alert('已发送批量配置矿池请求')
            this.dialogBatchPoolsVisible = false
          } else {
            this.$alert('发送批量配置矿池请求失败')
          }
        })
        .catch((error) => {
          this.$alert(error)
        })
    }
  }
}
</script>

<style>
  .batch-container .common-box {
    padding: 20px;
  }
  .batch-card-title {
    margin-left: 4px;
  }
  .batch-pools-card .el-card__body {
    padding-top: 2px;
  }
</style>
