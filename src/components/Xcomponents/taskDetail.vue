<template>
    <div  class="task-detail">
      <div class="container">
        <div class="header">
          <div class="title">
            <div class="color-block" v-show="taskDetail.questionTitle"></div>
            <div class="title-text">{{taskDetail.questionTitle}}</div>
          </div>
          <div class="wrapper">
            <div class="wrapper1">
              <span class="name">{{taskDetail.initiatorName}}</span>
              <span class="time">{{taskDetail.taskCreateTime}}</span>
            </div>
            <div class="wrapper1" style="margin-top: 20px;">
              <span class="task-type" v-show="taskDetail.taskType">{{taskDetail.taskType}}</span>
              <span class="deadline" v-show="taskDetail.taskTimeLimit">最晚接单时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{taskDetail.taskTimeLimit / 60}}小时</span>
            </div>
            <div class="wrapper1" style="margin-top: 20px;">
              <span class="reward" v-show="taskDetail.allSupportActiveness">奖励：<span class="reward1">{{taskDetail.allSupportActiveness}}</span>点</span>
              <div class="examineAnswers" @click="popAnswerText" v-show="showAnswerBtn">回答</div>
            </div>
            <div class="answer-wrapper" v-show="taskDetail.taskType">
              <transition name="fade">
                  <div class="question-container" v-show="isQuestionCollapse">
                    <div class="question-collapse">
                      {{questionContent()}}
                    </div>
                    <div class="unfold-btn" @click="unfoldQuestion">
                      展开<i class="el-icon-arrow-down"></i>
                    </div>
                  </div>
              </transition>
              <div class="answer" style="height: 0">
                <div class="answer-content"></div>
              </div>
              <div class="collapse-btn-wrapper"  v-show="!isQuestionCollapse">
                <div class="collapse-btn" @click="collapseQuestion">
                  收起<i class="el-icon-arrow-up"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="cut-off"></div>
          <div class="helper">
            <div class="hasHelper" v-show="taskDetail.supportNum !== 0">
              <div class="helperBtn">助力</div>
              <div class="wrapper2">
              <span class="avatar-wrapper" v-for="(item, index) in taskDetail.avatars" :key="index">
                <img :src="item" class="avatar">
              </span>
              </div>
              <div class="icon-wrapper">
                <i class="el-icon-more" style="font-size: 20px; color: #6c6c6c"></i>
              </div>
              <div class="helper-text-wrapper">
                {{taskDetail.supportNum}}人已助力{{taskDetail.allSupportActiveness}}点
              </div>
            </div>
            <div class="noHelper" v-show="taskDetail.supportNum === 0">
              <div class="noHelper-text">暂无助力</div>
              <div class="helperBtn">助力</div>
            </div>
          </div>
        </div>
        <div class="bg-wrapper">
          <div class="tab-wrapper" v-show="taskDetail.length !== 0">
            <router-link v-show="taskDetail.myTask" :to="applicationPath"><span class="tab tab-l-me" :class="{'current': isCurrent(0)}">接单申请</span></router-link>
            <router-link :to="applicationPath1"><span class="tab tab-l-notMe" :class="{'current': isCurrent(2)}">接单者回答</span></router-link>
            <router-link :to="otherAnswerPath"><span class="tab tab-r" :class="{'current': isCurrent(1)}">其他回答</span></router-link>
          </div>
          <div class="view-wrapper">
            <keep-alive>
              <router-view/>
            </keep-alive>
          </div>
        </div>
      </div>
      <answer-text ref="answerText" :taskContentId="taskContentId"></answer-text>
    </div>
</template>

