<template>
  <div class="notMeOtherAnswer">
    <div class="answer-item" v-for="(item, index) in otherAnswer" :key="index">
      <div class="wrapper">
        <div class="avatar-wrapper">
          <div class="avatar-container">
            <img :src="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </div>
        </div>
        <div class="answer-wrapper">
          <transition name="fade">
            <div class="answer-1">{{answerContent(item)}}<span class="unfold-btn" @click="unfoldContent(index)">展开<i class="el-icon-arrow-down"></i></span></div>
          </transition>
          <div class="answer-unfold-wrapper" style="height: 0">
            <div class="answer-unfold-container">
              <div class="answer-unfold"></div>
              <div class="collapse-btn-wrapper">
                <span class="collapse-btn" @click="collapseContent(index)">收起<i class="el-icon-arrow-up"></i></span>
              </div>
            </div>
          </div>
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
          <span class="text">点赞 ({{item.thumbUp}})</span>
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
    <div class="loadingBtn-wrapper" v-show="loadingShow">
      <loading-btn class="loadingBtn"></loading-btn>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import {reqOtherAnswer} from '../../api/index.js'
  import loadingBtn from './loadingBtn.vue'
  import {getPosition, getStorage} from '../../api/util.js'
  export default {
    data () {
      return {
        p: 1,
        pagesNumber: 1,
        path: /\/tanqiu\/taskDetail\/\w*\/notMeOtherAnswer/,
        loadingShow: false,
        isLoadOnePage: true
      }
    },
    created () {
      window.onscroll = null
    },
    mounted () {
      this._getNotMeOtherAnswer(this.p)
    },
    computed: {
      ...mapState([
        'taskDetailId',
        'notMeOtherAnswer'
      ])
    },
    methods: {
      ...mapMutations([
        'getNotMeOtherAnswer'
      ]),
      //收起接单申请的内容
      collapseContent (index) {
        $(`.notMeOtherAnswer .answer-unfold-wrapper:eq(${index})`).animate({height: 0}, 200)
        setTimeout(() => {
          $(`.notMeOtherAnswer .answer-1:eq(${index})`).css('display','block')
          $(`.notMeOtherAnswer .answer-unfold-wrapper:eq(${index})`).removeClass('current')
        }, 200)
      },
      //展开接单申请的内容
      unfoldContent (index) {
        $(`.notMeOtherAnswer .answer-1:eq(${index})`).css('display','none')
        setTimeout(() => {
          let height = $(`.answer-unfold-wrapper .answer-unfold-container:eq(${index})`).height()
          let height1 = $(`.answer-unfold:eq(${index})`).height()
          let height2 = $(`.collapse-btn-wrapper:eq(${index})`).height() + 30
          $(`.notMeOtherAnswer .answer-unfold-wrapper:eq(${index})`).addClass('current').animate({height: height1 + height2 + 'px'}, 200)
        }, 20)
      },
      //将html内容只提取文字，用来显示折叠以后的内容
      answerContent (item) {
        let content = item.answerContent
        let ret = /<[^>]+>/g//去掉所有标签
        let ret1 = /&\w*;/g
        if (ret.test(content)) {
          content = content.replace(ret, '')
          content = content.replace(ret1, '')
          if (content.length >= 100) {
            return content.substring(0, 100) + '...'
          } else {
            return content
          }
        } else {
          return ''
        }
      },
      async _getNotMeOtherAnswer (p) {
        let result = await reqOtherAnswer(p, id)
        console.log(result)
        if (result.success) {
          this.isLoadOnePage = true
          let notMeOtherAnswer = this.notMeOtherAnswer.concat(result.data.list)
          this.getNotMeOtherAnswer(notMeOtherAnswer)
          this.pagesNumber = result.data.lastPage
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
              if (self.pagesNumber > self.p) {
                if (self.isLoadOnePage) {
                  self.isLoadOnePage = false
                  self.p++
                  //请求下一页的数据
                  self.loadMore(self.p, self._getNotMeOtherAnswer)
                }
              }
            }
          }
        }
      },

    },
    watch: {
      '$route' () {
        if (this.path.test(this.$route.path)) {
          this.watchScroll()
        }
      },
      otherAnswer () {
        if (this.otherAnswer !== []) {
          setTimeout(() => {
            if (this.p !== this.pagesNumber) {
              this.loadingShow = true
            }
          }, 20)
          //将申请的html内容渲染到页面上
          setTimeout(() => {
            let length = this.notMeOtherAnswer.length
            for (let i = 0; i < length; i++) {
              $(`.answer-unfold:eq(${i})`).html(this.notMeOtherAnswer[i].answerContent)
            }
          }, 20)
          this.watchScroll()
        }
      }
    },
    components: {
      loadingBtn
    }
  }
</script>

<style scoped>
  .otherAnswer {
    margin-top: 50px;
    width: 100%;
  }
  .answer-item {
    width: 100%;
    margin-bottom: 50px;
    padding-bottom: 30px;
    border-bottom: 2px solid #e3e3e3;
  }
  .wrapper {
    display: flex;
    width: 100%;
  }
  .avatar-wrapper {
    flex: 0 110px;
    height: 100px;
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 30px;
  }
  .name {
    width: 100%;
    text-align: center;
    color: #01a9ce;
    display: inline-block;
    margin-top: 20px;
    text-decoration: underline;
  }
  .answer-wrapper {
    flex: 1;
    color: #6c6c6c;
    font-size: 18px;
    line-height: 35px;
    margin-left: 30px;
    position: relative;
    top: -8px;
  }
  .answer-wrapper {
    flex: 1;
    /*line-height: 35px;*/
    margin-left: 30px;
    position: relative;
    top: -8px;
    word-break: break-all;
  }
  .answer-1 {
    color: #6c6c6c;
    font-size: 18px;
  }
  .unfold-btn {
    display: inline-block;
    cursor: pointer;
    margin-left: 20px;
    color: #01a9ce;
  }
  .unfold-btn:hover, .collapse-btn:hover {
    color: #4893a8;
  }
  .answer-unfold-wrapper {
    overflow: hidden;
  }
  .answer-unfold-wrapper.current {
  }
  .answer-unfold {
    word-break: break-all;
  }
  .collapse-btn-wrapper {
    width: 100%;
    height: 50px;
    margin-top: 30px;
    position: relative;
  }
  .collapse-btn {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    color: #01a9ce;
    cursor: pointer;
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
    margin-left: 145px;
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
    margin-left: 40px;
  }
  .more-icon {
    color: rgb(108,108,108);
    font-size: 20px;
  }
  .loadingBtn-wrapper {
    margin: 50px 0;
  }
</style>
