<template>
  <div class="launch-task">
    <div class="container">
      <div class="header">
        <span class="color-block"></span>
        <span class="header-text">发布提问</span>
      </div>
      <div class="wrapper">
        <form method="post" action="" class="form">
          <div class="title">
            <div class="name title-name">标题</div>
            <div class="input-wrapper">
              <input class="title-text" type="text">
            </div>
          </div>
          <div class="description">
            <div class="name">描述</div>
            <div class="input-wrapper">
              <div class="input-container">
                <div class="setting">
                    <editor v-if="isEditorMounted" class="editor" :value="value" :setting="editorSetting" @input="getInput"></editor>
                </div>
              </div>
              <div class="anonymous-wrapper">
                <el-checkbox name="anonymous" class="anonymous" v-model="anonymous"></el-checkbox>
                <span class="anonymous-text">匿名</span>
              </div>
            </div>
          </div>
          <div class="topic">
            <div class="name topic-name">话题</div>
            <div class="input-wrapper1">
              <div class="input-container1">
                <!--<input type="text" class="topic-text">-->
                <el-select v-model="selectTopicValue" placeholder="请选择">
                  <el-option v-for="item in topicOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="release-btn-wrapper">
            <div class="release-btn">
              <div class="submit-btn" @click="_launchTask">发布</div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="mask1" v-loading="maskLoading" v-show="maskLoading"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  import {reqSearchTip, uploadFile, getAllTopicTags, launchQuestion, userJoinCircle} from '../../api/index.js'
  import editor from '../common/editor.vue'
  export default {
    data () {
      return {
        path: '/tanqiu/launchQuestion',
        textarea: '',
        searchTips: [],
        itemText: '',//在点击了searchTip以后，将item的值赋给该变量，从而隐藏searchTip
        value: '',
        content: '',//富文本编辑器的内容
        editorSetting:{
          height:220,
        },
        isEditorMounted: false,//表示tinymce是否被创建，用来解决切换路由以后，tinymce获取不到焦点的问题
        //单选框和复选框是否选择
        anonymous: false,//是否匿名
        topicOptions: [
        ],//话题标签的选择
        selectTopicValue: '',//话题标签的选择结果
        maskLoading: false,//发送任务的加载的显示
      }
    },
    created () {
      this._getAllTopicTags()//获取用户话题的标签
      window.onscroll = null
      this.isEditorMounted = true//创建tinymce编辑器
    },
    methods: {
      //发布提问
      async _launchTask () {
        this.maskLoading = true
        let questionTitle = $('.title-text').val()
        let questionContent = this.content
        let ret = /<img\S*src="(\S*)"[^>]+>/
        let questionPhoto = ''
        if (ret.test(questionContent.replace(/\s*/g, ''))) {
          questionPhoto = questionContent.replace(/\s*/g, '').match(ret)[1]
        }
        let questionAnonymity = this.anonymous
        let questionTopicId = this.selectTopicValue//tagId
        if (questionTitle === '') {
          this.$message({
            type: 'error',
            showClose: true,
            message: '标题未设置！'
          })
          this.maskLoading = false
        } else if (questionContent === '') {
          this.$message({
            type: 'error',
            showClose: true,
            message: '描述未设置！'
          })
          this.maskLoading = false
        } else if (questionTopicId === '' || questionTopicId === undefined) {
          this.$message({
            type: 'error',
            showClose: true,
            message: '话题未设置！'
          })
          this.maskLoading = false
        } else {
          let result = await launchQuestion(questionTopicId, questionPhoto, questionAnonymity, questionContent, questionTitle)
          console.log(result)
          if (result.success) {
            this.maskLoading = false
            this.$message({
              type: 'success',
              showClose: true,
              message: '发布成功！'
            })
            this.clearData()
            this.$router.push('/tanqiu/square/question')
          } else {
            this.$message({
              type: 'error',
              showClose: true,
              message: result.msg
            })
            this.maskLoading = false
          }
        }
      },
      //清空发布任务输入框和单选框复选框的所有数据
      clearData () {
        $('.title-text').val('')
        this.content = ''
        this.anonymous = false
        this.selectTopicValue = ''
      },
      //获取话题标签
      async _getAllTopicTags () {
        let result = await getAllTopicTags()
        console.log(result)
        if (result.success) {
          result.data.forEach((item) => {
            let object = {
              value: item.tagId,
              label: item.tagName
            }
            this.topicOptions.push(object)
          })
        }
      },
      //tinymce的输入事件函数
      getInput (content) {
        this.content = content
      }
    },
    watch: {
      '$route' () {
        if (this.$route.path === this.path) {
          window.onscroll = null
          this.isEditorMounted = false
          setTimeout(() => {
            this.isEditorMounted = true//每次切换路由的时候重新创建一次tinymce，解决切换路由以后获取不到焦点的问题
          }, 20)
        }
      }
    },
    components: {
      editor
    }
  }
