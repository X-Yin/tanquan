<template>
  <div class="privacy">
    <head-nav></head-nav>
    <div class='wrapper'>
      <div class="nav">
        <div class="nav-item" v-for="(item, index) in navs" :key="index" :class="{'current': index === Cindex}" @click="selectItem(index)">
          <div class="title">{{item}}</div>
        </div>
      </div>
      <div class="main">
        <private-detail></private-detail>
      </div>
    </div>
  </div>
</template>

<script>
  import headNav from '../Ccomponents/headNav.vue'
  import footBar from '../Ccomponents/footBar.vue'
  import privateDetail from './privateDetail.vue'
  import $ from 'jquery'
  export default {
    data () {
      return {
        navs: ['我们收集的个人信息', 'CC社如何使用您的个人信息', '我们会如何使用 Cookie 和同类技术', '我们会如何共享、转让、公开披露您的个人信息', '如何管理您的个人信息', '推广服务', '我们会如何保护和保存您的个人信息', '第三方提供商及其服务', 'CC社会如何处理未成年人的个人信息', '本政策如何更新及适用范围', '联系我们'],
        Cindex: 0
      }
    },
    methods: {
      selectItem (index) {
        this.Cindex = index
        let a = document.createElement('a')
        $(a).attr('href', `#a${index}`)
        a.click()
      }
    },
    components: {
      headNav,
      footBar,
      privateDetail
    }
  }
</script>

<style scoped>
  .privacy {
    width: 100%;
    min-height: 100vh;
    background-color: white;
  }
  .wrapper {
    min-height: 100vh;
  }
  .nav {
    position: fixed;
    top: 120px;
    left: 60px;
    width: 210px;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: rgba(0,0,0,0.8);
  }
  .nav-item {
    width: 170px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: white;
    cursor: pointer;
    
    padding: 0 20px;
    transition: all 0.2s;
  }
  .title {
    width: 170px;
    text-overflow: ellipsis!important;
    overflow: hidden!important;
    white-space: nowrap!important;
  }
  .nav-item:hover {
    background-color: #4893a8;
  }
  .nav-item.current {
    background-color: #4893a8;
  }
  .main {
    display: inline-block;
    vertical-align: top;
    width: 800px;
    min-height: 100vh;
    margin-top: 40px;
    margin-left: 320px;
  }
</style>