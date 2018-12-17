<template>
    <div class="question">
      <el-row>
        <setting :settings="settings"></setting>
      </el-row>
      <div class="launch-wrapper" @click="launchQuestion">发布提问</div>
      <wait-task-wrapper v-if="questions.length === 0 && isNoQuestionShow"></wait-task-wrapper>
      <no-task-text v-if="questions.length === 0 && !isNoQuestionShow" text="暂无提问"></no-task-text>
      <div class="bg-wrapper">
        <div v-for="(questioner ,index) in questions" :key="index" class="questioner-item">
          <div class="question-content">
            <div class="avatar" v-show="questioner.questionPhoto !== ''"><img v-lazy="questioner.questionPhoto" style="width: 100%;height: 100%;"></div>
            <div class="description">
              <div class="title">
                <span class="color-block"></span>
                <span class="color-block"></span>
                <span class="question-text"  @click="gotoQuestionDetail(questioner)">{{questioner.questionTitle}}</span>
              </div>
              <div class="detail">
                <div class="announcer">发布: <a class="name">{{questioner.userName}}</a></div>
                <div class="time">{{questioner.questionCreateTime}}</div>
                <div class="attentions"><a class="attention">{{questioner.questionFollowNumber}}</a>关注</div>
                <div class="thumbs-up"><a class="thumb-up">{{questioner.questionPriseNumber}}</a>点赞</div>
              </div>
              <div class="project">#{{questioner.questionTopic}}#</div>
              <div class="des">
                <span class="des-detail">{{  questionContent(index) }}</span>
                <span class="details" v-show="questionContent(index) !== ''"  @click="gotoQuestionDetail(questioner)">详情</span>
              </div>
            </div>
            <div class="myAnswer">
              <div class="answer-btn"><span class="btn-inner" @click="popAnswerText(questioner)">我要回答</span></div>
              <div class="already-answer" v-show="questioner.questionAnswerNumber !== 0">{{questioner.questionAnswerNumber}}人已回答</div>
              <div class="already-answer" v-show="questioner.questionAnswerNumber === 0">暂无人回答</div>
            </div>
          </div>
          <div class="icons-wrapper">
            <icons :index="index" :item="questioner" :id="questioner.questionId" :mode="questionType"></icons>
          </div>
        </div>
        <div class="loadingBtn-wrapper" v-show="loadingShow">
          <loading-btn class="loadingBtn"></loading-btn>
        </div>
      </div>
      <answer-question-text ref="answerQuestionText" :taskContentId="taskContentId"></answer-question-text>
    </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import loadingBtn from './loadingBtn.vue'
  import answerQuestionText from './answerQuestionText.vue'
  import setting from './settings.vue'
  import waitTaskWrapper from './waitTaskWrapper.vue'
  import noTaskText from './noTaskText.vue'
  import {getPosition, getStorage, setStorage} from '../../api/util.js'
  import {reqQuestion} from '../../api/index.js'
  import icons from '../common/icons'
  export default {
    data () {
      return {
        questionType: 2,
        p: 1,
        pagesNumber: 1,
        loadingShow: false,
        settings: ['时间', '回答数', '奖励'],
        path: '/tanqiu/square/question',
        isLoadOnePage: true,
        taskContentId: '',
        isNoQuestionShow: false
      }
    },
    computed: {
      ...mapState([
        'questions',
        'me'
      ])
    },
    created () {
      window.onscroll = null
    },
    mounted () {
      this.getQuestions([])
      this._getQuestions(this.p)
    },
    methods: {
      ...mapMutations([
        'getQuestions',
        'getQuestionDetailId'
      ]),
      //跳转到问题详情页
      gotoQuestionDetail (question) {
        //将taskId缓存到本地
        setStorage('questionDetailId', question.questionId)
        this.getQuestionDetailId(question.questionId)
        this.$router.push(`/tanqiu/questionDetail/${question.questionId}/questionAnswer`)
      },
      //跳转到发布提问的页面
      launchQuestion () {
        let user = getStorage('user')
        if (user.userPhone !== null && user.userPhone !== undefined && user.userPhone !== '') {
          this.$router.push('/tanqiu/launchQuestion')
        } else {
          this.$router.push('/signup')
        }
      },
      //弹出我要回答
      popAnswerText (question) {
        this.taskContentId = question.questionId
        this.$refs.answerQuestionText.show()
      },
      loadMore (p, cb) {
        setTimeout(() => {
          cb(p)
          if (p === this.pagesNumber) {
            this.loadingShow = false
          }
        }, 500)
      },
      watchScroll () {
          //为了防止发生this漂移
          let self = this
          window.onscroll = function () {
            //获取滚动条的y值
            let y = window.scrollY
            //获取浏览器的视口高度
            let clientHeight = window.innerHeight
            //获取加载按钮在页面上的位置
            if (self.loadingShow) {
              let btn = getPosition(document.getElementsByClassName('loadingBtn')[0])
              let top = btn.top
              if (y + clientHeight >= top) {
                if (self.isLoadOnePage) {
                  self.isLoadOnePage = false
                  if (self.pagesNumber > self.p) {
                    self.p++
                    //请求下一页的数据
                    self.loadMore(self.p, self._getQuestions)
                  }
                }
              }
            }
          }
      },
      //处理任务文字展示
      questionContent (index) {
        let task = this.questions[index]
        let content = task.questionContent
        let ret = /<[^>]+>/g
        content = content.replace(ret, '')
        return content
      },
      async _getQuestions (p) {
        let result = await reqQuestion(p)
        console.log(result)
        if (result.success) {
          let questions = this.questions.slice()
          if (result.data.list.length === 0) {
            this.isNoQuestionShow = false//让无任务文字显示
            this.loadingShow = false
          } else {
            const questions1 = questions.concat(result.data.list)
            this.getQuestions(questions1)
            this.pagesNumber = result.data.lastPage
            this.isLoadOnePage = true
          }
        } else {
          this.isNoQuestionShow = false//让无任务文字显示
          this.loadingShow = false
        }
      }
    },
    watch: {
      '$route' (newPath, oldPath) {
        if (this.$route.path === this.path) {
          this.watchScroll()
        }
      },
      questions () {
        if (this.questions !== []) {
          setTimeout(() => {
            if (this.p !== this.pagesNumber) {
              this.loadingShow = true
            }
          }, 20)
          this.watchScroll()
        }
      }
    },
    components: {
      loadingBtn,
      answerQuestionText,
      setting,
      waitTaskWrapper,
      icons,
      noTaskText
    }
  }
