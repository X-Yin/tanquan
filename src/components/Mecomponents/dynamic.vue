<template>
    <div class="dynamic">
      <wait-task-wrapper  v-if="feed.length === 0 && isNoFeedShow"></wait-task-wrapper>
      <no-task-text v-if="feed.length === 0 && !isNoFeedShow " text="暂无动态"></no-task-text>
      <div>
        <div class="item" v-for="(item, index) in feed" :key="index">
          <!-- <div class="circle" v-show="item.mark === 'circle'">
            <div class="wrapper">
              <div class="circle-avatar-wrapper">
                <img :src="item.avatar" class="circle-avatar">
              </div>
              <div class="circle-description">
                <div class="title">
                  <div class="title-name">{{item.title}}</div>
                  <div class="check-icon"></div>
                  <div class="color-block"></div>
                </div>
                <div class="circle-detail">
                  <span class="circler">圈主：</span>
                  <span class="circler-name">{{item.circler}}</span>
                  <span class="label">标签：</span>
                  <span class="label-text">{{item.label}}</span>
                </div>
              </div>
            </div>
          </div> -->
          <div class="question" v-if="item.timelineLinkType === 4">
            <div class="wrapper">
              <div class="question-avatar-wrapper" v-if="item.contentPhoto !== ''">
                <img :src="item.contentPhoto" class="question-avatar">
              </div>
              <div class="question-description">
                <div class="question-title">
                  <span class="symbol">[问题]</span>
                  <span class="question-name" @click="gotoQuestionDetail(item)">{{item.linkName}}</span>
                </div>
                <div class="question-des">
                  {{handleContent(item.timelineContent)}}
                </div>
              </div>
            </div>
          </div>
          <div class="task" v-if="item.timelineLinkType === 3">
            <div class="wrapper">
              <div class="task-avatar-wrapper" v-if="item.contentPhoto !== ''">
                <img v-lazy="item.contentPhoto" class="task-avatar">
              </div>
              <div class="task-description">
                <div class="task-title">
                  <span class="symbol">[任务]</span>
                  <span class="task-name" @click="gotoTaskDetail(item)">{{item.linkName}}</span>
                </div>
                <div class="task-des">
                  {{handleContent(item.timelineContent)}}
                </div>
              </div>
            </div>
          </div>
          <div class="text1" v-if="item.timelineLinkType === 1">
            <div class="text-avatar-wrapper" v-if="item.contentPhoto !== ''">
              <img v-lazy="item.contentPhoto" class="text-avatar">
            </div>
            <div class="text-des">
              <div class="text-title" @click="gotoArticleDetail(item)"><span class="symbol">[文章]</span>{{item.linkName}}</div>
              <div class="text-content">
                {{handleContent(item.timelineContent)}}
                <span class="text-detail-btn">详情</span>
              </div>
            </div>
          </div>
          <!-- <div class="friend" v-show="item.mark === 'friend'">
            <div class="wrapper1">
              <div class="friend-avatar-wrapper">
                <img :src="item.avatar" class="friend-avatar">
              </div>
              <div class="friend-name">{{item.name}}</div>
              <div class="icon-checkNumber"></div>
            </div>
          </div> -->
          <!-- <div class="collect1" v-show="item.mark === 'collect'">
            <div class="wrapper1">
              <div class="collect-title">{{item.title}}</div>
            </div>
            <div class="wrapper">
              <div class="collect-avatar-wrapper">
                <img :src="item.avatar" class="collect-avatar">
              </div>
              <div class="collect-description">
                {{item.description}}...
                <span class="collect-detail-btn">详情</span>
              </div>
            </div>
            <div class="setting">
              <div class="forward">
                <i class="icon"></i>
                <span class="text">转发 ({{item.forward}})</span>
              </div>
              <div class="comment">
                <i class="icon"></i>
                <span class="text">评论 ({{item.comment}})</span>
              </div>
              <div class="thumbUp">
                <i class="icon"></i>
                <span class="text">评论 ({{item.thumbUp}})</span>
              </div>
              <div class="collect">
                <i class="icon"></i>
                <span class="text">收藏 ({{item.collect}})</span>
              </div>
              <div class="uninterest">
                不感兴趣
              </div>
              <div class="more">
                <i class="el-icon-more more-icon"></i>
              </div>
            </div>
          </div> -->
        </div>
      </div>
      <div class="loadingBtn-wrapper" v-show="loadingShow">
        <loading-btn class="loadingBtn"></loading-btn>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {getPosition, getStorage, setStorage} from '../../api/util.js'
  import loadingBtn from '../Xcomponents/loadingBtn.vue'
  import noTaskText from '../Xcomponents/noTaskText.vue'
  import waitTaskWrapper from '../Xcomponents/waitTaskWrapper.vue'
  import {getUserFeed} from '../../api/index.js'
  import icons from '../common/icons'
  export default {
    data () {
      return {
        path: '/self/dynamic',
        loadingShow: false,
        isLoadOnePage: true,
        isNoFeedShow: true,
        feed: [],
        p: 1,
        pagesNumber: 1,
      }
    },
    computed: {
    },
    created () {
      window.onscroll = null
    },
    mounted () {
      this._getDynamic(this.p)
    },
    methods: {
      ...mapMutations([
          'getTaskDetailId',
          'getQuestionDetailId'
        ]),
      //跳转到问题详情页
      gotoQuestionDetail (question) {
        //将taskId缓存到本地
        setStorage('questionDetailId', question.timelineLinkId)
        this.getQuestionDetailId(question.timelineLinkId)
        this.$router.push(`/tanqiu/questionDetail/${question.timelineLinkId}/questionAnswer`)
      },
      //跳转到任务详情页
      gotoTaskDetail (task) {
        //将taskId缓存到本地
        setStorage('taskDetailId', task.timelineLinkId)
        this.getTaskDetailId(task.timelineLinkId)
        let userName = getStorage('user').userName
        let taskUserName = task.initiatorName
        if (userName === taskUserName) {
          this.$router.push(`/tanqiu/taskDetail/${task.timelineLinkId}/taskApplication`)
        } else {
          this.$router.push(`/tanqiu/taskDetail/${task.timelineLinkId}/notMeTaskApplication`)
        }
      },
      //跳转到文章详情页
      gotoArticleDetail (item) {
        setStorage('articleDetailId',item.timelineLinkId)
        this.$router.push('/articleDetail')
      },
      //处理问题内容
      handleContent (content) {
        let ret = /<[^>]+>/g
        content = content.replace(ret, '');
        content = content.replace('&nbsp;', '');
        if (content.length > 15) {
          return content.substring(0, 15) + '...'
        } else {
          return content + '...'
        }
      },
      async _getDynamic (p) {
        let personPageId = getStorage('personPageId')
        console.log(personPageId, p)
        let result = await getUserFeed(personPageId, p)
        console.log(result)
        if (result.success) {
          let tasks = this.feed.slice()
          if (result.data.list.length === 0) {
            this.isNoFeedShow = false//让无任务文字显示
            this.loadingShow = false
          } else {
            tasks = tasks.concat(result.data.list)
            this.feed = tasks
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
                  self.loadMore(self.p, self._getDynamic)
                }
              }
            }
          }
        }
      },
    },
    watch: {
      '$route' (newPath, oldPath) {
        if (this.$route.path === this.path) {
          this.watchScroll()
        }
      },
      feed () {
        if (this.feed !== []) {
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
      waitTaskWrapper,
      noTaskText,
      icons
    }
  }
</script>

<style scoped>
.question, .task, .text1 {
  margin-top: 30px!important;
  height: 80px!important;
}
.task-name, .question-name {
  cursor: pointer;
}
.task-name:hover, .question-name:hover {
  color: #4893a8;
}
  .symbol {
    font-size: 24px;
    color: #4893a8;
    display: inline-block;
    margin-right: 5px;
    vertical-align: top;
  }
  .text1 {
    height: 70px;
    box-sizing: border-box;
    display: flex;
  }
  .text-avatar-wrapper {
    flex: 0 120px;
    margin-right: 20px;
    height: 70px;
    overflow: hidden;
  }
  .text-avatar {
    width: 120px;
  }
  .text-des {
    flex: 1;
  }
  .text-content {
    margin-top: 5px;
  }
  .text-detail-btn {
    cursor: pointer;
  }
  .text-detail-btn{
    color: #4893a8;
  }
  .icons-wrapper {
    width: 60%;
    margin-top: 20px;
  }
  .item {
    margin-top: 30px;
  }
  .time-text {
    color: #8a8a8a;
    font-size: 20px;
    height: 40px;
    line-height: 40px;
  }
  .wrapper {
    display: flex;
    width: 100%;
    margin-top: 30px;
  }
  .circle-avatar-wrapper {
    flex: 0 150px;
    height: 66px;
  }
  .circle-avatar {
    width: 60px;
    height: 60px;
    margin: 0 42.5px;
    display: inline-block;
  }
  .circle-description {
    flex: 1;
    height: 65px;
  }
  .title {
    height: 30px;
  }
  .title:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 30px;
  }
  .title-name {
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    color: #8f8f8f;
    cursor: pointer;
  }
  .title-name:hover {
    color: #4893a8;
  }
  .check-icon {
    display: inline-block;
    vertical-align: middle;
    width: 25px;
    height: 25px;
    background-image: url('/static/ximages/check-icon-blue.png');
    background-size: 25px;
    background-repeat: no-repeat;
    margin: 0 10px;
  }
  .color-block {
    width: 100px;
    height: 25px;
    display: inline-block;
    vertical-align: middle;
    background-color: #4993a8;
    margin-left: 20px;
  }
  .circle-detail {
    height: 35px;
  }
  .circle-detail:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 35px;
  }
  .circler, .circler-name, .label, .label-text {
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
  }
  .circler, .label {
    color: #222;
  }
  .circler-name {
    margin-right: 20px;
  }
  .circler-name, .label-text {
    color: #9e9e9e;
  }
  .question-avatar-wrapper, .task-avatar-wrapper {
    flex: 0 140px;
    height: 85px;
    overflow: hidden;
  }
  .question-avatar, .task-avatar {
    width: 125px;
    margin: 0 15px 0 0;
  }
  .question-description, .task-description {
    flex: 1;
    height: 85px;
  }
  .question-title, .task-title {
    height: 30px;
  }
  .question-title:before, .task-title:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 30px;
    width: 0;
  }
  .question-name, .task-name {
    display: inline-block;
    vertical-align: top;
    font-size: 24px;
    color: #222;
  }
  .text-title {
    display: inline-block;
    vertical-align: top;
    font-size: 24px;
    color: #222;
    cursor: pointer;
  }
  .text-title:hover {
    color: #4893a8;
  }
  .question-des, .task-des, .text-des {
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    color: #6c6c6c;
    margin-top: 15px;
  }
  .setting {
    width: 100%;
    height: 50px;
    margin-top: 30px;
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
  .forward {
    margin-left: 42.5px;
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
  .uninterest {
    height:  50px;
    line-height: 50px;
    font-size: 15px;
    color: #a5a5a5;
    margin-left: 70px;
  }
  .more-icon {
    color: rgb(108,108,108);
    font-size: 20px;
  }
  .wrapper1 {
    margin-left: 42.5px;
    margin-top: 30px;
  }
  .live-question, .activity-question {
    font-size: 20px;
    color: #222;
  }
  .live-launcher, .activity-launcher {
    height: 30px;
    margin-top: 10px;
  }
  .live-launcher-text, .activity-launcher-text {
    color: #6e6e6e;
  }
  .live-launcher-name, .activity-launcher-name {
    color: #afacaa;
  }
  .live-attentionNum, .activity-attentionNum {
    display: inline-block;
    margin-left: 30px;
    color: #01a9ce;
    text-decoration: underline;
  }
  .live-attention, .activity-attention {
    color: #bab9b8;
  }
  .live-label, .activity-label {
    height: 30px;
    line-height: 30px;
  }
  .live-label-text, .activity-label-text {
    color: #555555;
  }
  .live-label-name, .activity-label-name {
    color: #9b9796;
  }
  .live-description, .activity-description {
    margin-top: 5px;
    color: #5a5a5a;
    line-height: 30px;
  }
  .live-detail-btn, .activity-detail-btn {
    cursor: pointer;
    color: #01a9ce;
    text-decoration: underline;
  }
  .topic-text {
    color: #4993a8;
    margin-top: 30px;
    font-size: 24px;
    margin-left: 42.5px;
  }
  .friend .wrapper1:before {
    height: 55px;
    content: '';
    display: inline-block;
    vertical-align: middle;
  }
  .friend-avatar-wrapper {
    display: inline-block;
    vertical-align: middle;
    height: 52px;
    width: 52px;
  }
  .friend-avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
  }
  .friend-name {
    display: inline-block;
    vertical-align: middle;
    color: #222;
    font-size: 20px;
    margin-left: 30px;
  }
  .icon-checkNumber {
    display: inline-block;
    vertical-align: middle;
    width: 21px;
    height: 21px;
    margin: 0 15px 0 15px;
    background: url('/static/ximages/check-number.png') 21px center;
  }
  .collect-title {
    font-size: 20px;
    color: #222;
  }
  .collect-avatar-wrapper {
    flex: 0 233px;
    height: 115px;
  }
  .collect-avatar {
    width: 160px;
    height: 100px;
    margin: 0 30px 0 42.5px;
  }
  .collect-description {
    color: #848484;
    line-height: 30px;
  }
  .collect-detail-btn {
    color: #01a9ce;
    text-decoration: underline;
  }
  .loadingBtn-wrapper {
    margin: 50px 0;
  }
  .item:last-child {
    margin-bottom: 50px;
  }
</style>
