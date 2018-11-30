<template>
  <div class="main message">
    <div class="settings">
      <div class="btn" @click='leaveMessage=true' style="cursor:pointer">我要留言</div>
    </div>
    <wait-task-wrapper  v-if="message.length === 0 && isNoCircleShow"></wait-task-wrapper>
    <no-task-text v-if="message.length === 0 && !isNoCircleShow " text="暂无留言"></no-task-text>
    <el-dialog class='dialog leaveMessage' width='760px' :visible.sync="leaveMessage">
      <div class="littleTitle">留言</div>
      <div></div>
      <div><textarea id="tt" class="writeMessage" type="text" placeholder="请输入留言内容"></textarea></div>
      <div class="btn" @click="uploadMessage()"><p class="message-upload">发布</p></div>
    </el-dialog>
    <el-dialog class='dialog replyMessage' width='760px' :visible.sync="replyMessage">
      <div class="littleTitle">回复</div>
      <div></div>
      <div><textarea id="tt" type="text" placeholder="请输入回复内容"></textarea></div>
      <div class="btn" @click="upload()"><p>回复</p></div>
    </el-dialog>
    <div class="message-1" v-for="(item, index) in message" :key="index">
      <div class="avatar"><img v-lazy="item.commentUserPic"></div>
      <div class="detail">
        <div class="words"><span>{{item.commentUserName}}</span>：<span style="color: #777">{{item.commentContent}}</span></div>
        <div class="time" style="color: #a5a5a5;font-size: 14px;margin-top: 10px;">{{item.commentUpdateTime}}</div>
      </div>
      <div class="itemFooter">
        <div class="btn abc">举报</div>
        <div class="btn-r abc" @click='replyMessage=true'>回复</div>
      </div>
    </div>
    <div class="loading-wrapper" v-show="loadingShow">
      <loading-btn class="loadingBtn"></loading-btn>
    </div>
    <div class="loading-mask" v-if="loading">
      <div class="mask" v-loading="loading"></div>
    </div>
  </div>
</template>

