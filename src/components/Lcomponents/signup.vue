<template>
    <div class="signup">
      <div class="form">
        <div class="login" v-if="isLogin">
          <form method="post" action="" v-if="isPasswordLogin">
            <div class="title">
              <img src="https://oss.yxlinker.com/master/loginLogo.png" class="logo" style="position: relative; left: -20px">
              <span class="des">突破边界·进无止境</span>
            </div>
            <div class="input-wrapper">
              <div class="account-wrapper">
                <input type="text" placeholder="手机号或者邮箱" name="loginAccount" autocomplete="off" class="account" ref="loginPhonePW">
              </div>
              <div class="password-wrapper">
                <input type="password" placeholder="密码" name="loginPassword" autocomplete="off" class="password" ref="loginPWPhone">
                <!-- <i class="hidePw"></i> -->
              </div>
            </div>
            <div class="other-login">
              <div class="verification-code" @click="toggleToVerification">验证码登录</div>
              <div style="flex: 1"></div>
              <div class="third-party">
                <i class="weixin" @click="weixinLogin" style="position: relative; left: 70px"></i>
                <!-- <i class="weibo"></i>
                <i class="qq"></i> -->
              </div>
            </div>
          </form>
          <form method="post" action="" v-if="isVerificationLogin" >
            <div class="title">
              <img src="https://oss.yxlinker.com/master/loginLogo.png" class="logo"  style="position: relative; left: -20px">
              <span class="des">突破边界·进无止境</span>
            </div>
            <div class="input-wrapper">
              <div class="phone-wrapper">
                <div class="phone-prefix">中国号+86</div>
                <input type="text" placeholder="手机号" name="loginPhone" class="phone" autocomplete="off" ref="loginPhone">
              </div>
              <div class="verification-number-wrapper">
                <input type="text" name="loginVerificationNumber" class="verificationNumber" autocomplete="off" placeholder="请输入6位短信验证码" ref="loginVC">
                <span class="getVerification-btn" @click="getLoginVerificationCode" ref="loginVerificationCode">获取短信验证码</span>
              </div>
            </div>
            <div class="other-login">
              <div class="password-code" @click="toggleToPassword">密码登录</div>
              <div style="flex: 1"></div>
              <div class="third-party">
                <i class="weixin" @click="weixinLogin" style="position: relative; left: 70px"></i>
                <!-- <i class="weibo"></i>
                <i class="qq"></i> -->
              </div>
            </div>
          </form>
          <div class="login-btn" @click.enter="login">
            登录
          </div>
          <div class="text">
            没有账号？去<a href="javascript:void(0)" class="register1" @click="toggleRegister">注册</a>
            <div class="forgetPwd" @click="gotoResetPwd">忘记密码？</div>
          </div>
        </div>
        <div class="register" v-if="isRegister">
          <div class="registerPhone" v-if="isRegisterPhone">
            <div class="title">
              <img src="https://oss.yxlinker.com/master/loginLogo.png" class="logo"  style="position: relative; left: -20px">
              <span class="des">突破边界·进无止境</span>
            </div>
            <div class="input-wrapper">
              <div class="input-wrapper">
                <div class="phone-wrapper">
                  <div class="phone-prefix">中国号+86</div>
                  <input type="text" placeholder="手机号" name="registerPhone" class="phone" autocomplete="off" ref="phone">
                </div>
                <div class="verification-number-wrapper">
                  <input type="text" name="registerVerificationNumber" class="verificationNumber" autocomplete="off" placeholder="请输入6位短信验证码" ref="toValidateCode">
                  <span class="getVerification-btn" ref="verificationCode" @click="getVerificationCode">获取短信验证码</span>
                </div>
              </div>
            </div>
            <div class="register-des">
              <li>注册代表同意<span class="message" @click="$router.push('/privacyPolicy')">《CC社协议》、</span><span class="private" @click="$router.push('/private')">《隐私政策》</span></li>
            </div>
            <div class="register-btn" @click="toggleNamePassword">
              注册
            </div>
            <div class="text">
              已有账号？去<a href="javascript:void(0)" class="login1" @click="toggleLogin">登陆</a>
            </div>
          </div>
          <div class="registerNamePassword" v-if="isRegisterNamePassword">
            <div class="set-title">
              <i class="back-icon el-icon-arrow-left" @click="toggleRegisterPhone"></i>
              <span class="set-title-text">设置用户名和密码</span>
            </div>
            <div class="input-wrapper" style="margin-top: 5px;">
              <div class="username">
                <span class="name-prefix">用户名</span>
                <input type="text" name="username" autocomplete="off" class="register-username-input" placeholder="请输入1-10位字母数字或汉字的组合">
              </div>
              <div class="register-password">
                <span class="name-prefix">密码</span>
                <input type="password" name="registerPassword" autocomplete="off" class="register-password-input">
