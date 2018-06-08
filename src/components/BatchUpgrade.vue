<template>
<div class="batch-upgrade-container">
  <miner-list class="mb" @addIps="addSelectedIps"></miner-list>
  <el-row type="flex" class="common-box mb" style="padding: 20px;">
    <ip-range ref="ipRange"></ip-range>
    <div v-loading="loading" element-loading-text="发送请求中">
      <div style="padding-left: 40px;">
        <div class="mb">
          <div class="upload-title">固件升级文件</div>
          <el-upload
            class="upload-demo"
            ref="upload"
            action="/v1/upload/firmwareImage"
            :headers="headers"
            :limit="2"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="uploadSuccess"
            :file-list="fileList"
            :auto-upload="true">
            <el-button slot="trigger" type="primary">上传文件</el-button>
            <!-- <el-button style="margin-left: 10px;" type="success" @click="submitUpload">上传到服务器</el-button> -->
            <el-button type="success" @click="upgrade">批量升级</el-button>
          </el-upload>
        </div>
        <!-- <el-button type="primary" @click="upgrade">批量升级</el-button> -->
      </div>
    </div>
  </el-row>
</div>
</template>

<script>
import IpRange from '@/components/IpRange'
import MinerList from '@/components/MinerList'

export default {
  name: 'BatchUpgrade',
  components: {
    IpRange,
    MinerList
  },
  data () {
    return {
      loading: false,
      fileList: [],
      fileUploadedUrl: ''
    }
  },
  computed: {
    checkedIps () {
      return this.$refs.ipRange.checkedIps
    },
    headers () {
      let csrfToken = this.$cookies.get('csrfToken')
      return {
        'x-csrf-token': csrfToken
      }
    }
  },
  methods: {
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      this.fileUploadedUrl = ''
    },
    handlePreview (file) {
      console.log(file)
    },
    uploadSuccess (response, file, fileList) {
      if (response && response.result === 'success') {
        this.fileUploadedUrl = response.url
      } else {
        this.$alert('上传失败！', '提示')
      }
      console.log(fileList)
      if (fileList.length >= 2) {
        fileList.shift()
      }
    },
    addSelectedIps (ipList) {
      this.$refs.ipRange.addSelectedIps(ipList)
    },
    upgrade () {
      if (this.checkedIps.length === 0) {
        this.$alert('请添加 IP 范围', '提示')
        return
      }
      if (!this.fileUploadedUrl) {
        this.$alert('请上传固件升级文件', '提示')
        return
      }
      this.$confirm('此操作将按选定ip范围 批量升级，是否继续？', '提示').then(() => {
        console.log('reboot')
        this.loading = true
        this.$ajax.put('/v1/batch/upgrade', {
          ips: this.checkedIps,
          url: this.fileUploadedUrl
        })
          .then((response) => {
            this.loading = false
            if (response.data.result === 'success') {
              this.$alert('已发送批量升级请求')
            } else {
              this.$alert('发送批量升级请求失败')
            }
          })
          .catch((error) => {
            this.loading = false
            this.$alert(error)
          })
      }).catch(() => {
        // 取消
      })
    }
  }
}
</script>

<style>
  .upload-title {
    font-size: 16px;
    padding-bottom: 4px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ebeef5;
  }
</style>
