<template>
  <div class="headNav">
    <el-row class="top-line" type="flex" justify='center'>
      <el-col :span='24'><div ></div></el-col>
    </el-row>
    <el-row class="nav container">
      <el-col :span='4'>
        <div @click="goto('/')">
          <!--<h1>LOGO</h1>-->
          <img src="https://oss.yxlinker.com/master/logo.png" class="logo">
        </div>
      </el-col>
      <el-col :span="10">
        <ul class="goto">
          <li @click="goto('/tanquan')" :class="{current:isCurrent('/tanquan')}">探圈</li><!--
				 --><li @click="goto('/tanqiu')" :class="{current:isCurrent('/tanqiu')}">探求</li><!--
				 --><li @click="goto('/tanren')" :class="{current:isCurrent('/tanren')}">探人</li>
        </ul>
      </el-col>
      <!--<el-col :span="4"><div style="height: 99px"></div></el-col>-->
      <el-col :span="9" :offset="1">
        <el-row class="search">
          <el-col :span="14">
            <input placeholder="搜索..." type="text" v-model="query1" class="search-input">
            <i class="icon el-icon-search" @click="search"></i>
          </el-col>
          <el-col :span="7" :offset="3" style="padding-top: 5px" v-if="!isMe">
            <div class="btn" style="margin-right: 20px" @click="toggleLogin" ref="loginBtn">登录</div>
            <div class="btn" @click="toggleRegister" ref="registerBtn">注册</div>
          </el-col>
          <el-col :span="10"  v-if="isMe">
            <div class="avatar-wrapper" @click="toggleDropdown">
              <img :src="avatar" class="avatar">
              <i class="el-icon-caret-bottom caret-bottom"></i>
              <ul class="dropdown" v-show="dropDown">
                <li class="dropdown-item" @click="gotoSet">设置</li>
                <li class="dropdown-item" @click="gotoMe">我的主页</li>
                <li class="dropdown-item" @click="loginOut">退出登录</li>
              </ul>
            </div>
            <div class="text" style="margin-right: 10px" @click="gotoFriend">好友<span class="dot"></span></div>
            <div class="text" @click="gotoPrivateLetter">
              私信
              <!--<span class="dot"></span>-->
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {reqUser, logout, haveReadMessage} from '../../api/index.js'
  import {getCookie, setCookie,getStorage, setStorage, deleteCookie} from '../../api/util.js'
  const DEFAULT_AVATAR = 'https://oss.yxlinker.com/master/person.png'
  export default{
    data () {
      return {
        dropDown: false,
        query1: '',//用户输入的搜索的字段
        inputTimer: null,//控制用户输入的频率
      }
    },
    mounted () {
      //将搜索的字段保持在输入框内
      $('.search-input').val(this.query)
      let user = getStorage('user')
      if (user.userProPic !== undefined && user.userProPic !== null) {
        this.getAvatar(getStorage('user').userProPic)
      }
      //如果在该网站登陆成功的话，就在环信登陆
      let sessionId = getCookie('JSESSIONID');
      if (sessionId !== undefined && !this.isLoginHuanxin) {
        let options = {
          apiUrl: this.$WebIM.config.apiURL,
          user: 'user' + user.userId,
          pwd: 'jhg23456#$%hhh',
          appKey: this.$WebIM.config.appkey
        };
        console.log(options);
        this.$conn.open(options);
        this.$conn.listen({
          onOpened: function ( message ) {//连接成功回调
            console.log('连接成功！');
            console.log(message);
            this.getIsLoginHuanxin(true)
          },
          onClosed: function ( message ) {
            console.log('连接失败！');
            console.log(message)
          },         //连接关闭回调
          onTextMessage: function ( message ) {
            console.log(message)
          },    //收到文本消息
        })
      }
    },
    computed: {
      ...mapState([
        'sessionId',
        'isMe',
        'isLogin',
        'isRegister',
        'isPasswordLogin',
        'isVerificationLogin',
        'isRegisterPhone',
        'isRegisterNamePassword',
        'avatar',
        'query',
        'isLoginHuanxin'
      ])
    },
    methods:{
      //已读消息的函数
      async _haveReadMessage () {
        let roomId = getStorage('privateLetterDetailId');
        let result = await haveReadMessage(roomId);
        console.log(result);
        if (result.success) {}
      },
      //搜索的函数
      search () {
        let sessionid = getCookie('JSESSIONID');
        if (sessionid) {
          if (this.query1.length > 0) {
          this.$router.push('/search')
         }
        } else {
          this.$router.push('/signup')
        }
      },
      //退出登录
      async loginOut () {
        this._haveReadMessage();//已读消息；
        let result = await logout()
        if (result.success) {
          this.clearAllData();
          //退出环信登陆
          this.$conn.close();
          this.getIsLoginHuanxin(false);
          this.$router.push('/')
        }
        this.$router.push('/');
      },
      ...mapMutations([
        'getSessionId',
        'getIsMe',
        'getIsLogin',
        'getIsRegister',
        'getIsPasswordLogin',
        'getIsVerificationLogin',
        'getIsRegisterPhone',
        'getIsRegisterNamePassword',
        'getIsAuthentication',
        'getTasks',
        'getTaskApplication',
        'getNotMeTaskApplication',
        'getMyAttentionTasks',
        'getMyLaunchTasks',
        'getMyUndertakeTasks',
        'getOtherAnswer',
        'getNotMeOtherAnswer',
        'getQuestionAnswers',
        'getMyQuestions',
        'getMyAnswers',
        'getAvatar',
        'getCircleDetailId',
        'getIsManagement',
        'getQuery',
        'getIsLoginHuanxin'
      ]),
      //在退出登录的时候将所有数据置为空
      clearAllData () {
        setStorage('user', {})//将本地的user信息设置为空
        setStorage('taskDetailId', '')//将本地的任务详情的id设置为空
        setStorage('questionDetailId', '')
        setStorage('circleDetailId', '')
        setStorage('isManagement', '')
        deleteCookie('JSESSIONID')//删除sessionid
        deleteCookie('authenticationToken')//删除个人设置中的身份验证的token，这里是本地的
        this.getIsAuthentication(false)//将个人设置中的isAuthentication设置为false，这里是vuex中的
        this.getTasks([])//将放在vuex中的探求广场中的任务列表的数据置为空
        this.getTaskApplication([])//将vuex中的在人物详情页的接单申请数据置为空
        this.getNotMeTaskApplication([])//将vuex中接单者回答数据清空
        this.getMyAttentionTasks([])//将vuex中我关注的任务数据清空
        this.getMyLaunchTasks([])//将vuex中我发起的任务数据清空
        this.getMyUndertakeTasks([])//将vuex中我承接的任务数据清空
        this.getOtherAnswer([])//将vuex中回答数据清空
        this.getNotMeOtherAnswer([])//将vuex中其他回答数据清空
        this.getQuestionAnswers([])//将vuex中问题详情页的回答数据清空
        this.getMyQuestions([])//将vuex中探求我的提问的数据清空
        this.getMyAnswers([])//将vuex中探求下面的我的回答的数据清空
        this.getAvatar([])//将vuex中的头像数据清空
        this.getCircleDetailId([])//清空圈子数据
        this.getSessionId('')//清除vuex中的sessionId数据
        this.getIsManagement('')//清除vuex中的是否进入管理模式的状态
        this.getQuery('')//清除vuex中的搜索字段
        this.getIsMe(false)
      },
      clickRegister () {
        this.$refs.registerBtn.click()
      },
      clickLogin () {
        this.$refs.loginBtn.click()
      },
      toggleDropdown () {
        this.dropDown = !this.dropDown
      },
      goto(path){
        let sessionId = getCookie('SESSIONID')
        if (sessionId) {
          this.$router.replace(path)
        } else  {
          this.$router.push('/signup')
        }
      },
      isCurrent(path){
        let rp=this.$route.path.split('/')
        return path=='/'+rp[1]
      },
      toggleLogin () {//切换登录状态
        this.getIsLogin(true)
        this.getIsRegister(false)
        this.getIsPasswordLogin(true)
        this.getIsVerificationLogin(false)
        this.getIsRegisterPhone(true)
        this.getIsRegisterNamePassword(false)
        this.$router.push('/signup')
      },
      toggleRegister () {
        this.getIsLogin(false)
        this.getIsRegister(true)
        this.getIsPasswordLogin(true)
        this.getIsVerificationLogin(false)
        this.getIsRegisterPhone(true)
        this.getIsRegisterNamePassword(false)
        this.$router.push('/signup')
      },
      gotoMe () {//切换到我的主页
        setStorage('personPageId', getStorage('user').userId)
        this.$router.push('/self')
      },
      gotoFriend () {//切换到好友列表页
        this.$router.push('/friend')
      },
      gotoSet () {//切换到个人设置页面
        this.$router.push('/personSetting')
      },
      gotoPrivateLetter () {//切换到私信页面
        this.$router.push('/privateletter/all')
      }
    },
    watch: {
      sessionId () {
        if (this.sessionId !== undefined && this.sessionId !== '') {
          this.getAvatar(getStorage('user').userProPic)
        }
      },
      query1 () {
        if (this.query1.length > 0) {
          clearTimeout(this.inputTimer)
          this.inputTimer = setTimeout(() => {
            //发送请求的函数
            this.getQuery(this.query1)
          }, 300)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .logo {
    width: 163px;
    position: relative;
    top: 1px;
    left: 40px;
  }
  .current{
    color:#4893a8;
  }
  .headNav{
    background-color: #29292c;
    min-width: 1180px;
  }
  /*.top-line{*/
    /*background-color: #191919;*/
    /*width: 100%;*/
    /*height: 30px;*/
  /*}*/
  .nav{
    height: 90px;
    margin: 0 auto;
    white-space: nowrap;
  }
  h1{
    font-size: 43px;
    color: #fff;
    line-height: 99px;
    margin: 0;
    font-weight: 200
  }
  ul{
    padding: 0;
  }
  .goto li{
    list-style: none;
    display: inline-block;
    text-align: center;
    line-height: 82px;
    height: 82px;
    font-size: 17px;
    color: #fff;
    cursor:pointer;
    margin-left: 108px;
  }
  .btn{
    display: inline-block;
    width: 47px;
    height: 21px;
    border:solid 1.5px #c0c0c1;
    border-radius: 5px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    user-select: none;
    font-size: 14px;
  }
  .search{
    margin-top: 23px;
  }
  input{
    height: 34px;
    width: 180px;
    background-color: #4f4f4f;
    padding-left: 20px;
    border: none;
    color: #fff
  }
  .icon{
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    margin-left: 15px;
    cursor: pointer;
    user-select: none;
  }
  /*XY*/
  .avatar-wrapper {
    height: 30px;
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;
    position: relative;
  }
  .avatar-wrapper:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 30px;
  }
  .avatar {
    width:30px;
    height: 30px;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
  }
  .caret-bottom {
    display: inline-block;
    vertical-align: middle;
    font-size: 10px;
    color: #4893a8;
  }
  .text {
    display:  inline-block;
    width: 40px;
    height: 30px;
    line-height: 30px;
    color: white;
    position: relative;
    cursor: pointer;
  }
  .dot {
    display: inline-block;
    position: absolute;
    right: 2px;
    top: 2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: red;
  }
  .dropdown {
    position: absolute;
    top: 35px;
    box-shadow: 0 0 1px 1px rgba(0,0,0,0.2);
    border: 1px solid rgba(0,0,0,0.5);
    z-index: 10;
  }
  .dropdown-item {
    list-style: none;
    width: 85px;
    height: 30px;
    background-color: white;
    line-height: 30px;
    color: #484848;
    text-align: center;
    font-size: 14px;
  }
  .dropdown-item:hover {
    color: white;
    background-color: #484848;
  }
</style>
