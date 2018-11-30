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
        <use-rule></use-rule>
      </div>
    </div>
    <foot-bar></foot-bar>
  </div>
</template>

<script>
  import headNav from '../Ccomponents/headNav.vue'
  import footBar from '../Ccomponents/footBar.vue'
  import useRule from './useRule.vue'
  import $ from 'jquery'
  export default {
    data () {
      return {
        navs: ['使用规则', '知识产权', '个人隐私', '侵权举报', '免责声明'],
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
      useRule
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
    left: 120px;
    width: 170px;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: rgba(0,0,0,0.8);
  }
  .nav-item {
    width: 170px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    color: white;
    cursor: pointer;
    transition: all 0.2s;
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