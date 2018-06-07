<template>
<div class="batch-control-container">
  <miner-list class="mb" @addIps="addSelectedIps"></miner-list>
  <el-row type="flex" class="common-box mb" style="padding: 20px;">
    <ip-range ref="ipRange"></ip-range>
    <div>
      <div style="padding-left: 40px;">
        <el-button type="primary" @click="reboot">批量重启</el-button>
        <el-button type="primary" @click="shutdown">批量关机</el-button>
      </div>
    </div>
  </el-row>
</div>
</template>

<script>
import IpRange from '@/components/IpRange'
import MinerList from '@/components/MinerList'

export default {
  name: 'BatchControl',
  components: {
    IpRange,
    MinerList
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
    reboot () {
      if (this.checkedIps.length === 0) {
        this.$alert('请添加 IP 范围', '提示')
        return
      }
      this.$confirm('此操作将按选定ip范围 批量重启，是否继续？', '提示').then(() => {
        console.log('reboot')
      }).catch(() => {
        // 取消
      })
    },
    shutdown () {
      if (this.checkedIps.length === 0) {
        this.$alert('请添加 IP 范围', '提示')
        return
      }
      this.$confirm('此操作将按选定ip范围 批量关机，是否继续？，是否继续？', '提示').then(() => {
        console.log('shutdown')
      }).catch(() => {
        // 取消
      })
    }
  }
}
</script>

<style>

</style>
