<template>
  <div class="search">
    <head-nav></head-nav>
    <div class="container content-wrapper">
      <div class="left-wrapper">
        <div class="title-wrapper">
          <span class="color-block"></span>
          <span class="title-text">搜索结果</span>
        </div>
        <div class="nav">
            <router-link to="/search/searchAll" class="nav-item">
              综合
            </router-link>
            <router-link to="/search/searchCircle" class="nav-item">
              圈子
            </router-link>
            <router-link to="/search/searchUser" class="nav-item">
              用户
            </router-link>
        </div>
        <div class="content">
          <router-view/>
        </div>
      </div>
      <div class="right-wrapper">
        <div class="right-title">
          <span class="color-block"></span>
          <span class="title-text">热门搜索</span>
        </div>
        <div class="search-item" v-for="(item, index) in 6">
          <span class="hot-icon">
            <img v-show="index === 0 || index === 1 || index === 2" src="/static/ximages/hot-icon.png">
          </span>
          <span class="hot-text">2018双十一</span>
        </div>
      </div>
    </div>
    <foot-bar></foot-bar>
  </div>
</template>

<script>
  import headNav from '../Ccomponents/headNav.vue'
  import footBar from '../Ccomponents/footBar.vue'
  export default {
    methods: {
      current (path) {
        if (this.$route.path === path) {
          return 'current'
        }
      }
    },
    components: {
      headNav,
      footBar
    }
  }
</script>

<style scoped>
  .content-wrapper {
    min-height: 100vh;
    background-color: white;
    overflow: hidden;
    display: flex;
  }
  .left-wrapper {
    flex: 1;
  }
  .title-wrapper {
    margin: 40px 0 20px 120px;
    height: 50px;
  }
  .title-wrapper:before {
    display: inline-block;
    vertical-align: middle;
    height: 50px;
  }
  .color-block {
    display: inline-block;
    vertical-align: middle;
    width: 15px;
    height: 20px;
    background-color: #4893a8;
    margin-right: 10px;
  }
  .title-text {
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    color: #333;
  }
  .nav {
    font-size: 0;
    margin-left: 120px;
    margin-top: 20px;
  }
  a {
    text-decoration: none;
    color: #c9c9c9;
  }
  .nav-item {
    display: inline-block;
    vertcal-align: top;
    border-top: 1.5px solid #c9c9c9;
    border-right: 1px solid #c9c9c9;
    border-bottom: 1px solid #c9c9c9;
    cursor: pointer;
    color: #c9c9c9;
    width: 70px;
    height: 25px;
    font-size: 15px;
    text-align: center;
    line-height: 25px;
  }
  .nav-item:first-child {
    border-left: 1px solid #c9c9c9;
  }
  .nav-item.current {
    border-top: 1.5px solid #4893a8;
  }
  .router-link-active {
    color: #4893a8;
    border-top: 1.5px solid #4893a8;
  }
  .content {
    padding-left: 120px;
    box-sizing: border-box;
    margin-top: 30px;
  }
  .right-wrapper {
    flex: 0 200px;
    margin-left: 60px;
    overflow: hidden;
  }
  .right-title {
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .search-item {
    padding: 5px 0;
    height: 30px;
  }
  .search-item:before {
    display: inline-block;
    vertical-align: middle;
    height: 30px;
  }
  .hot-icon {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
  .hot-icon img {
    width: 20px;
    height: 20px;
  }
  .hot-text {
    display: inline-block;
    vertical-align: middle;
    color: #6c6c6c;
    margin-left: 3px;
  }
</style>