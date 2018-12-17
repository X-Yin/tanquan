<template>
    <div class="name-identify">
        <head-nav></head-nav>
        <div class="container wrapper">
          <div class="back-wrapper" @click="back">
            <i class="el-icon-arrow-left"></i>返回
          </div>
          <div class="content">
            <div class="title">
              <span class="color-block"></span>
              <span class="title-text">实名认证</span>
            </div>
            <div class="user-data">
              <div class="name wrapper-1">
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
              <div class="name wrapper-1">
                <div class="tag"><span class="icon">*</span>&nbsp;身份证号</div>
                <div class="input-wrapper">
                  <input type="text" class="user-input idNumber">
<!--                   <span class="tip">14字以内</span> -->
                </div>
              </div>
            </div>
            <div class="submit-wrapper">
              <div class="submit-btn" @click="submit()">提交</div>
            </div>
          </div>
        </div>
        <foot-bar></foot-bar>
        <div class="loading-mask-wrapper" v-if="loading">
          <div class="loading-mask" v-loading="loading"></div>
        </div>
    </div>
</template>

<script>
    import headNav from '../Ccomponents/headNav.vue'
    import footBar from '../Ccomponents/footBar.vue'
    import {reqLoginVerificationCode, resetPasswordSecond, nameIdentify, reqUser} from '../../api/index.js'
    import {getCookie, setStorage} from '../../api/util.js'
    import $ from 'jquery'
    export default {
      data () {
        return {
          isGetCode: false,
          timer: null,//读秒计时
          second: 60,//秒数
          token: '',//短信验证的token值
          loading: false,//加载显示
        }
      },
      methods: {
        //返回上一页
        back () {
          this.$router.go(-1);
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
          let result = await reqLoginVerificationCode(phone);
          console.log(result);
          if (result.success) {
          }
        },
        async submit () {
          this.loading = true
          let phone = $('.phone').val()
          let toValidateCode = $('.code-input').val()
          let idNumber = $('.idNumber').val()
          let ret = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))((\d{4})|(\d{3}[Xx]))$/
          if (!ret.test(idNumber)) {
            this.$message({
              type: 'warning',
              showClose: true,
              message: '身份证号码格式有误!'
            })
            this.loading = false
            return
          }
          //提交验证码
          let result = await resetPasswordSecond(toValidateCode,phone)
          console.log(result)
          if (result.success) {
            this.token = result.data
            let name = $('.user-input.name').val()
            console.log(name, idNumber, this.token, phone, 1)
            //提交用户数据
            let result1 = await nameIdentify(name, idNumber, this.token, phone, 1)
            console.log(result1)
            if (result1.success) {
              //获取user数据
              let sessionId = getCookie('SESSIONID')
              let result2 = await reqUser(sessionId)
              console.log(result2)
              if (result2.success) {
                this.$message({
                type: 'success',
                showClose: true,
                message: '实名认证成功！'
              })
                setStorage(result2.data)
                this.$router.go(-1)
              }
            } else {
              this.$message({
                type: 'error',
                showClose: true,
                message: result1.msg
              })
            }
            this.loading = false
          } else {
            this.$message({
                type: 'error',
                showClose: true,
                message: result.msg
              })
          }
          this.loading = false
        }
      },
      components: {
        headNav,
        footBar
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
    border-bottom: 1px solid #4893a8;
    color: #4893a8;
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
  .icon {
    color: red;
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
  .wrapper-1 {
    display: flex;
    width: 100%;
    padding: 40px 30px;
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
  .input-wrapper {
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
  .tip {
    display: inline-block;
    vertical-align: top;
    height: 33px;
    line-height: 33px;
    margin-left: 10px;
    font-size: 14px;
    color: #a5a5a5;
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
  .submit-wrapper {
    width: 100%;
    height: 50px;
    margin-top: 90px;
    position: relative;
  }
  .submit-btn {
    position: absolute;
    width: 100px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    left: 550px;
    top: 0;
    cursor: pointer;
    border: 1px solid #4893a8;
    color: #4893a8;
    font-size: 16px;
    border-radius: 3px;
    transition: all 0.2s;
  }
  .submit-btn:hover {
    color: white;
    background-color: #4893a8;
  }
</style>
