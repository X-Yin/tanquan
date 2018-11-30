<template>
    <div class="circle">
      <wait-task-wrapper  v-if="circle.length === 0 && isNoCircleShow"></wait-task-wrapper>
      <no-task-text v-if="circle.length === 0 && !isNoCircleShow " text="暂无圈子"></no-task-text>
      <div>
        <div class="item" v-for="(item, index) in circle" :key="index">
          <div class="circle">
            <div class="wrapper">
              <div class="circle-avatar-wrapper" v-if="item.circleProPic !== ''">
                <img v-lazy="item.circleProPic" class="circle-avatar">
              </div>
              <div class="circle-description">
                <div class="title">
                  <div class="title-name" @click="enter(item)">{{item.circleName}}</div>
                  <div class="check-icon"></div>
                </div>
                <div class="circle-detail">
                  <span class="circler">圈主：</span>
                  <span class="circler-name">{{item.circleMasterName}}</span>
                  <span class="label">标签：</span>
                  <span class="label-text">{{handleTags(item.circleTag)}}</span>
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
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {getPosition, getStorage, setStorage} from '../../api/util.js'
  import loadingBtn from '../Xcomponents/loadingBtn.vue'
  import noTaskText from '../Xcomponents/noTaskText.vue'
  import waitTaskWrapper from '../Xcomponents/waitTaskWrapper.vue'
  import {getUserCircle} from '../../api/index.js'
  export default {
    data () {
      return {
        path: '/self/circle',
        loadingShow: false,
        isLoadOnePage: true,
        isNoCircleShow: true,
        circle: [],
        p: 1,
        pagesNumber: 1,
      }
    },
    created () {
      window.onscroll = null
    },
    computed: {
    },
    mounted () {
      this._getCircle(this.p)
    },
    methods: {
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
      //处理标签
      handleTags (tags) {
        if (tags.length >= 2) {
          return tags.slice(0, 3).join(',')
        } else {
          return tags.join(',')
        }
      },
      async _getCircle (p) {
        let personPageId = getStorage('personPageId')
        console.log(personPageId, p)
        let result = await getUserCircle(personPageId, p)
        console.log(result)
        if (result.success) {
          let tasks = this.circle.slice()
          if (result.data.list.length === 0) {
            this.isNoCircleShow = false//让无任务文字显示
            this.loadingShow = false
          } else {
            tasks = tasks.concat(result.data.list)
            this.circle = tasks
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
    watch: {
      '$route' (newPath, oldPath) {
        if (this.$route.path === this.path) {
          this.watchScroll()
        }
      },
      circle () {
        if (this.circle !== []) {
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
      loadingBtn,
      waitTaskWrapper,
      noTaskText,
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
  .wrapper {
    display: flex;
    width: 100%;
    margin-top: 30px;
  }
  .circle-avatar-wrapper {
    flex: 0 150px;
    height: 66px;
  }
  .circle-avatar {
    width: 60px;
    height: 60px;
    margin: 0 42.5px;
    display: inline-block;
  }
  .circle-description {
    flex: 1;
    height: 65px;
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
  .title-name {
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    color: #8f8f8f;
    cursor: pointer;
  }
  .title-name:hover {
    color: #4893a8;
  }
  .check-icon {
    display: inline-block;
    vertical-align: middle;
    width: 25px;
    height: 25px;
    background-image: url('/static/ximages/check-icon-blue.png');
    background-size: 25px;
    background-repeat: no-repeat;
    margin: 0 10px;
  }
  .color-block {
    width: 100px;
    height: 25px;
    display: inline-block;
    vertical-align: middle;
    background-color: #4993a8;
    margin-left: 20px;
  }
  .circle-detail {
    height: 35px;
  }
  .circle-detail:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 35px;
  }
  .circler, .circler-name, .label, .label-text {
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
  }
  .circler, .label {
    color: #222;
  }
  .circler-name {
    margin-right: 20px;
  }
  .circler-name, .label-text {
    color: #9e9e9e;
  }
  .loadingBtn-wrapper {
    margin: 50px 0;
  }
  .item:last-child {
    margin-bottom: 50px;
  }
</style>
