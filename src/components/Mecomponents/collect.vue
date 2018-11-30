<template>
    <div class="collect">
      <div>
        <div  class="item" v-for="(item, index) in collect" :key="index">
          <div class="title">
            <span class="color-block"></span>
            <span class="title-text">{{item.title}}</span>
          </div>
          <div class="detail">
            <span class="time">创建于{{item.time}}</span>
            <span class="num">{{item.collectNum}}个收藏</span>
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
        path: '/self/collect',
        loadingShow: false
      }
    },
    computed: {
      ...mapState([
        'collect'
      ])
    },
    created () {
      window.onscroll = null
    },
    mounted () {
      this.getSelfCollect(this.p)
    },
    methods: {
      ...mapActions([
        'getSelfCollect'
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
                self.loadMore(self.p, self.getSelfCollect)
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
      collect () {
        if (this.collect !== []) {
          setTimeout(() => {
            if (this.p !== this.pagesNumber) {
              this.loadingShow = true
            }
          }, 20)
          this.watchScroll()
          this.pagesNumber = this.collect[0].pagesAll
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
    margin-top: 40px;
  }
  .title {
    height: 30px;
  }
  .title:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 30px;
  }
  .color-block {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 25px;
    background-color: #4993a8;
  }
  .title-text {
    color: #222;
    font-size: 20px;
    display: inline-block;
    margin-left: 20px;
  }
  .detail {
    height: 30px;
    line-height: 30px;
    color: #959595;
    margin-top: 20px;
  }
  .num {
    display: inline-block;
    margin-left: 50px;
  }
  .loadingBtn-wrapper {
    margin: 50px 0;
  }
  .item:last-child {
    margin-bottom: 50px;
  }
</style>
