<template>
  <div>
    <head-nav></head-nav>
    <div class="header">
      <div class="container">
        <p class="title">探人 <span>Detective</span></p>
      </div>
    </div>
    <div class="nav">
      <el-row class="container">
        <ul>
          <li @click="goto('/tanren/learner')" :class="{current:isCurrent('/learner')}">学习者</li><!--
				 --><li @click="goto('/tanren/helper')" :class="{current:isCurrent('/helper')}">助学者</li>
        </ul>
      </el-row>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
      isCurrent(path){
        let rp=this.$route.path.split('/')
        return path=='/'+rp[2]
      }
    }
  }
</script>

<style scoped>
li {
  cursor: pointer;
}
  .header{
    width: 100%;
    height: 236px;
    background: no-repeat center url("../../static/book.png") /auto 100% ;
  }
  @media (min-width: 1346px){
    .header{
      width: 100%;
      height: 236px;
      background: no-repeat center url("../../static/book.png") /100% auto ;
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
  }
  .current{
    background-color: #4893a8;
  }
</style>
