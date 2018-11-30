<template>
  <div class="container" id='createCircle'>
    <div class="wrapper" v-if="isInvitation || isApplication || isAttention">
      <div class="littleTitle">
        创建圈子
      </div>
      <div class="main">
        <div class="left">
          <div class="avatar">
            <img class="avatar-image">
          </div>
          <div class="btn" @click="inputAvatar">
            自主上传
          </div>
        </div>
        <div class="right">
          <div class="col">
            <span class="title">圈名</span>
            <input type="text" class="username">
            <span class='remarks'>不超过20个字符</span>
          </div>
          <div class="col">
            <span class="title">圈子简介</span>
            <input type="text" class="simple-des">
          </div>
          <div class="col">
            <span class="title">招募信息</span>
            <input type="text" class="recruit-message">
          </div>
          <div class="col">
            <span class="title">标签</span>
            <!--<input type="text">-->
            <!--<div class="btn">选择标签</div>-->
            <!--<span class='remarks'>至少选择一个，标签越多曝光度越高</span>-->
            <el-select v-model="selectTopicValue"
                       multiple
                       filterable
                       remote
                       reserve-keyword
                       :remote-method="remoteMethod"
                       placeholder="请选择">
              <el-option v-for="item in topicOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="col">
            <span class="title">类型</span>
            <el-radio v-model="circleMode" label="1">小圈</el-radio>
            <el-radio v-model="circleMode" label="2">大圈</el-radio>
            <el-radio v-model="circleMode" label="3">社区</el-radio>
            <!--<el-radio v-model="mode" label="4">企业大圈</el-radio>-->
            <!--<el-radio v-model="mode" label="5">企业社区</el-radio>-->
            <span class='remarks remarks1'>{{span1}}</span>
          </div>
          <div class="col">
            <span class="title">成员加入方式(可选)</span>
            <el-radio v-model="format" label="condition">有审核</el-radio>
            <el-radio v-model="format" label="noCondition">无审核</el-radio>
            <span class='remarks remarks1'>{{span2}}</span>
          </div>
          <div class="col">
            <span class="title">圈子精英可邀请圈子成员</span>
            <el-radio v-model="isInvite" label="is">是</el-radio>
            <el-radio v-model="isInvite" label="not">否</el-radio>
          </div>
          <div class="col editor-wrapper" v-if="isApplication">
            <span class="title">申请证明</span>
            <!--<editor v-if="isEditorMounted" class="editor" :value="value" :setting="editorSetting" @input="getInput"></editor>-->
            <el-input type="textarea" :rows="11" placeholder="请输入" v-model="applicationContent"></el-input>
            <span class='remarks remarks1'>经过考核方可正式加入圈子</span>
          </div>
          <div class="col invitation-code-wrapper" v-if="isInvitation">
            <span class="title">输入邀请码</span>
            <input type="text" class="invitation-code">
          </div>
        </div>
        <div class="submit-btn-wrapper">
          <div class="submit-btn" @click="submit">创建圈子</div>
        </div>
      </div>
    </div>
    <div class="white" v-if="!isInvitation && !isApplication && !isAttention"></div>
    <div class="select-mode-wrapper" v-if="!isInvitation && !isApplication && !isAttention">
      <div class="select-mode">
        <div class="title-wrapper">
          <span class="color-block"></span>
          <span class="title-2">创建圈子</span>
        </div>
        <div class="application-wrapper">
          <div class="application-btn" @click="setMode(0)">申请制</div>
          <div class="description">通过提交申请材料创建圈子</div>
        </div>
        <div class="invitation-wrapper">
          <div class="invitation-btn" @click="setMode(1)">邀请制</div>
          <div class="description">通过输入邀请码创建圈子</div>
        </div>
        <div class="attention-wrapper">
          <div class="attention-btn" @click="setMode(2)">关注数创圈</div>
          <div class="description">粉丝数量达到100可直接创建圈子</div>
        </div>
      </div>
    </div>
    <clipImage :src="src" @uploadImage="uploadImage" ref="clipImage" :mode="mode"></clipImage>
    <div class="loading-mask-wrapper" v-if="maskLoading">
      <div class="loading-mask" v-loading="maskLoading"></div>
    </div>
  </div>
