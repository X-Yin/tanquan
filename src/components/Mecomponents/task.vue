<template>
    <div class="task">
      <wait-task-wrapper  v-if="task.length === 0 && isNoTaskShow"></wait-task-wrapper>
      <no-task-text v-if="task.length === 0 && !isNoTaskShow " text="暂无任务"></no-task-text>
      <div>
        <div class="item" v-for="(item, index) in task" :key="index">
          <div class="wrapper">
            <div class="task-avatar-wrapper" v-if="item.questionPhoto !== ''">
              <img v-lazy="item.questionPhoto" class="task-avatar">
            </div>
            <div class="task-description">
              <div class="task-title">
                <span class="color-block-1"></span>
                <span class="color-block-1"></span>
                <span class="task-name" @click="gotoTaskDetail(item)">{{item.questionTitle}}</span>
              </div>
              <div class="task-des">
                {{handleContent(item.questionContent)}}
              </div>
            </div>
          </div>
          <div class="icons-wrapper">
            <icons :index="index"></icons>
          </div>
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
  import {getUserTask} from '../../api/index.js'
  import icons from '../common/icons'
  export default {
    data () {
      return {
        path: '/self/task',
        loadingShow: false,
        isLoadOnePage: true,
        isNoTaskShow: true,
        task: [],
        p: 1,
        pagesNumber: 1,
      }
    },
    created () {
      window.onscroll = null
    },
    mounted () {
      this._getTask(this.p)
    },
    computed: {
    },
    methods: {
      ...mapMutations([
          'getTaskDetailId'
        ]),
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
      //处理问题的内容
      handleContent (content) {
        let ret = /<[^>]+>/g
        content = content.replace(ret, '')
        if (content.length > 15) {
          return content.substring(0, 15) + '...'
        } else {
          return content
        }
      },
      async _getTask (p) {
        let personPageId = getStorage('personPageId')
        console.log(personPageId, p)
        let result = await getUserTask(personPageId, p)
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
                  self.loadMore(self.p, self._getTask)
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
      loadingBtn,
      waitTaskWrapper,
      noTaskText,
      icons
    }
  }
</script>

<style scoped>
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
  .task-avatar-wrapper {
    flex: 0 140px;
    height: 85px;
    overflow: hidden;
  }
  .task-avatar {
    width: 125px;
    margin: 0 15px 0 0;
  }
  .task-description {
    flex: 1;
    height: 85px;
  }
  .task-title {
    height: 30px;
  }
  .task-title:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 30px;
    width: 0;
  }
  .color-block-1 {
    display: inline-block;
    vertical-align: middle;
    width: 25px;
    height: 25px;
    background-color: #4993a8;
    margin-left: 10px;
  }
  .task-name {
    display: inline-block;
    vertical-align: middle;
    font-size: 24px;
    color: #222;
    margin-left: 20px;
    cursor: pointer;
  }
  .task-name:hover {
    color: #4893a8;
  }
  .task-des {
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    color: #6c6c6c;
    margin-left: 10px;
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
  .loadingBtn-wrapper {
    margin: 50px 0;
  }
  .item:last-child {
    margin-bottom: 50px;
  }
</style>