<!--                 <i class="hidePw"></i> -->
              </div>
              <div class="register-password-twice">
                <span class="name-prefix">再次输入</span>
                <input type="password" name="registerPasswordTwice" autocomplete="off" class="register-password-input" ref="registerPasswordInputTwice">
<!--                 <i class="hidePw"></i> -->
              </div>
            </div>
            <div class="enter-btn" style="margin-top: 30px;" @click="enter">
              进入
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="title">@2018|关于我们|版权声明|联系我们</div>
        <div class="description">
          © 2018 CC社京 ICP 证 18042097 号
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {reqVerificationCode, reqRegisterToken, submitRegister, phonePWLogin, reqLoginVerificationCode, phoneVerificationLogin,weixinLogin, emailPasswordLogin} from '../../api/index.js'
  import {mapMutations, mapState} from 'vuex'
  import $ from 'jquery'
  import axios from 'axios'
  import {getCookie, setCookie, setStorage, getStorage} from '../../api/util.js'
  export default {
    data () {
      return {
        registertTimer: null,//注册时填写验证码用来计时
        registerPhoneNumber: 0,//注册时拿到的电话号码
        registerName: '',//注册时填写的用户名
        registerPassword: '',//注册时填写的密码
        registerToken: '',//注册时获取到的token
        loginTimer: null,//登录时填写验证码用来计时
        location: ''
      }
    },
    computed: {
      ...mapState([
        'isMe',
        'isLogin',
        'isRegister',
        'isPasswordLogin',
        'isVerificationLogin',
        'isRegisterPhone',
        'isRegisterNamePassword'
      ])
    },
    methods: {
      ...mapMutations([
        'getIsMe',
        'getIsLogin',
        'getIsRegister',
        'getIsPasswordLogin',
        'getIsVerificationLogin',
        'getIsRegisterPhone',
        'getIsRegisterNamePassword',
        'getSessionId'
      ]),
      async weixinLogin () {
        let a = document.createElement('a')
        $(a).attr('href', 'https://open.weixin.qq.com/connect/qrconnect?appid=wxc58752813e08aa7f&redirect_uri=https://www.yxlinker.com&response_type=code&scope=snsapi_login#wechat_redirect')
        a.click()
      },
      //登录
      async login () {
        $('.login-btn').html('登录中...')
        if (this.isPasswordLogin) {
          let phone = this.$refs.loginPhonePW.value
          let password = this.$refs.loginPWPhone.value
          let isPhone = /^[0-9]+$/.test(phone)
          let isEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(phone)
          if (password.length === 0) {
            $('.login-btn').html('登陆')
            this.$message({
              type: 'warning',
              showClose: true,
              message: '密码不能为空!'
            })
            return
          }
          if (!isPhone && !isEmail) {
            setTimeout(() => {
              $('.login-btn').html('登录')
            }, 20)
            this.$message({
              type: 'error',
              showClose: true,
              message: '手机号或者邮箱的格式错误'
            })
          } else if (isEmail) {
            //用邮箱登录
            let email = phone
            let result = await emailPasswordLogin(email, password)
            console.log(result)
            if (result.success) {
              $('.login-btn').html('登录')
              //设置用户信息和sessionid
              document.cookie = `JSESSIONID=${result.data.userPwd}`
              this.getSessionId(result.data.userPwd)
              setStorage('user', result.data)
              //返回首页
              this.$router.push('/')
              this.getIsMe(true)
            } else {
              this.$message({
                type: 'error',
                showClose: true,
                message: result.msg
              })
              $('.login-btn').html('登录')
            }
          } else if (isPhone) {
            //用手机登录
            if (phone.length !== 11 || !/^[0-9]*$/.test(phone)) {
              this.$message({
                showClose: true,
                type: 'error',
                message: '手机号格式不正确'
              })
              $('.login-btn').html('登录')
            } else {
              let result = await phonePWLogin(phone, password)
              console.log(result)
              if (result.success) {
                $('.login-btn').html('登录')
                //设置用户信息和sessionid
                document.cookie = `JSESSIONID=${result.data.userPwd}`
                this.getSessionId(result.data.userPwd)
                setStorage('user', result.data)
                //返回首页
                this.$router.push('/')
                this.getIsMe(true)
              } else {
                this.$message({
                  type: 'error',
                  showClose: true,
                  message: result.msg
                })
                $('.login-btn').html('登录')
              }
            }
          }
        } else if (this.isVerificationLogin) {
          let verificationCode = this.$refs.loginVC.value
          if (verificationCode.length !== 6 || !/^[0-9]*$/.test(verificationCode)) {
            this.$message({
              type: 'error',
              showClose: true,
              message: '验证码格式不正确'
            })
            $('.login-btn').html('登录')
          } else {
            let phone = this.$refs.loginPhone.value
            let result = await phoneVerificationLogin(phone, verificationCode)
            console.log(result)
            if (result.success) {
              $('.login-btn').html('登录')
              clearInterval(this.loginTimer)
              this.loginTimer = null
              //设置用户信息和sessionid
              document.cookie = `JSESSIONID=${result.data.userPwd}`
              this.getSessionId(result.data.userPwd)
              setStorage('user', result.data)
              //返回首页
              this.$router.push('/')
              this.getIsMe(true)
            } else {
              this.$message({
                type: 'error',
                showClose: true,
                message: '验证码不正确'
              })
              $('.login-btn').html('登录')
            }
          }
        }
      },
      //登录获取短信验证码
      async getLoginVerificationCode () {
        let text = this.$refs.loginVerificationCode.innerHTML
        if (text === '获取短信验证码' || text === '重新获取验证码') {
          let phone = this.$refs.loginPhone.value
          if (phone.length !== 11 || !/^[0-9]*$/.test(phone)) {
            this.$message({
              showClose: true,
              type: 'error',
              message: '手机号格式不正确'
            })
            return
          }
          //设置秒数
          this.$refs.loginVerificationCode.innerHTML = 60
          $('.getVerification-btn').addClass('current')
          let count = 60
          this.loginTimer = setInterval(() => {
            if (count === 0) {
              this.$refs.loginVerificationCode.innerHTML = '重新获取验证码'
              $('.getVerification-btn').removeClass('current')
              clearInterval(this.loginTimer)
              this.loginTimer = null
            } else {
              count--
              this.$refs.loginVerificationCode.innerHTML = count
            }
          }, 1000)
          let result = await reqLoginVerificationCode(phone)
          console.log(result)
          if (result.msg === '没有注册') {
            this.$message({
              type: 'error',
              showClose: true,
              message: "该手机号没有注册！"
            })
            this.$refs.loginVerificationCode.innerHTML = '重新获取验证码'
            $('.getVerification-btn').removeClass('current')
            clearInterval(this.loginTimer)
            this.loginTimer = null
          }
        } else {
          return
        }
      },
      //注册获取短信验证码
      async getVerificationCode () {
        let text = this.$refs.verificationCode.innerHTML
        if (text === '获取短信验证码' || text === '重新获取验证码') {
          let phone = this.$refs.phone.value
          if (phone.length !== 11 || !/^[0-9]*$/.test(phone)) {
            this.$message({
              showClose: true,
              type: 'error',
              message: '手机号格式不正确'
            })
            return
          }
          //设置秒数
          this.$refs.verificationCode.innerHTML = 60
          $('.getVerification-btn').addClass('current')
          let count = 60
          this.registerTimer = setInterval(() => {
            if (count === 0) {
              this.$refs.verificationCode.innerHTML = '重新获取验证码'
              $('.getVerification-btn').removeClass('current')
              clearInterval(this.registerTimer)
              this.registerTimer = null
            } else {
              count--
              this.$refs.verificationCode.innerHTML = count
            }
          }, 1000)
          //发送验证码
          let result = await reqVerificationCode(phone)
          console.log(result)
          if (result.status === 0) {
            document.cookie=`JSESSIONID=${result.data}`
            this.getSessionId(result.data)
          } else if (result.msg === '手机号已被注册') {
            this.$refs.verificationCode.innerHTML = '获取短信验证码'
            $('.getVerification-btn').removeClass('current')
            clearInterval(this.registerTimer)
            this.registerTimer = null
            this.$message({
              type: 'error',
              showClose: true,
              message: '手机号已被注册'
            })
          } else {
            this.$message({
              type: 'error',
              showClose: true,
              message: '今日发送验证码次数已达10次'
            })
          }
        } else {
          return
        }
      },
      //注册用户进入按钮点击事件
      async enter () {
        let name = $('.register-username-input').val()
        let password = $('.register-password-input').val()
        let passwordTwice = this.$refs.registerPasswordInputTwice.value
        if (name.length < 1 || name.length > 15) {
          this.$message({
            type: 'error',
            showClose: true,
            message: '请输入1-15位用户名'
          })
          return
        }
        if (password.length < 6 || password.length > 15) {
          this.$message({
            type: 'error',
            showClose: true,
            message: '请输入6-15位密码'
          })
          return
        }
        if (password !== passwordTwice) {
          this.$message({
            type: 'error',
            showClose: true,
            message:  '再次输入密码与第一次输入不符合'
          })
        } else {
          this.registerPassword = password
          this.registerName = name
          let result = await submitRegister(this.registerName, this.registerPassword, this.registerPhoneNumber, this.registerToken)
          console.log(result)
          if (result.success) {
            //设置用户信息和sessionid
            document.cookie = `JSESSIONID=${result.data.userPwd}`
            this.getSessionId(result.data.userPwd)
            setStorage('user', result.data)
            //返回首页
            this.$router.push('/')//返回首页
            this.getIsMe(true)//表示已经登陆
          } else {
            this.$message({
              type: 'error',
              showClose: true,
              message: result.msg
            })
          }
        }
      },
      toggleToVerification () {//切换登录方式为验证码登录
        this.getIsPasswordLogin(false)
        this.getIsVerificationLogin(true)
      },
      toggleToPassword () {//切换登录方式为密码登录
        this.getIsPasswordLogin(true)
        this.getIsVerificationLogin(false)
      },
      toggleRegister () {//切换注册页面
        this.getIsLogin(false)
        this.getIsRegister(true)
        this.getIsRegisterPhone(true)
        this.getIsRegisterNamePassword(false)
      },
      toggleLogin () {//切换登录页面
        this.getIsPasswordLogin(true)
        this.getIsVerificationLogin(false)
        this.getIsLogin(true)
        this.getIsRegister(false)
      },
      //点击注册按钮 验证验证码是否正确，如果正确切换到注册用户名和密码界面
      async toggleNamePassword () {
        let toValidateCode = this.$refs.toValidateCode.value
        if (toValidateCode.length !== 6 || !/^[0-9]*$/.test(toValidateCode)) {
          this.$message({
            showClose: true,
            type: 'error',
            message: '验证码格式不正确'
          })
        } else {
          let phone = this.$refs.phone.value
          let result = await reqRegisterToken(toValidateCode, phone)
          console.log('token', result)
            if (result.success) {
              this.registerToken = result.data//将获取到的token值赋值给registerToken
              this.registerPhoneNumber = this.$refs.phone.value//将手机号码赋值给registerPhoneNumber
              this.getIsRegisterPhone(false)
              this.getIsRegisterNamePassword(true)
              clearInterval(this.registerTimer)
              this.registerTimer = null
            } else {
            this.$message({
              type: 'error',
              showClose: true,
              message: '验证码不正确'
            })
            }
        }
      },
      //切换到注册电话界面
      toggleRegisterPhone () {
        this.getIsRegisterPhone(true)
        this.getIsRegisterNamePassword(false)
      },
      //切换到重置密码路由
      gotoResetPwd () {
        clearInterval(this.registerTimer)
        this.registerTimer = null
        clearInterval(this.loginTimer)
        this.loginTimer = null
        this.getIsLogin(true)
        this.getIsRegister(false)
        this.getIsPasswordLogin(true)
        this.getIsVerificationLogin(false)
        this.getIsRegisterPhone(true)
        this.getIsRegisterNamePassword(false)
        this.$router.push('/resetPassword')
      }
    },
    watch: {
      registerPhone () {
        clearInterval(this.registerTimer)
        this.registerTimer = null
      },
      verificationLogin () {
        clearInterval(this.loginTimer)
        this.loginTimer = null
      }
    },
    mounted () {
      if (getCookie('SESSIONID')) {
        this.$router.push('/')
      }
      let _this = this
      $('body').on('keydown', function (e) {
        if (e.keyCode === 13) {
          if (_this.isLogin) {
             $('.login-btn').click()
          } else {
            if (_this.isRegister) {
             $('.register-btn').click() 
            }
          }
        }
      })
    }
  }
