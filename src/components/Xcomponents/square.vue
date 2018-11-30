<template>
    <div class="square">
      <div class="container bg-container">
        <div class="me" v-if="me.userPhone !== undefined">
          <div class="avatar-wrapper">
            <div class="avatar">
              <img style="width: 100%;height: 100%;border-radius: 50%;" :src="avatar">
            </div>
          </div>
          <div class="description">
            <div class="nickName">
              <span class="name">{{me.userName}}</span>
              <span class="icon-checkNumber"></span>
            </div>
            <div class="detail">
              <span class="icon-arrow"></span>
              <span class="region">{{me.region}}</span>
              <span class="point">指数：{{me.userActiveness}}</span>
              <span class="residence">现居：{{me.userLocation}}</span>
              <span class="school">{{me.school}}</span>
            </div>
            <div class="tasks">
              <div class="question">提问:  <a class="task">{{me.userQuestionNumber}}</a></div>
              <div class="answer">回答:  <a class="task">{{me.userBadAnswerNumber + me.userGoodAnswerNumber}}</a></div>
              <div class="launch">发起任务:  <a class="task">{{me.userAssignTaskNumber}}</a></div>
              <div class="underTake">承接任务:  <a class="task">{{me.userTakeTaskNumber}}</a></div>
            </div>
          </div>
          <!--<div class="launch-task">-->
            <!--<div class="launch-wrapper" @click="launchTask"><span class="launch-btn">发布任务</span></div>-->
          <!--</div>-->
        </div>
        <div class="container-1">
          <el-row>
            <el-col :span="17" class="el-17" :class="{'noUser': me.userPhone === undefined}">
              <div class="tabs">
                <router-link to="/tanqiu/square/question" class="tab tab-l" :class="{'current': isCurrent('/tanqiu/square/question')}">提问</router-link>
                <router-link to="/tanqiu/square/task" class="tab tab-r" :class="{'current': isCurrent('/tanqiu/square/task')}">任务</router-link>
              </div>
              <router-view/>
            </el-col>
            <el-col :span="6" class="el-6" :offset="1" v-if="me.userPhone !== undefined">
              <div class="myGrade">
                <span class="color-block-1"></span>
                我的等级
                <div class="myIndex">
                  <!-- <div class="color-block-2"></div> -->
                  <div class="index-text">我的指数：{{me.userActiveness}}</div>
                  <div class="progress" style="width: 100%">
                    <div class="progress-wrapper">
                      <el-progress color="#59bd85" :percentage="percentage"></el-progress>
                    </div>
                    <div class="progress-text">{{me.indexs}}/200000</div>
                  </div>
                  <div class="gradeEvaluate">
                    <span class="color-block-1"></span>
                    等级评定
                    <div class="evaluateRules">
                      评定规则<i class="icon el-icon-arrow-down"></i>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapActions} from 'vuex'
  import {getStorage} from '../../api/util.js'
  import clipImage from '../common/clipImage.vue'
  import {uploadFile} from '../../api/index.js'
  export default {
    data () {
      return {
        percentage: 0,
        me:{},
        src: '/static/ximages/妹纸.jpg',
        isLoading: false
      }
    },
    computed: {
      ...mapState([
        'sessionId',
        'avatar'
      ])
    },
    mounted () {
      this.me = getStorage('user')
      console.log(this.me.userPhone)
    },
    watch: {
      sessionId () {
        if (this.sessionId !== undefined && this.sessionId !== '') {
          this.me = getStorage('user')//用户重新登录以后，获取本地user信息
        }
      },
      me () {
        if (this.me !== {}) {
          this.percentage = this.me.userActiveness / 2000
          setTimeout(() => {
            document.getElementsByClassName('el-progress__text')[0].innerHTML = ''
            document.getElementsByClassName('el-progress-bar__outer')[0].style.height = '9px'
          }, 20)
        }
      }
    },
    methods: {
      isCurrent (path) {
        return path === this.$route.path
      },
      launchTask () {
        this.$router.push('/tanqiu/launchTask')
      }
    },
    components: {
      clipImage
    }
  }
</script>

