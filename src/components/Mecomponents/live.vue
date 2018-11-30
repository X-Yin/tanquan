<template>
    <div class="live">
      <div>
        <div class="item" v-for="(item, index) in live">
          <div class="time-text">发起了live&nbsp;&nbsp;{{item.time}}</div>
          <div class="wrapper1">
            <div class="live-question">{{item.question}}</div>
            <div class="live-launcher">
              <span class="live-launcher-text">发起人:</span>
              <span class="live-launcher-name">{{item.launcher}}</span>
              <span class="live-attentionNum">{{item.attentioners}}</span>
              <span class="live-attention">人关注</span>
            </div>
            <div class="live-label">
              <span class="live-label-text">标签:</span>
              <span class="live-label-name">{{item.label}}</span>
            </div>
            <div class="live-description">
              {{item.description}}...
              <span class="live-detail-btn">详情</span>
            </div>
          </div>
          <div class="setting">
            <div class="forward">
              <i class="icon"></i>
              <span class="text">转发 ({{item.forward}})</span>
            </div>
            <div class="comment">
              <i class="icon"></i>
              <span class="text">评论 ({{item.comment}})</span>
            </div>
            <div class="thumbUp">
              <i class="icon"></i>
              <span class="text">评论 ({{item.thumbUp}})</span>
            </div>
            <div class="collect">
              <i class="icon"></i>
              <span class="text">收藏 ({{item.collect}})</span>
            </div>
            <div class="uninterest">
              不感兴趣
            </div>
            <div class="more">
              <i class="el-icon-more more-icon"></i>
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
        path: '/self/live',
        loadingShow: false
      }
    },
    computed: {
      ...mapState([
        'live'
      ])
    },
    created ()  {
      window.onscroll = null
    },
    mounted () {
      this.getSelfLive(this.p)
    },
    methods: {
      ...mapActions([
        'getSelfLive'
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
              self.loadMore(self.p, self.getSelfLive)
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
      live () {
        if (this.live !== []) {
          setTimeout(() => {
            if (this.p !== this.pagesNumber) {
              this.loadingShow = true
            }
          }, 20)
          this.watchScroll()
          this.pagesNumber = this.live[0].pagesAll
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
    margin-top: 30px;
  }
  .time-text {
    color: #8a8a8a;
    font-size: 20px;
    height: 40px;
    line-height: 40px;
  }
  .wrapper1 {
    margin-left: 42.5px;
    margin-top: 30px;
  }
  .live-question{
    font-size: 20px;
    color: #222;
  }
  .live-launcher{
    height: 30px;
    margin-top: 10px;
  }
  .live-launcher-text{
    color: #6e6e6e;
  }
  .live-launcher-name{
    color: #afacaa;
  }
  .live-attentionNum{
    display: inline-block;
    margin-left: 30px;
    color: #01a9ce;
    text-decoration: underline;
  }
  .live-attention{
    color: #bab9b8;
  }
  .live-label{
    height: 30px;
    line-height: 30px;
  }
  .live-label-text{
    color: #555555;
  }
  .live-label-name{
    color: #9b9796;
  }
  .live-description{
    margin-top: 5px;
    color: #5a5a5a;
    line-height: 30px;
  }
  .live-detail-btn{
    cursor: pointer;
    color: #01a9ce;
    text-decoration: underline;
  }
  .setting {
    width: 100%;
    height: 50px;
    margin-top: 30px;
  }
  .setting:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 50px;
  }
  .forward, .comment, .collect, .thumbUp, .uninterest, .more {
    display: inline-block;
    vertical-align: middle;
    margin-left: 30px;
  }
  .forward {
    margin-left: 42.5px;
  }
  .forward:before, .comment:before, .collect:before, .thumbUp:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height:  50px;
  }
  .icon {
    display: inline-block;
    vertical-align: middle;
    width: 25px;
    height: 25px;
    background-color: #4993a8;
    margin-right: 10px;
  }
  .text {
    display: inline-block;
    vertical-align: middle;
    color: #6c6c6c;
    font-size: 18px;
  }
  .uninterest {
    height:  50px;
    line-height: 50px;
    font-size: 15px;
    color: #a5a5a5;
    margin-left: 70px;
  }
  .more-icon {
    color: rgb(108,108,108);
    font-size: 20px;
  }
  .loadingBtn-wrapper {
    margin: 50px 0;
  }
  .item:last-child {
    margin-bottom: 50px;
  }
</style>
