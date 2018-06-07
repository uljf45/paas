<template>
<div class="batch-container">
  <miner-list class="mb" @addIps="addSelectedIps"></miner-list>
  <el-row type="flex" class="common-box mb">
    <div class="batch-ip-range">
      <el-row type="flex" style="margin-bottom: 10px;" align="middle">
        <div class="mr">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">IP范围:</el-checkbox>
        </div>
        <el-button size="mini" type="primary" plain @click="addips">+</el-button>
        <el-button size="mini" type="primary" plain @click="removeips">-</el-button>
      </el-row>
      <el-row type="flex" style="margin-bottom: 10px;">
        <div>
          起始IP:
          <el-input class="input--ip" @change="handleIpChanged($event, 'startIP0')" @input="handleIpInput($event, 'startIP0')" v-model="startIP0" size="mini"></el-input> .
          <el-input class="input--ip" @change="handleIpChanged($event, 'startIP1')" @input="handleIpInput($event, 'startIP1')" v-model="startIP1" size="mini"></el-input> .
          <el-input class="input--ip" @change="handleIpChanged($event, 'startIP2')" @input="handleIpInput($event, 'startIP2')" v-model="startIP2" size="mini"></el-input> .
          <el-input class="input--ip" @change="handleIpChanged($event, 'startIP3')" @input="handleIpInput($event, 'startIP3')" v-model="startIP3" size="mini"></el-input>
        </div>
        <div style="margin-left: 20px">
          结束IP:
          <el-input class="input--ip" @change="handleIpChanged($event, 'startIP0')" @input="handleIpInput($event, 'endIP0')" v-model="endIP0" size="mini"></el-input> .
          <el-input class="input--ip" @change="handleIpChanged($event, 'startIP1')" @input="handleIpInput($event, 'endIP1')" v-model="endIP1" size="mini"></el-input> .
          <el-input class="input--ip" @change="handleIpChanged($event, 'startIP2')" @input="handleIpInput($event, 'endIP2')" v-model="endIP2" size="mini"></el-input> .
          <el-input class="input--ip" @change="handleIpChanged($event, 'startIP3')" @input="handleIpInput($event, 'endIP3')" v-model="endIP3" size="mini"></el-input>
        </div>
      </el-row>
      <el-checkbox-group class="batch-ip-range-list clearfix" v-model="checkedIps" @change="handleCheckedIpsChange">
        <div class="fl" v-for="(item, index) in ipList" :key="item+index" >
          <el-checkbox :label="item"></el-checkbox>
        </div>
      </el-checkbox-group>
    </div>
    <div>
      <div style="padding-left: 40px;">
        <el-button type="primary" size="mini" @click="openDialogBatchPools">批量配置矿池</el-button>
      </div>
    </div>
  </el-row>
  <el-card>
    <div slot="header" class="clearfix">
      <el-checkbox v-model="batchPoolsChecked">批量配置矿池</el-checkbox>
    </div>
    <batch-pools-table :option="batchPoolTableOption" @cancel="closeDialogBatchPools" @save="saveBatchPools"></batch-pools-table>
  </el-card>
  <batch-pools-dialog :visible="dialogBatchPoolsVisible" @cancel="closeDialogBatchPools" @save="saveBatchPools"></batch-pools-dialog>
</div>
</template>