</script>

<style scoped>
  .message, .private {
    cursor: pointer;
    display: inline-block;
    border-bottom: 1px solid transparent;
  }
  .message:hover, .private:hover {
    border-bottom: 1px solid #4893a8;
  }
  .private {
    margin-left: 10px;
  }
  .signup {
    height: 100vh;
    width: 100%;
    background-image: url('https://oss.yxlinker.com/master/login-bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
  }
  .form {
    width: 538px;
    height: 354px;
    background-color: white;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 125px;
    padding: 30px 40px 0 40px;
    box-sizing: border-box;
  }
  .title {
    height: 35px;
  }
  .title:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 35px;
  }
  .logo {
    display: inline-block;
    vertical-align: middle;
    width: 150px;
    margin-right: 25px;
  }
  .des {
    display: inline-block;
    vertical-align: middle;
    color: #4993a8;
    font-size: 16px;
  }
  .input-wrapper {
    margin-top: 30px;
  }
  .account-wrapper, .password-wrapper {
    height: 53px;
    border-bottom: 1.5px solid #f0f0f0;
  }
  .password:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 50px;
  }
  .account, .password {
    width: 100%;
    height: 50px;
    font-size: 16px;
    color: #adadad;
    border: 0;
    outline: none;
  }
  .password {
    width: 100%;
    display: inline-block;
    vertical-align: middle;
  }
  .hidePw {
    display: inline-block;
    vertical-align:  middle;
    width: 17px;
    height: 15px;
    background-image: url('https://oss.yxlinker.com/master/hidePW.png');
    background-size: 17px 15px;
    background-repeat: no-repeat;
  }
  .other-login {
    margin-top: 20px;
    display: flex;
    height: 20px;
  }
  .verification-code {
    flex: 0 85px;
    width: 85px;
    color: #4993a8;
    font-size: 16px;
    text-decoration: underline;
    cursor: pointer;
  }
  .third-party {
    flex: 0 100px;
    height: 20px;
  }
  .third-party:before {
    content: '';
    display: inline-block;
    vertical-align:  middle;
    height: 20px;
  }
  .weixin {
    display: inline-block;
    vertical-align: middle;
    width: 17px;
    height: 17px;
    background-image: url('https://oss.yxlinker.com/master/weixin.png');
    background-size: 17px;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  .weibo {
    display: inline-block;
    vertical-align: middle;
    width: 22px;
    height: 17px;
    background-image: url('https://oss.yxlinker.com/master/weibo.png');
    background-size: 22px 17px;
    background-repeat: no-repeat;
    margin-left: 16px;
    cursor: pointer
  }
  .qq {
    display: inline-block;
    vertical-align: middle;
    width: 19px;
    height: 17px;
    margin-left: 15px;
    background-image: url('https://oss.yxlinker.com/master/qq.png');
    background-size: 19px 17px;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  .login-btn, .register-btn, .enter-btn {
    width: 100%;
    height: 30px;
    background-color: #4893a8;
    line-height: 30px;
    text-align: center;
    color: white;
    font-size: 17px;
    cursor: pointer;
    margin-top: 15px;
    border-radius: 4px;
  }
  .text {
    margin-top: 18px;
    text-align: center;
    color: #858585;
    font-size: 16px;
    position: relative;
    height: 22px;
  }
  .forgetPwd {
    position: absolute;
    right: 0;
    top: 0;
    color: #4993a8;
    font-size: 16px;
    cursor: pointer;
    width: 80px;
  }
  a {
    text-decoration: none;
  }
  .register1, .login1 {
    color: #4893a8;
    text-decoration: underline;
  }
  .phone-wrapper {
    height: 53px;
  }
  .phone-wrapper:before {
    content: '';
    display:  inline-block;
    vertical-align: middle;
    height: 53px;
  }
  .phone-prefix {
    display: inline-block;
    vertical-align: middle;
    height: 26px;
    width: 88px;
    line-height: 26px;
    font-size: 16px;
    color: #858585;
    border-right: 2px solid #f2f2f2;
  }
  .phone {
    display: inline-block;
    vertical-align: middle;
    height: 26px;
    width: 340px;
    margin-left: 20px;
    font-size: 16px;
    color: #858585;
    border: 0;
    outline: none;
  }
  .verification-number-wrapper {
    height: 53px;
    padding-bottom: 1.5px;
    border-bottom: 1.5px solid #f0f0f0;
  }
  .verification-number-wrapper:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 53px;
  }
  .verificationNumber {
    display: inline-block;
    vertical-align: middle;
    height: 53px;
    width: 330px;
    border: 0;
    outline: none;
    color: #858585;
    font-size: 16px;
  }
  .getVerification-btn {
    display: inline-block;
    vertical-align: middle;
    width: 117px;
    height: 53px;
    line-height: 53px;
    color: #4893a8;
    font-size: 16px;
    text-decoration: underline;
    cursor: pointer;
    text-align: right;
  }
  .getVerification-btn.current {
    text-decoration: none;
  }
  .password-code {
    flex: 0 70px;
    width: 70px;
    color: #4993a8;
    font-size: 16px;
    text-decoration: underline;
    cursor: pointer;
  }
  .bottom {
    width: 365px;
    margin: 100px auto;
    text-align: center;
  }
  .bottom .title {
    font-size: 15px;
    color: black;
    font-weight: 600;
  }
  .bottom .description {
    font-size: 15px;
    color: #4c4c4c;
    font-weight: 500;
    line-height: 25px;
  }
  .register-des {
    margin-top: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 15px;
    color: #4893a8;
  }
  .set-title {
    height: 53px;
    font-size: 0;
  }
  .set-title:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 53px;
  }
  .back-icon {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: #4893a8;
    margin-right: 10px;
    cursor: pointer;
  }
  .set-title-text {
    display: inline-block;
    vertical-align: middle;
    height: 20px;
    line-height: 20px;
    color: #4893a8;
    font-size: 19px;
  }
  .username, .register-password, .register-password-twice {
    height: 53px;
    border-bottom: 2px solid #f3f3f3;
  }
  .username:before, .register-password:before, .register-password-twice:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 53px;
  }
  .name-prefix {
    display: inline-block;
    vertical-align: middle;
    height: 28px;
    width: 85px;
    color: #999999;
    font-size: 16px;
    line-height: 28px;
    border-right: 1.5px solid #f3f3f3;
  }
  .register-username-input {
    display: inline-block;
    vertical-align: middle;
    height: 50px;
    width: 360px;
    font-size: 16px;
    color: #999999;
    border: 0;
    outline: none;
  }
  .register-password-input {
    display: inline-block;
    vertical-align: middle;
    height: 50px;
    width: 340px;
    font-size: 16px;
    color: #999999;
    border: 0;
    outline: none;
  }
</style>
