<template>
<div id="me">
  <el-row class='container'>
  <el-col :span='6' class='right el-6-wrapper' >
    <ul>
      <li @click="goto('/tanquan/me/joinedCircle')" :class="{current:isCurrent('/joinedCircle')}">我加入的圈子</li>
      <li @click="goto('/tanquan/me/focusedCircle')" :class="{current:isCurrent('/focusedCircle')}">我关注的圈子</li>
    <!--   <li @click="goto('/tanquan/me/joinedAct')" :class="{current:isCurrent('/joinedAct')}">我加入的活动</li>
      <li @click="goto('/tanquan/me/createdAct')" :class="{current:isCurrent('/createdAct')}">我发起的活动</li> -->
      <!--<li @click="goto('/tanquan/me/getTask')" :class="{current:isCurrent('/getTask')}">我接单的任务</li>-->
      <!--<li @click="goto('/tanquan/me/createdTask')" :class="{current:isCurrent('/createdTask')}">我发起的任务</li>-->
      <li @click="goto('/tanquan/me/createdCircle')" :class="{current:isCurrent('/createdCircle')}">我创建的圈子</li>
      <li @click="goto('/tanquan/me/application')" :class="{current:isCurrent('/application')}">我的申请</li>
      <li @click="goto('/tanquan/me/invitation')" :class="{current:isCurrent('/invitation')}">我的邀请</li>
    </ul>
  </el-col>
  <el-col :span='17' class='left el-17-wrapper' :offset="1">
   <router-view></router-view>
  </el-col>
  </el-row>
</div>
</template>

<script>
  export default{
    data(){
      return{}
    },
    methods:{
      goto(path){
        this.$router.push(path)
      },
      isCurrent(path){
        let rp=this.$route.path.split('/')
        return path=='/'+rp[3]
      }
    }
  }
</script>

<style scoped>
#me{
  padding-top: 30px;
}
.el-6-wrapper{
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}
.el-17-wrapper {
  background-color: white;
  border-radius: 10px;
  position: relative;
  padding-right: 20px;
  box-sizing: border-box;
  left: -30px;
  min-height: 100vh
}
li{
  list-style: none;
  font-size: 21.8px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #5b5b5b;
  cursor: pointer;
  user-select:none;
}
.current{
  background-color: #4893a8;
  color: #fff;
}
.left{
  padding-left: 20px;
}
</style>