<script type="text/ecmascript-6">
  import {reqTaskDetail} from '../../api/index.js'
  import {mapState, mapMutations} from 'vuex'
  import {getStorage} from '../../api/util.js'
  import answerText from './answerText.vue'
  import $ from 'jquery'
  export default {
    data() {
      return {
        taskDetail: [],
        applicationPath: '',//接单申请路由
        applicationPath1: '',//接单者回答的路由
        otherAnswerPath: '',
        isQuestionCollapse: true,
        taskContentId: '',
        showAnswerBtn: false
      }
    },
    computed: {
      ...mapState([
        'taskDetailId'
      ])
    },
    mounted() {
      this.getTaskDetailId(getStorage('taskDetailId'))//这一步是为了防止用户在当前页面刷新导致vuex中的taskDetailId丢失
      this.getTaskDetail(this.taskDetailId)
    },
    methods: {
      popAnswerText () {
        this.taskContentId = this.taskDetail.taskContentId
        this.$refs.answerText.show()
      },
      //折叠问题
      collapseQuestion () {
        $('.answer').animate({height: 0}, 200)
        setTimeout(() => {
          this.isQuestionCollapse = true
        }, 200)
      },
      //展开折叠的问题
      unfoldQuestion () {
        let height = $('.answer-content').height() + 50
        $('.answer').animate({height: `${height}px`}, 200)
        this.isQuestionCollapse = false
      },
      //将html内容只提取文字，用来显示折叠以后的内容
      questionContent () {
        let content = this.taskDetail.questionContent
        let ret = /<[^>]+>/g
        if (ret.test(content)) {
          content = content.replace(ret, '')
          content = content.replace('&nbsp;', '')
          console.log(content)
          return content
        } else {
          return ''
        }
      },
      ...mapMutations([
        'getTaskDetailId'
      ]),
      isCurrent (index) {
        if (index === 0) {
          let reg = /taskApplication/
          return reg.test(this.$route.path)
        } else if (index === 1) {
          let reg = /[oO]therAnswer/
          return reg.test(this.$route.path)
        } else if (index === 2) {
          let reg = /notMeTaskApplication/
          return reg.test(this.$route.path)
        }
      },
      async getTaskDetail(id) {
        let result = await reqTaskDetail(id)
        console.log(result)
        if (result.success) {
          this.taskDetail = result.data
          let userId = getStorage('user').userId
          this.showAnswerBtn = userId !== result.data.initiatorId
          //处理问题内容
          $('.answer-content').html(result.data.questionContent)
        }
      }
    },
    watch: {
      taskDetail () {
//        if (this.taskDetail.myTask) {
//          this.applicationPath =  `/tanqiu/taskDetail/${this.taskDetailId}/taskApplication`
//          this.otherAnswerPath = `/tanqiu/taskDetail/${this.taskDetailId}/otherAnswer`
//        } else {
//          this.applicationPath = `/tanqiu/taskDetail/${this.taskDetailId}/notMeTaskApplication`
//          this.otherAnswerPath =  `/tanqiu/taskDetail/${this.taskDetailId}/notMeOtherAnswer`
//        }
        this.applicationPath1 = `/tanqiu/taskDetail/${this.taskDetailId}/notMeTaskApplication`
        this.applicationPath =  `/tanqiu/taskDetail/${this.taskDetailId}/taskApplication`
        this.otherAnswerPath = `/tanqiu/taskDetail/${this.taskDetailId}/otherAnswer`
      },
      taskDetailId () {
        this.getTaskDetail(this.taskDetailId)
      }
    },
    components: {
      answerText
    }
  }
</script>

