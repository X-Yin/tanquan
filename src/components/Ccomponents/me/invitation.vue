<template>
  <div class="application">
    <wait-task-wrapper  v-if="invitation.length === 0 && isNoCircleShow"></wait-task-wrapper>
    <no-task-text v-if="invitation.length === 0 && !isNoCircleShow " text="暂无邀请"></no-task-text>
    <div class="wrapper">
      <div class="item" v-for="(item, index) in invitation" :key="index">
        <div class="avatar-wrapper" v-if="item.applyerPic !== ''">
          <div class="avatar">
            <img v-lazy="item.applyerPic" >
          </div>
        </div>
        <div class="description">
          <div class="title">{{item.circleName}}</div>
          <div class="time">{{item.createTime}}</div>
          <div class="invitationer">{{item.applyerName}}邀请你进入圈子</div>
          <!--<div class="content">-->
            <!--<span class="content-des">{{handleContent(item.content)}}</span>-->
            <!--<span class="des-btn" @click="upfold(index)" v-if="item.content.length > 15">详情</span>-->
          <!--</div>-->
        </div>
        <div class="right-wrapper">
          <div class="btn" v-if="item.applyStatus === 0">
            <div class="receive" @click="handleInvitation(1, item, index)">接受</div>
            <div class="refuse" @click="handleInvitation(2, item, index)">拒绝</div>
          </div>
          <div class="handle-wrapper" v-if="item.applyStatus !== 0">
            <div class="received" v-if="item.applyStatus === 1">已接受</div>
            <div class="refused" v-if="item.applyStatus === 2">已拒绝</div>
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
  import noTaskText from '../../Xcomponents/noTaskText.vue'
  import waitTaskWrapper from '../../Xcomponents/waitTaskWrapper.vue'
  import {reqMyInvitation, handleInvitation} from '../../../api/index.js'
  import {getPosition, getStorage} from '../../../api/util.js'
  import loadingBtn from '../../Xcomponents/loadingBtn.vue'
  import $ from 'jquery'
  export default {
    data () {
      return {
        invitation: [],
        path: '/tanquan/me/invitation',
        loadingShow: false,
        isLoadOnePage: true,
        isNoCircleShow: true,
        p: 1,
        pagesNumber: 1,
      }
    },
    methods: {
      handleInvitation (index, item, index1) {
        if (index === 1) {
          this.invitation[index1].applyStatus = 1
          this._handleInvitation(index1, item.applyCircleUnionId, true, item.applyerId, item.circleId)
        } else {
          this.invitation[index1].applyStatus = 2
          this._handleInvitation(index1, item.applyCircleUnionId, false, item.applyerId, item.circleId)
        }
      },
      //处理邀请
      async _handleInvitation (index, applyId, pass, replaceUserId, circleId) {
        let result = await handleInvitation(applyId, pass, replaceUserId, circleId)
        console.log(result)
        if (result.success) {

        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: result.msg
          })
        }
      },
      //处理标签
      handleTags (item) {
        if (item.circleTag.length >= 2) {
          return item.circleTag.slice(0, 2).join(',')
        } else {
          return item.circleTag.join(',')
        }
      },
      async _getInvitation (p) {
        let result = await reqMyInvitation(p)
        console.log(result)
        if (result.success) {
          let circles = this.invitation.slice()
          if (result.data.list.length === 0) {
            this.isNoTaskShow = false//让无任务文字显示
            this.loadingShow = false
          } else {
            circles = circles.concat(result.data.list)
            this.invitation = circles
            this.pagesNumber = result.data.lastPage
            this.isLoadOnePage = true
          }
        } else if (result.msg === '没有待处理申请') {
            this.isNoCircleShow = false//让无任务文字显示
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
                  self.loadMore(self.p, self._getInvitation)
                }
              }
            }
          }
        }
      },
      handleContent (content) {
        if (content.length > 15) {
          return content.substr(0, 15) + '...'
        } else {
          return content
        }
      },
      upfold (index) {
        let text = $(`.des-btn:eq(${index})`).text()
        if (text === '详情') {
          $(`.content-des:eq(${index})`).text(this.invitation[index].applyContent)
          $(`.des-btn:eq(${index})`).text('收起').addClass('current')
        } else {
          $(`.content-des:eq(${index})`).text(this.handleContent(this.invitation[index].applyContent))
          $(`.des-btn:eq(${index})`).text('详情').removeClass('current')
        }
      }
    },
    created () {
      window.onscroll = null
    },
    mounted(){
      this._getInvitation(this.p)
    },
    watch: {
      '$route'() {
        if (this.$route.path === this.path) {
          this.watchScroll()
        }
      },
      invitation () {
        if (this.invitation !== []) {
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

<style scoped>
  .item {
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    border-bottom: 1.5px solid #777;
  }
  .avatar-wrapper {
    flex: 0 117px;
    margin-right: 20px;
  }
  .avatar img{
    width: 117px;
    height: 117px;
  }
  .description {
    flex: 1;
  }
  .title {
    font-size: 18px;
  }
  .time {
    margin-top: 16px;
    color: #ccc;
    font-size: 16px;
    line-height: 30px;
  }
  .invitationer {
    margin-top: 16px;
    color: #777;
    line-height: 30px;
  }
  .right-wrapper {
    flex: 0 150px;
  }
  .btn, .handle-wrapper {
    padding-top: 90px;
  }
  .receive, .refuse {
    width: 60px;
    height: 24px;
    line-height: 24px;
    border: 1px solid #4893a8;
    color: #4893a8;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
    display: inline-block;
    transition: all 0.2s;
  }
  .receive:hover, .refuse:hover {
    color: white;
    background-color: #4893a8;
  }
  .refuse {
    margin-left: 13px;
  }
  .refused, .received {
    width: 80px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    margin: 0 auto;
  }
  .refused {
    background-color: red;
    color: white;
  }
  .received {
    color: white;
    background-color: green;
  }
</style>
