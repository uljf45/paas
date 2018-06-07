<template>
<div class="batch-control-container">
  <miner-list class="mb" @addIps="addSelectedIps"></miner-list>
  <el-row type="flex" class="common-box mb" style="padding: 20px;">
    <ip-range ref="ipRange"></ip-range>
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
  methods: {
    addSelectedIps (ipList) {
      this.$refs.ipRange.addSelectedIps(ipList)
    }
  }
}
</script>

<style>

</style>