</template>

<script>
  import editor from '../../common/editor.vue'
  import clipImage from '../../common/clipImage.vue'
  import {getAllTopicTags, createCircleByAttention, createCircleByApplication, createCircleByInvitationCode} from '../../../api/index.js'
  import $ from 'jquery'
  export default{
    data(){
      return{
        loading: false,//远程搜索标签
        format: '',//加入的方式
        isInvite: '',//是否邀请圈子成员
        isEditorMounted: false,//表示tinymce是否被创建，用来解决切换路由以后，tinymce获取不到焦点的问题
        value: '',
        applicationContent: '',
        editorSetting: {
          height: 220
        },
        path: '/tanquan/createCircle',
        isInvitation: false,//邀请制
        isApplication: false,//申请制
        isAttention: false,//关注数创建圈子
        src: '',//上传圈子头像的地址
        mode: 'other',//裁剪图片的模式
        topicList: [],//用来存储所有的标签
        topicOptions: [],//话题标签的选择
        selectTopicValue: '',//话题标签的选择结果
        circleMode: '',//选择圈子的模式
        maskLoading: false
      }
    },
    computed:{
      span1(){
        if(this.circleMode=='small')
          return "成员容量为1-20人"
        if(this.circleMode=='big')
          return "成员容量为1-50人"
        if(this.circleMode=='society')
          return ""
      },
      span2(){
        if(this.format=='application')
          return "通过提交申请验证的方式加入圈子"
        if(this.format=='assessment')
          return "经过考核期方可正式加入圈子"
      }
    },
    components: {
      editor,
      clipImage
    },
    mounted () {
      this._getAllTopicTags()
      this.isEditorMounted = true
    },
    methods: {
      //远程搜索标签的函数
      remoteMethod (query) {
        if (query !== '') {
          this.topicOptions = this.topicList.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        } else {
          this.topicOptions = this.topicList;
        }
      },
      //提交创建圈子
      submit () {
        let circleName = $('.username').val()
        let circleProPic = $('.avatar-image').attr('src')
        let circleNotices = $('.simple-des').val()
        let circleRecruit = $('.recruit-message').val()
        let circleType = this.circleMode
        let tagIds = []
        this.selectTopicValue.forEach((item) => {
          if (typeof item === 'number') {
            tagIds.push(item)
          }
        })
        let joinConditionType = ''
        if (this.format === 'condition') {
          joinConditionType = 0
        } else if (this.format === 'noCondition') {
          joinConditionType = 1
        }
        let openInvite = this.isInvite === 'is' ? true : false
        if (this.isAttention) {
          console.log(circleName, circleProPic, circleNotices, circleRecruit,circleType, tagIds, joinConditionType, openInvite)
          this._createCircleByAttention(circleName, circleProPic, circleNotices, circleRecruit,circleType, tagIds, joinConditionType, openInvite)
        } else if (this.isApplication) {
          let applicationContent = this.applicationContent
          console.log(circleName, circleProPic, circleNotices, circleRecruit,circleType, tagIds, joinConditionType, openInvite, applicationContent)
          this._createCircleByApplication(circleName, circleProPic, circleNotices, circleRecruit,circleType, tagIds, joinConditionType, openInvite, applicationContent)
        } else if (this.isInvitation) {
          let code = $('.invitation-code').val()
          console.log(circleName, circleProPic, circleNotices, circleRecruit,circleType, tagIds, code,joinConditionType, openInvite)
          this._createCircleByInvitationCode(circleName, circleProPic, circleNotices, circleRecruit,circleType, tagIds, code,joinConditionType, openInvite)
        }
      },
      //通过关注数创建圈子
      async _createCircleByAttention (circleName, circleProPic, circleNotices, circleRecruit,circleType, tagIds, joinConditionType, openInvite) {
        this.maskLoading = true
        let result = await createCircleByAttention(circleName, circleProPic, circleNotices, circleRecruit,circleType, tagIds, joinConditionType, openInvite)
        console.log(result)
        if (result.success) {
          this.$message({
            type: 'success',
            showClose: true,
            message: '创建成功！'
          })
          this.clearData()
          this.$router.push('/tanquan/probing')
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: result.msg
          })
        }
        this.maskLoading = false
      },
      //通过申请创建圈子
      async _createCircleByApplication (circleName, circleProPic, circleNotices, circleRecruit,circleType, tagIds, joinConditionType, openInvite, applicationContent) {
        this.maskLoading = true
        let result = await createCircleByApplication(circleName, circleProPic, circleNotices, circleRecruit,circleType, tagIds, joinConditionType, openInvite, applicationContent)
        console.log(result)
        if (result.success) {
          this.$message({
            type: 'success',
            showClose: true,
            message: '发送申请成功，请耐心等待！'
          })
          this.clearData()
          this.$router.push('/tanquan/probing')
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: result.msg
          })
        }
        this.maskLoading = false
      },
      //通过邀请码创建圈子,CENUHWKG,AX9SYEVA,LLU7SETE
      async _createCircleByInvitationCode (circleName, circleProPic, circleNotices, circleRecruit,circleType, tagIds, code,joinConditionType, openInvite) {
        this.maskLoading = true
        let result = await createCircleByInvitationCode(circleName, circleProPic, circleNotices, circleRecruit,circleType, tagIds, code,joinConditionType, openInvite)
        console.log(result)
        if (result.success) {
          this.$message({
            type: 'success',
            showClose: true,
            message: '创建成功！'
          })
          this.clearData()
          this.$router.push('/tanquan/probing')
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: result.msg
          })
        }
        this.maskLoading = false
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
            this.topicList.push(object)
            this.topicOptions = this.topicList
          })
        }
      },
      //创建成功以后将选择框的数据清除
      clearData () {
        this.selectTopicValue = ''
        this.mode = ''
        this.format = ''
        this.isInvite = ''
      },
      //裁剪完图片以后，设置图片的地址到avatar
      uploadImage (url) {
        $('.avatar-image').attr('src', url)
      },
      //上传头像
      inputAvatar () {
        let _this = this
        let img = document.createElement('input')
        $(img).attr('type', 'file')
        $(img).click()
        $(img).on('change', function () {
          let filePath = $(this).val()
          let size = this.files[0].size
          console.log(size)
          if (!/(jpg|png|JPG|PNG)/.test(filePath)) {
            _this.$message({
              type: 'warning',
              showClose: true,
              message: '请上传jpg或者是png格式的图片'
            })
          } else if (size > 100000) {
            _this.$message({
              type: 'warning',
              showClose: true,
              message: '上传图片的大小不能超过10M'
            })
          } else {
            let fr = new FileReader()
            fr.readAsDataURL(this.files[0])
            fr.onload = function () {
              _this.src = this.result
              _this.$refs.clipImage.show()
            }
          }
        })
      },
      getInput (content) {
        this.content = content
      },
      //确定是申请制还是邀请制
      setMode (index) {
        if (index === 0) {
          this.isApplication = true
        } else if (index === 1) {
          this.isInvitation = true
        } else if (index === 2) {
          this.isAttention = true
        }
      }
    },
    watch: {
      '$route' () {
        if (this.$route.path === this.path) {
          this.isAttention = false
          this.isInvitation = false
          this.isApplication = false
          this.isEditorMounted = false
          setTimeout(() => {
            this.isEditorMounted = true//每次切换路由的时候重新创建一次tinymce，解决切换路由以后获取不到焦点的问题
          }, 20)
        }
      },
      content () {
        console.log(this.content)
      }
    },
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  #createCircle
    background-color #fff
    padding-top 55px
    padding-left 30px
    padding-right 30px
    box-sizing border-box
  .loading-mask-wrapper
    position: fixed;
    left 0;
    top: 0;
    right 0;
    bottom: 0;
    z-index: 2
  .loading-mask
    position absolute
    left 0;
    top: 0;
    right 0;
    bottom: 0;
  .simple-des, .recruit-message
    width: 300px !important
  .title {
    width 250px !important
  }
  .submit-btn-wrapper
    width 100%
    height 100px
    position relative
  .submit-btn
    position absolute
    right 200px
    top 30px
    width 80px
    height 28px
    text-align center
    line-height 28px
    color #4893a8
    border 1px solid #4893a8
    transition all 0.2s
    cursor pointer
    border-radius 4px
  .submit-btn:hover
    background-color #4893a8
    color white
  .white
    height: 100vh
    background-color white
  .select-mode-wrapper
    position: fixed
    top: 0
    left 0
    bottom 0
    right 0
    background-color rgba(0,0,0,0.5)
  .select-mode
    width 500px
    height 400px
    background-color white
    position absolute
    left 50%
    top 50%
    transform translate3d(-50%, -50%, 0)
    padding 30px
    box-sizing border-box
  .title-wrapper:before
    height 50px
    display inline-block
    vertical-align middle
  .color-block
    display: inline-block
    vertical-align middle
    width 10px
    height 20px
    background-color #4893a8
  .title-2
    display inline-block
    vertical-align middle
    font-size 16px
    color #333
    margin-left 10px
  .application-wrapper,.invitation-wrapper, .attention-wrapper
    width: 100%
    padding 20px 0 0 0
  .application-btn, .invitation-btn, .attention-btn
    width: 80%
    margin 0 auto
    border-radius 3px
    border 1px solid #4893a8
    color #4893a8
    text-align center
    height 40px
    line-height 40px
    cursor pointer
    transition all 0.2s
  .application-btn:hover, .invitation-btn:hover, .attention-btn:hover
    background-color #4893a8
    color white
  .description
    font-size 14px
    color #777
    width 80%
    margin 15px auto
  .invitation-code-wrapper:before
    height 50px
    display inline-block
    vertical-align middle
  .invitation-code-wrapper .title
    display inline-block
    vertical-align middle
    padding-bottom 0
  .invitation-code-wrapper input
    display inline-block
    vertical-align middle
    height 35px
    width 234px
    background-color #f4f4f4
    border 0
    margin-right 12px
  .editor-wrapper
    min-height 330px!important
    .title {
      display: block;
    }
  .title
    padding-bottom 20px
    display inline-block
  .littleTitle
    color #474747
    font-size 21.79px
    padding-left 25px
    height 25px
    line-height 25px
    position relative
    margin-bottom 80px
    &:after
      content ""
      background-color #4893a8
      position absolute
      left 0
      width 10px
      height 25px
  .main
    .left
      vertical-align top
      top 0
      display inline-block
      margin-left 40px
      font-size 20.34px
      .avatar
        width 144px
        height 144px
        border 1px solid #4893a8
        margin-bottom 20px
        .avatar-image {
          width 144px
          height 144px
        }
      .btn
        width 100px
        height 32px
        border solid #4893a8 1px
        border-radius 8px
        text-align center
        color #4893a8
        margin-left 20px
        line-height 31px
        cursor pointer
        transition all 0.2s
        &:hover {
          background-color #4893a8
          color white
        }
    .right
      vertical-align top
      display inline-block
      margin-left 60px
      width 850px
      .col
        min-height 35px
        line-height 35px
        margin-bottom 38px
        .title
          font-size 20.34px
          color #474747
          padding-right 25px
        input[type='text']
          height 35px
          width 234px
          background-color #f4f4f4
          border 0
          margin-right 12px
          text-indent 2em
          font-weight 600
          font-size 16px
        .remarks
          font-size 13.08px
          color #a0a0a0
        .btn
          vertical-align middle
          text-align center
          border-radius 3px
          height 23px
          line-height 23px
          width 75px
          display inline-block
          border solid 1px #5b5b5b
          color #5b5b5b
          font-size 14.53px
</style>
