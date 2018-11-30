<template>
    <div class="resetPassword">
      <div class="setPwd" v-if="authenticationCheck">
        <div class="setPwd-title">重置密码</div>
        <div class="setPwd-content">
          <form method="post" action="">
            <div class="new-setPwd-wrapper">
              <input type="text" placeholder="手机号码" name="newPassword" class="phone" autocomplete="off">
            </div>
            <div class="new-setPwd-verification-wrapper">
              <input type="text" placeholder="输入6位验证码" name="newPasswordVerification" class="newPasswordVerification" autocomplete="off">
              <span class="newPasswordVerification-tip" @click="getNewPasswordVerificationCode">获取短信验证码</span>
            </div>
            <div class="setPwd-submit-btn" @click="submitPhoneVerification">确定</div>
          </form>
        </div>
      </div>
      <div class="setPW" v-if="newPassword">
        <div class="setPassword">
          <div class="setPW-title">重置密码</div>
          <div class="setPW-content">
            <form method="post" action="">
              <div class="new-password-wrapper">
                <input type="password" placeholder="请输入6-14位新密码" class="newPassword" autocomplete="off">
              </div>
              <div class="new-password-twice-wrapper">
                <input type="password" placeholder="再次输入" class="newPasswordTwice" autocomplete="off">
              </div>
              <div class="setPW-submit-btn" @click="resetPwd">确定</div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {resetPasswordFirst, resetPasswordSecond, resetPasswordThird} from '../../api/index.js'
  import {setStorage} from '../../api/util.js'
  import {mapMutations} from 'vuex'
  import $ from 'jquery'
  export default {
    data () {
      return {
        authenticationCheck: true,//控制身份验证弹出框的显示
        newPassword: false,//控制输入新密码的弹出框的显示
        timer: null,//给手机发送验证码的计时器
        token: '',//验证身份在发送完验证码以后返回的token值
        phone: '',//验证身份的时候天填写的手机号
      }
    },
    methods: {
      ...mapMutations([
        'getIsMe',
        'getSessionId'
      ]),
      //点击获取验证码
      async getNewPasswordVerificationCode () {
        let phone = $('.phone').val()
        if (phone.length !== 11 || !/^[0-9]*$/.test(phone)) {
          this.$message({
            type: 'error',
            showClose: true,
            message: '手机号格式不正确'
          })
        } else {
          let text = $('.newPasswordVerification-tip').html()
          if (text === '获取短信验证码'|| text === '重新获取验证码') {
            let count = 60
            $('.newPasswordVerification-tip').html(count).addClass('current')
            this.timer = setInterval(() => {
              if (count === 0) {
                $('.newPasswordVerification-tip').html('重新获取验证码').removeClass('current')
                clearInterval(this.timer)
                this.timer = null

              } else {
                count--
                $('.newPasswordVerification-tip').html(count)
              }
            }, 1000)
            let result = await resetPasswordFirst(phone)
            console.log(result)
            if (result.success) {
            } else if (result.msg === '没有注册') {
              this.$message({
                type: 'error',
                showClose: true,
                message: '该手机号没有注册！'
              })
              $('.newPasswordVerification-tip').html('重新获取验证码').removeClass('current')
              clearInterval(this.timer)
              this.timer = null
            }
          }
        }
      },
      //获取验证码以后点击提交
      async submitPhoneVerification () {
        let toValidateCode = $('.newPasswordVerification').val()
        if (toValidateCode.length !== 6 || !/^[0-9]*$/.test(toValidateCode)) {
          this.$message({
            type: 'error',
            showClose: true,
            message: '验证码格式不正确！'
          })
        } else {
          let phone = $('.phone').val()
          let result = await resetPasswordSecond(toValidateCode, phone)
           console.log(result)
          if (result.success) {
            this.phone = phone
            this.token = result.data
            this.authenticationCheck = false
            this.newPassword = true
          } else {
            this.$message({
              type: 'error',
              showClose: true,
              message: '验证码不正确'
            })
          }
        }
      },
      //提交新的密码
      async resetPwd () {
        let password = $('.newPassword').val()
        let passwordTwice = $('.newPasswordTwice').val()
        if (password.length <6 || password.length > 14) {
          this.$message({
            type: 'error',
            showClose: true,
            message: '密码格式不正确！'
          })
        } else {
          if (password !== passwordTwice) {
            this.$message({
              type: 'error',
              showClose: true,
              message: '再次输入的密码与第一次输入的不一样！'
            })
          } else {
            let result = await resetPasswordThird(password, this.token, this.phone)
            console.log(result)
            if (result.success) {
              //设置用户信息和sessionid
              document.cookie = `JSESSIONID=${result.data.userPwd}`
              this.getSessionId(result.data.userPwd)
              setStorage('user', result.data)
              //返回首页
              this.$router.push('/')
              this.getIsMe(true)
            } else if (result.msg === '请不要输入旧密码') {
              this.$message({
                type: 'error',
                showClose: true,
                message: '新设置的密码与原密码重复！'
              })
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  .resetPassword {
    height: 100vh;
    width: 100%;
    background-image: url('https://oss.yxlinker.com/master/login-bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
  }
  .setPwd, .setPW {
    position: fixed;
    top: 50vh;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 625px;
    height: 350px;
    background-color: white;
    padding: 35px;
    box-sizing: border-box;
  }
  .setPassword {
    width: 100%;
    height: 100%;
  }
  .setPwd-title, .setPW-title {
    font-size: 24px;
  }
  .setPwd-content, .setPW-content {
    width: 413px;
    margin: 50px auto;
  }
  .new-setPwd-wrapper, .new-setPwd-verification-wrapper, .new-password-wrapper, .new-password-twice-wrapper {
    width: 410px;
    height: 50px;
    border-bottom: 2px solid #eeeeee;
  }
  .newPassword, .phone, .newPasswordTwice {
    width: 410px;
    height: 45px;
    font-size: 16px;
    color: #969696;
    border:  0;
    outline: none;
  }
  .newPasswordVerification {
    display: inline-block;
    vertical-align: middle;
    width: 250px;
    height: 45px;
    font-size: 16px;
    color: #969696;
    border:  0;
    outline: none;
  }
  .newPasswordVerification-tip {
    display: inline-block;
    vertical-align: middle;
    color: #4893a8;
    font-size: 16px;
    text-align: right;
    width: 143px;
    cursor: pointer;
  }
  .newPasswordVerification-tip.current {
    text-decoration: none;
    text-align: right;
  }
  .setPwd-submit-btn, .setPW-submit-btn {
    width: 413px;
    height: 43px;
    text-align: center;
    line-height: 43px;
    background-color: #4893a8;
    color: white;
    margin-top: 40px;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
