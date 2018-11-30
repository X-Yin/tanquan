<template>
  <div class="join-circle">
    <div class="settings">
      <div class="btn">热度</div><i class="el-icon-d-caret"></i>
      <div class="search">
        <input style="background-color: #f7f7f7;border:none;height: 22px;margin-right: 18px;">
        <i class="icon el-icon-search" style="color: #bebebe;font-weight: 600;"></i>
      </div>
      <!--<div class='tab'>-->
        <!--<img :src="vh">-->
        <!--<div class='vh' @click="tab('v')"></div>-->
        <!--<div class='vh' @click="tab('h')" style="left: 65%"></div>-->
      <!--</div>-->
    </div>
    <wait-task-wrapper  v-if="userCircle.length === 0 && isNoCircleShow"></wait-task-wrapper>
    <no-task-text v-if="userCircle.length === 0 && !isNoCircleShow " text="暂无圈子"></no-task-text>
    <div v-for='(item,index) in userCircle' :key='index' :class="{'circle-v':!ifh,'circle-h':ifh}">
      <div class="quit-v">退出</div>
      <div class='avatar' v-if="item.circleProPic !== ''">
        <img  v-lazy="item.circleProPic" :src="item.circleProPic">
      </div>
      <div class="detail">
        <div class='detail1'>
          <p class="circleName" @click="enter(item)">{{item.circleName}}</p><i></i>
          <p class='role-h'>{{item.role}}</p>
          <div class="quit-h" @click="popConfirmText(item)">退出</div>
        </div>
        <div class='detail2'>
          <p class="hostName"><span>圈主：</span>{{item.circleMasterName}}</p>
          <p class='role-v'>身份：{{item.role}}</p>
          <p class="tags">标签：<span style="color: #9d9d9d">{{handleTags(item)}}</span></p>
        </div>
        <div class='detail3'>
          <p class="intro"><span>简介：</span>{{item.circleNotices}}</p>
        </div>
      </div>
    </div>
    <div class="loading-wrapper" v-show="loadingShow">
      <loading-btn class="loadingBtn"></loading-btn>
    </div>
    <confirm-text @confirm="confirm" ref="confirmText" :item="item"></confirm-text>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import noTaskText from '../../Xcomponents/noTaskText.vue'
  import waitTaskWrapper from '../../Xcomponents/waitTaskWrapper.vue'
  import {reqUserCircles, quitCircle, delCircle} from '../../../api/index.js'
  import {getPosition, deleteOne, setStorage} from '../../../api/util.js'
  import loadingBtn from '../../Xcomponents/loadingBtn.vue'
  import confirmText from '../../common/confirmText.vue'
  export default{
    data(){
      return {
        dialogTableVisible:false,
        vh:'/static/h.png',
        ifh:true,
        path: '/tanquan/me/joinedCircle',
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
    methods:{
      ...mapMutations([
          'getCircleDetailId'
        ]),
      //跳转到圈子详情页
      enter(item){
        let circleId = item.circleId
        this.getCircleDetailId(circleId)
        setStorage( 'circleDetailId',circleId)
        this.$router.push(`/circle/${circleId}`)
      },
      tab(p){
        this.vh = '/static/'+p+'.png'
        this.ifh = p=='h'
      },
      popConfirmText (item) {
       if (item.role === '圈主') {
        this.$message({
          type: 'warning',
          showClose: true,
          message: '您是圈主，不能退出该圈子！'
        })
        return
      } 
        this.item = item
        this.$refs.confirmText.show()
      },
      //确认退出
      confirm (item) {
        this._quitCircle(item)
      },
      //处理退出圈子函数
      async _quitCircle (item) {
        let result = {}
        result = await quitCircle(item.circleId)
        console.log(result)
        if (result.success) {
          this.$message({
            type: 'success',
            showClose: true,
            message: '退出成功！'
          })
          this.userCircle = deleteOne(item, this.userCircle, 'circleId')
          if (this.userCircle.length === 0) {
            this.isNoCircleShow = false//如果删除的是最后一个，那么就让暂无圈子的文字显示
          }
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
        if (this.userCircle.length !== 0) {
          if (item.circleTag.length >= 2) {
            return item.circleTag.slice(0, 2).join(',')
          } else {
            return item.circleTag.join(',')
          }
        }
      },
      async _getUserCircle (p) {
        let result = await reqUserCircles(p)
        console.log(result)
        console.log(result.msg === '没有加入圈子，快去加入吧')
        if (result.success) {
          let circles = this.userCircle.slice()
          if (result.data.list.length === 0) {
            this.isNoTaskShow = false//让无任务文字显示
            this.loadingShow = false
          } else {
            circles = circles.concat(result.data.list)
            this.userCircle = circles
            this.pagesNumber = result.data.lastPage
            this.isLoadOnePage = true
          }
        } else if (result.msg === '没有加入圈子，快去加入吧') {
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
                  self.loadMore(self.p, self._getUserCircle)
                }
              }
            }
          }
        }
      },
    },
    computed:{
    },
    watch: {
      '$route'() {
        if (this.$route.path === this.path) {
         this.watchScroll()
        }
      },
      userCircle () {
        if (this.userCircle !== []) {
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
      this._getUserCircle(this.p)
    },
    components: {
      noTaskText,
      waitTaskWrapper,
      loadingBtn,
      confirmText
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus" >
.circleName {
  cursor: pointer;
}
.circleName:hover {
  color: #4893a8!important;
}
  .loading-wrapper {
    margin: 50px 0;
  }
  .quit-h:hover {
    color: white!important;
    background-color: #4893a8;
  }
.join-circle
  padding-top 20px
  padding-right 20px
  box-sizing border-box
.settings
  margin-bottom 30px
  padding-left 255px
  position relative
  .btn
    display inline-block
    text-align center
    border solid 1px #9e9e9e
    border-radius 2px
    padding 1px 4px
    height 22px
    width 40px
    line-height 22px
    color #5b5b5b
  .search
    margin-left 50px
    display inline-block
  .tab
    display inline-block
    position absolute
    right 0
    .vh
      display inline-block
      position absolute
      height 100%
      width 35%
      top 0
      left 0

.circle-h
  background-color white
  border-bottom: 1.5px solid rgba(0,0,0,0.3)
  padding 18px 28px 22px 21px
  margin-top 8px
  .quit-v
    display none
  .avatar
    display inline-block
    img
      height 117px
      width 117px
      background-color #4893a8
  .detail
    padding-left 30px
    display inline-block
    width 530px
    .detail1
      margin 2px 0 10px 0
      line-height 20px
      position relative
      .circleName
        font-size 15.98px
        color #5b5b5b
        display inline-block
      .role-h
        position absolute
        left 200px
        font-size 14.53px
        color #747474
        display inline-block
      .quit-h
        height 25px
        width 65px
        border solid 1.5px #4993a8
        border-radius 5px
        color #4993a8
        line-height 25px
        font-size 15.98px
        text-align center
        letter-spacing 3px
        position absolute
        right 0
        display inline-block
        cursor: pointer;
    .detail2
      font-size 14.53px
      line-height 20px
      margin-bottom 12px
      position relative
      .hostName
        color #9d9d9d
        display inline-block
        span
          color #474747
      .role-v
        display none
      .tags
        /*position absolute*/
        left 114px
        color #474747
        display inline-block
    .detail3
      .intro
        font-size 15.98px
        color #9d9d9d
        line-height 30px
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 2
        overflow hidden
        span
          color #474747
.circle-v
  width 118px
  display inline-block
  margin 8px 8px 22px 15px
  background-color #f7f7f7
  padding 11px 20px 20px 20px
  .quit-v
    height 12px
    width 37px
    border solid 1.5px #4993a8
    border-radius 3px
    color #4993a8
    line-height 12px
    font-size 9.98px
    text-align center
    font-weight 600
    letter-spacing 3px
    margin 0 0 8px 83px
  .avatar
    display inline-block
    img
      height 117px
      width 117px
      background-color #4893a8
  .detail
    display inline-block
    width 100%
    .detail1
      margin 2px 0 10px 0
      line-height 20px
      text-align center
      .circleName
        font-size 15.98px
        color #5b5b5b
        display inline-block
      .role-h
        display none
      .quit-h
        display none
    .detail2
      text-align center
      font-size 14.53px
      line-height 20px
      .hostName
        color #9d9d9d
        display inline-block
        span
          color #474747
      .role-v
        font-size 14.53px
        color #747474
      .tags
        display none
    .detail3
      .intro
        display none
</style>
