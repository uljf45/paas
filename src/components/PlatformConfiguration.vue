<template>
<div class="platform-configuration">
  <div class="common-box mb">
    <p class="platform-title">矿场名字</p>
    <el-input v-model.trim="platformName" style="width:300px;"></el-input>
  </div>
  <div class="common-box smtp-box">
    <p class="platform-title">SMTP配置</p>
    <div>
      <div class="smtp-item-wrap">
        <span class="smtp-item-name">host:</span>
        <el-input size="small" placeholder="请输入host"></el-input>
      </div>
      <div class="smtp-item-wrap">
        <span class="smtp-item-name">port:</span>
        <el-input size="small" placeholder="请输入port"></el-input>
      </div>
      <div class="smtp-item-wrap">
        <span class="smtp-item-name">secure:</span>
        <el-input size="small" placeholder="请输入secure"></el-input>
      </div>
      <div class="smtp-item-wrap">
        <span class="smtp-item-name">auth username:</span>
        <el-input size="small" placeholder="请输入auth username"></el-input>
      </div>
      <div class="smtp-item-wrap">
        <span class="smtp-item-name">auth password:</span>
        <el-input size="small" placeholder="请输入auth password"></el-input>
      </div>
      <div class="smtp-item-wrap">
        <span class="smtp-item-name">from</span>
        <el-input size="small" placeholder="请输入from"></el-input>
      </div>
      <div class="smtp-item-wrap">
        <span class="smtp-item-name  --to">to</span>
        <el-input type="textarea" size="small" placeholder="请输入to 多个邮件地址以逗号隔开"></el-input>
      </div>
    </div>
    <div>
      <el-button size="medium" @click="cancel">取消</el-button>
      <el-button size="medium" type="primary" @click="save">保存</el-button>
    </div>
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
  },
  methods: {
    save () {
      console.log('save')
    },
    cancel () {
      console.log('cancel')
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
  .smtp-box .el-input,
  .smtp-box .el-textarea {
    width: 360px;
  }
  .smtp-item-name {
    display: inline-block;
    width: 300px;
    text-align: left;
  }
  .smtp-item-name.--to {
    height: 30px;
    line-height: 30px;
    vertical-align: top;
  }
  .smtp-item-wrap:nth-of-type(n+1) {
    margin-top: 10px;
  }
</style>
