<template>
    <div class="application">
      <wait-task-wrapper  v-if="application.length === 0 && isNoCircleShow"></wait-task-wrapper>
      <no-task-text v-if="application.length === 0 && !isNoCircleShow " text="暂无申请"></no-task-text>
      <div class="wrapper">
        <div class="item" v-for="(item, index) in application" :key="index">
          <div class="avatar-wrapper" v-if="item.applyerPic !== ''">
            <div class="avatar">
              <img v-lazy="item.applyerPic" >
            </div>
          </div>
          <div class="description">
            <div class="title">{{item.circleName}}</div>
            <div class="status">
              申请状态：
              <span class="apply-status">{{handleStatus(item, index)}}</span>
            </div>
            <div class="des">申请内容:</div>
            <div class="content">
              &nbsp;&nbsp;&nbsp;&nbsp;<span class="content-des">{{handleContent(item.applyContent)}}</span>
              <span class="des-btn" @click="upfold(index)" v-if="item.applyContent.length > 15">详情</span>
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
  import {reqMyApplication} from '../../../api/index.js'
  import {getPosition, getStorage} from '../../../api/util.js'
  import loadingBtn from '../../Xcomponents/loadingBtn.vue'
  import $ from 'jquery'
  export default {
    data () {
      return {
        application: [],
        path: '/tanquan/me/application',
        loadingShow: false,
        isLoadOnePage: true,
        isNoCircleShow: true,
        p: 1,
        pagesNumber: 1,
      }
    },
    methods: {
      handleStatus (item, index) {
        if (this.application.length > 0) {
          if (item.applyStatus === 0) {
            return '正在处理中'
          } else if (item.applyStatus === 1) {
            setTimeout(() => {
              $(`.apply-status:eq(${index})`).addClass('success')
            }, 20)
            return '已成功'
          } else {
            setTimeout(() => {
              $(`.apply-status:eq(${index})`).addClass('refuse')
            }, 20)
            return '已拒绝'
          }
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
      async _getApplication (p) {
        let result = await reqMyApplication(p)
        console.log(result)
        if (result.success) {
          let circles = this.application.slice()
          if (result.data.list.length === 0) {
            this.isNoTaskShow = false//让无任务文字显示
            this.loadingShow = false
          } else {
            circles = circles.concat(result.data.list)
            this.application = circles
            this.pagesNumber = result.data.lastPage
            this.isLoadOnePage = true
          }
        } else {
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
                  self.loadMore(self.p, self._getApplication)
                }
              }
            }
          }
        }
      },
      handleContent (content) {
        if (this.application.length > 0) {
          if (content.length > 15) {
            return content.substr(0, 15) + '...'
          } else {
            return content
          }
        }
      },
      upfold (index) {
        let text = $(`.des-btn:eq(${index})`).text()
        if (text === '详情') {
          $(`.content-des:eq(${index})`).text(this.application[index].applyContent)
          $(`.des-btn:eq(${index})`).text('收起').addClass('current')
        } else {
          $(`.content-des:eq(${index})`).text(this.handleContent(this.application[index].applyContent))
          $(`.des-btn:eq(${index})`).text('详情').removeClass('current')
        }
      }
    },
    created () {
      window.onscroll = null
    },
    mounted(){
      this._getApplication(this.p)
    },
    watch: {
      '$route'() {
        if (this.$route.path === this.path) {
          this.watchScroll()
        }
      },
      application () {
        if (this.application !== []) {
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
  .status {
    margin-top: 7px;
  }
  .apply-status {
    display: inline-block;
    margin-left: 10px;
    color: #4893a8;
  }
  .apply-status.success {
    color: green;
  }
  .apply-status.refuse {
    color: red;
  }
  .des {
    margin-top: 14px;
  }
  .content {
    margin-top: 7px;
    color: #999;
    word-break: break-all;
  }
  .des-btn {
    cursor: pointer;
    color: #01a9ce;
  }
  .des-btn.current {
    display: block;
    float: right;
    margin-top: 20px;
  }
  .des-btn:hover {
    color: #4893a8;
  }
</style>
