<template>
  <div  class="question-detail">
    <div class="container">
      <div class="header">
        <div class="title">
          <div class="color-block" v-show="questionDetail.questionTitle"></div>
          <div class="title-text">{{questionDetail.questionTitle}}</div>
        </div>
        <div class="wrapper">
          <div class="wrapper1">
            <span class="name">{{questionDetail.userName}}</span>
            <span class="time">{{questionDetail.questionCreateTime}}</span>
          </div>
          <div class="wrapper1" style="margin-top: 20px;">
            <div class="examineAnswers" @click="popAnswerText" v-show="questionDetail.questionTitle">回答</div>
          </div>
          <div class="answer-wrapper" v-show="questionDetail.questionTitle">
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
            <div class="collapse-btn-wrapper" v-show="!isQuestionCollapse">
              <div class="collapse-btn" @click="collapseQuestion">
                收起<i class="el-icon-arrow-up"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="cut-off"></div>
        <div class="bg-wrapper">
          <div class="tab-wrapper">
            <router-link to="answerPath" class="tab">回答</router-link>
          </div>
          <div class="view-wrapper">
            <keep-alive>
              <router-view/>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
    <answer-question-text ref="answerText" :taskContentId="taskContentId"></answer-question-text>
  </div>
</template>

<script type="text/ecmascript-6">
  import {reqQuestionDetail} from '../../api/index.js'
  import {mapState, mapMutations} from 'vuex'
  import {getStorage} from '../../api/util.js'
  import answerQuestionText from './answerQuestionText.vue'
  import $ from 'jquery'
  export default {
    data() {
      return {
        questionDetail: [],
        isQuestionCollapse: true,
        taskContentId: ''
      }
    },
    computed: {
      ...mapState([
        'questionDetailId'
      ])
    },
    mounted() {
      this.getQuestionDetailId(getStorage('questionDetailId'))//这一步是为了防止用户在当前页面刷新导致vuex中的taskDetailId丢失
      this.getQuestionDetail(this.questionDetailId)
    },
    methods: {
      ...mapMutations([
        'getQuestionDetailId'
      ]),
      popAnswerText () {
        this.taskContentId = this.questionDetail.questionId
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
        let height = $('.answer-content').height()
        $('.answer').animate({height: `${height + 50}px`}, 200)
        this.isQuestionCollapse = false
      },
      //将html内容只提取文字，用来显示折叠以后的内容
      questionContent () {
        let content = this.questionDetail.questionContent
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
      async getQuestionDetail(id) {
        let result = await reqQuestionDetail(id)
        console.log(result)
        if (result.success) {
          this.questionDetail = result.data
          //处理问题内容
          $('.answer-content').html(result.data.questionContent)
        }
      }
    },
    watch: {
      questionDetailId () {
        this.getQuestionDetail(this.questionDetailId)
      }
    },
    components: {
      answerQuestionText
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
  .question-detail {
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

  .examineAnswers {
    display: inline-block;
    width: 60px;
    height: 24px;
    border: 1.5px solid #4993a8;
    text-align: center;
    line-height: 21px;
    box-sizing: border-box;
    color: #4993a8;
    margin-left: 10px;
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
    font-size: 18px;
    display: inline-block;
    border-bottom: 1.5px solid  #4893a8;
    color: #4893a8;
  }
  .view-wrapper {
    width: 100%;
    padding: 0 80px;
    box-sizing: border-box;
  }
</style>
