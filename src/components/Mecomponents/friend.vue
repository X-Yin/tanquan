<template>
    <div class="friend">
      <div>
        <div class="item" v-for="(item, index) in friend" :key="index">
          <div class="wrapper">
            <div class="avatar-wrapper">
              <img :src="item.avatar" class="avatar">
            </div>
            <div class="description">
              <div class="name">
                <span class="friend-name">{{item.nickName}}</span>
                <span class="icon-check"></span>
                <span class="color-block"></span>
              </div>
              <div class="position">
                <span class="icon-arrow"></span>
                <span class="position-text">{{item.region}}</span>
                <span class="point">指数：{{item.point}}</span>
              </div>
              <div class="residence">
                <span class="residence-label">现居：</span>
                <span class="residence-text">{{item.residence}}</span>
                <span class="school">{{item.school}}/{{item.position}}</span>
              </div>
              <div class="detail">
                <span class="detail-label">简介：</span>
                <span class="detail-text">{{item.description}}</span>
              </div>
              <div class="settings">
                <div class="private-btn">
                  <span class="private-letter">私信</span>
                </div>
                <div class="add-friend">
                  <i class="icon-add el-icon-plus"></i>
                  <span class="add-text">好友</span>
                </div>
                <div class="subscription">
                  未订阅
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="loadingBtn-wrapper" v-show="loadingShow">
        <loading-btn class="loadingBtn"></loading-btn>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapActions} from 'vuex'
  import {getPosition} from '../../api/util.js'
  import loadingBtn from '../Xcomponents/loadingBtn.vue'
  export default {
    data () {
      return {
        p: 1,
        pagesNumber: 1,
        path: '/self/friend',
        loadingShow: false
      }
    },
    computed: {
      ...mapState([
        'friend'
      ])
    },
    created () {
      window.onscroll = null
    },
    mounted () {
      this.getSelfFriend(this.p)
    },
    methods: {
      ...mapActions([
        'getSelfFriend'
      ]),
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
              if (self.pagesNumber > self.p) {
                self.p++
                //请求下一页的数据
                self.loadMore(self.p, self.getSelfFriend)
              }
            }
          }
        }
      }
    },
    watch: {
      '$route' (newPath, oldPath) {
        if (this.$route.path === this.path) {
          this.watchScroll()
        }
      },
      friend () {
        if (this.friend !== []) {
          setTimeout(() => {
            if (this.p !== this.pagesNumber) {
              this.loadingShow = true
            }
          }, 20)
          this.watchScroll()
          this.pagesNumber = this.friend[0].pagesAll
        }
      }
    },
    components: {
      loadingBtn
    }
  }
</script>

<style scoped>
  .item {
    margin-top: 50px;
  }
  .wrapper {
    width: 100%;
    display: flex;
  }
  .avatar-wrapper {
    flex: 0 110px;
    height: 110px;
  }
  .avatar {
    width: 110px;
    height: 110px;
    border-radius: 50%;
  }
  .description {
    flex: 1;
    margin-left: 40px;
  }
  .name {
    height: 30px;
  }
  .name:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 30px;
  }
  .friend-name {
    font-size: 20px;
    color: #222;
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;
  }
  .icon-check {
    width: 25px;
    height: 25px;
    background-image: url('/static/ximages/check-number.png');
    background-size: 25px;
    background-repeat: no-repeat;
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;
  }
  .color-block {
    display: inline-block;
    vertical-align: middle;
    height: 25px;
    width: 80px;
    background-color: #4993a8;
  }
  .position {
    height: 30px;
    color: #959595;
    margin-top: 4px;
  }
  .position:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 30px;
  }
  .icon-arrow {
    display: inline-block;
    vertical-align:middle;
    width: 24px;
    height: 24px;
    margin-right: 10px;
    background-image: url('/static/ximages/arrow.png');
    background-size: 20px;
    background-position: center;
    background-repeat: no-repeat;
  }
  .position-text {
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;
  }
  .point {
    display: inline-block;
    vertical-align: middle;
  }
  .residence {
    height: 30px;
    line-height: 30px;
    color: #959595;
  }
  .residence-label {
    color: #222;
  }
  .residence-text {
    display: inline-block;
    margin-right: 20px;
  }
  .detail {
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
    color: #959595;
  }
  .detail-label {
    color: #222;
  }
  .settings {
    height: 40px;
  }
  .settings:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 40px;
  }
  .private-btn {
    display: inline-block;
    vertical-align: middle;
    height: 26px;
    border: 1.5px solid #4993a8;
    width: 60px;
    border-radius: 4px;
  }
  .private-letter {
    display: inline-block;
    width: 54px;
    height: 20px;
    font-size: 15px;
    color: white;
    line-height: 20px;
    text-align: center;
    margin: 3px;
    background-color: #4993a8;
    border-radius: 4px;
    letter-spacing: 3px;
    cursor: pointer;
  }
  .add-friend {
    margin-left: 220px;
    display: inline-block;
    vertical-align: middle;
    width: 70px;
    height: 26px;
    border: 1.5px solid #4993a8;
    color: #4993a8;
    text-align: center;
    line-height: 26px;
    border-radius: 4px;
    cursor: pointer;
  }
  .icon-add {
    font-size: 15px;
    color: #01a9ce;
  }
  .subscription {
    width: 70px;
    height: 26px;
    border: 1.5px solid #4993a8;
    color: #4993a8;
    text-align: center;
    line-height: 26px;
    margin-left: 20px;
    display: inline-block;
    vertical-align: middle;
    border-radius: 4px;
    cursor: pointer;
  }
  .item:last-child {
    margin-bottom: 50px;
  }
  .loadingBtn-wrapper {
    margin: 50px 0;
  }
</style>
