<template>
  <div id="library">
    <el-row class="container">
      <el-col :span='17' class="el-17-wrapper">
        <div class="left" style="margin-right: 30px;">
          <el-row>
            <div class="tab">
              <div class='tabitem' :class="{'current':current==1}" @click='tab1(1)'>标签</div><!--
						 --><div class='tabitem' :class="{'current':current==2}" @click='tab1(2)'>推荐</div><!--
						 --><div class='tabitem' :class="{'current':current==3}" @click='tab1(3)'>附近</div><!--
						 --><div class='tabitem' :class="{'current':current==4}" @click='tab1(4)'>我关注的</div>
            </div>
            <el-dialog class='filter' width="80%" :visible.sync="dialogTableVisible">
              <div class='hot'>
                <p style="margin-top: -40px" >热门标签</p>
                <ul>
                  <li>互联网</li><li>PPT</li><li>北京</li><li>美学</li>
                </ul>
              </div>
              <el-row>
                <el-col :span='8' class='rf'>
                  <p>地区</p>
                  <ul>
                    <li>天津</li><li>上海</li><li>北京</li><li>广州</li>
                  </ul>
                </el-col>
                <el-col :span='8' class='sf'>
                  <p>学科</p>
                  <ul>
                    <li>高数</li><li>线代</li><li>概率论</li><li>物理</li>
                  </ul>
                </el-col>
                <el-col :span='8' class='uf'>
                  <p>单位</p>
                  <ul>
                    <li>清华大学</li><li>北京大学</li><li>华北电力大学</li>
                  </ul>
                </el-col>
              </el-row>
            </el-dialog>
          </el-row>
          <div class="settings">
            <el-dialog class='filter' width="80%" :visible.sync="dialogTableVisible">
              <div class='hot'>
                <p style="margin-top: -40px" >热门标签</p>
                <ul>
                  <li>互联网</li><li>PPT</li><li>北京</li><li>美学</li>
                </ul>
              </div>
              <el-row>
                <el-col :span='8' class='rf'>
                  <p>地区</p>
                  <ul>
                    <li>天津</li><li>上海</li><li>北京</li><li>广州</li>
                  </ul>
                </el-col>
                <el-col :span='8' class='sf'>
                  <p>学科</p>
                  <ul>
                    <li>高数</li><li>线代</li><li>概率论</li><li>物理</li>
                  </ul>
                </el-col>
                <el-col :span='8' class='uf'>
                  <p>单位</p>
                  <ul>
                    <li>清华大学</li><li>北京大学</li><li>华北电力大学</li>
                  </ul>
                </el-col>
              </el-row>
            </el-dialog>
            <div class="btn1" @click="dialogTableVisible = true">热门标签</div>
            <div class="btn">热度</div><i class="el-icon-d-caret"></i>
            <div class="search">
              <input style="width:118px; background-color: #f7f7f7;border:none;height: 24px;margin-right: 18px;">
              <i class="icon el-icon-search" style="color: #bebebe;font-weight: 600;"></i>
            </div>
            <!--<div class='tab'>-->
              <!--<img :src="vh">-->
              <!--<div class='vh' @click="tab('v')"></div>-->
              <!--<div class='vh' @click="tab('h')" style="left: 65%"></div>-->
            <!--</div>-->
          </div>
          <wait-task-wrapper  v-if="circles.length === 0 && isNoCircleShow"></wait-task-wrapper>
          <no-task-text v-if="circles.length === 0 && !isNoCircleShow " text="暂无圈子"></no-task-text>
          <div :class="{'circle-v':!ifh,'circle-h':ifh}" v-for='(item,index) in circles' :key='index'>
            <div class='avatar'v-if="item.circleProPic !== ''">
              <!-- <div  :style="{background: 'url('+item.avatar+') center center/100% 100%'}"></div> -->
              <img  v-lazy="item.circleProPic" :src="item.circleProPic">
            </div>
            <div class="detail">
              <div class="detail1">
                <p class="nickName"  @click="enter(item)">{{item.circleName}}</p><i></i>
                <div></div>
              </div>
              <div class="detail2">
                <div class="hostName">圈主：<span>{{item.circleMasterName}}</span></div>
                <div class="tags">标签：<span>{{handleTags(item)}}</span></div>
              </div>
              <div class="detail3">
                <div class="intro"><span>简介：</span>{{item.circleNotices}}</div>
              </div>
            </div>
            <div class="action">
              <div class="btn2 btn3" @click.stop="joinCircle(item, index)">{{joinText(item)}}</div>
              <div  @click.stop="setAttention(item, index)" class="btn2 attention-text">{{attentionText(item)}}</div>
            </div>
          </div>
        </div>
        <div class="loading-wrapper" v-show="loadingShow">
          <loading-btn class="loadingBtn"></loading-btn>
        </div>
      </el-col>
      <el-col :span='6' :offset="1" class="el-6-wrapper">
        <div class="right" style="margin-left:13px">
          <el-row>
            <el-col :span='24'><div class="topList">圈子榜</div></el-col>
          </el-row>
          <el-row v-for='(item,index) in elites' :key='index' class="listItem">
            <div class="rank">{{index+1}}</div>
            <div class='avatar-l'><img style="width: 70px" v-lazy="item.avatar" :src="item.avatar"></div>
            <div class="words">
              <p class="nickName">飞鸟</p>
              <p class="intro"><span>简介：</span>是美丽的狗子，不是单纯的傻子。1234123412341234</p>
            </div>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <join-text ref="joinText" :item="item"></join-text>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import noTaskText from '../../Xcomponents/noTaskText.vue'
  import waitTaskWrapper from '../../Xcomponents/waitTaskWrapper.vue'
  import {getAllCircle, follow, delFollow, noConditionJoin} from '../../../api/index.js'
  import {getPosition, setStorage, getStorage} from '../../../api/util.js'
  import loadingBtn from '../../Xcomponents/loadingBtn.vue'
  import joinText from './joinText.vue'
  import $ from 'jquery'
  export default{
    data(){
      return {
        dialogTableVisible:false,
        vh:'/static/h.png',
        ifh:true,
        current:1,
        circles: [],
        path: '/tanquan/library',
        loadingShow: false,
        isLoadOnePage: true,
        isNoCircleShow: true,
        p: 1,
        pagesNumber: 1,
        elites: [],
        item: {},//将点击加入按钮的那个item传入joinText
      }
    },
    methods:{
      ...mapMutations([
        'getCircleDetailId'
      ]),
      tab(p){
        this.vh = '/static/'+p+'.png'
        this.ifh = p=='h'
      },
      tab1(n){
        this.current = n
      },
      //跳转到圈子详情页
      enter(item){
        let circleId = item.circleId
        this.getCircleDetailId(circleId)
        setStorage( 'circleDetailId',circleId)
        this.$router.push(`/circle/${circleId}`)
      },
      joinCircle (item, index) {
        let id = item.circleId
        let text = $(`.action .btn3:eq(${index})`).text()
        if (text === '直接加入') {
          if (item.joinCondition === 0) {
            this._noConditionJoin(id, index)
          }
        }else if (text === '申请加入') {
            this.item = item
            console.log(1)
            this.$refs.joinText.show()
          }
      },
      //是否已经加入圈子
      joinText (item) {
        if (item.join === 0) {
          if (item.joinCondition === 0) {
            return '直接加入'
          } else {
            return '申请加入'
          }
        } else {
          return '已加入'
        }
      },
      //设置关注
      setAttention (item, index) {
        let html = $(`.attention-text:eq(${index})`).html()
        if (html === '未关注') {
          this._follow(item.circleId, index)
        } else if (html === '已关注') {
          this._delFollow(item.circleId, index)
        }
      },
      //返回列表的关注，未关注的文案
      attentionText (item) {
        if (parseInt(item.follow) === 1) {
          return '已关注'
        } else {
          return '未关注'
        }
      },
      //关注圈子
      async _follow (id, index) {
        let objectId = id
        let type = 1
        $(`.attention-text:eq(${index})`).html('已关注')
        let result = await follow(objectId, type)
        console.log(result)
        if (result.success) {
        }
      },
      //取消关注圈子
      async _delFollow (id, index) {
        let objectId = id
        let type = 1
        $(`.attention-text:eq(${index})`).html('未关注')
        let result = await delFollow(objectId, type)
        console.log(result)
        if (result.success) {
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
      async _getCircle (p) {
        let result = await getAllCircle(p)
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
        } else {
          this.isNoCircleShow = false//让无任务文字显示
          this.loadingShow = false
        }
      },
      //无条件加入圈子
      async _noConditionJoin (id, index) {
        let result = await noConditionJoin(id)
        console.log(result)
        if (result.success) {
          this.$message({
            type: 'success',
            showClose: true,
            message: '加入成功！'
          })
          $(`.action .btn2:eq(${index})`).text('已加入')
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: result.msg
          })
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
//      setStorage('circleDetailId', '20')
//      this.$router.push(`/circle/20`)
//      return
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
      loadingBtn,
      joinText
    }
  }
</script>

<style scoped lang="stylus" rel='stylesheet/stylus'>
  #library
    padding-top 30px
    .loading-wrapper {
      margin: 50px 0;
    }
  .btn2:hover {
    color: white!important;
    background-color: #4893a8;
  }
  .el-17-wrapper
    background-color white
    padding 30px 30px
    box-sizing border-box
    border-radius 10px
    min-height 100vh
  .el-6-wrapper
    padding 30px 20px
    box-sizing border-box
    background-color white
    position relative
    left -40px
    border-radius 10px
  .tab
    margin-left 30px
    margin-bottom 27px
  .tabitem
    height 30px
    display inline-block
    list-style none
    border-left solid 1px #8a8a8a
    border-top solid 1.2px #8a8a8a
    border-bottom solid 1px #8a8a8a
    font-size 18px
    line-height 30px
    padding 0 10px
    color #8a8a8a
    cursor pointer
    user-select none
    &:last-child
      border-right solid 1px #8a8a8a
  .current
    border-top solid 2px #4893a8
    color #474747
  .settings
    margin-bottom 30px
    padding-left 44px
    margin-bottom 11px
    position relative
    .btn1
      display inline-block
      text-align center
      border solid 1px #9e9e9e
      border-radius 2px
      padding 1px 4px
      height 22px
      width 75px
      line-height 22px
      color #5b5b5b
      cursor pointer
      user-select none
    .btn
      margin-left 46px
      display inline-block
      text-align center
      border solid 1px #9e9e9e
      border-radius 2px
      padding 1px 4px
      height 22px
      width 40px
      line-height 22px
      color #5b5b5b
      cursor pointer
      user-select none
    .search
      margin-left 45px
      display inline-block
      cursor pointer
      user-select none
    .tab
      display inline-block
      position absolute
      right 75px
      .vh
        display inline-block
        position absolute
        height 100%
        width 35%
        top 0
        left 0

  .circle-h
    padding 35px 24px 25px 25px
    margin-right 45px
    border-bottom solid 1.5px #777
    .avatar
      display inline-block
      height 110px
      width 110px
      border-radius 50%
      background-color #4893a8
      overflow hidden
      img
        width 100%
    .detail
      display inline-block
      margin-left 25px
      width 458px
      .detail1
        .nickName
          display inline-block
          font-size 15.98px
          margin-bottom 10px
          cursor: pointer
          &:hover {
            color: #4893a8;
          }
      .detail2
        font-size 14.68px
        color #000
        .hostName
          display inline-block
          height 25px
          line-height 25px
        .tags
          display inline-block
        span
          color #9d9d9d
      .detail3
        font-size 15.98px
        color #9d9d9d
        line-height 30px
        margin-bottom 15px
        .intro
          margin-top 10px
          display -webkit-box
          -webkit-box-orient vertical
          -webkit-line-clamp 2
          overflow hidden
          span
            color #474747
    .action
      .btn2
        display inline-block
        color #4893a8
        border-radius 3px
        border solid 1px #4893a8
        padding 0 8px
        line-height 24px
        margin-right 49px
        margin-left 410px
        cursor pointer
        user-select none
        transition all 0.2s
        &:last-child
          margin 0
    .from
      margin-top 18px
      padding 15px 0 0 65px
      border-top solid 3px #f8f8f8
      font-size 16px
      color #6e6e6e
      user-select none
      .avatar
        vertical-align middle
        width 44px
        height 44px
        margin-left 25px
        cursor pointer
      i
        font-size 30px
        margin-left 30px
        color #6c6c6c
        vertical-align middle
        cursor pointer
  .circle-v
    position relative
    padding 35px 40px 25px 40px
    margin 0 7px 8px 0
    background-color #f8f8f8
    width 140px
    display inline-block
    border solid 2px transparent
    transition border 0.5s
    &:hover
      border solid 2px #4893a8
      .btn1
        display inline-block!important
    .avatar
      display inline-block
      height 140px
      width 140px
      background-color #4893a8
      overflow hidden
      img
        width 100%
    .detail
      text-align center
      .detail1
        .nickName
          font-size 15.98px
          margin-bottom 5px
          line-height 30px

        div
          background-color #4893a8
          height 15px
      .detail2
        font-size 14.68px
        color #000
        .hostName
          display block
          line-height 35px
        .tags
          display none
        span
          color #9d9d9d

      .detail3
        display none
    .action
      .btn2
        display inline-block
        color #4893a8
        border-radius 3px
        border solid 1.5px #4893a8
        padding 0 12px
        line-height 24px
        margin-right 20px
        cursor pointer
        user-select none
        &:last-child
          margin 0
    .from
      display none

  .topList
    color #474747
    font-size 22px
    padding-left 25px
    height 25px
    line-height 25px
    position relative
    margin-bottom 32px
    &:after
      content ""
      background-color #4893a8
      position absolute
      left 0
      width 10px
      height 25px
  .listItem
    margin-bottom 45px
    display flex
    div
      display inline-block
      vertical-align top
    .words
      flex 1
      .nickName
        line-height 18px
        height 18px
        margin-bottom 5px
        font-size 15.98px
        color #5b5b5b
      .intro
        color #9d9d9d
        line-height 25px
        font-size 14.53px
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 2
        overflow hidden
        span
          color #5b5b5b
    .rank
      flex 0 25px
      width 25px
      height 25px
      margin-right 10px
      background-color #ff0000
      font-size 22px
      color #fff
      text-align center
      line-height 25px
      display block
    .avatar-l
      flex 0 70px
      width 70px
      height 70px
      margin 0 10px 0 0

  .rf,.uf,.sf{
    margin-top: 10px;
    margin-bottom: 15px;
  }
  .filter p{
    color: #000;
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 15px;
  }
  .filter li{
    border: solid 1px #8a8a8a;
    color: #000;
    font-size: 16px;
    padding: 0 20px;
    margin: 5px 15px;
    border-radius: 15px;
  }
</style>
