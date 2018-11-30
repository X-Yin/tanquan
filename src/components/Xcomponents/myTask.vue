<template>
  <div class="myAnswer-text">
    <div class="container">
      <el-row class="wrapper">
        <el-col :span="6" class="el-6">
          <div class="nav-wrapper">
            <ul class="nav">
              <router-link to="/tanqiu/task/launch" class="nav-item"><li :class="{'current': isCurrent('/tanqiu/task/launch')}">我发出的任务</li></router-link>
              <router-link to="/tanqiu/task/underTake" class="nav-item"><li :class="{'current': isCurrent('/tanqiu/task/underTake')}">我承接的任务</li></router-link>
              <router-link to="/tanqiu/task/attentionTask" class="nav-item"><li :class="{'current': isCurrent('/tanqiu/task/attentionTask')}">我关注的任务</li></router-link>
            </ul>
          </div>
        </el-col>
        <el-col :span="17" :offset="1" class="el-17">
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
    padding-top: 30px;
    padding-bottom: 30px;
    border-radius: 10px;
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
