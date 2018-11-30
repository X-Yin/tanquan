<template>
  <div class="main">
    <div class="settings">
      <div class="search">
        <input type="text">
        <i class="icon el-icon-search" style="color: #bebebe;font-weight: 600;"></i>
      </div>
    </div>
    <div class="host">
      <div class="title">圈主</div>
      <div class="elites-h">
        <div class='avatar' v-if="circleMaster.userProPic !== ''">
          <img  v-lazy="circleMaster.userProPic" :src="circleMaster.userProPic">
        </div>
        <div class="detail">
          <div class="detail1">
            <p class="nickName">{{circleMaster.userName}}</p><i></i>
            <div></div>
          </div>
          <div class="detail2">
            <div class="gender"></div>
            <div class="point">指数：{{circleMaster.userActiveness}}</div>
          </div>
          <div class="detail3">
            <div class="residence"><span>现居&nbsp</span>{{circleMaster.userLocation}}</div>
            <!--<div class="school">{{circleMaster.school}}/{{circleMaster.position}}</div>-->
            <div class="intro"><span>简介：</span>{{circleMaster.userSignDec}}</div>
          </div>
        </div>
        <div class="btn1"><p style="cursor: pointer">私信</p></div>
      </div>
    </div>
    <div class="admin" v-if="circleManager.length !== 0">
      <div class="title">管理员</div>
      <div class="height-wrapper" :class="{'fold': !isFold}">
        <div class="height-wrapper1">
          <div class="elites-h" v-for='(item,index) in circleManager' :key='index'>
            <div class='avatar'v-if="item.userProPic !== ''">
              <img  v-lazy="item.userProPic" :src="item.userProPic">
            </div>
            <div class="detail">
              <div class="detail1">
                <p class="nickName">{{item.userName}}</p><i></i>
                <div></div>
              </div>
              <div class="detail2">
                <div class="gender"></div>
                <div class="point">指数：{{item.userActiveness}}</div>
              </div>
              <div class="detail3">
                <div class="residence"><span>现居&nbsp</span>{{item.userLocation}}</div>
                <div class="intro"><span>简介：</span>{{item.userSignDec}}</div>
              </div>
            </div>
            <div class="btn1"><p style="cursor: pointer">私信</p></div>
            <div class="deleteManager" v-if="isManagement" @click="popConfirmText(item)">撤销</div>
          </div>
        </div>
      </div>
      <div class="fold-wrapper" v-if="circleManager.length > 3">
        <div class="fold-btn" v-html="isFold ? '查看更多' : '收起'" @click="toggleFold"></div>
      </div>
    </div>
    <div class="member">
      <div class="title">成员</div>
      <div class="elites-v" v-for='(item,index) in circleMember' :key='index'>
        <div class="deleteMember" v-if="isManagement"><span class="color-block"></span><span class="delete-text">移除</span></div>
        <div class='avatar'>
          <img  v-lazy="item.userProPic" :src="item.userProPic">
        </div>
        <div class="detail">
          <div class="detail1">
            <p class="nickName">{{item.userName}}</p><i></i>
            <div class="block"></div>
          </div>
          <div class="detail2">
            <div class="gender"></div>
            <div class="point">指数：{{item.point}}</div>
          </div>
          <div class="detail3">
            <div class="residence"><span>现居&nbsp</span><span class="borderLine">{{item.userLocation}}</span></div>
            <div class="intro"><span>简介：</span>{{item.userSignDec}}</div>
          </div>
        </div>
        <div class="btn1"><p style="cursor: pointer">私信</p></div>
      </div>
      <div class="loading-wrapper" v-show="loadingShow">
        <loading-btn class="loadingBtn"></loading-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {getCircleMaster, getCircleManager, getCircleMember} from '../../../api/index.js'
  import {getStorage, getPosition} from '../../../api/util.js'
  import noTaskText from '../../Xcomponents/noTaskText.vue'
  import waitTaskWrapper from '../../Xcomponents/waitTaskWrapper.vue'
  import {reqUserCircles, quitCircle, delCircle} from '../../../api/index.js'
  import loadingBtn from '../../Xcomponents/loadingBtn.vue'
  import $ from 'jquery'
  export default{
    data(){
      return{
        circleMaster: {},
        circleManager: [],
        circleMember: [],
        isFold: true,//是否折叠管理员
        path: /\/circle\/\w*\/member/,
        loadingShow: false,
        isLoadOnePage: true,
        isNoCircleShow: true,
        p: 1,
        pagesNumber: 1,
      }
    },
    methods:{
      toggleFold () {
        if (this.isFold) {//展开折叠
          this.isFold = false
          let height1 = $('.admin .title').height()
            let height2 = $('.height-wrapper1').height()
            let height3 = $('.fold-wrapper').height()
            $('.admin').css('height', height1 + height2 + height3 + 'px')
          $('.height-wrapper').css('height', height2 + 'px')
        } else {//折叠
          this.isFold = true
          $('.admin').css('height', '660.2px')
          $('.height-wrapper').css('height', 189.8 * 3 + 'px')
        }
      },
      //获取圈主
      async _getCircleMaster () {
        let circleId = getStorage('circleDetailId')
        let result = await getCircleMaster(circleId)
        console.log(result)
        if (result.success) {
          this.circleMaster = result.data
        }
      },
      //获取管理员
      async _getCircleManager () {
        let circleId = getStorage('circleDetailId')
        let result = await getCircleManager(circleId)
        console.log(result)
        if (result.success) {
          this.circleManager = result.data
        }
      },
      //获取圈子成员
      async _getCircleMember (p) {
        let circleId = getStorage('circleDetailId')
        let result = await getCircleMember(circleId, p)
        console.log(result)
        if (result.success) {
          let circles = this.circleMember.slice()
          if (result.data.list.length === 0) {
            this.isNoTaskShow = false//让无任务文字显示
            this.loadingShow = false
          } else {
            circles = circles.concat(result.data.list)
            this.circleMember = circles
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
                  self.loadMore(self.p, self._getCircleMember)
                }
              }
            }
          }
        }
      },
    },
    computed: {
      ...mapState([
        'isManagement'
        ])
    },
    watch: {
      '$route'() {
        if (this.path.test(this.$route.path)) {
          this.watchScroll()
        }
      },
      circleMember () {
        if (this.circleMember !== []) {
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
      this._getCircleMember(this.p)
      this._getCircleMaster()
      this._getCircleManager()
    },
    components: {
      noTaskText,
      waitTaskWrapper,
      loadingBtn
    }
  }
</script>

<style lang="stylus" rel="sheetstylus" scoped>
  .borderLine {
    display: inline-block;
    vertical-align: bottom;
    width: 70px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .deleteManager {
    position: absolute;
    z-index: 3;
    right: 0;
    top: 90px;
    width: 66px;
    height: 25px;
    border: 1px solid #4893a8;
    cursor: pointer;
    color: #4893a8;
    text-align: center;
    line-height: 25px;
    transition: all 0.2s;
    border-radius: 3px;
  }
  .deleteManager:hover {
    color: white;
    background-color: #4893a8;
  }
  .deleteMember {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 0;
    opacity: 0;
    transition: all 0.2s;
  }
  .elites-v:hover .deleteMember {
    opacity: 1;
    left: -29px;
  }
  .color-block {
    display: inline-block;
    vertical-align: top;
    width: 3px;
    height: 50px;
    background-color: #4893a8;
  }
  .delete-text {
    display: inline-block;
    vertical-align: top;
    padding-top: 3px;
    box-sizing: border-box;
    width: 24px;
    height: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
  }
  .admin {
    height: auto;
   
  }
 .fold-wrapper {
   height: 70px;
   width: 100%;
   position: relative;
 }
 .fold-btn {
   position: absolute;
   top: 30px;
   right: 60px;
   width: 80px;
   height: 24px;
   text-align: center;
   line-height: 24px;
   border: 1px solid #4893a8;
   color: #4893a8;
   cursor: pointer;
   border-radius: 3px;
 }
 .fold-btn:hover {
   color: white;
   background-color: #4893a8;
 }
 .height-wrapper {
   /*height: 569.4px;*/
   overflow: hidden;
 }
 .height-wrapper.fold {
   min-height: 569.4px;
   overflow: visible;
 }
.main
  padding-right 46px
.settings
  margin-bottom 30px
  margin-bottom 23px
  position relative
  .search
    margin-left 20px
    display inline-block
    input
      width 208px
      background-color #f7f7f7
      border none
      height 22px
      margin-right 18px
.elites-h
  padding 32px 0 20px 0
  margin-right 45px
  position relative
  border solid 2px transparent
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
        margin-top 10px
        span
          color #474747
  .btn1
    position absolute
    margin-left 142px
    display inline-block
    height 22px
    width 63px
    border solid 1.5px #4893a8
    padding 1px
    border-radius 3px
    top 32px
    right 0
    p
      text-align center
      color #fff
      background-color #4893a8
      line-height 22.5px
.elites-v
  position relative
  display inline-block
  width 102px
  height 169px
  margin 17px 35px 16px 0
  padding 13px 15px
  font-size 12.84px
  text-align center
  border solid #eee 1px
  &:hover .btn1
    display block
  .avatar
    width 100px
    height 100px
    background-color #4893a8
    border-radius 50%
    overflow hidden
    margin-bottom 18px
    img
      width 100%
  .intro,.point,.region,.school
    display none
  .nickName
    color #5b5b5b
    height 14px
    line-height 14px
  .block
    height 12px
    background-color #4893a8
    margin 7px 0 8px 0
  .residence
    color #9d9d9d
    span
      color #6e6e6e
  .btn1
    position absolute
    display none
    top 35.5px
    left 38px
    height 55px
    width 55px
    color #fff
    font-size 15.98px
    text-align center
    line-height 55px
    border-radius 50%
    background-color rgba(0,0,0,0.5)

.title
  margin-left 34px
  margin-right 550px
  display inline-block
  width 52px
  text-align center
  font-size 15.98px
  height 16px
  line-height 16px
  color #8a8a8a
  position relative
  &:before
    content ""
    height 3px
    width 30px
    background-color #8a8a8a
    position absolute
    left -34px
    top 6.5px
  &:after
    content ""
    height 3px
    width 540px
    background-color #8a8a8a
    position absolute
    right -550px
    top 6px

</style>
