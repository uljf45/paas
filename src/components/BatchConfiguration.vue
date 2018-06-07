<template>
<div class="batch-container">
  <miner-list class="mb" @addIps="addSelectedIps"></miner-list>
  <el-row type="flex" class="common-box mb">
    <ip-range ref="ipRange"></ip-range>
    <div>
      <div style="padding-left: 40px;">
        <el-button type="primary" size="mini" @click="openDialogBatchPools">批量配置矿池</el-button>
      </div>
    </div>
  </el-row>
  <el-card class="batch-pools-card">
    <div slot="header" class="clearfix">
      <el-checkbox v-model="batchPoolsChecked">批量配置矿池</el-checkbox>
    </div>
    <batch-pools-table :option="batchPoolTableOption" @cancel="closeDialogBatchPools" @save="saveBatchPools"></batch-pools-table>
  </el-card>
  <batch-pools-dialog :visible="dialogBatchPoolsVisible" @cancel="closeDialogBatchPools" @save="saveBatchPoolsByDialog"></batch-pools-dialog>
</div>
</template>

<script>
import BatchPoolsDialog from '@/components/BatchPoolsDialog.vue'
import BatchPoolsTable from '@/components/BatchPoolsTable.vue'
import MinerList from '@/components/MinerList'
import IpRange from '@/components/IpRange'

export default {
  data () {
    return {
      dialogBatchPoolsVisible: false,
      batchPoolsChecked: false,
      batchPoolTableOption: {
        cancel: {
          visible: false
        }
      }
    }
  },
  components: {
    BatchPoolsDialog,
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
    openDialogBatchPools () {
      if (this.checkedIps.length === 0) {
        this.$alert('请添加 IP 范围')
        return
      }
      this.dialogBatchPoolsVisible = true
    },
    closeDialogBatchPools () {
      this.dialogBatchPoolsVisible = false
    },
    saveBatchPoolsByDialog (pools) {
      this.saveBatchPools(pools, true)
    },
    saveBatchPools (pools, openByDialog) {
      if (!openByDialog && !this.batchPoolsChecked) {
        this.$alert('请选中批量配置矿池')
        return
      }
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
        .catch(function (error) {
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
