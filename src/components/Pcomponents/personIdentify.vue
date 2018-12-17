<template>
    <div class="person-identify">
        <head-nav></head-nav>
        <div class="container wrapper">
          <div class="back-wrapper" @click="back()">
            <i class="el-icon-arrow-left"></i>返回
          </div>
          <div class="content">
            <div class="title">
              <span class="color-block"></span>
              <span class="title-text">身份认证</span>
            </div>
            <div class="tab">
              <div class="tab-item" :class="{'current': isStudent}" @click="toggle(0)">学生</div>
              <div class="tab-item" :class="{'current': !isStudent}" @click="toggle(1)">教师</div>
            </div>
            <div class="user-data" v-if="isShow">
              <div class="name wrapper-1" v-if="!isNameIdentify">
                <div class="tag"><span class="icon">*</span>&nbsp;姓名</div>
                <div class="input-wrapper">
                  <input type="text" class="user-input name">
                </div>
              </div>
              <div class="name wrapper-1">
                <div class="tag"><span class="icon">*</span>&nbsp;手机号</div>
                <div class="input-wrapper">
                  <input type="text" class="user-input phone">
                  <span class="getCode-btn" v-if="!isGetCode" @click="getCode">获取验证码</span>
                  <span class="second-btn-wrapper" v-if="isGetCode"><span class="second-btn">{{second}}</span></span>
                  <input class="code-input" placeholder="请填写验证码">
                </div>
              </div>
              <div class="name wrapper-1" v-if="!isNameIdentify">
                <div class="tag"><span class="icon">*</span>&nbsp;身份证号</div>
                <div class="input-wrapper">
                  <input type="text" class="user-input idNumber">
                </div>
              </div>
               <div class="name wrapper-1">
                 <div class="tag"><span class="icon">*</span>&nbsp;身份证正面照</div>
                 <div class="upload-wrapper">
                    <div class="upload-image identifyCode">
                      <div class="upload-text">上传图片</div>
                      <img class="identify-image image" @click="inputAvatar('identify')">
                    </div>
                    <span class="identify-tip">图片尺寸200x200像素，文件小于5M，支持jpg，png格式</span>
                 </div>
              </div>
              <div class="name wrapper-1">
                <div class="tag"><span class="icon">*</span>&nbsp;学校机构</div>
                <div class="input-wrapper">
                  <input type="text" class="user-input school">
                </div>
              </div>
              <div class="name wrapper-1">
                <div class="tag"><span class="icon">*</span>&nbsp;认证简介</div>
                <div class="input-wrapper">
                  <input type="text" class="user-input des">
                  <span class="tip">14字以内, 一旦认证成功不可修改</span>
                </div>
              </div>
              <div class="name wrapper-1" v-if="isStudent">
                 <div class="tag"><span class="icon">*</span>&nbsp;学生证正面照</div>
                 <div class="upload-wrapper">
                    <div class="upload-image studentCode">
                      <div class="upload-text">上传图片</div>
                      <img class="student-image image" @click="inputAvatar('student')">
                    </div>
                    <span class="identify-tip">图片尺寸200x200像素，文件小于5M，支持jpg，png格式</span>
                 </div>
              </div>
              <div class="name wrapper-1" v-if="!isStudent">
                 <div class="tag"><span class="icon">*</span>&nbsp;教师证正面照</div>
                 <div class="upload-wrapper">
                    <div class="upload-image studentCode">
                      <div class="upload-text">上传图片</div>
                      <img class="teacher-image image" @click="inputAvatar('student')">
                    </div>
                    <span class="identify-tip">图片尺寸200x200像素，文件小于5M，支持jpg，png格式</span>
                 </div>
              </div>
            </div>
            <div class="submit-wrapper" v-if="isShow">
              <div class="submit-btn" @click="submit()">
                提交
              </div>
            </div>
          </div>
        </div>
        <foot-bar></foot-bar>
        <clip-image @uploadImage="uploadImage" :src="src" :mode="mode" ref="clipImage"></clip-image>
        <div class="loading-mask-wrapper" v-if="loading">
          <div class="loading-mask" v-loading="loading"></div>
        </div>
    </div>
</template>

