<template>
  <div class="article-detail">
    <head-nav></head-nav>
    <div class="container content-wrapper">
      <div class="back" @click="back()"><i class="el-icon-arrow-left"></i>返回</div>
      <div class="content">
        <div class="title">
          <span class="color-block"></span>
          <span class="title-text">{{articleDetail.articleName}}</span>
        </div>
        <div class="author">
          <span class="author-tag">作者:</span>
          <span class="author-text">{{articleDetail.articleAuthorName}}</span>
          <span class="tags-tag" v-if="articleDetail.articleTags.length !== 0">标签:</span>
          <span class="tags-text" v-if="articleDetail.articleTags.length !== 0">{{handleTags()}}</span>
        </div>
        <div class="time">
          <span class="time-tag">时间:</span>
          <span class="time-text">{{articleDetail.articleCreateTime}}</span>
        </div>
        <div class="article-content"></div>
        <div class="bottom-setting">
          <icons :item="articleDetail" :id="articleDetail.articleId" @comment="comment" class="icons"></icons>
        </div>
        <div class="comment-wrapper" v-if="isComment">
          <div class="mask"></div>
          <div class="comment-content">
            <div class="comment-title">
              <span class="color-block1"></span>
              <span class="comment-title-text">发表评论</span>
              <i class="el-icon-close close" @click="close"></i>
            </div>
            <div class="comment-input">
              <el-input type="textarea" v-model="commentContent" :rows="5"></el-input>
            </div>
            <div class="submit">
              <div class="submit-btn">提交</div>
            </div>
          </div>
        </div>
        <div class="comment-list-wrapper">
          <div class="comment-list" v-for="(item, index) in commentList" :key="index">
            <div class="avatar-wrapper">
              <img :src="item.avatar" class="avatar">
            </div>
            <div class="name-wrapper">
              <div class="name">{{item.name}}</div>
              <div class="comment-time">{{item.time}}</div>
            </div>
            <div class="comment-list-content">
              <div class="comment-list-text">{{item.content}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <foot-bar></foot-bar>
  </div>
</template>

<script>
  import headNav from '../Ccomponents/headNav.vue'
  import footBar from '../Ccomponents/footBar.vue'
  import {getArticleDetail} from '../../api/index.js'
  import {getStorage} from '../../api/util.js'
  import icons from './icons.vue'
  import $ from 'jquery'
  export default {
    data () {
      return {
        articleDetail: {
          articleTags: []
        },//文章详情数据
        isComment: false,//是否显示评论框
        commentContent: '',//评论的内容
        commentList: [
          {
            avatar: '/static/ximages/妹纸1.png',
            name: '不会飞的鱼',
            time: '12:54',
            content: '收获了很多学习资料，希望以后有更多的资料分享啊，aaaaaaaaaaaaaaaaaaaaaaa.收获了很多学习资料，希望以后有更多的资料分享啊，aaaaaaaaaaaaaaaaaaaaaaa.收获了很多学习资料，希望以后有更多的资料分享啊，aaaaaaaaaaaaaaaaaaaaaaa.'
          },
          {
            avatar: '/static/ximages/妹纸1.png',
            name: '不会飞的鱼',
            time: '12:54',
            content: '收获了很多学习资料，希望以后有更多的资料分享啊，aaaaaaaaaaaaaaaaaaaaaaa'
          },
          {
            avatar: '/static/ximages/妹纸1.png',
            name: '不会飞的鱼',
            time: '12:54',
            content: '收获了很多学习资料，希望以后有更多的资料分享啊，aaaaaaaaaaaaaaaaaaaaaaa'
          }
        ],//评论的列表
      }
    },
    mounted () {
      let articleDetailId = getStorage('articleDetailId');
      console.log(articleDetailId);
      this._getArticleDetail(articleDetailId)
    },
    methods: {
      back () {
        this.$router.go(-1);
      },
      //获取文章详情数据
      async _getArticleDetail (id) {
        let result = await getArticleDetail(id);
        console.log(result);
        if (result.success) {
          this.articleDetail = result.data;
          $('.article-content').html(this.articleDetail.articleContent)

        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: '获取文章失败！'
          })
        }
      },
      //处理标签
      handleTags () {
        let tags = this.articleDetail.articleTags;
        if (tags) {
          if (tags.length > 2) {
            return tags.slice(0, 2).join(',');
          } else {
            return tags.join(',');
          }
        }
      },
      //处理icons组件的评论的回调函数
      comment (item) {
        console.log(item);
        this.isComment = true;
        setTimeout(() => {
          $('.el-textarea__inner').css({
            'resize': 'none'
          })
        }, 20)
      },
      //关闭评论框
      close () {
        this.isComment = false;
        this.commentContent = ''
      }
    },
    components: {
      headNav,
      footBar,
      icons
    }
  }
