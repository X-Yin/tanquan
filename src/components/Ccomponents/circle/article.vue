<template>
  <div class="main article">
    <div class="settings">
      <div class="btn1" @click='gotoText' style="cursor: pointer">上传推文</div>
      <div class="btn">热度</div><i class="el-icon-d-caret"></i>
      <div class="search">
        <input type="text">
        <i class="icon el-icon-search" style="color: #bebebe;font-weight: 600;"></i>
      </div>
    </div>
    <wait-task-wrapper  v-if="text.length === 0 && isNoTextShow"></wait-task-wrapper>
    <no-task-text v-if="text.length === 0 && !isNoTextShow " text="暂无推文"></no-task-text>
    <div class="feed" v-for='(item,index) in text' :key='index'>
      <div class='from'>发布于{{item.articleCreateTime}}</div>
      <div class="title" @click="gotoArticleDetail(item)"><span class="type">[文章]</span><span class="tt">{{item.articleName}}</span><span class="delete" v-show='isManagement'>[删除]</span></div>
      <div class="avatar" v-if="item.articlePhoto !== ''"><img v-lazy="item.articlePhoto" style="width: 100%"></div>
      <div class="detail">
        <div class="detail1">
          <div class="author">作者：<span>{{item.articleAuthorName}}</span></div>
        </div>
        <div class="detail2">
          <P>{{handleContent(index)}}<span class="detail-btn">详情</span></P>
        </div>
      </div>
      <div class="icons-wrapper">
        <icons :index="index" :item="item" :id="item.articleId"></icons>
      </div>
    </div>
    <div class="loading-wrapper" v-show="loadingShow">
      <loading-btn class="loadingBtn"></loading-btn>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import editor from '../../common/editor.vue'
  import {getCircleText} from '../../../api/index.js'
  import noTaskText from '../../Xcomponents/noTaskText.vue'
  import waitTaskWrapper from '../../Xcomponents/waitTaskWrapper.vue'
  import {getPosition, deleteOne, getStorage, setStorage} from '../../../api/util.js'
  import loadingBtn from '../../Xcomponents/loadingBtn.vue'
  import icons from '../../common/icons.vue'
  export default{
    data(){
      return{
        manage:true,
        uploadArticle:false,
        value: '',
        editorSetting: {
          height: 220
        },
        content: '',
        path: /\/circle\/\w*\/article/,
        loadingShow: false,
        isLoadOnePage: true,
        isNoTextShow: true,
        text: [],
        p: 1,
        pagesNumber: 1,
      }
    },
    methods:{
      //跳转到文章详情页
      gotoArticleDetail (item) {
        // this.$router.push(this.$route.fullPath + '/' + item.articleId)
        // setStorage('articleDetailId', item.articleId)
        setStorage('articleDetailId', item.articleId);
        this.$router.push('/articleDetail');
      },
      //处理文章内容的
      handleContent (index) {
        if (this.text.length > 0) {
          let text = this.text[index]
          let content = text.articleContent
          let ret = /<[^>]+>/g;//去掉所有的标签
          let ret1 = /&\w+;/g;//去掉所有的空格
          content = content.replace(ret, '');
          content = content.replace(ret1, '');
          if (content.length > 20) {
            return content.substring(0, 20) + '...'
          } else {
            return content + '...'
          }
        }
      },
      //跳转到写推文的界面
      gotoText () {
        this.$router.push('/writeManagement')
      },
      getInput (content) {
        this.content = content
      },
      async _getCircleText (p) {
        let circleId = getStorage('circleDetailId')
        console.log(circleId, p)
        let result = await getCircleText(circleId, p)
        console.log(result)
        if (result.success) {
          let tasks = this.text.slice()
          if (result.data.list.length === 0) {
            this.isNoTextShow = false//让无任务文字显示
            this.loadingShow = false
          } else {
            tasks = tasks.concat(result.data.list)
            this.text = tasks
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
                  self.loadMore(self.p, self._getCircleText)
                }
              }
            }
          }
        }
      },
    },
    computed:{
      ...mapState([
          'isManagement'
        ])
    },
    mounted(){
      this._getCircleText(this.p)
    },
    watch: {
      '$route'() {
        if (this.path.test(this.$route.path)) {
          this.watchScroll()
        }
      },
      text () {
        if (this.text !== []) {
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
      icons
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.detail-btn {
  cursor: pointer;
}
  .icons-wrapper {
    width: 60%;
    margin-top: 30px;
  }
  .main
    padding-right 46px
  .settings
    /*margin-bottom 30px*/
    margin-bottom 23px
    position relative
    .btn1
      display inline-block
      text-align center
      background-color #4893a8
      padding 1px 4px
      height 17px
      font-size 13.08px
      line-height 17px
      border-top solid 1.5px rgba(255,255,255,0.65)
      border-right solid 1.5px #000
      border-bottom solid 1.5px #000
      color #fff
    .btn
      font-size 14.53px
      margin-left 338px
      display inline-block
      text-align center
      border solid 1px #9e9e9e
      border-radius 2px
      padding 1px 4px
      height 16px
      width 32px
      line-height 16px
      color #5b5b5b
    .search
      margin-left 38px
      display inline-block
      input
        width 120px
        background-color #f7f7f7
        border none
        height 22px
        margin-right 18px
  .feed
    margin-bottom 44px
    padding-bottom: 20px;
    border-bottom: 1.5px solid #a5a5a5
    .from
      font-size 15.98px
      color #aaa7a7
      height 18px
      line-height 18px
      margin-bottom 9px
    .title
      font-size 18.16px
      color #000
      height 19px
      line-height 19px
      margin-bottom 13px
      cursor: pointer
      .tt
        &:hover
          color #4893a8
      .type
        color #4893a8
      .delete
        color #4893a8
        cursor pointer
    .avatar
      display inline-block
      width 155px
      height 100px
      overflow hidden
      vertical-align middle
      padding-right: 20px;
    .detail
      vertical-align middle
      display inline-block
      width 496px
      font-size 15.98px
      .detail1
        height 46px
        .author,.tags
          color #6c6c6c
          height 23px
          line-height 23px
          span
            color #aaa7a7
      .detail2
        font-size 15.98px
        p
          color #6c6c6c
          line-height 29px
        span
          color #4893a8
          text-decoration underline
    .itemFooter
      margin-top 28px
      height 21px
      user-select none
      .itemData
        font-size 15.98px
        display inline-block
        div
          padding-left 25px
          width 95px
          display inline-block
          color #6c6c6c

          position relative
          &:before
            content ''
            width 21px
            height 21px
            background-color #4893a8
            position absolute
            left 0
      .dislike
        display inline-block
        width 110px
        color #b5b3b3
        text-align center
      .action
        font-size 20px
        line-height 21px
        height 21px
        width 55px
        text-align center
        display inline-block
        font-weight 900
        color #6c6c6c
  .upload
    .littleTitle
      color #474747
      font-size 21.8px
      padding-left 25px
      height 23px
      line-height 23px
      position relative
      margin -20px 0 25px 20px
      span
        color #4893a8
        font-size 18px
        user-select none
        cursor pointer
      &:after
        content ""
        background-color #4893a8
        position absolute
        left 0
        width 10px
        height 23px
    #tt
      font-size 18px
      height 30px
      background-color #f4f4f4
      border solid 1.5px #e9e9e9
      width 620px
      margin-left 40px
      padding-left 15px
    .btn
      height 22px
      width 63px
      border solid 1.5px #4893a8
      padding 1px
      border-radius 3px
      margin-top 45px
      margin-left 580px
      right 0
      &:hover p
        color #fff
        background-color #4893a8
      p
        text-align center
        color #4893a8
        background-color #fff
        line-height 22.5px
        font-size 16px
    .editor
      padding-top 25px
      margin-left 40px
      width 635px
</style>
