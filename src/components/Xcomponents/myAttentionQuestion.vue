<template>
    <div class="myAttentionQuestion">
      <el-row>
        <setting :settings="settings"></setting>
      </el-row>
      <div class="bg-wrapper">
        <div v-for="(questioner ,index) in myAttentionQuestions" :key="index" class="questioner-item">
          <div class="avatar"><img :src="questioner.avatar" style="width: 100%;height: 100%;"></div>
          <div class="description">
            <div class="title">
              <span class="color-block"></span>
              <span class="color-block"></span>
              <span class="question-text">{{questioner.question}}</span>
            </div>
            <div class="detail">
              <div class="announcer">发布: <a class="name">{{questioner.name}}</a></div>
              <div class="time">{{questioner.time}}</div>
              <div class="attentions"><a class="attention">{{questioner.attentions}}</a>关注</div>
              <div class="thumbs-up"><a class="thumb-up">{{questioner.thumbsUp}}</a>点赞</div>
            </div>
            <div class="project">#{{questioner.project}}#</div>
            <div class="des"><span class="des-detail">{{questioner.description}}</span><span class="details">详情</span></div>
          </div>
          <div class="myAnswer">
            <div class="answer-btn"><span class="btn-inner" @click="popAnswerText(index)">我要回答</span></div>
            <div class="already-answer">{{questioner.alreadyAnswers}}人已回答</div>
          </div>
        </div>
        <div class="loadingBtn-wrapper" v-show="loadingShow">
          <loading-btn class="loadingBtn"></loading-btn>
        </div>
      </div>
      <answer-text ref="answerText" :x="x" :y="y"></answer-text>
    </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapActions} from 'vuex'
  import loadingBtn from './loadingBtn.vue'
  import answerText from './answerText.vue'
  import setting from './settings.vue'
  import {getPosition} from '../../api/util.js'
  export default {
    data () {
      return {
        p: 1,
        textarea: '',
        x: 0,
        y: 0,
        pagesNumber: 1,
        loadingShow: true,
        settings: ['时间', '回答数', '奖励'],
        path: '/tanqiu/answer/attentionQuestion'
      }
    },
    computed: {
      ...mapState([
        'myAttentionQuestions',
        'me'
      ])
    },
    created () {
      window.onscroll = null
    },
    mounted () {
      this.getMyAttentionQuestions(this.p)
    },
    methods: {
      ...mapActions([
        'getMyAttentionQuestions'
      ]),
      popAnswerText (index) {
        let items = document.getElementsByClassName('questioner-item')
        let item = items[index]
        //确定回答问题的输入框的位置
        let pos = getPosition(item)
        this.$refs.answerText.show()
        this.y = pos.top - Math.floor(window.scrollY) + 216;
        this.x = pos.left
        //当页面滚动的时候，保证回答框始终在问题下方
        let self = this
        window.onscroll = function () {
          self.y = pos.top - Math.floor(window.scrollY) + 216;
          self.x = pos.left
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
              if (self.pagesNumber > self.p) {
                self.p++
                //请求下一页的数据
                self.loadMore(self.p, self.getMyAttentionQuestions)
              }
            }
          }
        }
      }
    },
    watch: {
      '$route' (newPath, oldPath) {
        if (this.$route.path === this.path) {
          this.watchScroll()
        }
      },
      myAttentionQuestions () {
        if (this.myAttentionQuestions !== []) {
          setTimeout(() => {
            if (this.p !== this.pagesNumber) {
              this.loadingShow = true
            }
          }, 20)
          this.watchScroll()
          this.pagesNumber = this.myAttentionQuestions[0].pagesAll
        }
      }
    },
    components: {
      loadingBtn,
      answerText,
      setting
    }
  }
</script>

<style scoped>
  .bg-wrapper {
    padding: 0 35px;
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
  }
  .myAttentionQuestion {
    width: 100%;
    overflow: hidden;
  }
  .questioner-item {
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
  .details {
    color: #01a9ce;
    border-bottom: 1px solid #01a9ce;
    margin-left: 20px;
    cursor: pointer;
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
</style>
