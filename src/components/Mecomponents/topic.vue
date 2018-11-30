<template>
    <div class="topic">
      <div>
        <div class="item" v-for="(item, index) in topic" :key="index">
          <div class="time-text">关注了话题&nbsp;&nbsp;{{item.time}}</div>
          <div class="topic-text">#{{item.project}}#</div>
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
        path: '/self/topic',
        loadingShow: false
      }
    },
    computed: {
      ...mapState([
        'topic'
      ])
    },
    created () {
      window.onscroll = null
    },
    mounted () {
      this.getSelfTopic(this.p)
    },
    methods: {
      ...mapActions([
        'getSelfTopic'
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
                self.loadMore(self.p, self.getSelfTopic)
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
      topic () {
        if (this.topic !== []) {
          setTimeout(() => {
            if (this.p !== this.pagesNumber) {
              this.loadingShow = true
            }
          }, 20)
          this.watchScroll()
          this.pagesNumber = this.topic[0].pagesAll
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
  .topic-text {
    color: #4993a8;
    margin-top: 30px;
    font-size: 24px;
    margin-left: 42.5px;
  }
  .loadingBtn-wrapper {
    margin: 50px 0;
  }
  .item:last-child {
    margin-bottom: 50px;
  }
</style>
