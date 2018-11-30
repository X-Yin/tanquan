<template>
  <div class="main probing container">
    <div class="left">
      <div class="createCircle" @click="gotoPath('/tanquan/createCircle')">创建圈子</div>
    <wait-task-wrapper v-if="feed.length === 0 && isNoFeedShow"></wait-task-wrapper>
    <no-task-text v-if="feed.length === 0 && !isNoFeedShow " text="暂无动态"></no-task-text>
    <div class="feed" v-for='(item,index) in feed' :key='index'>
      <div class="task" v-if="item.timelineLinkType === 3" @click="selectTaskItem(item)">
        <div class="wrapper">
          <div class="avatar-wrapper" v-if="item.contentPhoto !== ''">
            <img class="avatar" v-lazy="item.contentPhoto" style="width: 120px;height: 120px;">
          </div>
          <div class="des-wrapper">
            <div class="title" @click="selectTaskItem(item)"><span>[任务]</span><span
              class="question-title">{{item.linkName}}</span><span class="deleteTask" @click.stop="delTask(item)"
                                                                        v-if="isManagement">[删除]</span></div>
            <div class="detail">
              <div class="detail1">
                <div class="author">发起人：<span>{{item.senderName}}</span></div>
              </div>
              <div class="detail2">
                <P>{{handleArticleContent(item)}}<span class="detail-btn" @click="selectTaskItem(item)">详情</span></P>
              </div>
            </div>
          </div>
        </div>
        <div class="icons-wrapper" style="padding-bottom: 15px">
          <icons :index="index" :mode="taskType" :item="item" :id="item.timelineLinkId"></icons>
        </div>
      </div>
      <div class="article" v-if="item.timelineLinkType === 1">
        <div class='from'>发布于&nbsp;&nbsp;{{item.timelineSendTime}}</div>
        <div class="title" @click="gotoArticleDetail(item)"><span class="type">[文章]</span><span
          class="tt">{{item.linkName}}</span><span class="delete" v-show='isManagement'>[删除]</span></div>
        <div class="avatar" v-if="item.contentPhoto !== ''"><img v-lazy="item.contentPhoto" style=" width: 120px;height: 120px;"></div>
        <div class="detail">
          <div class="detail1">
            <div class="author">作者：<span>{{item.senderName}}</span></div>
          </div>
          <div class="detail2">
            <P>{{handleArticleContent(item)}}<span class="detail-btn">详情</span></P>
          </div>
        </div>
        <div class="icons-wrapper">
          <icons :index="index" :mode="articleType" :item="item" :id="item.timelineLinkId"></icons>
        </div>
      </div>
    </div>
    <div class="loading-wrapper" v-show="loadingShow" style="margin: 50px 0;">
      <loading-btn class="loadingBtn"></loading-btn>
    </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {getAllCircleFeed} from '../../../api/index.js'
  import noTaskText from '../../Xcomponents/noTaskText.vue'
  import waitTaskWrapper from '../../Xcomponents/waitTaskWrapper.vue'
  import {getPosition, deleteOne, getStorage, setStorage} from '../../../api/util.js'
  import loadingBtn from '../../Xcomponents/loadingBtn.vue'
  import icons from '../../common/icons.vue'
  export default{
    data(){
      return{
        taskType: 9,//要传递给icons的type
        articleType: 1,
        path: /\/circle\/\w*\/feed/,
        loadingShow: false,
        isLoadOnePage: true,
        isNoFeedShow: true,
        feed: [],
        p: 1,
        pagesNumber: 1,
      }
    },
    methods:{
      ...mapMutations([
          'getTaskDetailId',
          'getCircleDetailId'
        ]),
      //前往任务详情页
      selectTaskItem (item) {
        //将taskId缓存到本地
        setStorage('taskDetailId', item.timelineLinkId)
        this.getTaskDetailId(item.timelineId)
        let userName = getStorage('user').userName
        let taskUserName = item.senderName
        if (userName === taskUserName) {
          this.$router.push(`/tanqiu/taskDetail/${item.timelineLinkId}/taskApplication`)
        } else {
          this.$router.push(`/tanqiu/taskDetail/${item.timelineLinkId}/notMeTaskApplication`)
        }
      },
      //前往文章详情页
      gotoArticleDetail (item) {
        let circleId = item.belongId;
        setStorage( 'circleDetailId',circleId);
        setStorage('articleDetailId', item.timelineLinkId);
        this.$router.push('/articleDetail');
        return;
        this.$router.push(`/circle/${circleId}/article/${item.timelineLinkId}`)
      },
      gotoPath (path) {
        this.$router.push(path)
      },
      //处理任务内容
      handleTaskContent (item) {
        let content = item.questionContent
        let ret = /<[^>]+>/g
        if (ret.test(content)) {
          let ret1 = /&\w+;/g;
          content = content.replace(ret, '');
          content = content.replace(ret1, '');
          if (content.length > 15) {
            return content.substr(0, 16) + '...'
          } else {
            return content + '...'
          }
        } else {
          return ''
        }
      },
      //处理文章内容
      handleArticleContent (item) {
        if (item.timelineContent) {
          let content = item.timelineContent
          let ret = /<[^>]+>/g
          let ret1 = /&\w+;/g;
          content = content.replace(ret, '');
          content = content.replace(ret1, '');
          if (content.length > 20) {
            return content.substring(0, 20) + '...'
          } else {
            return content + '...'
          }
        }
      },
        async _getCircleFeed (p) {
        let result = await getAllCircleFeed(p);
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
        } else {
          this.isNoFeedShow = false//让无任务文字显示
          this.loadingShow = false
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
                  self.loadMore(self.p, self._getCircleFeed)
                }
              }
            }
          }
        }
      },
    },
    computed:{
      ...mapState([
          'isManagement'
        ])
    },
    mounted(){
      this._getCircleFeed(this.p)
    },
    watch: {
      '$route'() {
        if (this.path.test(this.$route.path)) {
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
      noTaskText,
      waitTaskWrapper,
      loadingBtn,
      icons
    }
  }
</script>

<style lang="stylus" rel="sheetstylus" scoped>
.left {
  width: 800px;
  background-color: white;
  min-height: 100vh;
  padding-bottom: 40px;
  overflow: hidden;
  display: inline-block;
}
.right {
  height: 400px;
  width: 250px;
  background-color: white;
  margin-left: 30px;
  display: inline-block;
  vertical-align: top;
  padding: 40px 0;
}
.createCircle {
  width: 120px;
  height: 30px;
  font-size: 20px;
  cursor: pointer;
  color: white;
  text-align: center;
  line-height: 30px;
  margin-top: 30px;
  border-radius: 4px;
  background-color: #4893a8;
  margin-left: 30px;
}
.icons-wrapper {
  width: 60%;
  margin-top: 20px;
}

.detail-btn {
  cursor: pointer;
  display: inline-block;
  margin-left: 15px;
  border-bottom: 1px solid #4893a8;
  color: #4893a8;
}

.article {
  padding: 20px 20px;
  box-sizing: border-box;
  border-bottom: 1.5px solid #a5a5a5;
}
.article .from{
  font-size: 14px;
  color: #a5a5a5;
}
.article .title {
  margin-top: 15px;
  margin-bottom: 15px;
}
.article .detail {
  display: inline-block;
  vertical-align: top;
}
.article .type {
  font-size: 18px;
  color: #4893a8;
  display:  inline-block;
  vertical-align: top;
}
.article .tt {
  font-size: 18px;
  display:  inline-block;
  vertical-align: top;
  margin-left: 5px;
  cursor: pointer;
}
.tt:hover {
  color: #4893a8;
}
.article .avatar {
  display: inline-block;
  vertical-align: top;
  width: 120px;
  height: 120px;
  margin-right: 20px;
}
.task .wrapper {
  display: flex;
  padding: 20px 20px;
  box-sizing: border-box;
}
.task {
  border-bottom: 1.5px solid #a5a5a5;
}
.task .avatar-wrapper {
  flex: 0 120px;
  margin-right: 20px;
}
.task .avatar {
  width: 120px;
  height: 120px;
}
.task .des-wrapper {
  flex: 1;
}
.task .title {
  font-size: 18px;
  color: #4893a8;
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
}

.task .question-title {
  font-size: 18px;
  margin-left: 4px;
  display: inline-block;
  vertical-align: top;
  color: #333;
}
.task .question-title:hover {
  color: #4893a8;
}
.task .deleteTask {
  display: inline-block;
  vertical-align: top;
  font-size: 18px;
  cursor: pointer;
}
.task .deleteTask:hover {
  color: #4893a8;
}
.task .detail {
  margin-top: 7px;
}
.task .detail1 {
  height: 25px;
}
 .author {
  font-size: 15px;
  color: #333;
}
 .author span {
  font-size: 14px;
  color: #a5a5a5;
}
.task .tags {
  font-size: 15px;
  color: #333;
}
.task .tags span {
  font-size: 14px;
  color: #a5a5a5;
}
 .detail2 {
  font-size: 16px;
  color: #a5a5a5;
  margin-top: 6px;
}
.main
.settings
    margin-bottom 30px
    padding-left 44px
    margin-bottom 7px
    position relative
    .btn1
        display inline-block
        text-align center
        border solid 1px #9e9e9e
        border-radius 2px
        padding 1px 4px
        height 16px
        width 75px
        line-height 16px
        color #5b5b5b
    .btn
        font-size 14.53px
        margin-left 375px
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
            font-size 20px
            line-height 21px
            height 21px
            width 55px
            text-align center
            display inline-block
            font-weight 900
            color #6c6c6c

</style>