<script>
import BatchPoolsDialog from '@/components/BatchPoolsDialog.vue'
import BatchPoolsTable from '@/components/BatchPoolsTable.vue'
import MinerList from '@/components/MinerList'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      startIP0: '192',
      startIP1: '168',
      startIP2: '0',
      startIP3: '0',
      endIP0: '192',
      endIP1: '168',
      endIP2: '0',
      endIP3: '0',
      ipList: [],
      checkedIps: [],
      checkAll: false,
      isIndeterminate: false,
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
    MinerList
  },
  computed: {
    ips () {
      let startip = this.startIP0 + '.' + this.startIP1 + '.' + this.startIP2 + '.' + this.startIP3
      let endip = this.endIP0 + '.' + this.endIP1 + '.' + this.endIP2 + '.' + this.endIP3
      let compareResult = this.$util.compareIP(startip, endip)
      let result = startip
      if (compareResult < 0) result += '~' + endip
      else if (compareResult > 0) result = endip + '~' + startip
      return result
    },
    ...mapGetters({
      batchAlertSelection: 'batchAlertSelection',
      batchAllSelection: 'batchAllSelection'
    })
  },
  methods: {
    handleIpInput (e, key) {
      this.$nextTick(() => {
        let result = e.replace(/[^\d]/g, '')
        result = result.replace(/\s+/g, '')
        if (result.length >= 2) {
          result = result.replace(/^0+/, '')
          if (result === '') {
            result = '0'
          }
        }
        if (result.length > 3) {
          result = result.substr(0, 3)
        }
        if (Number(result) > 255) {
          result = '255'
        }
        this[key] = result
      })
    },
    handleIpChanged (e, key) {
      if (e === '') {
        this[key] = '0'
      }
    },
    addips () {
      if (!this.ipList.includes(this.ips)) {
        this.ipList.push(this.ips)
        this.checkedIps.push(this.ips)
        this.ipList.sort((a, b) => { return this.$util.compareIP(a, b) })
        this.checkedIps.sort((a, b) => { return this.$util.compareIP(a, b) })
      }
    },
    addSelectedIps (type) {
      let ipList = []

      if (type === 'alert') {
        ipList = this.batchAlertSelection
      }
      if (type === 'all') {
        ipList = this.batchAllSelection
      }

      ipList = ipList.map((value, index) => {
        return value.ip
      })

      let isChange = false

      ipList.forEach((value, index) => {
        if (!this.ipList.includes(value)) {
          this.ipList.push(value)
          this.checkedIps.push(value)
          isChange = true
        }
      })

      if (isChange) {
        this.ipList.sort((a, b) => { return this.$util.compareIP(a, b) })
        this.checkedIps.sort((a, b) => { return this.$util.compareIP(a, b) })
      }
    },
    removeips () {
      let ipDeleted = this.ipList.pop()
      let index = this.checkedIps.findIndex(v => v === ipDeleted)
      this.checkedIps.splice(index, 1)
    },
    handleCheckAllChange (val) {
      this.checkedIps = val ? this.ipList.concat() : []
      this.isIndeterminate = false
    },
    handleCheckedIpsChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.ipList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.ipList.length
    },
    openDialogBatchPools () {
      if (this.checkedIps.length === 0) {
        alert('请添加 IP 范围')
        return
      }
      this.dialogBatchPoolsVisible = true
    },
    closeDialogBatchPools () {
      this.dialogBatchPoolsVisible = false
    },
    saveBatchPools (pools) {
      if (!this.batchPoolsChecked) {
        alert('请选中批量配置矿池')
        return
      }
      if (this.checkedIps.length === 0) {
        alert('请添加 IP 范围')
        return
      }
      this.$ajax.put('/v1/batch/pools', {
        ips: this.checkedIps,
        pools
      })
        .then((response) => {
          if (response.data.result === 'success') {
            alert('已发送批量配置矿池请求')
            this.dialogBatchPoolsVisible = false
          } else {
            alert('发送批量配置矿池请求失败')
          }
        })
        .catch(function (error) {
          alert(error)
        })
    }
  }
}
</script>

<style>
  .batch-container .common-box {
    padding: 20px;
  }
  .batch-ip-range-list {
    height: 120px;
    border: 1px solid #dcdfe6;
    width: 618px;
    padding-left: 2px;
    overflow: scroll;
  }
  .batch-ip-range-list .fl {
    box-sizing: border-box;
    width: 50%;
  }
  .input--ip {
    width: 54px;
  }
  .input--ip .el-input__inner{
    text-align:  center;
  }
  .batch-card-title {
    margin-left: 4px;
  }
</style>