<style scoped>
  .noUser {
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .loading-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
  }
  .el-17 {
    padding-top: 30px;
    background-color: white;
    margin-top: 20px;
    border-radius: 10px;
  }
  .el-6 {
    box-sizing: border-box;
    padding-top: 20px;
    background-color: white;
    margin-top: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
    border-radius: 10px;
  }
  a {
    text-decoration: none;
  }
  .me {
      height: 183px;
      margin: 58px 0 0 0;
      background: white;
      display: flex;
      border-radius: 10px;
    }
  .avatar-wrapper {
    flex: 0 183px;
    height: 183px;
  }
  .avatar {
    width: 115px;
    height: 115px;
    margin: 35px;
    border-radius: 50%;
    cursor: pointer;
  }
  .description {
    flex: 1;
    padding: 35px 0;
  }
  .nickName {
    font-size: 22px;
    color: #6a6a6a;
    height: 25px;
  }
  .name {
    display: inline-block;
  }
  .icon-checkNumber {
    display: inline-block;
    width: 21px;
    height: 21px;
    margin: 0 15px 0 15px;
    background: url('https://oss.yxlinker.com/master/check-number.png') 21px center;
    position: relative;
    top: 2px;
  }
  .color {
    display: inline-block;
    width: 77px;
    height: 24px;
    background-color: #4993a8;
    position: relative;
    top: 2px;
  }
  .detail {
    color: #cecece;
    font-size: 15px;
    height: 25px;
    line-height: 25px;
    margin-top: 12px;
  }
  .icon-arrow {
    display: inline-block;
    width: 18px;
    height: 22px;
    background: url('https://oss.yxlinker.com/master/arrow.png') center no-repeat;
    background-size: 18px 22px;
    position: relative;
    top: 2px;
  }
  .region, .point, .residence, .school {
    margin-left: 17px;
  }
  .tasks {
    height: 30px;
    line-height: 30px;
    font-size: 17px;
    margin-top: 12px;
    color: #5b5b5b;
  }
  .question {
    display: inline-block;
  }
  .answer, .launch, .underTake {
    margin-left: 48px;
    display: inline-block;
  }
  .tasks .task {
    color: #9d9d9d;
    text-decoration: underline;
    margin-left: 5px;
    cursor: pointer;
  }
  .launch-task {
    flex: 0 100px;
    padding-top: 138px;
    margin-right: 30px;
  }
  .launch-wrapper {
    border: 1px solid #01a9ce;
    width: 76px;
    height: 31px;
    padding: 2px 2px;
    box-sizing: border-box;
    border-radius: 5px;
    cursor: pointer;
  }
  .launch-btn {
    display: inline-block;
    width: 70px;
    color: #01a9ce;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 5px;
  }
  .launch-btn:hover {
    background-color: #01a9ce;
    color: white;
  }

  .container-1 {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  .tabs {
    background-color:  white;
    padding-left:  35px;
    padding-bottom: 50px;
    box-sizing: border-box;
    border-radius: 10px;
  }
  .tab {
    width: 80px;
    height: 38px;
    text-align: center;
    line-height: 38px;
    color: #8a8a8a;
    display: inline-block;
  }
  .tab-l {
    border: 1px solid #d4d4d4;
  }
  .tab-r {
    border-top: 1px solid #d4d4d4;
    border-right: 1px solid #d4d4d4;
    border-bottom: 1px solid #d4d4d4;
    position: relative;
    left: -4px;
  }
  .tab.current {
    border-top: 2px solid #01a9ce;
    color: black;
  }
  .myGrade, .gradeEvaluate {
    font-size: 18px;
    margin-top: 20px;
  }
  .color-block-1 {
    width: 10px;
    height: 18px;
    background-color: #4993a8;
    display: inline-block;
    margin-right: 5px;
    position: relative;
    top: 2px;
  }
  .color-block-2 {
    width: 110px;
    height: 18px;
    background-color: #4993a8;
    margin: 10px 0;
  }
  .index-text {
    color: #9d9d9d;
    font-size: 14px;
    margin: 10px 0;
    letter-spacing: 1px;
  }
  .progress-wrapper {
    width: 170px;
    height: 24px;
    display: inline-block;
  }
  .progress-text {
    color: #9d9d9d;
    display: inline-block;
    font-size: 12px;
    position: relative;
    left: -40px;
  }
  .evaluateRules {
    color: #01a9ce;
    font-size: 14px;
    margin-top: 10px;
    margin-left: 20px;
  }
  .evaluateRules .icon {
    margin-left: 2px;
    cursor: pointer;
  }
</style>
