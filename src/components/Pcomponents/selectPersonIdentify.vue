<template>
    <div class="select-person-identify">
      <head-nav></head-nav>
        <div class="container wrapper">
          <div class="top">
            <div class="top-mask"></div>
            <div class="person-identify" @click="gotoIdentify('personIdentify')">身份认证</div>
            <div class="name-identify" @click="gotoIdentify('nameIdentify')">实名认证</div>
          </div>
          <div class=" main">
            <div class="main-left">
              <div class="title">身份认证</div>
              <div class="left-content">个人认证个人认证个人认证个人认证个人认证个人认证个人认证个人认证</div>
            </div>
            <div class="main-right">
              <div class="title">实名认证</div>
              <div class="right-content">实名认证实名认证实名认证实名认证实名认证实名认证实名认证实名认证</div>
            </div>
          </div>
          <div class="main-bottom">
            <div class="main-bottom-left"></div>
            <div class="main-bottom-middle"></div>
            <div class="main-bottom-right"></div>
          </div>
          <div class="bottom">
            <div class="bottom-content">
            </div>
          </div>
        </div>
      <foot-bar></foot-bar>
    </div>
</template>

<script>
    import headNav from '../Ccomponents/headNav.vue'
    import footBar from '../Ccomponents/footBar.vue'
    import {getStorage} from '../../api/util.js'
    export default {
      components: {
        headNav,
        footBar
      },
      methods: {
        //跳转到认证详情页
        gotoIdentify (route) {
          if (route === 'nameIdentify') {
            if (getStorage('user').isCertification) {
              this.$message({
                type: 'warning',
                showClose: true,
                message: '您已经实名认证过了！'
              })
              return
            }
          }
          if (route === 'personIdentify') {
            if (getStorage('user').userRole > 1) {
              this.$message({
                type: 'warning',
                showClose: true,
                message: '您已经认证过了！'
              })
              return
            }
          }
          this.$router.push(`/${route}`)
        }
      }
    }
</script>

<style scoped>
  .wrapper {
    min-height: 100vh;
    background-color: white;
  }
  .top {
    width: 1000px;
    height: 399px;
    background-image: url('/static/ximages/PS-bg.png');
    background-size: 1000px 399px;
    background-repeat: no-repeat;
    margin: 30px auto;
    position: relative;
  }
  .top-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
  }
  .person-identify {
    z-index: 2;
    position: absolute;
    top: 120px;
    left: 80px;
    width: 120px;
    height: 40px;
    border: 1.5px solid white;
    color: white;
    text-align: center;
    line-height: 43px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  .name-identify {
    z-index: 2;
    position: absolute;
    bottom: 120px;
    left: 80px;
    width: 120px;
    height: 40px;
    border: 1.5px solid white;
    color: white;
    text-align: center;
    line-height: 43px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  .main {
    width: 1000px;
    margin: 40px auto;
    font-size: 0;
  }
  .main-left, .main-right {
    width: 450px;
    height: 220px;
    background-color: black;
    display: inline-block;
    vertical-align: top;
    padding: 30px 50px;
    box-sizing: border-box;
  }
  .main-right {
    margin-left: 100px;
  }
  .title {
    color: white;
    font-size: 18px;
  }
  .left-content, .right-content {
    line-height: 30px;
    font-size: 15px;
    width: 70%;
    color: white;
    margin-top: 20px;
  }
  .main-bottom {
    width: 1000px;
    margin: 0 auto;
    font-size: 0;
  }
  .main-bottom-left, .main-bottom-middle, .main-bottom-right {
    display: inline-block;
    vertical-align: top;
    background-color: #4893a8;
    width: 300px;
    height: 300px;
  }
  .main-bottom-middle, .main-bottom-right {
    margin-left: 50px;
  }
  .bottom {
    width: 1000px;
    height: 300px;
    margin: 50px auto;
    background-color: black;
    margin-bottom: 60px;
  }
</style>