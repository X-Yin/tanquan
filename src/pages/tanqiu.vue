<template>
	<div>
		<head-nav></head-nav>
       <div class="header">
         <div class="container">
          <p class="title">探求 <span>Search</span></p>
         </div>
       </div>
    <div class="nav">
      <el-row class="container">
        <ul>
          <li @click="goto('/tanqiu/square')" :class="{current: isCurrent(0)}">探求广场</li>
          <li @click="goto('/tanqiu/answer')" :class="{current:isCurrent(1)}">我的问答</li><!--
			 --><li @click="goto('/tanqiu/task')" :class="{current:isCurrent(2)}">我的任务</li>
        </ul>
      </el-row>
    </div>
      <router-view></router-view>
		<foot-bar></foot-bar>
	</div>
</template>

<script>
  import headNav from '../components/Ccomponents/headNav'
  import footBar from '../components/Ccomponents/footBar'
  export default{
    components:{
      headNav,
      footBar
    },
    methods:{
      goto(path){
        this.$router.push(path)
      },
      isCurrent(index){
        if (index === 0) {
          let path = /\/tanqiu\/square\//
          return path.test(this.$route.path)
        } else  if (index === 1) {
          let path = /\/tanqiu\/answer\//
          return path.test(this.$route.path)
        } else if (index === 2) {
          let path = /\/tanqiu\/task\//
          return path.test(this.$route.path)
        }
      }
    }
  }
</script>

<style scoped>
  .header{
    width: 100%;
    min-width: 1180px;
    height: 236px;
    background: no-repeat center url("../../static/ximages/search.png") /auto 100% ;
  }
  @media (min-width: 1346px){
    .header{
      width: 100%;
      min-width: 1180px;
      height: 236px;
      background: no-repeat center url("../../static/ximages/search.png") /100% auto ;
    }
  }
  .title{
    color: #fff;
    font-size: 42px;
    font-weight: 600;
    line-height: 230px;
  }
  .title span{
    font-size: 28px;
    font-weight: 400
  }
  .nav{
    height: 60px;
    background-color: #5b5b5b;
    min-width: 1180px;
  }
  .nav ul{
    margin-left: 20px;
  }
  .nav li{
    padding: 0 20px;
    line-height: 60px;
    color: #fff;
    font-size: 18px;
    list-style: none;
    display: inline-block;
    cursor: pointer;
  }
  .current{
    background-color: #4893a8;
  }
</style>
