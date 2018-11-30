<template>
    <div class="my-answer">
      <el-row>
        <settings :settings="settings"></settings>
      </el-row>
      <wait-task-wrapper v-if="myAnswers.length === 0 && !isHaveQuestion"></wait-task-wrapper>
      <no-question-text v-if="myAnswers.length === 0 && isHaveQuestion"></no-question-text>
      <div class="bg-wrapper">
        <div class="answer-wrapper">
          <div class="answer-item" v-for="(answer, index) in myAnswers" :key="index">
            <div class="description">
              <div class="answer">
                <div class="answer-wrapper">
                  <transition name="fade">
                    <div class="question-container" v-show="isQuestionCollapse">
                      <div class="question-collapse">
                        {{questionContent(index)}}
                      </div>
                      <div class="unfold-btn" @click="unfoldQuestion">
                        展开<i class="el-icon-arrow-down"></i>
                      </div>
                    </div>
                  </transition>
                  <div class="answer1" style="height: 0">
                    <div class="answer-content"></div>
                  </div>
                  <div class="collapse-btn-wrapper"  v-show="!isQuestionCollapse">
                    <div class="collapse-btn" @click="collapseQuestion">
                      收起<i class="el-icon-arrow-up"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="questioner">
                <div class="question">
                  <div class="color-block"></div>
                  <div class="color-block"></div>
                  <div class="question-text">{{answer.questionTitle}}</div>
                </div>
                <div class="project">#{{answer.questionTopic}}#</div>
                <div class="detail">
                  <div class="announcer">发布: <a class="name">{{answer.userName}}</a></div>
                  <div class="time">{{answer.questionCreateTime}}</div>
                  <div class="attentions"><a class="attention">{{answer.questionFollowNumber}}</a>关注</div>
                  <div class="thumbs-up"><a class="thumb-up">{{answer.questionPriseNumber}}</a>点赞</div>
                </div>
              </div>
            </div>
            <div class="avatar-wrapper">
              <div class="avatar" v-show="answer.questionPhoto !== ''"><img v-lazy="answer.questionPhoto" style="width: 100%;height: 100%"></div>
              <div class="otherAnswer">
                <span class="other-text">其他回答</span>
              </div>
            </div>
          </div>
        </div>
        <div class="loading-wrapper" v-show="loadingShow">
          <loading-btn class="loading-btn"></loading-btn>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import settings from './settings.vue'
  import loadingBtn from './loadingBtn.vue'
  import {mapState, mapMutations} from 'vuex'
  import {getPosition, setStorage, getStorage} from '../../api/util.js'
  import {reqMyAnswers} from '../../api/index.js'
  import waitTaskWrapper from './waitTaskWrapper.vue'
  import noQuestionText from './noQuestionText.vue'
  export default {
    data () {
      return {
        settings: ['时间', '回答数', '热度'],
        p: 1,
        pagesNumber: 1,
        loadingShow: false,
        path: '/tanqiu/answer/myAnswer',
        isHaveQuestion: false,
        isQuestionCollapse: true,//折叠问题的答案
      }
    },
    computed: {
      ...mapState([
        'myAnswers'
      ])
    },
    methods: {
      ...mapMutations([
        'getMyAnswers'
      ]),
      //折叠问题
      collapseQuestion () {
        $('.answer1').animate({height: 0}, 200)
        setTimeout(() => {
          this.isQuestionCollapse = true
        }, 200)
      },
      //展开折叠的问题
      unfoldQuestion () {
        let height = $('.answer-content').height()
        $('.answer1').animate({height: `${height}px`}, 200)
        this.isQuestionCollapse = false
      },
      //将html内容只提取文字，用来显示折叠以后的内容
      questionContent (index) {
        let content = this.myAnswers[index].answerContent
        let ret = /<[^>]+>/g
        if (ret.test(content)) {
          content = content.replace(ret, '')
          return content
        } else {
          return ''
        }
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
                  self.loadMore(self.p, self._getMyAnswers)
                }
              }
            }
          }
        }
      },
      async _getMyAnswers (p) {
        let userId = getStorage('user').userId
        let type = 0
        let result = await reqMyAnswers(p, userId, type)
        console.log(result)
        if (result.success) {
          if (result.data.list.length === 0) {
            this.isHaveQuestion = true
          } else {
            let myAnswers = this.myAnswers.slice()
            myAnswers = myAnswers.concat(result.data.list)
            this.getMyAnswers(myAnswers)
            this.pagesNumber = 1
            this.isLoadOnePage = true
          }
        }
      }
    },
    created () {
      window.onscroll = null
    },
    mounted () {
      this._getMyAnswers(this.p)
    },
    watch: {
      '$route' (newPath, oldPath) {
        if (this.$route.path  === this.path) {
          this.watchScroll()
        }
      },
      myAnswers () {
        if (this.myAnswers !== []) {
          setTimeout(() => {
            if (this.p !== this.pagesNumber) {
              this.loadingShow = true
            }
          }, 20)
          //将申请的html内容渲染到页面上
          setTimeout(() => {
            let length = this.myAnswers.length
            for (let i = 0; i < length; i++) {
              $(`.answer-content:eq(${i})`).html(this.myAnswers[i].answerContent)
            }
          }, 20)
        }
        this.watchScroll()
      }
    },
    components: {
      settings,
      loadingBtn,
      waitTaskWrapper,
      noQuestionText
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
    padding: 0 35px;
    box-sizing: border-box;
  }
  .answer-wrapper {
    margin-bottom: 50px;
  }
  .answer-item {
    width: 100%;
    display: flex;
    margin-top: 60px;
    padding-bottom: 20px;
    border-bottom: 2px solid #a5a5a5;
  }
  .description {
    flex: 1;
  }
  .answer {
    color: #a5a5a5;
    font-size: 18px;
    text-indent: 2em;
    line-height: 30px;
  }
  .detailBtn {
    display: inline-block;
    color: #01a9ce;
    border-bottom: 1px solid #01a9ce;
    text-align: center;
    text-indent: 0;
    margin-left: 5px;
    cursor: pointer;
  }
  .questioner {
    width: 100%;
  }
  .question {
    width: 100%;
    margin-top: 30px;
    height: 35px;
  }
  .question:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
  .color-block {
    width: 10px;
    height: 18px;
    vertical-align: middle;
    display: inline-block;
    background-color: #01a9ce;
  }
  .question-text {
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    margin-left: 20px;
  }
  .project {
    width: 100%;
    height: 35px;
    line-height: 30px;
    color: #a5a5a5;
    font-size: 20px;
    margin-top: 20px;
  }

  .detail {
    margin-top: 12px;
    color: #a5a5a5;
    font-size: 18px;
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
  }
  .description .time {
    color: #a5a5a5;
    margin-left: 40px;
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
  .avatar-wrapper {
    padding-bottom: 130px;
    flex: 0 125px;
    height: 125px;
    margin-left: 20px;
  }
  .avatar {
    width: 100%;
    height: 100%;
  }
  .otherAnswer {
    width: 82px;
    height: 27px;
    line-height: 27px;
    text-align: center;
    border: 1.5px solid #01a9ce;
    margin: 20px auto;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
  }
  .other-text {
    color: #01a9ce;
    font-size: 17px;
  }
  .loading-wrapper {
    margin: 50px 0;
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
  .answer1 {
    overflow: hidden;
  }
  .answer-content {
    word-break: break-all;
  }
</style>
