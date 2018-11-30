<template>
    <div class="task-application">
      <div v-if="isHaveTaskApplication">
        <div class="application-item" v-for="(item, index) in taskApplication" :key="index">
          <div class="wrapper">
            <div class="avatar-wrapper" v-show="item.applyerPic !== ''">
              <div class="avatar-container">
                <img :src="item.applyerPic" class="avatar">
                <span class="name">{{item.applyerName}}</span>
              </div>
            </div>
            <div class="answer-wrapper">
              <transition name="fade">
                <div class="answer-1">{{answerContent(item)}}<span class="unfold-btn" @click="unfoldContent(index)">展开<i class="el-icon-arrow-down"></i></span></div>
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
            <div class="set-btn-wrapper">
              <span class="set-btn" @click="setApplication(item, index)">{{isApplicationer(item.applyStatus)}}</span>
            </div>
          </div>
          <div class="comment-wrapper">
            <transition name="fade">
              <div class="comment" v-show="item.isShowComment">
                <div class="comment1">
                  <div class="comment-text">评价</div>
                  <div class="star">
                    <el-rate v-model="scores[index]" voidColor="rgb(247,186,42)"></el-rate>
                  </div>
                </div>
                <div class="comment2">
                  <input type="text" class="comment-content" name="comment-content">
                  <span class="confirm-btn" @click="submitComment(item, index)">确认</span>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div class="loadingBtn-wrapper" v-show="loadingShow">
          <loading-btn class="loadingBtn"></loading-btn>
        </div>
      </div>
      <div class="no-taskApplication" v-if="!isHaveTaskApplication">
        暂无接单申请
      </div>
      <div class="success-tip" v-show="isSuccess">
        <div class="mask" @click="hide"></div>
        <div class="text-wrapper">
          <i class="success-icon el-icon-check"></i>
          <span class="success-text">设置成功</span>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import {reqTaskApplication, chooseTaker, commentTask} from '../../api/index.js'
  import loadingBtn from './loadingBtn.vue'
  import {getPosition, getStorage} from '../../api/util.js'
  import $ from 'jquery'
  export default {
    data () {
      return {
        p: 1,
        pagesNumber: 1,
        path: /\/tanqiu\/taskDetail\/\w*\/taskApplication/,
        isSuccess: false,
        loadingShow: false,
        scores: [],
        isHaveTaskApplication: true,//有没有接单，用来显示暂无接单申请的标识
        isLoadOnePage: true,////表示下拉加载时一页的数据是否已经加载完成，如果加载完成再请求下一页的数据
      }
    },
    created () {
      window.onscroll = null
    },
    mounted () {
      this._getTaskApplication(this.p, getStorage('taskDetailId'))
    },
    computed: {
      ...mapState([
        'taskDetailId',
        'taskApplication'
      ])
    },
    methods: {
      ...mapMutations([
        'getTaskApplication'
      ]),
      //提交评价
      async submitComment (item, index) {
        let answerUserId = item.applyerId
        let score = this.scores[index]
        let taskId = getStorage('taskDetailId')
        let priseContent = $('.comment-content').val()
        if (score === 0) {
          this.$message({
            type: 'warning',
            showClose: true,
            message: '评分不能为0！'
          })
        } else {
          let result = await commentTask(answerUserId, score, taskId, priseContent)
          console.log(result)
          if (result.success) {
            item.isShowComment = false
            this.$message({
              type: 'success',
              showClose: true,
              message: '评价成功！'
            })
          } else {
            this.$message({
              type: 'error',
              showClose: true,
              message: result.msg
            })
          }
        }
      },
      //是否是接单者的显示
      isApplicationer (status) {
        if (!status) {
          return '设为接单者'
        } else {
          return '评价'
        }
      },
      //收起接单申请的内容
      collapseContent (index) {
        $(`.task-application .answer-unfold-wrapper:eq(${index})`).animate({height: 0}, 200)
        setTimeout(() => {
          $(`.task-application .answer-1:eq(${index})`).css('display','block')
          $(`.task-application .answer-unfold-wrapper:eq(${index})`).removeClass('current')
        }, 200)
      },
      //展开接单申请的内容
      unfoldContent (index) {
        $(`.task-application .answer-1:eq(${index})`).css('display','none')
        setTimeout(() => {
          let height = $(`.answer-unfold-wrapper .answer-unfold-container:eq(${index})`).height()
          let height1 = $(`.answer-unfold:eq(${index})`).height()
          let height2 = $(`.collapse-btn-wrapper:eq(${index})`).height() + 30
          $(`.task-application .answer-unfold-wrapper:eq(${index})`).addClass('current').animate({height: height1 + height2 + 'px'}, 200)
        }, 20)
      },
      //将html内容只提取文字，用来显示折叠以后的内容
      answerContent (item) {
        let content = item.applyContent
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
      hide () {
        this.isSuccess = false
      },
      //设置为接单者的按钮的点击事件
      async setApplication (item, index) {
        let text = $(`.set-btn:eq(${index})`).text()
        if (text === '设为接单者') {
          let applyId = item.applyCircleUnionId
          let result = await chooseTaker(applyId, true)
          console.log(result)
          if (result.success) {
            this.$message({
              type: 'success',
              showClose: true,
              message: '设置成功'
            })
            $(`.set-btn:eq(${index})`).html('评价')
          } else {
            this.$message({
              type: 'error',
              showClose: true,
              message: result.msg
            })
          }
        } else if (text === '评价') {
          item.isShowComment = !item.isShowComment
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
                  self.loadMore(self.p, self.getTaskApplication)
                }
              }
            }
          }
        }
      },
      async _getTaskApplication (p, id) {
        let result = await reqTaskApplication(p, id)
        console.log(result)
        if (result.success) {
          if  (result.data.list.length === 0) {
            this.isHaveTaskApplication = false
          } else {
            this.isHaveTaskApplication = true
            this.isLoadOnePage = true
            let taskApplication = this.taskApplication.concat(result.data.list)
            for (let i = 0; i < taskApplication.length; i++) {
              taskApplication[i].isShowComment = false
            }
            this.getTaskApplication(taskApplication)
            this.pagesNumber = result.data.lastPage
          }
        } else if (result.msg === '没有待处理申请') {
          this.isHaveTaskApplication = false
        }
      }
    },
    watch: {
      '$route' () {
        if (this.path.test(this.$route.path)) {
          this.watchScroll()
        }
      },
      taskApplication () {
        if (this.taskApplication !== []) {
          //在获取到数据以后，将评分数组与该数据的长度保持一致，初值都设置为null
          let scores = []
          this.taskApplication.forEach((item, index) => {
            scores[index] = null
          })
          this.scores.concat(scores)
          //当获取数据到最后一页的时候将加载按钮隐藏
          setTimeout(() => {
            if (this.p !== this.pagesNumber) {
              this.loadingShow = true
            } else {
              this.loadingShow = false
            }
          }, 20)
          //将申请的html内容渲染到页面上
          setTimeout(() => {
            let length = this.taskApplication.length
            for (let i = 0; i < length; i++) {
              $(`.answer-unfold:eq(${i})`).html(this.taskApplication[i].applyContent)
            }
          }, 20)
          this.watchScroll()
        }
      },
      taskDetailId () {
        this.p = 1//如果更换了新的任务详情页，从第一页的数据开始获取
        this.getTaskApplication([])//如果换了任务，将先前的接单申请的数据置为空
        let taskDetailId = getStorage('taskDetailId')
        this._getTaskApplication(this.p, taskDetailId)
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
  .task-application {
    width: 100%;
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
  /*        收起与折叠的样式           */
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
  /*            收起与折叠的样式             */
  .set-btn-wrapper {
    flex: 0 200px;
  }
  .set-btn {
    display: inline-block;
    width: 95px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border: 1.5px solid #4993a8;
    color: #4993a8;
    font-size: 15px;
    font-weight: 500;
    margin-left: 40px;
    border-radius: 5px;
    cursor: pointer;
  }
  .no-taskApplication {
    width: 100%;
    height: 160px;
    font-size: 25px;
    color: #ccc;
    line-height: 120px;
    text-align: center;
  }
  .success-tip {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: -1;
  }
  .text-wrapper {
    width: 200px;
    height: 150px;
    background-color: white;
    text-align: center;
    line-height: 150px;
    margin-top: 50vh;
    margin-left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .success-icon {
    font-size: 30px;
    font-weight: 700;
    color: green;
  }
  .success-text {
    font-size: 20px;
    margin-left: 10px;
  }
  .loadingBtn-wrapper {
    margin: 50px 0;
  }
  .comment-wrapper {
    margin-top: 30px;
    padding: 0 30px;
    box-sizing: border-box;
  }
  .comment {
    width: 100%;
    height: 170px;
    padding: 30px 50px;
    box-sizing: border-box;
    border: 1.5px solid #a5a5a5;
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
    box-sizing: border-box;
    margin-top: 10px;
  }
  .comment2 {
    height: 40px;
  }
  .comment-content {
    display: inline-block;
    vertical-align: middle;
    width: 700px;
    height: 35px;
    background-color: #f4f4f4;
    text-indent: 2em;
    font-size: 18px;
    border: 0;
  }
  .confirm-btn {
    display: inline-block;
    vertical-align:  middle;
    width: 60px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #01a9ce;
    border: 1px solid #01a9ce;
    margin-left: 30px;
    border-radius: 3px;
    cursor: pointer;
  }
</style>
