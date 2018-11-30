<template>
    <div class="attention-task">
      <el-row>
        <setting :settings="settings"></setting>
      </el-row>
      <wait-task-wrapper v-if="myAttentionTasks.length === 0 && isNoTaskShow"></wait-task-wrapper>
      <no-task-text v-if="myAttentionTasks.length === 0 && !isNoTaskShow "></no-task-text>
      <div class="bg-wrapper">
        <div class="task-wrapper">
          <div class="task-item" v-for="(task, index) in myAttentionTasks" :key="index">
            <div class="task-item-wrapper">
              <div class="avatar" v-show="task.questionPhoto !== ''"><img v-lazy="task.questionPhoto" style="width: 100%;height: 100%;"></div>
              <div class="description">
                <div class="title">
                  <span class="color-block"></span>
                  <span class="color-block"></span>
                  <span class="question" @click="gotoTaskDetail(task.taskId)">{{task.questionTitle}}</span>
                </div>
                <div class="detail">
                  <div class="announcer">发布: <a class="name">{{task.initiatorName}}</a></div>
                  <div class="time">{{task.taskCreateTime}}</div>
                  <div class="attentions"><a class="attention">{{task.followNum}}</a>关注</div>
                  <div class="thumbs-up"><a class="thumb-up">{{task.priseNum}}</a>点赞</div>
                </div>
                <div class="project">#{{task.topicName}}#</div>
                <div class="des"><span class="des-detail">{{questionContent(index)}}</span><span class="details" @click="gotoTaskDetail(task.taskId)">详情</span></div>
              </div>
            </div>
            <div class="bottom">
              <div class="examineAnswers" @click="gotoTaskDetail(task.taskId)">查看回答</div>
              <!--<div class="icon-caret"><i class="el-icon-d-caret"></i></div>-->
              <!--<div class="alreadyAnswers">{{task.alreadyAnswers}}人已回答</div>-->
              <div class="avatars">
                <img v-for="(item, index) in task.avatars" :key="index" class="item" :src="item">
              </div>
              <!--<div class="helpNums"><i class="el-icon-more" style="margin:0 10px 0 10px;font-size: 20px;"></i>{{task.helpers}}人已助力{{task.helpNum}}点</div>-->
            </div>
          </div>
        </div>
        <div class="loading-wrapper" v-show="loadingShow">
          <loading-btn class="loadingBtn"></loading-btn>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapActions, mapMutations} from 'vuex'
  import loadingBtn from './loadingBtn.vue'
  import setting from './settings.vue'
  import {reqMyAttentionTasks} from '../../api/index.js'
  import waitTaskWrapper from './waitTaskWrapper.vue'
  import {getPosition, setStorage, getStorage} from '../../api/util.js'
  import noTaskText from './noTaskText.vue'
  export default {
    data () {
      return {
        settings: ['时间', '回答数', '热度', '奖励数'],
        p: 1,
        pagesNumber: 1,
        loadingShow: false,
        path: '/tanqiu/answer/attentionTask',
        isLoadOnePage: true,
        isNoTaskShow: true
      }
    },
    computed: {
      ...mapState([
        'myAttentionTasks'
      ])
    },
    created () {
      window.onscroll = null
    },
    mounted () {
      this._getMyAttentionTasks(this.p)
    },
    methods: {
      ...mapMutations([
        'getTaskDetailId',
        'getMyAttentionTasks'
      ]),
      gotoTaskDetail (id) {
        //将taskId缓存到本地
        setStorage('taskDetailId', id)
        this.getTaskDetailId(id)
        this.$router.push(`/tanqiu/taskDetail/${id}/taskApplication`)
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
                  self.loadMore(self.p, self._getMyAttentionTasks)
                }
              }
            }
          }
        }
      },
      //异步获取列表数据
      async _getMyAttentionTasks (p) {
        let type = 4
        let userId = getStorage('user').userId
        let result = await reqMyAttentionTasks(userId, this.p, type)
        console.log(result)
        if (result.success) {
          let tasks = this.myAttentionTasks.slice()
          if (result.data.list.length === 0) {
            this.isNoTaskShow = false//让无任务文字显示
            this.loadingShow = false
          } else {
            tasks = tasks.concat(result.data.list)
            this.getMyAttentionTasks(tasks)
            this.pagesNumber = result.data.lastPage
            this.isLoadOnePage = true
          }
        }
      },
      //处理任务文字展示
      questionContent (index) {
        let task = this.myAttentionTasks[index]
        let content = task.questionContent
        let ret = /<[^>]+>/g
        content = content.replace(ret, '')
        return content
      },
    },
    watch: {
      '$route'() {
        if (this.$route.path === this.path) {
          window.onscroll = this.watchScroll()
        }
      },
      myAttentionTasks () {
        if (this.myAttentionTasks !== []) {
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
      setting,
      loadingBtn,
      waitTaskWrapper,
      noTaskText
    }
  }
</script>

<style scoped>
  .bg-wrapper {
    padding: 0 35px;
    box-sizing: border-box;
  }
  .loading-wrapper {
    margin: 50px 0;
  }
  .task-wrapper {
    margin-bottom: 50px;
  }
  .task-item {
    width: 100%;
  }
  .task-item-wrapper {
    width: 100%;
    display: flex;
    border-bottom: 2px solid #e6e6e6;
  }
  .avatar {
    flex: 0 125px;
    height: 125px;
    padding:  60px 0 20px 0;
  }
  .description {
    flex: 1;
    height: 143px;
    padding: 60px 0 20px 0;
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
  .question {
    font-size: 18px;
    margin-left: 15px;
    cursor: pointer;
  }
  .question:hover {
    color: #01a9ce;
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
  .bottom {
    width: 100%;
    height: 50px;
    margin-top: 10px;
  }
  .bottom:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
  .examineAnswers {
    display: inline-block;
    vertical-align: middle;
    width: 80px;
    height: 30px;
    border: 1.5px solid #4993a8;
    text-align: center;
    box-sizing: border-box;
    line-height: 27px;
    color: #4993a8;
    margin-left: 20px;
    border-radius: 5px;
  }
  .icon-caret {
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
    font-size: 20px;
  }
  .alreadyAnswers {
    display: inline-block;
    vertical-align: middle;
    font-size: 13px;
    color: #a5a5a5;
    margin-left: 15px;
  }
  .avatars {
    display: inline-block;
    vertical-align: middle;
    height: 100%;
    margin-left: 10px;
  }
  .item {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-left: 10px;
    margin-top: 5px;
  }
  .helpNums {
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    color: #a5a5a5;
    font-size: 14px;
  }
</style>
