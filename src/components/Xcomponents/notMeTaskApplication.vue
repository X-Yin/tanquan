<template>
    <div class="notMe-taskApplication">
      <div v-if="isHaveAnswer">
        <div class="application-item" v-for="(task, index) in notMeTaskApplication" :key="index">
          <div class="wrapper">
            <div class="avatar-wrapper">
              <div class="avatar-container">
                <img :src="task.userPic" class="avatar">
                <span class="name">{{task.userName}}</span>
              </div>
            </div>
            <div class="answer-wrapper">
              <transition name="fade">
                <div class="answer-1">{{answerContent(task)}}<span class="unfold-btn" @click="unfoldContent(index)">展开<i class="el-icon-arrow-down"></i></span></div>
              </transition>
              <div class="answer-unfold-wrapper" style="height: 0">
                <div class="answer-unfold-container">
                  <div class="answer-unfold"></div>
                  <div class="collapse-btn-wrapper">
                    <span class="collapse-btn" @click="collapseContent(index)">收起<i class="el-icon-arrow-up"></i></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="comment-wrapper">
            <div class="comment" v-show="task.score !== 0">
              <div class="comment1">
                <div class="comment-text">任务发起者已评价</div>
                <div class="star">
                  <el-rate disabled v-model="task.score" voidColor="rgb(247,186,42)"></el-rate>
                </div>
              </div>
              <div class="comment2">
                <div class="text">{{task.scoreContent}}</div>
                <div class="thumbUp">
                  <div class="color-block"></div>
                  <span class="thumbUp-text">点赞 ({{task.prise}})</span>
                </div>
              </div>
            </div>
            <div class="comment-1" v-show="task.score === 0">暂时无评价</div>
          </div>
        </div>
        <div class="loadingBtn-wrapper" v-show="loadingShow">
          <loading-btn class="loadingBtn"></loading-btn>
        </div>
      </div>
      <div class="not-have-answer" v-if="!isHaveAnswer">
        暂无接单者回答
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {reqNotMeTaskApplication} from '../../api/index.js'
  import {mapState, mapMutations} from 'vuex'
  import loadingBtn from './loadingBtn.vue'
  import {getPosition, getStorage} from '../../api/util.js'
  export default {
    data () {
      return {
        path:  /\/tanqiu\/taskDetail\/\w*\/notMeTaskApplication/,
        isHaveAnswer: false,
        p: 1,
        pagesNumber: 1,
        loadingShow: false,
        isLoadOnePage: true
      }
    },
    created () {
      window.onscroll = null
    },
    mounted () {
      this._getNotMeTaskApplication(this.p)
    },
    computed: {
      ...mapState([
        'notMeTaskApplication'
      ])
    },
    methods: {
      ...mapMutations([
        'getNotMeTaskApplication'
      ]),
      //收起接单申请的内容
      collapseContent (index) {
        $(`.notMe-taskApplication .answer-unfold-wrapper:eq(${index})`).animate({height: 0}, 200)
        setTimeout(() => {
          $(`.notMe-taskApplication .answer-1:eq(${index})`).css('display','block')
          $(`.notMe-taskApplication .answer-unfold-wrapper:eq(${index})`).removeClass('current')
        }, 200)
      },
      //展开接单申请的内容
      unfoldContent (index) {
        $(`.notMe-taskApplication .answer-1:eq(${index})`).css('display','none')
        setTimeout(() => {
          let height = $(`.answer-unfold-wrapper .answer-unfold-container:eq(${index})`).height()
          let height1 = $(`.answer-unfold:eq(${index})`).height()
          let height2 = $(`.collapse-btn-wrapper:eq(${index})`).height() + 30
          $(`.notMe-taskApplication .answer-unfold-wrapper:eq(${index})`).addClass('current').animate({height: height1 + height2 + 'px'}, 200)
        }, 20)
      },
      //将html内容只提取文字，用来显示折叠以后的内容
      answerContent (item) {
        let content = item.answerContent
        let ret = /<[^>]+>/g//去掉所有标签
        let ret1 = /&\w*;/g
        if (ret.test(content)) {
          content = content.replace(ret, '')
          content = content.replace(ret1, '')
          if (content.length >= 100) {
            return content.substring(0, 100) + '...'
          } else {
            return content
          }
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
              if (self.pagesNumber > self.p) {
                if (self.isLoadOnePage) {
                  self.isLoadOnePage = false
                  self.p++
                  //请求下一页的数据
                  self.loadMore(self.p, self._getNotMeTaskApplication)
                }
              }
            }
          }
        }
      },
      async _getNotMeTaskApplication (p) {
        let taskId = getStorage('taskDetailId')
        let result = await reqNotMeTaskApplication(p, taskId)
        console.log(result)
        if (result.success) {
          if (result.data.list.length === 0) {
            this.isHaveAnswer = false
          } else {
            this.isHavevAnswer = true
            this.isLoadOnePage = true
            let notMeTaskApplication = this.notMeTaskApplication.concat(result.data.list)
            this.getNotMeTaskApplication(notMeTaskApplication)
            this.pagesNumber = result.data.lastPage
          }
        }
      },
    },
    watch: {
      '$route' () {
        if (this.path.test(this.$route.path)) {
          this.watchScroll()
        }
      },
      notMeTaskApplication () {
        if (this.notMeTaskApplication !== []) {
          setTimeout(() => {
            if (this.p !== this.pagesNumber) {
              this.loadingShow = true
            }
          }, 20)
          //将接单者回答的html内容渲染到页面上
          setTimeout(() => {
            let length = this.notMeTaskApplication.length
            for (let i = 0; i < length; i++) {
              $(`.answer-unfold:eq(${i})`).html(this.notMeTaskApplication[i].answerContent)
            }
          }, 20)
          this.watchScroll()
        }
      }
    },
    components: {
      loadingBtn
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0
  }
  .notMe-taskApplication {
    margin-top: 50px;
  }
  .application-item {
    width: 100%;
    margin-bottom: 50px;
    padding-bottom: 30px;
    border-bottom: 2px solid #e3e3e3;
  }
  .wrapper {
    display: flex;
    width: 100%;
  }
  .avatar-wrapper {
    flex: 0 110px;
    height: 100px;
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 30px;
  }
  .name {
    width: 100%;
    text-align: center;
    color: #01a9ce;
    display: inline-block;
    margin-top: 20px;
    text-decoration: underline;
  }
  .answer-wrapper {
       flex: 1;
       color: #6c6c6c;
       font-size: 18px;
       line-height: 35px;
       margin-left: 30px;
       position: relative;
       top: -8px;
     }
  .answer-wrapper {
    flex: 1;
    /*line-height: 35px;*/
    margin-left: 30px;
    position: relative;
    top: -8px;
    word-break: break-all;
  }
  .answer-1 {
    color: #6c6c6c;
    font-size: 18px;
  }
  .unfold-btn {
    display: inline-block;
    cursor: pointer;
    margin-left: 20px;
    color: #01a9ce;
  }
  .unfold-btn:hover, .collapse-btn:hover {
    color: #4893a8;
  }
  .answer-unfold-wrapper {
    overflow: hidden;
  }
  .answer-unfold-wrapper.current {
  }
  .answer-unfold {
    word-break: break-all;
  }
  .collapse-btn-wrapper {
    width: 100%;
    height: 50px;
    margin-top: 30px;
    position: relative;
  }
  .collapse-btn {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    color: #01a9ce;
    cursor: pointer;
  }
  .comment-wrapper {
    margin-top: 30px;
    padding: 0 30px;
    box-sizing: border-box;
  }
  .comment {
    width: 100%;
    padding: 30px 50px;
    box-sizing: border-box;
    border: 1.5px solid #a5a5a5;
  }
  .comment-1 {
    width: 100%;
    padding: 30px 50px;
    box-sizing: border-box;
    border: 1.5px solid #a5a5a5;
    font-size: 17px;
    color: #ccc;
    text-align: center;
  }
  .comment1 {
    width: 100%;
    height: 50px;
  }
  .comment1:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 50px;
  }
  .comment-text {
    display: inline-block;
    vertical-align: middle;
    height: 50px;
    line-height: 50px;
    margin-right: 40px;
    color: #6c6c6c;
    font-size: 20px;
  }
  .star {
    display: inline-block;
    vertical-align: middle;
  }
  .comment2 {
    width: 100%;
    padding: 0 30px;
    height: 40px;
    box-sizing: border-box;
    margin-top: 10px;
  }
  .comment2:before {
    content: '';
    display: inline-block;
    vertical-align:  middle;
    height: 40px;
  }
  .text {
    display: inline-block;
    vertical-align: middle;
    color:  #6c6c6c;
    font-size: 17px;
    margin-right: 30px;
  }
  .thumbUp {
    display: inline-block;
    vertical-align: middle;
    height: 40px;
  }
  .thumbUp:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 40px;
  }
  .color-block {
    width: 25px;
    height: 25px;
    display: inline-block;
    vertical-align: middle;
    background-color: #4993a8;
    margin-right: 20px;
  }
  .thumbUp-text {
    display: inline-block;
    vertical-align: middle;
    color: #6c6c6c;
  }
  .not-have-answer {
    width: 100%;
    height: 160px;
    font-size: 25px;
    color: #ccc;
    line-height: 120px;
    text-align: center;
  }
</style>