<script>
  import noTaskText from '../../Xcomponents/noTaskText.vue'
  import waitTaskWrapper from '../../Xcomponents/waitTaskWrapper.vue'
  import {reqUserCircles, quitCircle, delCircle, getCircleMessage, writeMessage} from '../../../api/index.js'
  import {getPosition, deleteOne, getStorage} from '../../../api/util.js'
  import loadingBtn from '../../Xcomponents/loadingBtn.vue'
  import $ from 'jquery'
  export default{
    data(){
      return{
        leaveMessage:false,
        replyMessage:false,
        message: [],
        loading: false,
        path: /\/circle\/\w*\/message/,
        loadingShow: false,
        isLoadOnePage: true,
        isNoCircleShow: true,
        p: 1,
        pagesNumber: 1,
      }
    },
    methods: {
      //发布留言，并且重新获取数据
      uploadMessage () {
        this._writeMessage()
      },
      //写留言
      async _writeMessage () {
        this.loading = true
        let commentContent = $('.writeMessage').val()
        let commentObjectId = getStorage('circleDetailId')
        let commentType = 3
        let commentAnonymity = false
        let result = await writeMessage(commentObjectId, commentType, commentContent, commentAnonymity)
        console.log(result)
        if (result.success) {
          this.$message({
            type: 'success',
            showClose: true,
            message: '发布成功！'
          })
          //重新获取message数据
          this.message = []
          $('.writeMessage').val('')
          this.loadingShow = false
          this.isLoadOnePage = true
          this.isNoCircleShow = true
          this.p = 1
          this.pagesNumber = 1
          this._getMessage(this.p)
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: result.msg,
          })
        }
      },
      //获取留言列表
      async _getMessage (p) {
        let id = getStorage('circleDetailId')
        let result = await getCircleMessage(id, p)
        console.log(result)
        if (result.success) {
          let circles = this.message.slice()
          if (result.data.list.length === 0) {
            this.isNoTaskShow = false//让无任务文字显示
            this.loadingShow = false
          } else {
            circles = circles.concat(result.data.list)
            this.message = circles
            this.pagesNumber = result.data.lastPage
            this.isLoadOnePage = true
          }
          this.loading = false
          this.leaveMessage = false
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
                  self.loadMore(self.p, self._getMessage)
                }
              }
            }
          }
        }
      },
    },
    watch: {
      '$route'() {
        if (this.path.test(this.$route.path)) {
          this.watchScroll()
        }
      },
      message () {
        if (this. message !== []) {
          setTimeout(() => {
            if (this.p !== this.pagesNumber) {
              this.loadingShow = true
            }
          }, 20)
          this.watchScroll()
        }
      }
    },
    mounted(){
      this._getMessage(this.p)
    },
    components: {
      noTaskText,
      waitTaskWrapper,
      loadingBtn,
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .loading-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100000000;
  }
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
  .abc:hover {
    color: #4893a8;
  }
  .message-1 {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
  }
  .avatar {
    flex: 0 40px;
    margin-right: 30px;
  }
    .avatar img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  .detail {
    flex: 1;
  }
  .itemFooter {
    flex: 0 100px;
    font-size: 0;
  }
  .message-1 .btn {
    width: 40px;
    border-right: 1px solid #333;
    text-align: center;
    height: 24px;
    line-height: 24px;
    display: inline-block;
    font-size: 15px;
    cursor: pointer;
  }
  .message-1 .btn-r {
    width: 40px;
    text-align: center;
    height: 24px;
    line-height: 24px;
    display: inline-block;
    font-size: 15px;
    cursor: pointer;
  }
  .main
    padding-right 46px
  .settings
    position relative
    .btn
      display inline-block
      text-align center
      background-color #4893a8
      padding 1px 4px
      margin-left 14px
      height 25px
      width 100px
      font-size 18.16px
      line-height 25px
      border-top solid 1.5px rgba(255,255,255,0.65)
      border-right solid 1.5px #000
      border-bottom solid 1.5px #000
      color #fff
  .reply
      .replys
        background-color #f2f2f2
        padding 0 32px
        margin-top 7px
        .reply
          padding 28px 0 20px 0
          border-bottom solid 3px #e8e8e8
          .time
            margin-right 340px
  .dialog
    .littleTitle
      color #474747
      font-size 21.8px
      padding-left 25px
      height 23px
      line-height 23px
      position relative
      margin -20px 0 25px 20px
      span
        color #4893a8
        font-size 18px
        user-select none
        cursor pointer
      &:after
        content ""
        background-color #4893a8
        position absolute
        left 0
        width 10px
        height 23px
    #tt
      font-size 18px
      height 30px
      background-color #f4f4f4
      border solid 1.5px #e9e9e9
      width 620px
      margin-left 40px
      padding-left 15px
      width 560px
      height 60px
      font-family: "Microsoft YaHei",Arial,Helvetica,sans-serif,"\5B8B\4F53";
      resize none
    /*.btn*/
      /*height 22px*/
      /*width 63px*/
      /*border solid 1.5px #4893a8*/
      /*padding 1px*/
      /*border-radius 3px*/
      /*margin-top 45px*/
      /*margin-left 580px*/
      /*right 0*/
      /*&:hover p*/
        /*color #fff*/
        /*background-color #4893a8*/
      /*p*/
        /*text-align center*/
        /*color #4893a8*/
        /*background-color #fff*/
        /*line-height 22.5px*/
        /*font-size 16px*/
 .message-upload {
   margin-top 45px
   margin-left 580px
   height: 22px;
   width: 63px;
   border: 1px solid #4893a8;
   cursor: pointer;
   border-radius: 3px;
   line-height: 22px;
   text-align: center;
   color: #4893a8;
 }
  .message-upload:hover {
    background-color: #4893a8;
    color: white;
  }
</style>
