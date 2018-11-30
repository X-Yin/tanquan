<template>
  <div class="management">
    <div class="settings" style="height: 0">
<!--       <div class="settings-wrapper">
       <div class="live-btn" :class="{'current': isHandleLive}" @click="isHandleLive = true">处理动态</div>
       <div class="application-btn" :class="{'current': !isHandleLive}" @click="isHandleLive = false">处理申请</div>
     </div> -->
    </div>
    <div class="content-wrapper">
      <div class="live" v-if="isHandleLive">
        <div class="wrapper">
          <div class="live-item" v-for="(item, index) in 10" :key="index">
            <div class="text-wrapper">
              <span class="text">管理员小蘑菇已删除推文“我跟你们说，我昨天看见了一个好东西...”</span>
              <span class="time">9:08</span>
            </div>
          </div>
        </div>
      </div>
      <div class="application" v-if="!isHandleLive">
        <div class="btns-wrapper">
          <div class="joinApplication-btn" :class="{'current': isJoinApplication}" @click="toggleApplication(0)">
            加入申请
          </div>
<!--           <div class="launchApplication-btn" :class="{'current': !isJoinApplication}" @click="toggleApplication(1)">
            发布申请
          </div> -->
        </div>
        <wait-task-wrapper  v-if="invite.length === 0 && isNoInviteShow"></wait-task-wrapper>
        <no-task-text v-if="invite.length === 0 && !isNoInviteShow " text="暂无申请"></no-task-text>
        <div class="join-application" v-if="isJoinApplication">
          <div class="join-application-content">
            <div class="join-item" v-for="(item,index) in invite" :key="index">
              <div class="join-text">{{item.applyerName}}申请加入圈子"{{handleContent(item)}}"</div>
              <div class="handle-btn" v-if="item.applyStatus === 0">
                <div class="agree-btn" @click="_handleInvitation(item,index, true)">同意</div>
                <div class="refuse-btn" @click="_handleInvitation(item,index,false)">拒绝</div>
              </div>
              <div class="handle-btn" v-if="item.applyStatus === 1">
                <div class="agree-btn current">已同意</div>
              </div>
              <div class="handle-btn" v-if="item.applyStatus === 2">
                <div class="refuse-btn current">已拒绝</div>
              </div>
            </div>
          </div>
        </div>
        <div class="loading-wrapper" v-show="loadingShow">
          <loading-btn class="loadingBtn"></loading-btn>
        </div>
        <div class="launch-application" v-if="!isJoinApplication">
          <div class="launch-application-content">
            <div class="launch-item" v-for="(item, index) in 10" :key="index">
              <div class="launch-text">小蘑菇申请上传推文“英语词汇三百字”</div>
              <div class="handle-btn">
                <div class="agree-btn">同意</div>
                <div class="refuse-btn">拒绝</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getCircleInvitation, handleCircleInvitation} from '../../../api/index.js'
  import noTaskText from '../../Xcomponents/noTaskText.vue'
  import waitTaskWrapper from '../../Xcomponents/waitTaskWrapper.vue'
  import {getPosition, deleteOne, getStorage, setStorage} from '../../../api/util.js'
  import loadingBtn from '../../Xcomponents/loadingBtn.vue'
  import icons from '../../common/icons'
  export default {
    data () {
      return {
        isHandleLive: false,
        isJoinApplication: true,
        lives: [],
        application: [],
        path: /\/circle\/\w*\/management/,
        loadingShow: false,
        isLoadOnePage: true,
        isNoInviteShow: true,
        invite: [],
        p: 1,
        pagesNumber: 1,
      }
    },
    methods: {
      //处理申请
      async _handleInvitation (item,index, pass) {
        let applyId = item.applyCircleUnionId
        let circleId = getStorage('circleDetailId')
        if (pass) {
            this.invite[index].applyStatus = 1
          } else {
            this.invite[index].applyStatus = 2
          }
          console.log(applyId, circleId, pass)
        let result = await handleCircleInvitation(applyId, circleId, pass)
        console.log(result)
        if (result.success) {
        }
      },
      //处理申请内容
      handleContent (item) {
        let content = item.applyContent
        let ret = /<[^>]+/g
        content = content.replace(ret, '')
        return content
      },
      //切换处理申请下面的子界面
      toggleApplication (index) {
        if (index === 0) {
          this.isJoinApplication = true
        } else {
          this.isJoinApplication = false
        }
      },
      async _getCircleInvite (p) {
        let circleId = getStorage('circleDetailId')
        console.log(circleId, p)
        let result = await getCircleInvitation(circleId, p)
        console.log(result)
        if (result.success) {
          let tasks = this.invite.slice()
          if (result.data.list.length === 0) {
            this.isNoInviteShow = false//让无任务文字显示
            this.loadingShow = false
          } else {
            tasks = tasks.concat(result.data.list)
            this.invite = tasks
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
                  self.loadMore(self.p, self._getCircleInvite)
                }
              }
            }
          }
        }
      },
    },
    mounted(){
      this._getCircleInvite(this.p)
    },
    watch: {
      '$route'() {
        if (this.path.test(this.$route.path)) {
          this.watchScroll()
        }
      },
      invite () {
        if (this.invite !== []) {
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

<style scoped>
.agree-btn.current, .refuse-btn.current {
  color: white;
  background-color: #4893a8;
}
  .management {
  }
  .settings {
    height: 50px;
    margin-top: 30px;
  }
  .settings-wrapper {
    margin-left: 40px;
  }
  .live-btn, .application-btn {
    display: inline-block;
    vertical-align: top;
    width: 100px;
    height: 25px;
    border: 1px solid #4893a8;
    color: #4893a8;
    text-align: center;
    line-height: 25px;
    cursor: pointer;
    border-radius: 3px;
    transition: all 0.2s;
  }
  .live-btn:hover, .application-btn:hover {
    color: white;
    background-color: #4893a8;
  }
  .live-btn.current, .application-btn.current {
    color: white;
    background-color: #4893a8;
  }
  .application-btn {
    margin-left: 30px;
  }
  .content-wrapper {
    padding: 20px 30px;
    box-sizing: border-box;
  }
  .live-item {
    padding: 20px 20px;
    box-sizing: border-box;
  }
  .text-wrapper {
    color: #777;
    font-size: 15px;
    display: inline-block;
    vertical-align: top;
  }
  .time {
    display: inline-block;
    vertical-aling: top;
    color: #c9c9c9;
    margin-left: 20px;
  }
  .btns-wrapper {
    width: 100%;
  }
  .joinApplication-btn, .launchApplication-btn {
    display: inline-block;
    vertical-align: top;
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 17px;
    color: #777;
    cursor: pointer;
  }
  .launchApplication-btn {
    margin-left: 20px;
  }
  .joinApplication-btn.current, .launchApplication-btn.current {
    border-bottom: 1.5px solid #4893a8;
    color: #4893a8;
  }
  .join-item, .launch-item {
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
    border-bottom: 1.5px solid #c9c9c9;
  }
  .join-item:last-child, .launch-item:last-child {
    border: 0;
  }
  .join-text, .launch-text {
    font-size: 16px;
    color: #777;
    margin-bottom: 20px;
  }
  .handle-btn {
    height: 40px;
    width: 100%;
    position: relative;
    padding-left: 450px;
    box-sizing: border-box;
  }
  .agree-btn, .refuse-btn {
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
    padding: 2px 8px;
    border: 1px solid #4893a8;
    color: #4893a8;
    border-radius: 3px;
    transition: all 0.2s;

  }
  .agree-btn {
    margin-right: 40px;
  }
  .refuse-btn {
  }
  .agree-btn:hover, .refuse-btn:hover {
    color: white;
    background-color: #4893a8;
  }
</style>