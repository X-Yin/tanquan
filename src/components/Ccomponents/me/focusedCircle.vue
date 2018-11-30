<template>
  <div class="focus-circle">
    <div class="settings">
      <div class="btn">热度</div><i class="el-icon-d-caret"></i>
      <div class="search">
        <input style="background-color: #f7f7f7;border:none;height: 22px;margin-right: 18px;">
        <i class="icon el-icon-search" style="color: #bebebe;font-weight: 600;"></i>
      </div>
    </div>
    <wait-task-wrapper  v-if="circles.length === 0 && isNoCircleShow"></wait-task-wrapper>
    <no-task-text v-if="circles.length === 0 && !isNoCircleShow " text="暂无圈子"></no-task-text>
    <div>
      <div v-for='(item,index) in circles' :key='index' :class="{'circle-v':!ifh,'circle-h':ifh}" class="circle-item">
        <div class="quit-v">退出</div>
        <div class='avatar'v-show="item.circleProPic !== ''">
          <img  v-lazy="item.circleProPic" :src="item.circleProPic">
        </div>
        <div class="detail">
          <div class='detail1'>
            <p class="circleName" @click="enter(item)">{{item.circleName}}</p><i></i>
            <p class='role-h'>{{item.role}}</p>
            <!-- <div class="quit-h">退出</div> -->
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
  import {reqUserAttentionCircle} from '../../../api/index.js'
  import {getPosition, getStorage,setStorage} from '../../../api/util.js'
  import loadingBtn from '../../Xcomponents/loadingBtn.vue'
  export default{
    data(){
      return {
        dialogTableVisible:false,
        vh:'/static/h.png',
        ifh:true,
        circles: [],
        path: '/tanquan/me/focusedCircle',
        loadingShow: false,
        isLoadOnePage: true,
        isNoCircleShow: true,
        p: 1,
        pagesNumber: 1,
      }
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
      //处理标签
      handleTags (item) {
        if (item.circleTag.length >= 2) {
          return item.circleTag.slice(0, 2).join(',')
        } else {
          return item.circleTag.join(',')
        }
      },
      async _getCircle (p) {
        let type = 1
        let userId = getStorage('user').userId
        let result = await reqUserAttentionCircle(p, type, userId)
        console.log(result)
        if (result.success) {
          let circles = this.circles.slice()
          if (result.data.list.length === 0) {
            this.isNoCircleShow = false//让无任务文字显示
            this.loadingShow = false
          } else {
            circles = circles.concat(result.data.list)
            this.circles = circles
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
                  self.loadMore(self.p, self._getCircle)
                }
              }
            }
          }
        }
      },
    },
    created () {
      window.onscoll = null
    },
    mounted(){
      this._getCircle(this.p)
    },
    watch: {
      '$route'() {
        if (this.$route.path === this.path) {
          this.watchScroll()
        }
      },
      circles () {
        if (this.circles !== []) {
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
  .circle-item:last-child {
    margin-bottom: 50px;
  }
.focus-circle
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
  border-bottom 1.5px solid rgba(0,0,0,0.3)
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
