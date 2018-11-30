<template>
  <div class="elite">
    <el-row class="container wrapper" >
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
          </div>
          <wait-task-wrapper  v-if="elites.length === 0 && isNoCircleShow"></wait-task-wrapper>
          <no-task-text v-if="elites.length === 0 && !isNoCircleShow " text="暂无精英"></no-task-text>
          <div>
            <div :class="{'elites-v':!ifh,'elites-h':ifh}" v-for='(item,index) in elites' :key='index' class="elite-item">
              <div class='avatar' v-show="item.userProPic !== ''">
                <!-- <div  :style="{background: 'url('+item.avatar+') center center/100% 100%'}"></div> -->
                <img  v-lazy="item.userProPic" :src="item.userProPic">
              </div>
              <div class="detail">
                <div class="detail1">
                  <p class="nickName">{{item.userName}}</p><i></i>
                  <div></div>
                </div>
                <div class="detail2">
                  <div class="gender"></div>
                  <div class="point">指数：{{item.memberActiveness}}</div>
                </div>
                <div class="detail3">
                  <div class="residence" v-if="item.userLocation"><span>现居&nbsp</span>{{item.userLocation}}</div>
                  <div class="school">
                    <!--{{item.school}}/-->
                    {{item.position}}
                  </div>
                  <div class="intro" v-if="item.userSignDec"><span>简介：</span>{{item.userSignDec}}</div>
                </div>
              </div>
              <div class="action">
                <div class="btn1" @click="_getRoomInfo(item)">私信</div>
                <div class="btn2">+好友</div><div class="btn2">未订阅</div>
              </div>
              <div class="from">
                来自圈子：&nbsp;{{handleCircleName(item)}}
              </div>
            </div>
          </div>
          <div class="loading-wrapper" v-show="loadingShow">
            <loading-btn class="loadingBtn"></loading-btn>
          </div>
        </div>
      </el-col>
      <el-col :span='6' :offset="1" class="el-6-wrapper">
        <div class="right" style="margin-left:13px">
          <el-row>
            <el-col :span='24'><div class="topList">圈子精英榜</div></el-col>
          </el-row>
          <div class="list-item" v-for="(item, index) in 5">
            <div class="rank-item">{{index + 1}}</div>
            <div class="elite-avatar-wrapper">
              <img src="/static/ximages/妹纸.jpg" class="elite-avatar">
            </div>
            <div class="elite-des">
              <div class="des-name">不会飞的鱼</div>
              <div class="des-detail">
                <span class="des-detail-title">简介:</span>
                <span class="des-detail-text">走自己的路让别人无路可走</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import icons from '../../common/icons.vue'
  import noTaskText from '../../Xcomponents/noTaskText.vue'
  import waitTaskWrapper from '../../Xcomponents/waitTaskWrapper.vue'
  import {reqUserElite, getRoomInfo} from '../../../api/index.js'
  import {getPosition, setStorage} from '../../../api/util.js'
  import loadingBtn from '../../Xcomponents/loadingBtn.vue'
  export default{
    data(){
      return {
        dialogTableVisible:false,
        vh:'/static/h.png',
        ifh:true,
        current:1,
        elites: [],
        path: '/tanquan/elite',
        loadingShow: false,
        isLoadOnePage: true,
        isNoCircleShow: true,
        p: 1,
        pagesNumber: 1,
      }
    },
    methods:{
      //点击私信按钮，获取roomid和roonName
      async _getRoomInfo(item) {
        let result = await getRoomInfo(item.userId);
        console.log(result);
        if (result.success) {
          setStorage('privateLetterDetailId', result.data.roomId);
          setStorage('privateLetterChatRoomName', result.data.roomName);
          this.$router.push(`/privateletter/${result.data.roomId}`)
        }
      },
      tab(p){
        this.vh = '/static/'+p+'.png'
        this.ifh = p=='h'
      },
      tab1(n){
        this.current = n
        this.$store.dispatch('getElites')
      },
      //处理标签
      handleCircleName (item) {
        let names = []
        item.circleIdAndName.forEach((item) => {
          names.push(item.circleName)
        })
        if (item.circleIdAndName.length >= 3) {
          return names.slice(0, 3).join(',')
        } else {
          return names.slice(0, 3).join(',')
        }
      },
      async _getElite (p) {
        let result = await reqUserElite(p)
        console.log(result)
        if (result.success) {
          let circles = this.elites.slice()
          if (result.data.list.length === 0) {
            this.isNoCircleShow = false//让无任务文字显示
            this.loadingShow = false
          } else {
            circles = circles.concat(result.data.list)
            this.elites = circles
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
                  self.loadMore(self.p, self._getElite)
                }
              }
            }
          }
        }
      },
    },
    created () {
      window.onscroll = null
    },
    mounted(){
      this._getElite(this.p)
    },
    watch: {
      '$route'() {
        if (this.$route.path === this.path) {
          this.watchScroll()
        }
      },
      elites () {
        if (this.elites !== []) {
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
    }
  }
</script>

<style scoped lang="stylus" rel='stylesheet/stylus'>
  .el-17-wrapper {
    min-height: 100vh;
  }
  .list-item {
    padding: 15px 0;
    display: flex;
  }
  .rank-item {
    flex: 0 20px;
    width: 20px;
    height: 20px;
    background-color: #8B0000;
    text-align: center;
    line-height: 20px;
    color: white;
    font-size: 15px;
    margin-top: 12.5px;
  }
  .elite-avatar-wrapper {
    flex: 0 45px;
    margin-left: 10px;
  }
  .elite-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  .elite-des {
    flex: 1;
    margin-left: 10px;
  }
  .des-name {
    height: 24px;
    color: #777;
    font-size: 15px;
    cursor: pointer;
  }
  .des-name:hover {
    color: #4893a8;
  }
  .des-detail {
    font-size: 14px;
    color: #a5a5a5;
    width: 147.5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .loading-wrapper {
    margin: 50px 0;
  }
  .elite-item:last-child {
    margin-bottom: 50px;
  }
  .btn1:hover {
    color: white!important;
    background-color: #4893a8;
  }
  .from {
    color: #ccc !important;
  }
  .btn2:hover {
    color: white!important;
    background-color: #4893a8;
  }
  .action .btn1 {
    text-align: center;
    color: #4893a8;
    transition: all 0.2s;
  }
 .elite
   padding-top 30px
 .el-17-wrapper {
   background-color: white;
   padding: 30px 30px;
   box-sizing: border-box;
   border-radius: 10px;
 }
 .el-6-wrapper {
   padding: 30px 20px;
   box-sizing: border-box;
   background-color: white;
   position: relative;
   left: -40px;
   border-radius: 10px;
 }
 ul
  margin-left 30px
 li
  height 30px
  display inline-block
  list-style none
  border-left solid 1px #8a8a8a
  border-top solid 1px #8a8a8a
  border-bottom solid 1px #8a8a8a
  font-size 18px
  line-height 30px
  padding 0 10px
  color #8a8a8a
  &:last-child
    border-right solid 1px #8a8a8a
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
    color #4893a8
    cursor pointer
    user-select none
    transition: all 0.2s;
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
    cursor pointer
    user-select none
    .vh
      display inline-block
      position absolute
      height 100%
      width 35%
      top 0
      left 0
 .elites-h
  padding 35px 24px 25px 25px
  margin-right 45px
  border-bottom solid 1.5px #777;
  .avatar
    display inline-block
    vertical-align: top
    height 110px
    width 110px
    border-radius 50%
    background-color #4893a8
    overflow hidden
    img
      width 100%
  .detail
    display inline-block
    vertical-align: top
    margin-left 25px
    width 458px
    .detail1
      .nickName
        display inline-block
        font-size 15.98px
        margin-bottom 5px
    .detail2
      font-size 14.68px
      color #9d9d9d
      .gender
        display inline-block
      .region
        display inline-block
        height 25px
        line-height 25px
      .point
        display inline-block
    .detail3
      font-size 15.98px
      color #9d9d9d
      line-height 30px
      margin-bottom 15px
      .residence
        display inline-block
        span
          color #474747
      .school
        display inline-block
      .intro
        margin-top 5px
        span
          color #474747
  .action
    .btn1
      margin-left 142px
      display inline-block
      height 22px
      line-height 22px
      width 63px
      border solid 1.5px #4893a8
      padding 1px
      border-radius 3px
      cursor pointer
      user-select none
    .btn2
      display inline-block
      color #4893a8
      border-radius 3px
      border solid 1.5px #4893a8
      padding 0 8px
      line-height 24px
      margin-right 20px
      margin-left 225px
      cursor pointer
      user-select none
      transition: all 0.2s;
      &:last-child
        margin 0
  .from
    margin-top 30px
    font-size 16px
    color #474747
    span
      color #9d9d9d
      text-decoration underline
      cursor pointer
      user-select none

 .elites-v
  position relative
  padding 35px 35px 25px 35px
  margin 0 7px 8px 0
  background-color #f8f8f8
  width 150px
  display inline-block
  border solid 2px transparent
  transition border 0.5s
  &:hover
    border solid 2px #4893a8
    .btn1
      display inline-block!important
  .avatar
    display inline-block
    height 150px
    width 150px
    border-radius 50%
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
    .detail2
      font-size 14.68px
      color #9d9d9d
      .gender
        display inline-block
      .region
        display none
      .point
        display none
    .detail3
      font-size 15.98px
      color #9d9d9d
      line-height 30px
      margin-bottom 15px
      .residence
        display inline-block
        span
          color #474747
      .school
        display none
      .intro
        display none
  .action
    .btn1
      display none
      top 8px
      right 6px
      position absolute
      height 16px
      width 44px
      border solid 1.5px #4893a8
      padding 1px
      border-radius 3px
      cursor pointer
      user-select none
      p
        font-size 11.36px
        text-align center
        color #fff
        background-color #4893a8
        line-height 16px
    .btn2
      display inline-block
      color #4893a8
      border-radius 3px
      border solid 1.5px #4893a8
      padding 0 8px
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
    position  absolute
    left  0
    width 10px
    height 25px
 .listItem
  margin-bottom 45px
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
    span
      color #5b5b5b
  .avatar-l
    height 70px
    width 70px
    border-radius 50%
    background-color #4893a8
  .rank
    width 25px
    height 25px
    background-color #ff0000
    font-size 22px
    color #fff
    text-align center
    line-height 25px
 .rf,.uf,.sf
  margin-top 10px
  margin-bottom 15px
 .filter
  p
    color #000
    font-weight 600
    font-size 16px
    margin-bottom 15px
  li
    display inline-block
    list-style none
    border solid 1px #8a8a8a
    color #000
    font-size 16px
    padding 0 20px
    margin 5px 15px
    border-radius 15px
 </style>
