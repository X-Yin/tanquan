<template>
  <div class="home">
    <head-nav></head-nav>
    <div class="main">
      <div class="container">
        <div class="left">
          <div class="follow-item">
            <div class="brief">
              <div class="list" :class="{selected:index === current}" v-for="(item,index) in allData" :key="index" @mouseover="selectModule(index)" owl="app_demo" @click="gotoCom(index)">
                <!-- <div class="order">{{item.order}}</div> -->
                <div class="content">
                  <span class="title">{{item.title}}</span>
                  <span class="time"><i class="process"></i></span>
                  <span class="description">{{item.description}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <img draggable="false" id="c1" style="top: 80px;left:86.4px" src="https://oss.yxlinker.com/master/一环0.8.png">
          <img draggable="false" id="c2" style="top: 62.4px;left:68px" src="https://oss.yxlinker.com/master/二环0.8.png">
          <img draggable="false" id="c3" style="top: 35.2px;left:36px" src="https://oss.yxlinker.com/master/三环0.8.png">
          <img draggable="false" id="c4" style="top: 0;left:0" src="https://oss.yxlinker.com/master/四环0.8.png">
          <img draggable="false" style="top: 212px;left:-32px" src="https://oss.yxlinker.com/master/圈子0.8.png">
          <img draggable="false" style="top: 136.8px;left:142.4px" src="https://oss.yxlinker.com/master/需求0.8.png">
          <img draggable="false" style="top: 19.2px;left:23.2px" src="https://oss.yxlinker.com/master/资源0.8.png">
          <img draggable="false" style="top: 40px;left:341.6px" src="https://oss.yxlinker.com/master/学习者0.8.png">
          <img draggable="false" style="top: 319.2px;left:248px" src="https://oss.yxlinker.com/master/助学者0.8.png">
        </div>
      </div>
    </div>
    <div class="bf-after-wrapper">
      <img src='https://oss.yxlinker.com/master/home3.png' class="bgafter bg-1">
      <img src="https://oss.yxlinker.com/master/home1.png" class="bgafter bg-2">
      <img src='https://oss.yxlinker.com/master/home2.png' class="bgafter bg-3">
    </div>
    <foot-bar class="foot"></foot-bar>
  </div>
</template>

<script>
  import headNav from '../components/Ccomponents/headNav'
  import footBar from '../components/Ccomponents/footBar'
  import {a,reqTalkHistory1} from '../api'
  import {getStorage, getCookie} from '../api/util.js'
  import $ from 'jquery'
  export default {
    data() {
      return {
        allData: [{order:'01',title:'探圈 Probing',description:'圈子对了，事就成了'},{order:'02',title:'探求 Demand',description:'据说，这里有最美的星空'},{order:'03',title:'探人 Seeker',description:'我们的空间很大，牛人很多'}],
        current: 0,
        task: ''
      }
    },
    methods: {
      gotoCom (index) {
        let sessionid = getCookie('JSESSIONID');
        if (sessionid) {
          if (index === 0) {
            this.$router.push('/tanquan')
          } else if (index === 1) {
            this.$router.push('/tanqiu')
          } else if (index === 2) {
            this.$router.push('/tanren')
          }
        } else {
          this.$router.push('/signup')
        }
        
      },
      autoPlay() {
        if (this.current > 1.5) {
          this.current = 0
        } else {
          this.current++
        }
      },
      play() {
        this.task = setInterval(this.autoPlay, 5000)
      },
      selectModule(index) {
        this.current = index
        clearInterval(this.task)
        this.play()
      }
    },
    mounted() {
      this.play();//首页动画
    },
    components: {
      headNav,
      footBar
    }
  }
</script>

<style lang="stylus" rel='stylesheet' scoped>
  .foot {
    position: relative;
    top: -10px;
  }
  .bg-1 {
    position: relative;
    top: -2px;
    width: 1180px;
  }
  .bg-2 {
    position: relative;
    top: -7px;
    width: 1180px;
  }
  .bg-3 {
    position: relative;
    top: -12px;
    width: 1180px;
  }
  .bg-after-wrapper {
    font-size: 0;
    width: 1180px;
    overflow: hidden;
    margin: 0 auto;
  }
  .bgafter {
    width: 100%;
  }
  .home
    background-color #3e3e3e
  .main
  {
    height: 486px;
    background: url('https://oss.yxlinker.com/master/background.png') center;
    background-size: 120%;
    min-width:1180px;
  }
  @keyframes myfirst
  {
    from {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg); /* IE 9 */
      -webkit-transform: rotate(0deg); /* Safari and Chrome */
    }
    to {
      transform: rotate(10000deg);
      -ms-transform: rotate(10000deg); /* IE 9 */
      -webkit-transform: rotate(10000deg); /* Safari and Chrome */
    }
  }
  @-webkit-keyframes myfirst
  {
    from {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg); /* IE 9 */
      -webkit-transform: rotate(0deg); /* Safari and Chrome */
    }
    to {
      transform: rotate(10000deg);
      -ms-transform: rotate(10000deg); /* IE 9 */
      -webkit-transform: rotate(10000deg); /* Safari and Chrome */
    }
  }
  @keyframes title
    0%
      font-size 16px
    10%
      font-size 48px
    100%
      font-size 48px
  @keyframes time
    0%
      width 0
    100%
      width 100%
  @keyframes order
    0%
      margin 0 16px 0 16px
    10%
      margin 56px 16px 0 16px
    100%
      margin 56px 16px 0 16px
  @keyframes picture
    0%
      opacity 0.2
    30%
      opacity 1
    100%
      opacity 1
  .fade-enter-active, .fade-leave-active
    transition opacity 2s

  .fade-enter, .fade-leave-to, .v-enter-to
    opacity 0
  #c1{
    animation: myfirst 900s;
    -webkit-animation: myfirst 900s;
    animation-iteration-count:100;
    -webkit-animation-iteration-count:100; /*Safari and Chrome*/
  }
  #c2{
    animation: myfirst 600s;
    -webkit-animation: myfirst 600s;
    animation-iteration-count:100;
    -webkit-animation-iteration-count:100; /*Safari and Chrome*/
  }
  #c3{
    animation: myfirst 300s;
    -webkit-animation: myfirst 500s;
    animation-iteration-count:100;
    -webkit-animation-iteration-count:100; /*Safari and Chrome*/
  }
  #c4{
    animation: myfirst 1000s;
    -webkit-animation: myfirst 1000s;
    animation-iteration-count:100;
    -webkit-animation-iteration-count:100; /*Safari and Chrome*/
  }
  .right
    vertical-align top
    position relative
    display inline-block
    height 400px
    width 400px
    left 160px
    top 30px
    img
      position absolute
      right 38px
      bottom 32px
  .left
    position relative
    vertical-align top
    display inline-block
    height 500px
    width 450px
    padding-top 20px
    padding-left 40px
    color #fff
  .follow-item
    font-size 20px
    color #fff
    margin 0 auto
    width 940px
    .brief
      float left
      height 321px
      .list
        overflow hidden
        margin 47px 0
        cursor pointer
        .order
          display block
          float left
          margin 16px
        .content
          float left
          .title
            display block
          .time
            width 100px
            height 2px
            background rgba(255,255,255,0.5)
            margin 3px 0
            font-size 16px
            display block
          .description
            display block
            font-size 16px
        &.selected
          .order
            display block
            float left
            margin 56px 16px 0 16px
            animation order 5s infinite
          .time
            width 250px
            height 2px
            background rgba(255,255,255,0.5)
            margin 3px 0
          .process
            background #fff
            height 2px
            display block
            transition width .8s ease
            animation time 5s infinite
          .title
            font-size 36px
            animation title 5s infinite
</style>

