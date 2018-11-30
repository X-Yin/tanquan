<template>
  <div class="myAnswer-text">
    <div class="container">
      <el-row class="wrapper">
        <el-col :span="6" class="el-6">
          <div class="nav-wrapper">
            <ul class="nav">
              <router-link to="/tanqiu/answer/myQuestion" class="nav-item"><li :class="{'current': isCurrent('/tanqiu/answer/myQuestion')}">我的提问</li></router-link>
              <router-link to="/tanqiu/answer/myAnswer" class="nav-item"><li :class="{'current': isCurrent('/tanqiu/answer/myAnswer')}">我的回答</li></router-link>
              <router-link to="/tanqiu/answer/attentionQuestion" class="nav-item"><li :class="{'current': isCurrent('/tanqiu/answer/attentionQuestion')}">我关注的问题</li></router-link>
            </ul>
          </div>
        </el-col>
        <el-col :span="17" :offset="1" class="el-17" style="padding-top: 30px;padding-left: 10px;box-sizing: border-box;">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      isCurrent (path) {
        return this.$route.path === path
      }
    }
  }
</script>

<style scoped>
  .el-6 {
    background-color: white;
    border-radius: 10px;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .el-17 {
    background-color: white;
    border-radius: 10px;
    padding-top: 30px;
    padding-left: 10px;
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
  }
  li {
    list-style: none;
  }
  .container {
    width: 1180px;
    margin: 0 auto;
    overflow: hidden;
    min-height: 100vh;
  }
  .wrapper {
    margin-top: 60px;
  }
  .nav-wrapper {
    width: 100%;
  }
  .nav {
    width: 255px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .nav-item {
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #a5a5a5;
    font-size: 20px;
  }
  .nav-item .current {
    background-color: #01a9ce;
    color: white;
  }
</style>