</script>

<style scoped>
  .fade-enter-active {
    transition: opacity 0.2s;
  }
  .fade-enter {
    opacity: 0;
  }
  .mask1 {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
  }
  .launch-task {
    width: 100%;
  }
  .container {
    width: 1180px;
    min-height: 100vh;
    margin: 0 auto;
    padding: 50px 25px 50px 25px;
    background-color: white;
    box-sizing: border-box;

  }
  .header {
    height: 30px;
  }
  .header:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
  .color-block {
    display: inline-block;
    width: 10px;
    height: 30px;
    background-color: #4993a8;
    vertical-align: middle;
  }
  .header-text {
    display: inline-block;
    margin-left: 10px;
    font-size: 26px;
    vertical-align: middle;
  }
  .wrapper {
    width: 100%;
    padding-left: 100px;
    box-sizing: border-box;
  }
  .form {
    width: 100%;
  }
  .title {
    margin-top: 40px;
    height: 45px;
    display: flex;
  }
  .name {
    display: inline-block;
    flex: 0 150px;
    font-size: 20px;
    letter-spacing: 2px;
  }
  .input-wrapper {
    flex: 1;
    position: relative;
  }
  .title-name {
    height: 45px;
    line-height: 45px;
  }
  .title-text {
    width: 603px;
    height: 39px;
    border: 0;
    background-color: #f4f4f4;
    /*border: 1px solid #4893a8;*/
    text-indent: 2em;
    font-size: 18px;
  }
  .description {
    margin-top: 40px;
    height: 351px;
    display: flex;
  }
  .more-setting-wrapper {
    overflow: hidden;
  }
  .setting-title {
    color: #01a9ce;
    font-size: 18px;
    cursor: pointer;
  }
  .setting-title:hover {
    color: #4893a8;
  }
  .el-icon-caret-bottom {
    transition: all linear 0.2s;
  }
  .input-container {
    width: 608px;
    height: 266px;
  }
  .setting {
    margin-top: 10px;
  }
  .anonymous-wrapper {
    position: absolute;
    bottom: 10px;
    left: 500px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    font-size: 0;
  }

  .anonymous-text{
    color: #636363;
    font-size: 20px;
    margin-left: 10px;
    position: relative;
    top: 3px;
  }
  .topic {
    display: flex;
    margin-top: 40px;
    height: 45px;
  }
  .topic-name {
    height: 45px;
    line-height: 45px;
  }
  .input-wrapper1 {
    flex: 1;
  }
  .topic-text {
    width: 304px;
    height: 39px;
    border: none;
    background-color: #f4f4f4;
    text-indent: 2em;
    font-size: 18px;
  }

  .release-btn-wrapper {
    width: 100%;
    margin-top: 40px;
    height: 45px;
    position: relative;
  }
  .release-btn {
    position: absolute;
    right: 150px;
    width: 80px;
    height: 35px;
    border: 1px solid #01a9ce;
    border-radius: 5px;
  }
  .submit-btn {
    border: 0;
    font-size: 20px;
    width: 75px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #01a9ce;
    margin: 2.5px;
    letter-spacing: 5px;
    background-color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  .submit-btn:hover {
    color: white;
    background-color: #01a9ce;
  }
  .appoint-circle {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 5;
  }
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    background-color: rgba(0,0,0,0.8);
  }
  .circle-content {
    position: absolute;
    z-index: 20;
    background-color: white;
    width: 400px;
    height: 250px;
    margin-top: 50vh;
    margin-left: 50%;
    transform: translate3d(-50%, -50%, 0);
    border-radius: 10px;
    padding: 30px;
  }
  .circle-title {
    font-size: 24px;
    color: #4893a8;
  }
  .tag-wrapper {
    margin-top: 50px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .circle-submit {
    position: absolute;
    bottom: 40px;
    right: 30px;
    border: 1px solid #4893a8;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #4893a8;
    cursor: pointer;
    border-radius: 4px;
  }
</style>
