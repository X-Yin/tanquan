<template>
    <div class="person-setting">
      <head-nav></head-nav>
      <div class="container">
        <div class="container-wrapper">
          <div class="menu-bar">
            <ul>
              <li class="menu-item current" @click="toggle(0)">账号与密码</li>
              <li class="menu-item" @click="toggle(1)">个人资料</li>
            </ul>
          </div>
          <div class="content">
            <div class="content-account-wrapper" v-show="accountShow">
              <div class="title">
                账号与密码
              </div>
              <div class="description">
                <div class="des-name">账户设置</div>
                <div class="des-text">绑定手机和邮箱，并设置密码，账号更安全<br>注意：为保证账号安全，需进行二次验证。</div>
              </div>
              <div class="password-wrapper">
                <div class="title-name">密码</div>
                <div class="content-text">
                  <span class="set">******</span>
                  <span class="edit" @click="showPassword">编辑</span>
                </div>
              </div>
              <div class="phone-wrapper">
                <div class="title-name">绑定手机</div>
                <div class="content-text">
                  <span class="set">{{phone}}</span>
                  <span class="edit" @click="showPhone">编辑</span>
                </div>
              </div>
              <div class="email-wrapper">
                <div class="title-name">绑定邮箱</div>
                <div class="content-text">
                  <span class="set">{{userEmail}}</span>
                  <span class="edit" @click="showEmail">编辑</span>
                </div>
              </div>
              <div class="third-party">
                <div class="title-name">绑定第三方</div>
                <div class="content-text" style="margin-top: 10px;">
                  <div class="weixin-wrapper"  @click="showWeixin">
                    <i class="weixin"></i>
                    <span class="third-party-text">微信</span>
                    <span class="bind-weixin-text" v-show="isBindWeixin">(解绑)</span>
                  </div>
                  <div class="weibo-wrapper">
                    <i class="weibo"></i>
                    <span class="third-party-text">微博</span>
                    <span class="bind-weibo-text" v-show="isBindWeibo">(解绑)</span>
                  </div>
                  <div class="qq-wrapper">
                    <i class="qq"></i>
                    <span class="third-party-text">QQ</span>
                    <span class="bind-qq-text" v-show="isBindQQ">(解绑)</span>
                  </div>
                </div>
              </div>
              <div class="domain-name">
                <div class="des-name">个性域名</div>
                <div class="des-text">个人主页的地址，个性域名只可更改一次<br>zhihu.com/people/sizi-18</div>
                <div class="edit-wrapper">
                  <div class="edit" @click="showDomain">编辑</div>
                </div>
              </div>
            </div>
            <div class="content-personMessage-wrapper" v-show="personMessageShow">
              <div class="title">个人资料</div>
              <div class="flex-wrapper">
                <div class="avatar-upload-wrapper">
                  <div>
                    <div class="avatar">
                      <img :src="avatar" class="avatar-show">
                    </div>
                    <div class="avatar-upload-btn" @click="inputAvatar">上传头像</div>
                  </div>
                </div>
                <div class="person-message-wrapper">
                  <div class="tag-wrapper">
                    <div class="tag sex-wrapper">性别</div>
                    <div class="sex-radio-wrapper">
                      <el-radio v-model="sex" label="man">男</el-radio>
                      <el-radio v-model="sex" label="woman">女</el-radio>
                    </div>
                  </div>
               <!--    <div class="tag-wrapper">
                    <div class="tag-title">心情</div>
                    <div class="emotion">
                      <el-rate v-model="emotion"></el-rate>
                    </div>
                  </div> -->
                  <div class="tag-wrapper">
                    <div class="tag-title">简介</div>
                    <div class="tag-input">
                      <input type="text" class="tag-input-detail des" v-model="des">
                    </div>
                  </div>
                    <div class="tag-wrapper">
                    <div class="tag-title">居住地</div>
                    <div class="tag-input">
                      <input type="text" class="tag-input-detail position" v-model="position">
                    </div>
                  </div>
                    <div class="tag-wrapper">
                    <div class="tag-title">所在行业</div>
                    <div class="tag-input">
                      <input type="text" class="tag-input-detail job-now" v-model="jobNow">
                    </div>
                  </div>
                  <!--   <div class="tag-wrapper">
                    <div class="tag-title">职业经历</div>
                    <div class="tag-input">
                      <input type="text" class="tag-input-detail job-history" v-model="jobHistory">
                    </div>
                  </div> -->
               <!--      <div class="tag-wrapper">
                    <div class="tag-title">教育经历</div>
                    <div class="tag-input">
                      <input type="text" class="tag-input-detail education" v-model="education">
                    </div>
                  </div> -->
                  <div class="tag-wrapper">
                    <div class="tag-title">个人认证</div>
                    <div class="identify" @click="gotoIdentify">申请认证<i class="el-icon-d-arrow-right"></i></div>
                  </div>
                </div>
              </div>
              <div class="submit-wrapper">
                  <div class="submit-btn" @click="_updateUserMsg">提交</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mask" @click="hide" v-show="maskShow"></div>
        <div class="allShow" v-if="allShow">
          <div class="authentication-wrapper" v-show="!isAuthentication && allShow">
            <div class="author-title">身份验证</div>
            <div class="author-des">为了保护你的账号安全，请验证身份，验证成功后进行下一步操作</div>
            <div class="author-content">
              <div class="author-text">使用手机{{phone}}进行验证</div>
              <div class="author-input-wrapper">
                <input type="text" name="authentication" placeholder="输入六位数验证码" class="authentication-input"
                       autocomplete="off">
                <span class="authentication-tip" ref="authenticationTip" @click="getVerificationCode">获取短信验证码</span>
                <div class="verification-btn" @click="setAuthentication">验证</div>
              </div>
            </div>
          </div>
          <div class="setPW" v-if="passwordShow && isAuthentication">
            <div class="setPassword">
              <div class="setPW-title">设置密码</div>
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
          <div class="setPhone" v-if="phoneShow && isAuthentication">
            <div class="setPhone-title">更换手机号</div>
            <div class="setPhone-content">
              <form method="post" action="">
                <div class="new-phone-wrapper">
                  <input type="text" placeholder="输入手机号" name="newPhone" class="newPhone" autocomplete="off">
                </div>
                <div class="new-phone-verification-wrapper">
                  <input type="text" placeholder="输入6位数验证码" name="newPhoneVerification" class="newPhoneVerification" autocomplete="off">
                  <span class="newPhoneVerification-tip" @click="getNewPhoneVerificationCode">获取短信验证码</span>
                </div>
                <div class="setPhone-submit-btn" @click="submitNewPhone">确定</div>
              </form>
            </div>
          </div>
          <div class="setEmail" v-if="emailShow && isAuthentication">
            <div class="setEmail-title">绑定邮箱</div>
            <div class="setEmail-content">
              <form method="post" action="">
                <div class="new-email-wrapper">
                  <input type="text" placeholder="邮箱地址" name="newEmail" class="newEmail" autocomplete="off">
                </div>
                <div class="setEmail-submit-btn" @click="submitEmail">确定</div>
              </form>
            </div>
          </div>
          <div class="setDomain" v-if="domainShow && isAuthentication">
            <div class="setDomain-title">个性域名</div>
            <div class="setDomain-content">
              <div class="domain-text">
                <span class="domain-prefix">zhihu.com/people/</span>
                <input type="text" placeholder="" name="domain" class="domain-input">
                <span class="repeat" v-show="isRepeat">已重复!</span>
              </div>
              <div class="setDomain-submit-btn">保存</div>
            </div>
          </div>
        </div>
      <foot-bar></foot-bar>
      <div class="loading-wrapper"  v-show="loadingShow">
        <div class="loading"
             v-loading="loading"
             element-loading-text="邮件正在发送中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"></div>
      </div>
      <clip-image ref="clipImage" :src="src"></clip-image>
      <div class="loading-maks-wrapper" v-if="maskLoading">
        <div class="loading-mask" v-loading='maskLoading'></div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import headNav from '../Ccomponents/headNav.vue'
  import footBar from '../Ccomponents/footBar.vue'
  import {mapState, mapMutations} from 'vuex'
  import {bindWeixinThird, bindWeixinFourth, reqLoginVerificationCode, phoneVerificationLogin, reqBindStatus, authenticationFirst, authenticatinSecond, unbindWeixin,
  changeNewPhoneThird, changeNewPhoneFourth, changeNewPhoneFifth,reqUser, bindEmailThird, bindEmailFifth,changeNewPassword, updateUserMsg} from '../../api/index.js'
  import {setStorage, getStorage, setCookie, getCookie, deleteCookie} from '../../api/util.js'
  import $ from 'jquery'
  import clipImage from '../common/clipImage.vue'
  export default {
    data () {
      return {
        allShow: false,
        passwordShow: false,//设置密码的显示
        phoneShow: false,//设置手机号码的显示
        emailShow: false,//设置邮箱的显示
        domainShow: false,//设置域名的显示
        maskShow: false,//遮罩的显示
        isRepeat: false,//域名是否重复
        user: {},
        authenticationTimer: null,//发送验证码的定时器
        setNewPhoneTimer: null,//更换新的手机号时,发送验证码的定时器
        token: '',//绑定微信返回的token
        isBindWeixin: false,//是否绑定过微信
        isBindingWeixin: false,//是否正在进行微信的绑定操作，用于在身份验证之后自动触发绑定微信的操作
        isUnbindingWeixin: false,//是否正在进行解绑微信的操作，用于在身份验证之后自动触发解绑微信的操作
        isBindWeibo: false,//是否绑定过微博
        isBindQQ: false,//是否绑定过qq
        loadingShow: false,//加载的div是否显示
        loading: true,//elementui加载图标是否显示
        accountShow: true,//账户密码界面显示
        personMessageShow: false,//个人资料界面的显示
        src: '',//用户上传的头像
        sex: '',//用户的性别
        emotion: null,//用户的心情分数
        des: '',//简介的内容
        jobNow: '',//所在行业
        jobHistory: '',//职业经历
        education: '',//教育经历
        position: '',//居住地
        maskLoading: false, //修改用户信息的loading
      }
    },
    created () {
      let user = getStorage('user')
      //由于在app.vue中的router-view没有使用keep-alive，每次切换到设置界面的时候，都会重新获取一遍数据，所以不用watch sessionId的变化
      if (user.userPhone !== undefined && user.userPhone !== null) {
        this.user = user
        this.des = user.userSignDec
        this.position = user.userLocation
        this.jobNow = user.userMajor
        if (user.userGender === 0) {
          this.sex = null
        } else if (user.userGender === 1) {
          this.sex = 'man'
        } else {
          this.sex = 'woman'
        }
      }
    },
    mounted () {
      this._getBindStatus()
      let location = window.location.href.split('code=')[1]
      if (location !== undefined) {
        let code = location.split('&')[0]
        this._bindWeixin(code)
      }
    },
    computed: {
      ...mapState([
        'isAuthentication',
        'avatar'
      ]),
      userEmail () {
        if (this.user.userEmail !== null && this.user.userEmail !== '') {
          return this.user.userEmail
        } else {
          return '未设置'
        }
      },
      phone () {
        if (this.user.userPhone === undefined) {
          return ''
        } else {
          let str = ''
          for (let i = 0; i < this.user.userPhone.length; i++) {
            if (i === 3 || i === 4 || i === 5 || i === 6) {
              str += '*'
            } else {
              str += this.user.userPhone[i]
            }
          }
          return str
        }
      }
    },
    methods: {
      async _updateUserMsg () {
        let userGender = this.sex === '' ? 0 : this.sex === 'man' ? 1 : 2
        let userSignDec = this.des
        let userMajor = this.jobNow
        let userLocation = this.position
        this.maskLoading = true
        let result = await updateUserMsg(userGender, userSignDec, userLocation, userMajor)
        console.log(result)
        if (result.success) {
            let sessionId = getCookie('SESSIONID')
            let result1 = await reqUser(sessionId)
            console.log(result1) 
            if (result1.success) {
              setStorage('user', result1.data)
              this.maskLoading = false
              this.$message({
               type: 'success',
               showClose: true,
               message: '修改成功！'
              })
            }
            this.maskLoading = false
        }
      },
      //跳转到选择实名认证和个人认证的详情页
      gotoIdentify () {
        this.$router.push('/selectPersonIdentify')
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
          if (!/(jpg|png|JPG|PNG|jpeg|JPEG)/.test(filePath)) {
            _this.$message({
              type: 'warning',
              showClose: true,
              message: '请上传jpg,png,jpeg格式的图片'
            })
          } else if (size > 10485760) {
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
      //切换显示的内容
      toggle (index) {
        $('.menu-item').removeClass('current')
        if (index === 0) {
          this.accountShow = true
          this.personMessageShow = false
        } else if (index === 1) {
          this.accountShow = false
          this.personMessageShow = true
        }
        setTimeout(() => {
          $(`.menu-item:eq(${index})`).addClass('current')
        }, 20)
      },
      //获取第三方绑定的状态
      async _getBindStatus () {
        let result = await reqBindStatus()
        console.log(result)
        if (result.success) {
          let data = result.data
          for (let i = 0; i < data.length; i++) {
            if (data[i].platform === 2) {
              this.isBindWeixin = true
            } else if (data[i].platform === 1) {
              this.isBindWeibo = true
            } else if (data[i].platform === 3) {
              this.isBindQQ = true
            }
          }
        }
      },
      ...mapMutations([
        'getIsAuthentication',
        'getAvatar'
      ]),
      hide () {
        this.allShow = false
        this.passwordShow = false
        this.phoneShow = false
        this.emailShow = false
        this.domainShow = false
        this.maskShow = false
        //消除定时器
        clearInterval(this.authenticationTimer)
        clearInterval(this.weixinTimer)
        this.authenticationTimer = null
        this.weixinTimer = null
      },
      showPassword () {
        this.allShow = true
        this.passwordShow = true
        this.maskShow = true
      },
      showPhone () {
        this.allShow = true
        this.maskShow = true
        this.phoneShow = true
      },
      showEmail () {
        this.allShow = true
        this.maskShow = true
        this.emailShow = true
      },
      showDomain () {
        this.allShow = true
        this.maskShow = true
        this.domainShow = true
      },
      //修改新的手机号以后，拿着sessionid去获取用户的数据,并且将用户的数据设置到本地
      async _getUser () {
        let sessionid = getCookie('JSESSIONID')
        let result = await reqUser(sessionid)
        console.log(result)
        if (result.success) {
          setStorage('user', result.data)
          setTimeout(() => {
            let user = getStorage('user')
            if (user.userPhone !== undefined && user.userPhone !== null) {
              this.user = user
            }
          }, 20)
        }
      },
      //进行微信的绑定或者是解绑操作
      showWeixin () {
        if (this.isBindWeixin) {//如果已经绑定过微信，进行解绑操作
          //进行解绑操作
          if (!this.isAuthentication) {//如果还没有进行过身份验证，进行身份验证
            this.allShow = true
            this.maskShow = true
            this.isUnbindingWeixin = true//表示正在解绑微信，在身份验证完成以后直接进行解绑操作
          } else {//如果进行过身份验证，直接进行解绑操作
            this._unbindWeixin()
          }
        } else {//如果还没有绑定过微信，进行绑定操作
          if (!this.isAuthentication) {//如果还没有进行过身份验证，进行身份验证
            this.allShow = true
            this.maskShow = true
            this.isBindingWeixin = true//表示正在绑定微信，在身份验证完成以后直接进行跳转扫码界面
          } else {//如果进行过身份验证，直接进行跳转扫码界面
            let a = document.createElement('a')
            $(a).attr('href', 'https://open.weixin.qq.com/connect/qrconnect?appid=wxc58752813e08aa7f&redirect_uri=https://www.yxlinker.com/personSetting&response_type=code&scope=snsapi_login#wechat_redirect')
            a.click()
          }
        }
      },
      //进行身份验证的时候发短信验证码
      async getVerificationCode () {
        setTimeout(() => {
          let text = document.getElementsByClassName('authentication-tip')[0].innerHTML
          if (text === '获取短信验证码' || text === '重新获取验证码') {
            let count = 60
            this.authenticationTimer = setInterval(() => {
              if (count === 0) {
                $('.authentication-tip').removeClass('current')
                document.getElementsByClassName('authentication-tip')[0].innerHTML = '重新获取验证码'
              } else {
                $('.authentication-tip').addClass('current')
                document.getElementsByClassName('authentication-tip')[0].innerHTML = count
                count--
              }
            }, 1000)
          }
        }, 20)
        let result = await authenticationFirst(this.user.userPhone)
        console.log(result)
        if (result.msg === '发送失败：触发分钟级流控Permits:1') {
          this.$message({
            type: 'error',
            showClose: true,
            message: '该手机号今日发送验证码次数已达10次，请明天再试'
          })
          this.hide()
        }
      },
      //通过身份验证拿到token值放在本地
      async setAuthentication () {
        let toValidateCode = $('.authentication-input').val()
        let phone = this.user.userPhone
        if (toValidateCode.length !== 6 || !/^[0-9]*$/.test(toValidateCode)) {
          this.$message({
            type: 'error',
            message: '验证码格式不正确',
            showClose: true
          })
        } else {
          let result = await authenticatinSecond(toValidateCode,phone)
          console.log(result)
          if (result.success) {
            //将取到的token值放在本地，以表示通过身份验证
            setCookie('authenticationToken', result.data)
            this.getIsAuthentication(true)
            clearInterval(this.authenticationTimer)
            this.authenticationTimer = null
            //如果是正在进行微信的绑定，那么身份验证完成以后还要跳转微信绑定界面
            if (this.isBindingWeixin) {
              let a = document.createElement('a')
              $(a).attr('href', 'https://open.weixin.qq.com/connect/qrconnect?appid=wxc58752813e08aa7f&redirect_uri=https://www.yxlinker.com/personSetting&response_type=code&scope=snsapi_login#wechat_redirect')
              a.click()
            }
            if (this.isUnbindingWeixin) {
              this._unbindWeixin()
            }
          }  else {
            this.$message({
              type: 'error',
              showClose: true,
              message: '验证码错误'
            })
          }
        }
      },
      //向后台传送code参数，绑定微信
      async _bindWeixin (code) {
        let result = await bindWeixinThird(code)
        console.log(result)
        if (result.success){
          let token = getCookie('authenticationToken')
          let data = result.data
          let result1 = await bindWeixinFourth(data.accessToken, data.expiresIn,  data.refreshToken, data.scope,data.openid,this.user.userPhone, token)
          console.log(result1)
          if (result1.success) {
            this.$message({
              type: 'success',
              showClose: true,
              message: '绑定成功!'
            })
            setTimeout(() => {
              let location = window.location.href.split('?')[0]
              window.location.href = location
            }, 300)
          } else if (result1.msg === '你已经绑定了') {
            this.$message({
              type: 'error',
              showClose: true,
              message: '该微信号已经绑定过其他账号！'
            })
            setTimeout(() => {
              let location = window.location.href.replace(window.location.search, '')
              window.location.href = location
            }, 300)
          }
          this.isBindingWeixin = false//不论是否绑定成功，都将正在绑定微信的状态设置为false
        }
      },
      //进行微信的解绑操作
      async _unbindWeixin () {
        let token = getCookie('authenticationToken')
        let result = await unbindWeixin(token)
        console.log(result)
        if (result.success) {
          this.$message({
            type: 'success',
            showClose: true,
            message: '解绑成功！'
          })
          this.isBindWeixin = false
          this.hide()
        }
        this.isUnbindingWeixin = false//是否解绑成功都将正在进行解绑操作设置为false
      },
      //获取新的手机号的验证码
      async getNewPhoneVerificationCode () {
        let phone = $('.newPhone').val()
        if (phone.length !== 11 || !/^[0-9]*$/.test(phone)) {
          this.$message({
            type: 'error',
            showClose: true,
            message: '手机号格式不正确'
          })
        } else if (phone === this.user.userPhone) {
          this.$message({
            type: 'warning',
            showClose: true,
            message: '新旧手机号码一样'
          })
        } else {
          let text = $('.newPhoneVerification-tip').html()
          if (text === '获取短信验证码' || text === '重新获取验证码') {
            let count = 60
            $('.newPhoneVerification-tip').html(count).addClass('current')
            this.setNewPhoneTimer = setInterval(() => {
              if  (count === 0) {
                $('.newPhoneVerification-tip').html('重新获取验证码').removeClass('current')
                clearInterval(this.setNewPhoneTimer)
                this.setNewPhoneTimer = null
              } else {
                count--
                $('.newPhoneVerification-tip').html(count)
              }
            }, 1000)
          }
          let token = getCookie('authenticationToken')
          let result = await changeNewPhoneThird(phone, token)
          console.log(result)
          if (result.success) {
          } else if (result.msg === '手机号已被注册') {
            this.$message({
              type: 'error',
              showClose: true,
              message: '该手机号已被注册！'
            })
            $('.newPhoneVerification-tip').html('重新获取验证码').removeClass('current')
            clearInterval(this.setNewPhoneTimer)
            this.setNewPhoneTimer = null
          }
        }
      },
      //提交新手机号和验证码
      async submitNewPhone () {
        let toValidateCode = $('.newPhoneVerification').val()
        if (toValidateCode.length !== 6 || !/^[0-9]*$/.test(toValidateCode)) {
          this.$message({
            type: 'error',
            showClose: true,
            message: '手机号格式不正确'
          })
        } else {
          let phone = $('.newPhone').val()
          let result = await changeNewPhoneFourth(toValidateCode, phone)
          console.log(result)
          if (result.success) {
            //将返回的token设置到本地
            setCookie('authenticationToken', result.data)
            let token = getCookie('authenticationToken')
            let result1 = await changeNewPhoneFifth(token, phone)
            console.log(result1)
            if (result1.success) {
              this.hide()
              this.$message({
                type: 'success',
                showClose: true,
                message: '更换成功！'
              })
              this._getUser()
            }
          }
        }
      },
      //获取新邮箱并且提交后台
      async submitEmail () {
        let email = $('.newEmail').val()
        if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
          this.$message({
            type: 'error',
            showClose: true,
            message: '邮箱的格式错误！'
          })
        } else {
          //显示loading加载
          this.loadingShow = true
          //提交用户填写的email
          let token = getCookie('authenticationToken')
          let result = await bindEmailThird(token, email)
          console.log(result)
          if (result.success) {
            this.loadingShow = false
            this.$message({
              type: 'success',
              showClose: true,
              message: '邮件发送成功，请在电脑端登录邮箱，查看邮件'
            })
            this.hide()
          }
        }
      },
      //修改密码
      async resetPwd () {
        let pwdNew = $('.newPassword').val()
        let pwdNewTwice = $('.newPasswordTwice').val()
        if (pwdNew !== pwdNewTwice) {
          this.$message({
            type: 'error',
            showClose: true,
            message: '再次输入的密码与第一次不一样！'
          })
        } else {
          let token = getCookie('authenticationToken')
          let result = await changeNewPassword(token, pwdNew)
          console.log(result)
          if (result.success) {
            this.$message({
              type: 'success',
              showClose: true,
              message: '修改成功！'
            })
            this.hide()
          } else if (result.msg === '请不要输入旧密码') {
            this.$message({
              type: 'error',
              showClose: true,
              message: '新密码与旧密码相同！'
            })
          } else if (result.msg === '密码格式错误') {
            this.$message({
              type: 'error',
              showClose: true,
              message: '密码格式错误！'
            })
          }
        }
      }
    },
    components: {
      headNav,
      footBar,
      clipImage
    }
  }
</script>

<style scoped>
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .loading-mask-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
  }
  .loading-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .container-wrapper {
    width: 841px;
    margin: 0 auto;
    font-size: 0;
    box-shadow: 0 0 1px rgba(0,0,0,0.1)
  }
  .menu-bar {
    width: 150px;
    display: inline-block;
    height: 818.6px;
    background-color: white;
    border-right: 1px solid #ebebeb;
    vertical-align: top;
   }
  .menu-item:first-child {
    margin-top: 30px;
  }
  .menu-item {
    list-style: none;
    width: 100%;
    height: 40px;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    color: #8590a6;
    cursor: pointer;
  }
  .menu-item:hover {
    background-color: rgba(133,144,166,.08);
  }
  .menu-item.current {
    color: #333;
    background-color: rgba(133,144,166,.08);
    font-weight: 600;
  }
  .content {
    width: 690px;
    min-height: 100vh;
    height: 818.6px;
    background-color: white;
    padding: 30px 30px;
    display: inline-block;
    vertical-align: top;
    box-sizing: border-box;
  }
  .title {
    font-size: 35px;
    font-weight: 500;
  }
  .flex-wrapper {
    display: flex;
    width: 100%;
    margin-top: 50px;
  }
  .person-message-wrapper {
    flex: 1;
    margin-left: 30px;
  }
  .tag-wrapper {
    padding: 0 30px 30px 30px;
    box-sizing: border-box;
  }
  .tag {
    font-size: 16px;
    color: #333;
    font-weight: 600;
    height: 24.8px;
    line-height: 24.8px;
    width: 64px;
  }
  .sex-wrapper {
    display: inline-block;
    vertical-align: top;
  }
  .sex-radio-wrapper {
    display: inline-block;
    vertical-align: top;
    margin-left: 50px;
  }
  .tag-title {
    height: 50px;
    width: 64px;
    line-height: 50px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    display: inline-block;
    vertical-align: top;
  }
  .emotion {
    height: 50px;
    display: inline-block;
    vertical-align: top;
    margin-left: 50px;
    padding-top: 10px;
    box-sizing: border-box;
  }
  .tag-input {
    display: inline-block;
    vertical-align: top;
    margin-left: 50px;
    padding-top: 7.5px;
    box-sizing: border-box;
  }
  .tag-input-detail {
    width: 300px;
    height: 35px;
    border: 0;
    outline: none;
    background-color: #efefef;
    border-radius: 4px;
    text-indent: 2em;
    font-size: 15px;
    font-weight: 600;
    border: 1px solid transparent;
    transition: all 0.2s;
  }
  .tag-input-detail:hover, .tag-input-detail:focus{
    border:1px solid #4893a8;
  }
  .identify {
    display: inline-block;
    vertical-align: top;
    font-size: 17px;
    color: #777;
    cursor: pointer;
    margin-left: 50px;
    height: 50px;
    line-height: 50px;
  }
  .identify:hover {
    color: #4893a8;
  }
  .avatar-upload-wrapper {
    flex: 0 120px;
  }
  .avatar-show {
    width: 117px;
    height: 117px;
    margin: 0 auto;
    border-radius: 50%;
  }
  .avatar-upload-btn {
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #4893a8;
    color: #4893a8;
    font-size: 16px;
    border-radius: 3px;
    margin: 20px auto;
    transition: all 0.2s;
    cursor: pointer;
  }
  .avatar-upload-btn:hover {
    background-color: #4893a8;
    color: white;
  }
  .description {
    margin-top: 30px;
    height: 40px;
    padding-bottom: 30px;
    border-bottom: 2px solid #f3f3f3;
  }
  .description:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 40px;
  }
  .des-name {
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    color: #333;
    margin-right: 80px;
  }
  .des-text {
    display: inline-block;
    vertical-align:  middle;
    font-size: 15px;
    color: #4f4f4f;
  }
  .password-wrapper, .phone-wrapper, .email-wrapper, .third-party {
    height: 88px;
    padding-left: 30px;
    box-sizing: border-box;
    border-bottom: 2px solid #f3f3f3;
  }
  .title-name {
    margin-top: 20px;
    font-size: 20px;
    color: #333;
  }
  .content-text {
    margin-top: 5px;
    position: relative;
  }
  .set {
    font-size: 18px;
    color: #818181;
    letter-spacing: 4px;
  }
  .edit {
    position: absolute;
    font-size: 18px;
    right: 0;
    color: #4893a8;
    cursor: pointer;
  }
  .third-party {
    height: 117px;
  }
  .weixin-wrapper, .weibo-wrapper, .qq-wrapper {
    margin-right: 60px;
    height: 45px;
    display: inline-block;
    position: relative;
  }
  .bind-weixin-text, .bind-qq-text, .bind-weibo-text {
    position: absolute;
    right:  0;
    color: #4893a8;
    font-size: 14px;
    top: 38px;
    font-weight: 600;
    cursor: pointer;
  }
  .bind-qq-text {
    top: 42px;
  }
  .weixin {
    display: inline-block;
    vertical-align: bottom;
    width: 38px;
    height: 36px;
    background-image: url('https://oss.yxlinker.com/master/weixin-bg.png');
    background-size: 38px 36px;
    background-repeat: no-repeat;
    margin-right: 20px;
    cursor: pointer;
  }
  .weibo {
    display: inline-block;
    vertical-align: bottom;
    width: 46px;
    height: 36px;
    background-image: url('https://oss.yxlinker.com/master/weibo-bg.png');
    background-size: 46px 36px;
    background-repeat: no-repeat;
    margin-right: 20px;
    cursor: pointer;
  }
  .qq {
    display: inline-block;
    vertical-align: bottom;
    width: 37px;
    height: 42px;
    background-image: url('https://oss.yxlinker.com/master/qq-bg.png');
    background-size: 37px 43px;
    background-repeat: no-repeat;
    margin-right: 20px;
    cursor: pointer;
  }
  .third-party-text {
    display: inline-block;
    vertical-align: bottom;
    font-size: 17px;
    color: #4893a8;
  }
  .domain-name {
    margin-top: 50px;
    height: 40px;
    padding-bottom: 60px;
  }
  .edit-wrapper {
    position: relative;
    margin-top: 10px;
  }
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5)
  }
  .setPW,.authentication-wrapper,.setPhone, .setEmail, .setDomain{
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
  .authentication-wrapper {
    z-index: 100;
  }
  .author-title, .setPhone-title, .setEmail-title, .setDomain-title{
    font-size: 24px;
  }
  .author-des {
    font-size: 17px;
    color: #aaaaaa;
    margin-top: 20px;
  }
  .author-content{
    width: 413px;
    margin: 33px auto;
  }
  .author-text {
    color: #aaaaaa;
    font-size: 17px;
  }
  .author-input-wrapper {
    margin-top: 20px;
    height: 50px;
    border-bottom: 2px solid #efefef;
  }
  .author-input-wrapper:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 50px;
  }
  .authentication-input {
    width: 250px;
    height: 45px;
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    color: #8b8b8b;
    border: 0;
    outline: none;
  }
  .authentication-tip {
    display: inline-block;
    vertical-align: middle;
    width: 150px;
    font-size: 16px;
    color: #8b8b8b;
    text-align: right;
    cursor: pointer;
  }
  .authentication-tip.current {
    text-decoration: none;
    text-align: right;
  }
  .verification-btn {
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
  .setPW-title {
    font-size: 24px;
  }
  .setPW-content, .setPhone-content, .setEmail-content{
    width: 413px;
    margin: 50px auto;
  }
  .new-password-wrapper, .new-password-twice-wrapper, .new-phone-wrapper, .new-phone-verification-wrapper, .new-email-wrapper, .new-email-verification-wrapper {
    width: 410px;
    height: 50px;
    border-bottom: 2px solid #eeeeee;
  }
  .newPassword,  .newPasswordTwice{
    width: 410px;
    height: 45px;
    font-size: 16px;
    color: #969696;
    border:  0;
    outline: none;
  }
  .setPW-submit-btn, .setPhone-submit-btn, .setEmail-submit-btn, .setDomain-submit-btn{
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
  .new-phone-verification-wrapper:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 50px;
  }
  .newPhone, .newEmail {
    width: 410px;
    height: 45px;
    font-size: 16px;
    color: #969696;
    border:  0;
    outline: none;
  }
  .newPhoneVerification, .newEmailVerification {
    display: inline-block;
    vertical-align: middle;
    width: 250px;
    height: 45px;
    font-size: 16px;
    color: #969696;
    border:  0;
    outline: none;
  }
  .newPhoneVerification-tip, .newEmailVerification-tip{
    display: inline-block;
    vertical-align: middle;
    color: #4893a8;
    font-size: 16px;
    text-align: right;
    width: 143px;
    cursor: pointer;
  }
  .newPhoneVerification-tip.current {
    text-decoration: none;
    text-align: right;
  }
  .setDomain-content {
    width: 413px;
    margin: 50px auto;
  }
  .domain-text {
    width: 100%;
    white-space: nowrap;
    height: 40px;
  }
  .domain-text:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 40px;
  }
  .domain-prefix {
    display: inline-block;
    vertical-align:  middle;
    font-size: 16px;
    color: #747474;
  }
  .domain-input {
    width: 180px;
    height: 26px;
    background-color: #eeeeee;
    color: #747474;
    font-size: 16px;
    border: 1.5px solid #d3d3d3;
    margin-left: 25px;
    margin-right: 20px;
  }
  .repeat {
    display: inline-block;
    vertical-align: middle;
    color: red;
    font-size: 16px;
  }
  .submit-wrapper {
    width: 100%;
    height: 50px;
    margin-top: 20px;
    position: relative;
  }
  .submit-btn {
    width: 100px;
    height: 25px;
    line-height: 25px;
    border: 1px solid #4893a8;
    color: #4893a8;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;
    font-size: 15px;
    transition: all 0.2s;
    position: absolute;
    right: 30px;
    top: 0;
  }
  .submit-btn:hover {
    color: white!important;
    background-color: #4893a8;
  }
</style>
