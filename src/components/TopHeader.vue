<template>
  <div class="clearfix">
    <nav class="fr">
      <ul class="clearfix">
        <li class="fl nav-item">
          <a @click="home" class="link-btn">首页</a>
        </li>
        <li class="fl nav-item">
          <a class="link-btn">登录</a>
        </li>
        <li class="fl nav-item">
          <a class="link-btn">注册</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    home () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .nav-item {
    line-height: 60px;
  }
  .link-btn {
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    padding: 10px 20px;
    border-radius: 3px;
    transition: .3s;
  }
  .link-btn:hover {
    text-decoration: none;
    background: #2658a9;
  }

</style>