<script>
    import headNav from '../Ccomponents/headNav.vue'
    import footBar from '../Ccomponents/footBar.vue'
    import clipImage from '../common/clipImage.vue'
    import {getCookie, setStorage, getStorage} from '../../api/util.js'
    import {reqLoginVerificationCode, resetPasswordSecond, personIdentify, reqUser} from '../../api/index.js'
    import {mapState} from 'vuex'
    import $ from 'jquery'
    export default {
      data () {
        return {
          src: '',//要传给clipImage的地址
          mode: 'other',//要传递给clipImage的模式
          photoType: '',//上传的图片的类型，是学生证还是身份证
          isStudent: true,//是否是学生身份
          isShow: true,//是否显示输入框，主要是为了用来清空数据
          isNameIdentify: false,//表示是否实名认证过
          isGetCode: false,
          timer: null,//读秒计时
          second: 60,//秒数
          token: '',//短信验证的token值
          loading: false,//加载显示
        }
      },
      computed: {
      },
      methods: {
        //返回上一个页面
        back () {
          this.$router.go(-1);
        },
        message (type,msg) {
          this.$message({
            type: type,
            showClose: true,
            message: msg
          })
        },
        //获取验证码
        async getCode () {
          //检测手机号格式
          let phone = $('.phone').val()
          let isPhone = /^[0-9]+$/
          if (phone.length !== 11 || !isPhone.test(phone)) {
            this.$message({
              type: 'warning',
              showClose: true,
              message: '手机号格式错误'
            })
            return
          }
          //开始读秒
          this.isGetCode = true
          this.second--
          this.timer = setInterval(() => {
            this.second--
            if (this.second === 0) {
              clearInterval(this.timer)
              this.isGetCode = false
              this.second = 60
            }
          }, 1000)
          //获取短信验证码
          let result = await reqLoginVerificationCode(phone)
          console.log(result)
          if (result.success) {
          }
        },
        //提交
        async submit () {
          this.loading = true
          let identificateName = $('.user-input.name').val()
          let identificateIdCard = $('.user-input.idNumber').val()
          let identificateIdCardPic = $('.identify-image').attr('src')
          let identificateOrganization = $('.user-input.school').val()
          let identificateDesc = $('.user-input.des').val()
          let identificateType = 0
          let identificateProve = ''
          if (this.isStudent) {
            identificateProve = $('.student-image').attr('src')
            identificateType = 2
          } else {
            identificateProve = $('.teacher-image').attr('src')
            identificateType = 3
          }
          let token = ''
          let phone = $('.user-input.phone').val()
          let toValidateCode = $('.code-input').val()
          let isCertification = getStorage('user').isCertification
          //先进行验证码的验证
          let result = await resetPasswordSecond(toValidateCode,phone)
          console.log(result)
          if (result.success) {
            token = result.data
            //提交用户数据
            console.log(identificateName,identificateIdCard,identificateIdCardPic,identificateOrganization,identificateDesc,identificateProve,token,phone,identificateType)
            let result1  = await personIdentify(identificateName,identificateIdCard,identificateIdCardPic,identificateOrganization,identificateDesc,identificateProve,token,phone,identificateType)
              console.log(result1)
          if (result1.success) {
            //获取用户数据
              let sessionId = getStorage('SESSIONID')
              let result2  = await reqUser(sessionId)
              console.log(result2)
              if (result2.success) {
                setStorage('user', result2.data)
                this.message('success', '已提交，请耐心等待！')
                this.loading = false
                this.$router.go(-1)
              }
          } else {
            this.message('error', result1.msg)
          }
        } else {
            this.message('error', result.msg)
          }
          this.loading = false
        },
           //切换教师和学生的身份
           toggle (index) {
            if (index === 0) {
              this.isStudent = true
            } else {
              this.isStudent = false
            }
            this.clearData()
           },
           //清空输入框的数据
           clearData () {
            this.isShow = false
            setTimeout(() => {
              this.isShow = true
            }, 20)
           },
           //上传图片
           inputAvatar (str) {
            this.photoType = str//设置上传的图片的类型，是学生证还是身份证
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
          //clipImage的回调函数
          uploadImage (url) {
            if (this.photoType === 'identify') {
              $('.identify-image').attr('src', url)
            } else if (this.photoType === 'student') {
                if (this.isStudent) {
                  $('.student-image').attr('src', url)
                } else {
                  $('.teacher-image').attr('src', url)
                }
              }
            }
      },
      mounted () {
        this.isNameIdentify = getStorage('user').isCertification
      },
      components: {
        headNav,
        footBar,
        clipImage
      }
    }
</script>

<style scoped>
  .back-wrapper {
    position: absolute;
    top: 30px;
    left: 80px;
    color: #5a5a5a;
    font-size: 20px;
    cursor: pointer;
    border-bottom: 1px solid #5a5a5a;
  }
  .back-wrapper:hover {
    color: #4893a8;
    border-bottom: 1px solid #4893a8;
  }
.loading-mask-wrapper {
  position: fixed;
  top: 0;
  left:0;
  right: 0;
  bottom: 0;
  z-index: 4;
}
.loading-mask {
  position: absolute;
  top: 0;
  left:0;
  right: 0;
  bottom: 0;
}
  .second-btn-wrapper {
    display: inline-block;
    width: 120px;
    height: 25px;
    border: 1px solid transparent;
    margin-top: 4px;
    margin-left: 15px;
  }
  .second-btn {
    display: inline-block;
    vertical-align: top;
    width: 50px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    border-radius: 2px;
    color: white;
    background-color: #4893a8;
    margin-left: 40px;
  }
  .wrapper {
    background-color: white;
    min-height: 100vh;
    position: relative;
  }
   .content {
    width: 100%;
    padding: 80px 0px 50px 150px;
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
    height: 25px;
    width: 15px;
    background-color: #4893a8;
  }
  .title-text {
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    margin-left: 10px;
  }
  .tab {
    height: 50px;
    margin-top: 30px;
    font-size: 0;
  }
  .tab-item {
    display: inline-block;
    vertical-align: top;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    font-size: 15px;
  }
  .tab-item:first-child {
    border-top: 1.5px solid #c9c9c9;
    border-right: 1px solid #c9c9c9;
    border-bottom: 1px solid #c9c9c9;
    border-left: 1px solid #c9c9c9;
  }
  .tab-item:last-child {
    border-top: 1.5px solid #c9c9c9;
    border-right: 1px solid #c9c9c9;
    border-bottom: 1px solid #c9c9c9;
  }
  .tab-item.current {
    border-top: 1.5px solid #4893a8;
    color: #4893a8;
  }
  .wrapper-1 {
    display: flex;
    width: 100%;
    padding: 20px 30px;
    box-sizing: border-box;
  }
  .tag {
    flex: 0 120px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    height: 50px;
    line-height: 50px;
  }
  .upload-wrapper {
    flex: 1;
    margin-left: 30px;
    height: 200px;
  }
  .upload-image {
    width: 200px;
    height: 200px;
    border: 1.5px solid #c9c9c9;
    position: relative;
    display: inline-block;
    vertical-align: top;
  }
  .image {
    position: absolute;
    width: 200px;
    height: 200px;
    left: 0;
    top: 0;
    z-index: 2;
    cursor: pointer;
  }
  .upload-text {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    height: 200px;
    text-align: center;
    line-height: 200px;
    font-size: 17px;
    cursor: pointer;
    color: #c9c9c9;
  }
  .identify-tip {
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
    color: #a5a5a5;
    width: 180px;
    margin-left: 30px;
  }
  .input-wrapper {
    flex: 1;
    margin-left: 30px;
    height: 50px;
    padding-top: 10px;
    box-sizing: border-box;
  }
  .user-input {
    height: 30px;
    width: 250px;
    border: 1.5px solid #c9c9c9;
    font-size: 15px;
    text-indent: 2em;
    font-weight: 600;
    transition: all 0.2s;
    outline: none;
  }
  .user-input:hover, .user-input:focus {
    border-color: #4893a8;
  }
  .icon {
    color: red;
  }
  .getCode-btn {
    display: inline-block;
    vertical-align: top;
    width: 120px;
    height: 25px;
    border-radius: 3px;
    color: #4893a8;
    border: 1px solid #4893a8;
    line-height: 25px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 4px;
    margin-left: 15px;
  }
  .getCode-btn:hover {
    color: white;
    background-color: #4893a8;
  }
  .code-input {
    height: 30px;
    width: 150px;
    border: 1.5px solid #c9c9c9;
    font-size: 15px;
    text-indent: 2em;
    font-weight: 600;
    transition: all 0.2s;
    outline: none;
    margin-left: 15px;
  }
  .code-input:hover, .code-input:focus {
    border-color: #4893a8;
  }
  .tip {
    display: inline-block;
    vertical-align: top;
    height: 33px;
    line-height: 33px;
    margin-left: 10px;
    font-size: 14px;
    color: #a5a5a5;
  }
  .submit-wrapper {
    height: 50px;
    position: relative;
    margin-top: 50px;
  }
  .submit-btn {
    position: absolute;
    right: 200px;
    top: 0;
    width: 70px;
    height: 25px;
    cursor: pointer;
    border: 1px solid #4893a8;
    color: #4893a8;
    text-align: center;
    line-height: 25px;
    transition: all 0.2s;
    border-radius: 4px;
  }
  .submit-btn:hover {
    color: white;
    background-color: #4893a8;
  }
</style>