</script>

<style scoped>
  .question {
    min-height: 100vh;
  }
.icons-wrapper {
  width: 60%;
  margin-top: 20px;
}
  .bg-wrapper {
    padding-left: 35px;
    box-sizing: border-box;
    background-color: white;
  }
  a {
    text-decoration: none;
  }
  .question {
    width: 100%;
    overflow: hidden;
  }
  .launch-wrapper {
    padding: 2px 6px;
    border: 1px solid #4893a8;
    color: #4893a8;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-block;
    margin: 15px 35px;
  }
  .launch-wrapper:hover {
    color: white;
    background-color: #4893a8;
  }
  .questioner-item:last-child {
    margin-bottom: 50px;
  }
  .question-content {
    display: flex;
    width: 100%;
    border-bottom: 2px solid #e6e6e6;
  }
  .avatar {
    flex: 0 125px;
    height: 125px;
    padding: 60px 0;
  }
  .description {
    flex: 1;
    height: 143px;
    padding: 60px 0;
    margin-left: 15px;
  }
  .color-block {
    display: inline-block;
    width: 22px;
    height: 22px;
    margin-left: 2px;
    background-color: #01a9ce;
    position: relative;
    top: 2px;
  }
  .question-text {
    font-size: 18px;
    margin-left: 15px;
    cursor: pointer;
  }
  .question-text:hover {
    color: #4893a8;
  }
  .detail {
    margin-top: 5px;
    color: #a5a5a5;
    font-size: 15px;
  }
  .announcer {
    height: 30px;
    line-height: 30px;
    color: #a5a5a5;
    display: inline-block;
  }
  .name {
    border-bottom: 1px solid #a5a5a5;
    margin-left: 10px;
    display: inline-block;
    cursor: pointer;
    width: 67px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    top: 3px;
  }
  .description .time {
    color: #a5a5a5;
    margin-left: 20px;
    display: inline-block;
  }
  .attentions {
    margin-left: 30px;
    display: inline-block;
  }
  .thumbs-up {
    margin-left: 30px;
    display: inline-block;
  }
  .attention, .thumb-up {
    color: #01a9ce;
    border-bottom: 1px solid #01a9ce;
    cursor: pointer;
  }
  .project {
    color: #a5a5a5;
    margin-top: 5px;
    height: 30px;
    line-height: 30px;
    font-size: 15px;
  }
  .des {
    margin-top: 12px;
    color: #a5a5a5;
    font-size: 15px;
  }
  .des-detail {
    max-width: 400px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .details {
    color: #01a9ce;
    border-bottom: 1px solid #01a9ce;
    margin-left: 20px;
    cursor: pointer;
    position: relative;
    top: -5px;
  }
  .myAnswer {
    flex: 0 193px;
    padding-top: 200px;
  }
  .answer-btn {
    display: inline-block;
    width: 90px;
    height: 32px;
    font-size:17px;
    font-weight: 700;
    border: 1px solid #01a9ce;
    border-radius: 3px;
    padding: 3px 0;
    box-sizing: border-box;
    cursor: pointer;
  }
  .btn-inner {
    display: inline-block;
    color: #01a9ce;
    height: 24px;
    line-height: 24px;
    margin: 0 4px;
    width: 80px;
    text-align: center;
    border-radius: 3px;
  }
  .btn-inner:hover {
    background-color: #4893a8;
    color: white;
  }
  .already-answer {
    font-size: 13px;
    color: #a5a5a5;
    display: inline-block;
    margin-left: 15px;
  }
  .loadingBtn-wrapper {
    margin: 50px 0;
  }
  .setting {
    width: 100%;
    height: 50px;
  }
  .setting:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 50px;
  }
  .forward, .comment, .collect, .thumbUp, .uninterest, .more {
    display: inline-block;
    vertical-align: middle;
    margin-left: 30px;
  }
  .comment {
    margin-left: 30px;
  }
  .forward:before, .comment:before, .collect:before, .thumbUp:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height:  50px;
  }
  .icon {
    display: inline-block;
    vertical-align: middle;
    width: 25px;
    height: 25px;
    background-color: #4993a8;
    margin-right: 10px;
  }
  .text {
    display: inline-block;
    vertical-align: middle;
    color: #6c6c6c;
    font-size: 18px;
  }

</style>
