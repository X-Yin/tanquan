<template>
  <div class="tanquan">
    <head-nav></head-nav>
    <div class="header">
      <div class="container">
        <p class="title">探圈 <span>Probing</span></p>
      </div>
    </div>
    <div class="nav">
      <el-row class="container">
        <ul>
          <li @click="goto('/tanquan/probing')" :class="{current:isCurrent('/probing')}"><p>圈子动态</p></li><!--
				 --><li @click="goto('/tanquan/elite')" :class="{current:isCurrent('/elite')}"><p>圈子精英</p></li><!--
				 --><li @click="goto('/tanquan/library')" :class="{current:isCurrent('/library')}"><p>圈子库</p></li><!--
				 --><li @click="goto('/tanquan/me')" :class="{current:isCurrent('/me')}"><p>我的</p></li>
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
      isCurrent(path){
        let rp=this.$route.path.split('/')
        return path=='/'+rp[2]
      }
    }
  }
</script>

<style scoped>
  .tanquan {
  }
  .header{
    position: relative;
    top: -1px;
    font-size: 0;
    width: 100%;
    height: 236px;
    background: no-repeat center url("https://oss.yxlinker.com/master/keybroad.png") /auto 100% ;
  }
  @media (min-width: 1346px){
    .header{
      width: 100%;
      height: 236px;
      background: no-repeat center url("https://oss.yxlinker.com/master/keybroad.png") /100% auto ;
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
    position: relative;
    top: -2px;
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
  .nav li p{
    cursor: pointer;
  }
  .current{
    background-color: #4893a8;
  }
</style>
