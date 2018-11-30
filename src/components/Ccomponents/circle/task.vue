<template>
  <div class="main task">
    <div class="settings">
      <!--<div class="btn1">圈子任务</div>-->
      <!--<div class="btn1">联名任务</div>-->
      <div class="btn">热度</div><i class="el-icon-d-caret"></i>
      <div class="search">
        <input type="text">
        <i class="icon el-icon-search" style="color: #bebebe;font-weight: 600;"></i>
      </div>
    </div>
    <wait-task-wrapper  v-if="task.length === 0 && isNoCircleShow"></wait-task-wrapper>
    <no-task-text v-if="task.length === 0 && !isNoCircleShow " text="暂无任务"></no-task-text>
    <div class="feed" v-for='(item,index) in task' :key='index'>
      <div class='time'>发布于{{item.taskCreateTime}}</div>
      <div class="wrapper">
        <div class="avatar-wrapper" v-if="item.questionPhoto !== ''">
          <img class="avatar" v-lazy="item.questionPhoto">
        </div>
        <div class="des-wrapper">
          <div class="title" @click="gotoTaskDetail(item)"><span>[任务]</span><span class="question-title">{{item.questionTitle}}</span><span class="deleteTask" @click.stop="delTask(item)" v-if="isManagement">[删除]</span></div>
          <div class="detail">
            <div class="detail1">
              <div class="author">发起人：<span>{{item.initiatorName}}</span></div>
              <div class="tags">标签：<span>{{item.topicName}}</span></div>
            </div>
            <div class="detail2">
              <P>{{handleContent(item)}}<span class="detail-btn"  @click="gotoTaskDetail(item)">详情</span></P>
            </div>
          </div>
        </div>
      </div>
      <div class="itemFooter">
        <div class="itemData">
          <div>转发（5）</div>
          <div>评论（25）</div>
          <div>点赞（32）</div>
          <div>收藏（6）</div>
        </div>
        <div class="dislike">不感兴趣</div>
        <div class="action">···</div>
      </div>
      <div class="bottom">
        <div class="btn"  @click="gotoTaskDetail(item)">查看回答</div>
      </div>
    </div>
    <div class="loading-wrapper" v-show="loadingShow">
      <loading-btn class="loadingBtn"></loading-btn>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import noTaskText from '../../Xcomponents/noTaskText.vue'
  import waitTaskWrapper from '../../Xcomponents/waitTaskWrapper.vue'
  import {reqUserCircles, quitCircle, delCircle, getCircleTask} from '../../../api/index.js'
  import {getPosition, deleteOne, getStorage, setStorage} from '../../../api/util.js'
  import loadingBtn from '../../Xcomponents/loadingBtn.vue'
  export default{
    data(){
      return{
        task: [],
        path: /\/circle\/\w*\/task/,
        loadingShow: false,
        isLoadOnePage: true,
        isNoCircleShow: true,
        userCircle: [],
        p: 1,
        pagesNumber: 1,
        item: {}//传递给confirmText的数据
      }
    },
    created () {
      window.onscroll = null
    },
    computed: {
      ...mapState([
           'isManagement'
        ])
    },
    methods:{
      ...mapMutations([
        'getTaskDetailId',
        'getIsManagement'
      ]),
      //删除任务
      delTask (item) {
        
      },
      //跳转到任务详情页
      gotoTaskDetail (task) {
        //将taskId缓存到本地
        setStorage('taskDetailId', task.taskId)
        this.getTaskDetailId(task.taskId)
        let userName = getStorage('user').userName
        let taskUserName = task.initiatorName
        if (userName === taskUserName) {
          this.$router.push(`/tanqiu/taskDetail/${task.taskId}/taskApplication`)
        } else {
          this.$router.push(`/tanqiu/taskDetail/${task.taskId}/notMeTaskApplication`)
        }
      },
      //处理内容，提取html中的文字
      handleContent (item) {
        let content = item.questionContent
        let ret = /<[^>]+>/g
        if (ret.test(content)) {
          content = content.replace(ret, '')
          if (content.length > 15) {
            return content.substr(0, 16) + '...'
          } else {
            return content + '...'
          }
        } else {
          return ''
        }
      },
      async _getCircleTask (p) {
        let circleId = getStorage('circleDetailId')
        let result = await getCircleTask(circleId, p)
        console.log(result)
        if (result.success) {
          let tasks = this.task.slice()
          if (result.data.list.length === 0) {
            this.isNoTaskShow = false//让无任务文字显示
            this.loadingShow = false
          } else {
            tasks = tasks.concat(result.data.list)
            this.task = tasks
            this.pagesNumber = result.data.lastPage
            this.isLoadOnePage = true
          }
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
                  self.loadMore(self.p, self._getCircleTask)
                }
              }
            }
          }
        }
      },
    },
    mounted(){
      this._getCircleTask(this.p)
    },
    watch: {
      '$route'() {
        if (this.path.test(this.$route.path)) {
          console.log(1)
          this.watchScroll()
        }
      },
      task () {
        if (this.task !== []) {
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
      noTaskText,
      waitTaskWrapper,
      loadingBtn
    }
  }
</script>

<style lang="stylus" rel="sheetstylus" scoped>
  .deleteTask{
    cursor: pointer;
    margin-left: 5px;
    color: #777!important;
  }
  .deleteTask:hover {
    color: #4893a8!important;
  }
  .bottom .btn {
    cursor: pointer;
  }
  .wrapper {
    display: flex;
  }
  .avatar-wrapper {
    flex: 0 117px;
  }
  .avatar {
    width: 117px;
    height: 117px;
  }
  .des-wrapper {
    flex: 1;
    margin-left: 20px;
  }
.detail-btn {
  cursor: pointer;
  color: #01a9ce;
}
.detail-btn:hover {
  color: #01a9ce;
}
  .des-wrapper .question-title {
    cursor: pointer;
    color: #777!important;
  }
  .des-wrapper .question-title:hover {
    color: #4893a8!important;
  }
.main
  padding-right 46px
  min-height: 100vh;


.settings
  margin-bottom 30px
  padding-left 20px
  margin-bottom 23px
  position relative
  .btn1
    display inline-block
    text-align center
    border solid 1px #9e9e9e
    border-radius 2px
    padding 1px 4px
    height 16px
    font-size 14.53px
    line-height 16px
    color #5b5b5b
  .btn
    font-size 14.53px
    margin-left 205px
    display inline-block
    text-align center
    border solid 1px #9e9e9e
    border-radius 2px
    padding 1px 4px
    height 16px
    width 32px
    line-height 16px
    color #5b5b5b
  .search
    margin-left 38px
    display inline-block
    input
      width 120px
      background-color #f7f7f7
      border none
      height 22px
      margin-right 18px
.feed
  margin-bottom 44px
  position relative
  .btn1
    display inline-block
    text-align center
    border solid 1px #92bfcb
    border-radius 3px
    padding 1px 5px
    height 20px
    font-size 14.53px
    line-height 20px
    color #5b5b5b
    span
      color #4893a8
      text-decoration underline
  .time
    font-size 15.98px
    color #aaa7a7
    height 18px
    line-height 18px
    margin-bottom 14px
  .title
    font-size 18.16px
    color #000
    height 19px
    line-height 19px
    margin-bottom 13px
    padding-left 24px
    position relative
    &:hover
      color #4893a8
    &:before
      content ""
      width 19px
      height 19px
      position absolute
      left 0
      background-color #4893a8
    span
      color #4893a8
  .detail
    vertical-align middle
    display inline-block
    width 680px
    font-size 15.98px
    .detail1
      height 46px
      .author,.tags
        color #6c6c6c
        height 23px
        line-height 23px
        span
          color #aaa7a7
    .detail2
      font-size 15.98px
      p
        color #6c6c6c
        line-height 29px
      span
        color #4893a8
        text-decoration underline
  .itemFooter
    margin-top 28px
    height 21px
    .itemData
      font-size 15.98px
      display inline-block
      div
        padding-left 25px
        width 95px
        display inline-block
        color #6c6c6c

        position relative
        &:before
          content ''
          width 21px
          height 21px
          background-color #4893a8
          position absolute
          left 0
    .dislike
      display inline-block
      width 110px
      color #b5b3b3
      text-align center
    .action
      font-size 22px
      line-height 21px
      height 21px
      width 55px
      text-align center
      display inline-block
      font-weight 900
      color #6c6c6c

  .bottom
    margin-top 10px
    padding 10px 0 0 0
    border-top solid 3px #f8f8f8
    font-size 15.98px
    color #6e6e6e
    .data1
      font-size 13.08px
      margin-right 70px
    div
      display inline-block
      vertical-align middle
    .btn
      color #4893a8
      border solid 1.5px #4893a8
      line-height 25px
      border-radius 3px
      text-align center
      height 25px
      width 82px
      margin-right 10px
    .avatar
      vertical-align middle
      width 36px
      height 36px
      border-radius 50%
      margin-left 10px
    i
      font-size 30px
      margin 0 20px
      color #6c6c6c
      vertical-align middle
</style>
