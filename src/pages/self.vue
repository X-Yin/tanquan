<template>
    <div class="self">
      <head-nav></head-nav>
      <div class="container">
        <div class="me">
          <div class="avatar-wrapper">
            <div class="avatar"><img style="width: 100%;height: 100%;border-radius: 50%;" v-lazy="user.userProPic"></div>
          </div>
          <div class="description">
            <div class="nickName">
              <span class="name">{{user.userName}}</span>
              <span class="icon-checkNumber"></span>
            </div>
            <div class="motto">
              <div class="motto-text">
                "{{user.userSignDec}}"
              </div>
            </div>
            <div class="detail">
              <span class="icon-arrow"></span>
              <span class="region">{{user.userLocation}}</span>
              <span class="point"><span style="color: #222">指数：</span>{{user.userActiveness}}</span>
            </div>
          </div>
        </div>
        <div class="container-1">
          <el-row>
            <el-col :span="17" class="el-17"  style="padding-top: 30px;">
              <div class="tabs">
                <router-link to="/self/dynamic" class="tab tab-l">动态</router-link>
                <router-link to="/self/circle" class="tab tab-ct">圈子</router-link>
                <router-link to="/self/questionAnswer" class="tab tab-ct">问答</router-link>
              <!--   <router-link to="/self/live" class="tab tab-ct">Live</router-link> -->
                <router-link to="/self/task" class="tab tab-ct">任务</router-link>
             <!--    <router-link to="/self/activity" class="tab tab-ct">活动</router-link> -->
              <!--   <router-link to="/self/topic" class="tab tab-ct">话题</router-link> -->
                <router-link to="/self/friend" class="tab tab-ct">好友</router-link>
                <router-link to="/self/collect" class="tab tab-r">收藏</router-link>
              </div>
              <router-view/>
            </el-col>
            <el-col :span="6" class="el-6" :offset="1">
<!--               <div class="wrapper">
                <div class="myAttention">我关注的<br><span class="number">{{self.myAttention}}</span></div>
                <div class="attentionMe">关注我的<br><span class="number">{{self.attentionMe}}</span></div>
              </div> -->
              <div class="link">
                <div class="wrapper1">
                  <span class="color-block"></span>
                  <span class="link-text">我的圈子</span>
                </div>
                <div class="wrapper1">
                  <span class="color-block"></span>
                  <span class="link-text">我的探求</span>
                </div>
                <div class="wrapper1">
                  <span class="color-block"></span>
                  <span class="link-text">我的好友</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <foot-bar></foot-bar>
    </div>
</template>

<script type="text/ecmascript-6">
  import headNav from '../components/Ccomponents/headNav.vue'
  import footBar from '../components/Ccomponents/footBar.vue'
  import {mapState, mapActions} from 'vuex'
  import {getStorage} from '../api/util.js'
  import {getUserInfo} from '../api/index.js'
  export default {
    data () {
      return {
        user: {}
      }
    },
    components: {
      headNav,
      footBar
    },
    mounted () {
      let userId = getStorage('personPageId')
      this._getUserInfo(userId)
    },
    computed: {
    },
    methods: {
      async _getUserInfo (userId) {
        let result = await getUserInfo(userId)
        console.log(result)
        if (result.success) {
          this.user = result.data
        }
      }
    }
  }
</script>

<style scoped>
  .el-17 {
    background-color: white;
    padding: 30px 20px 0 20px;
    box-sizing: border-box;
    border-radius: 10px;
  }
  .el-6 {
    background-color:  white;
    border-radius: 10px;
  }
  a {
    text-decoration: none;
  }
  .container {
    min-height: 100vh;
    width: 1180px;
    margin: 0 auto;
  }
  .me {
    height: 183px;
    margin: 58px 0 20px 0;
    display: flex;
    background-color: white;
    border-radius: 10px;
  }
  .avatar-wrapper {
    flex: 0 183px;
    height: 183px;
  }
  .avatar {
    width: 113px;
    height: 113px;
    margin: 35px;
    border-radius: 50%;
  }
  .description {
    flex: 1;
    padding: 35px 0;
  }
  .nickName {
    font-size: 22px;
    color: #6a6a6a;
    height: 25px;
  }
  .name {
    display: inline-block;
  }
  .icon-checkNumber {
    display: inline-block;
    width: 21px;
    height: 21px;
    margin: 0 15px 0 15px;
    background: url('/static/ximages/check-number.png') 21px center;
    position: relative;
    top: 2px;
  }
  .color {
    display: inline-block;
    width: 77px;
    height: 24px;
    background-color: #4993a8;
    position: relative;
    top: 2px;
  }
  .motto {
    height: 30px;
    margin-top: 15px;
  }
  .motto:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 30px;
  }
  .mood {
    display: inline-block;
    vertical-align: middle;
    margin-right: 30px;
  }
  .mood-text {
    display: inline-block;
    width: 40px;
    height: 23px;
    border: 1px solid #4993a8;
    line-height: 23px;
    text-align: center;
    color: #4993a8;
    font-size: 14px;
    border-radius: 3px;
  }
  .motto-text {
    display: inline-block;
    vertical-align: middle;
    color: #a5a5a5;
    font-size: 18px;
  }
  .detail {
    color: #cecece;
    font-size: 15px;
    height: 25px;
    line-height: 25px;
    margin-top: 2px;
  }
  .icon-arrow {
    display: inline-block;
    width: 18px;
    height: 22px;
    background: url('/static/ximages/arrow.png') center no-repeat;
    background-size: 18px 22px;
    position: relative;
    top: 2px;
  }
  .region, .point {
    margin-left: 17px;
  }
  .position {
    height: 25px;
    line-height: 25px;
    margin-top: 5px;
    color: #a5a5a5;
  }
  .tab {
    width: 80px;
    height: 38px;
    text-align: center;
    line-height: 38px;
    color: #8a8a8a;
    display: inline-block;
    font-size: 20px;
  }
  .tabs {
    padding: 20px;
    box-sizing: border-box;
    font-size: 0;
    background-color: white;
    border-radius: 10px;
  }
  .tab-l {
    border: 1px solid #d4d4d4;
  }
  .tab-r, .tab-ct {
    border-top: 1px solid #d4d4d4;
    border-right: 1px solid #d4d4d4;
    border-bottom: 1px solid #d4d4d4;
    position: relative;
  }
  .router-link-active {
    border-top: 2px solid #01a9ce;
    color: black;
  }
  .wrapper {
    width: 100%;
    padding-left: 20px;
    box-sizing: border-box;
    padding-top: 20px;
  }
  .myAttention, .attentionMe {
    display: inline-block;
    width: 120px;
    background-color: #f6f6f6;
    text-align: center;
    padding: 30px 20px 30px 20px;
    box-sizing: border-box;
    color: #8a8a8a;
  }
  .myAttention {
    margin-right: 3px;
  }
  .number {
    display: inline-block;
    color: #01a9ce;
    text-decoration: underline;
    margin-top: 5px;
  }
  .link {
    margin-top: 30px;
  }
  .wrapper1 {
    width: 100%;
    padding-left: 20px;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
  }
  .wrapper1:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 40px;
  }
  .color-block {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    background-color: #4993a8;
    margin-right: 20px;
  }
  .link-text {
    color: #8a8a8a;
    display: inline-block;
    vertical-align: middle;
  }
</style>