</script>

<style scoped>
  .container {
    min-height: 100vh;
    background-color: white;
    overflow: hidden;
  }
  .back {
    font-size: 20px;
    color: #4c4c4c;
    margin: 50px 0 20px 150px;
    cursor: pointer;
    display: inline-block;
  }
  .back:hover {
    text-decoration: underline;
  }
  .content {
    padding-left: 250px;
    padding-right: 50px;
    box-sizing: border-box;
  }
  .title {
    height: 50px;
  }
  .title:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 50px;
  }
  .color-block {
    display: inline-block;
    vertical-align: middle;
    width: 15px;
    height: 30px;
    background-color: #4893a8;
    margin-right: 5px;
  }
  .title-text {
    display: inline-block;
    vertical-align: middle;
    font-size: 26px;
    color: #333;
  }
  .author, .time {
    margin-top: 15px;
  }
  .author-tag, .time-tag {
    display: inline-block;
    vertical-align: top;
    font-size: 17px;
    color: #555;
  }
  .author-text, .time-text {
    display: inline-block;
    vertical-align: top;
    margin-left: 14px;
    font-size: 17px;
    color: #a5a5a5;
  }
  .article-content {
    padding-top: 40px;
    font-size: 18px;
    color: #777;
  }
  .bottom-setting {
    margin: 20px 0;
    height: 50px;
  }
  .icons {
    float: right;
    width: 40%!important;
  }
  .comment-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 2;
  }
  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0,0,0,0.6);
  }
  .comment-content {
    position: absolute;
    width: 500px;
    height: 260px;
    background-color: white;
    left: 50%;
    top: 50vh;
    transform: translate3d(-50%, -50%, 0);
    padding: 20px;
    box-sizing: border-box;
  }
  .comment-title:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 30px;
  }
  .color-block1 {
    display: inline-block;
    vertical-align: middle;
    width: 13px;
    height: 20px;
    background-color: #4893a8;
    margin-right: 5px;
  }
  .comment-title-text {
    display: inline-block;
    vertical-align: middle;
  }
  .close {
    float: right;
    font-size: 16px;
    cursor: pointer;
    color: #777;
  }
  .close:hover {
    color: #4893a8;
  }
  .comment-input {
    margin-top: 20px;
  }
  .submit  {
    margin-top: 20px;
    height: 30px;
    width: 100%;
  }
  .submit-btn {
    float: right;
    padding: 3px 7px;
    border: 1px solid #4893a8;
    color: #4893a8;
    cursor: pointer;
    border-radius: 3px;
    transition: all 0.2s;
  }
  .submit-btn:hover {
    background-color: #4893a8;
    color: white;
  }
  .comment-list {
    display: flex;
    padding: 25px 0;
    box-sizing: border-box;
  }
  .comment-list:last-child {
    margin-bottom: 50px;
  }
  .avatar-wrapper {
    flex: 0 50px;
    height: 50px;
    margin-right: 15px;
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .name-wrapper {
    flex: 0 100px;
    height: 50px;
    margin-right: 15px;
  }
  .name {
    text-decoration: underline;
    cursor: pointer;
    font-size: 15px;
    color: #333;
  }
  .comment-time {
    margin-top: 10px;
    color: #a5a5a5;
    font-size: 13px;
  }
  .comment-list-content {
    flex: 1;
    word-break: break-all;
    font-size: 15px;
    color: #777;
    margin-right: 50px;
  }
</style>