<style scoped>
  .fade-enter-active {
    transition: opacity 0.2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .bg-wrapper {
    background-color: white;
    overflow:  hidden;
    padding: 20px 0;
    border-radius: 10px;
    margin-top: 10px;
  }
  a {
    text-decoration: none;
  }
  .task-detail {
    min-height: 100vh;
  }
  .header {
    width: 100%;
    background-color: white;
    padding: 20px 0;
    border-radius: 10px;
  }
  .title {
    padding-left: 50px;
    box-sizing: border-box;
    height: 50px;
    margin-top: 40px;
  }
  .title:before {
    content: '';
    display:  inline-block;
    vertical-align: middle;
    height: 50px;
  }
  .color-block {
    width: 20px;
    height: 30px;
    background-color: #4893a8;
    display: inline-block;
    vertical-align: middle;
  }
  .title-text {
    margin-left: 30px;
    color: black;
    font-weight: 500;
    font-size: 30px;
    display: inline-block;
    vertical-align: middle;
  }
  .wrapper {
    width: 100%;
    padding: 0 80px;
    box-sizing: border-box;
    color: #6c6c6c;
    font-size: 18px;
    min-height: 224px;
  }
  .wrapper1{
    margin-top: 30px;
    height: 40px;
  }
  .wrapper1:before {
    content: '';
    height: 40px;
    display: inline-block;
    vertical-align: middle;
  }
  .name {
    display: inline-block;
    vertical-align: middle;
    text-decoration: underline;
    cursor: pointer;
  }
  .time {
    display: inline-block;
    vertical-align: middle;
    margin-left: 80px;
  }
  .task-type {
    display: inline-block;
    vertical-align: middle;
    height: 24px;
    line-height: 24px;
    border: 1px solid #4993a8;
    width: 64px;
    font-size: 15px;
    text-align: center;
    color: #4993a8;
    border-radius: 2px;
    overflow: hidden;
  }
  .deadline {
    display: inline-block;
    vertical-align: middle;
    margin-left: 98px;
  }
  .reward1 {
    color: #01a9ce;
    text-decoration: underline;
  }
  .examineAnswers {
    display: inline-block;
    width: 60px;
    height: 24px;
    border: 1.5px solid #4993a8;
    text-align: center;
    line-height: 21px;
    box-sizing: border-box;
    color: #4993a8;
    margin-left: 100px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }
  .answer-wrapper {
    margin-top: 30px;
    text-indent: 2em;
    line-height: 35px;
    margin-bottom: 50px;
  }
  .question-collapse {
    display: inline-block;
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .unfold-btn {
    cursor: pointer;
    display: inline-block;
    position: relative;
    top: -11px;
  }
  .el-icon-arrow-down, .el-icon-arrow-up {
    position: relative;
    left: -30px;
  }
  .unfold-btn:hover, .collapse-btn:hover {
    color: #4893a8;
  }
  .collapse-btn-wrapper {
    margin-top: 30px;
    width: 100%;
    height: 60px;
    position: relative;
  }
  .collapse-btn {
    position: absolute;
    cursor: pointer;
    right: 0;
  }
  .answer {
    overflow: hidden;
  }
  .answer-content {
    word-break: break-all;
  }
  .cut-off {
    width: 1080px;
    height: 0;
    font-size: 0;
    margin-left: 50px;
    border-bottom: 2px solid #e3e3e3;
  }
  .helper {
    width: 100%;
  }
  .hasHelper, .noHelper {
    display: inline-block;
    height: 60px;
    width: 600px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .noHelper {
    width: 250px;
  }
  .hasHelper:before, .noHelper:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 60px;
  }
  .noHelper-text {
    display:  inline-block;
    vertical-align: middle;
    height: 60px;
    line-height: 60px;
    color: #a5a5a5;
    font-size: 15px;
    margin-right: 70px;
  }
  .helperBtn {
    display: inline-block;
    vertical-align: middle;
    height: 30px;
    padding: 0 7px;
    border-radius: 4px;
    border: 1.5px solid #4993a8;
    color: #4993a8;
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    cursor: pointer;
  }
  .wrapper2 {
    display: inline-block;
    vertical-align: middle;
    height: 36px;
    margin-left: 50px;
  }
  .avatar-wrapper {
    display: inline-block;
    width: 36px;
    height: 100%;
    margin-right: 20px;
  }
  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .icon-wrapper {
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
  }
  .helper-text-wrapper {
    display: inline-block;
    vertical-align: middle;
    margin-left: 20px;
    color: #a5a5a5;
  }
  .tab-wrapper {
    margin-top: 20px;
    padding: 0 80px;
    box-sizing: border-box;
  }
  .tab {
    width: 110px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    color: #a5a5a5;
    font-size: 18px;
    display: inline-block;
  }
  .tab.current  {
    border-bottom: 2px solid #01a9ce;
    color: #01a9ce;
  }
  /*.tab-l-me {*/
    /*border: 1px solid #a5a5a5;*/
  /*}*/
  /*.tab-l-notMe {*/
    /*width: 140px;*/
    /*border: 1px solid #a5a5a5;*/
  /*}*/
  /*.tab-r {*/
    /*border-top: 1px solid #a5a5a5;*/
    /*border-right: 1px solid #a5a5a5;*/
    /*border-bottom: 1px solid #a5a5a5;*/
    /*position: relative;*/
    /*left: -5px;*/
  /*}*/
  .view-wrapper {
    width: 100%;
    padding: 0 80px;
    box-sizing: border-box;
  }
</style>
