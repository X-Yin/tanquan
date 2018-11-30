<template>
  <div class="circle-container">
    <head-nav></head-nav>
    <div class="container">
      <div class="top">
        <div class="left">
          <div class="avatar">
            <img :src="circleDetail.circleProPic">
          </div>
          <div class="detail">
            <div class="name">
              {{circleDetail.circleName}}
              <i></i>
            </div>
            <div class="hostName tx">圈主：<span>{{circleDetail.circleCreateUserName}}</span></div>
            <div class="tags tx">标签：<span>{{handleTag(circleDetail.circleTag)}}</span></div>
            <div class="num tx">关注：<span>{{circleDetail.circleFollowNumber}}</span>加入：<span>{{circleDetail.circleMemberNumber}}</span></div>
          </div>
        </div>
        <div class="right">
          <el-carousel trigger="click" height="150px">
            <el-carousel-item>
              <div class="title">圈子公告</div>
              <div class="detail">{{circleDetail.circleNotices}}</div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="title">招募信息</div>
              <div class="detail">{{circleDetail.circleRecruit}}</div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <div class="tab">
            <div class='tabitem' :class="{'current':isCurrent('feed')}" @click="tab('feed')">动态</div>
            <div class='tabitem' :class="{'current':isCurrent('article')}" @click="tab('article')">推文</div>
            <!-- <div class='tabitem' :class="{'current':isCurrent('activity')}" @click="tab('activity')">活动</div> -->
<!--             <div class='tabitem' :class="{'current':isCurrent('live')}" @click="tab('live')">live</div> -->
            <div class='tabitem' :class="{'current':isCurrent('task')}" @click="tab('task')">任务</div>
           <!--  <div class='tabitem' :class="{'current':isCurrent('resource')}" @click="tab('resource')">资源</div> -->
            <div class='tabitem' :class="{'current':isCurrent('member')}" @click="tab('member')">成员</div>
            <div class='tabitem' :class="{'current':isCurrent('message')}" @click="tab('message')">留言</div>
            <!--<div class='tabitem' :class="{'current':isCurrent('child')}" @click="tab('child')">子圈</div>-->
            <div class='tabitem' v-show='isManagement' :class="{'current':isCurrent('management')}"
                 @click="tab('management')">管理记录
            </div>
          </div>
          <router-view></router-view>
        </div>
        <div class="right">
          <div class="personal" v-if="circleIdentify.memberRole !== 0 && circleIdentify.userPic">
            <div class="littleTitle">个人中心</div>
            <div class="avatar">
              <img :src="circleIdentify.userPic" style="border-radius: 50%">
            </div>
            <div class="detail">
              <div class="nickName">{{circleIdentify.userName}}<i></i><div class="position">{{handleIdentify(circleIdentify)}}</div></div>
              <div v-if="circleIdentify.memberRole >= 3" class="toggleManagement" @click="toggleManagement">{{isManagement?"退出管理模式":"进入管理模式"}}</div>
             <!--  <div class="btn"><div>已关注</div><div>已加入</div></div>
              <div class="num">我的圈内活动：<span>12</span></div>
              <div class="num">我的圈内任务：<span>4</span></div>
              <div class="num">我的圈内live：<span>2</span></div> -->
            </div>
          </div>
          <div class="teachers">
            <div class="littleTitle">指导教师<span v-show='isManagement' @click='changeTeacher=true'>[修改信息]</span>
            </div>
            <el-dialog class='dialog1' width='760px' :visible.sync="changeTeacher">
              <div class="littleTitle">修改指导教师</div>
              <div class="search">
                <span>指导教师：</span><input type="text" name=""><i class="el-icon-search"></i>
              </div>
              <div class="hot">
                <div class="hostName">全站名师：</div>
                <div class="hotItems">
                  <div class="hotItem" v-for="(item,index) in [0,0,0,0,0,0]" :key='index'>小猫
                  </div>
                </div>
              </div>
              <div class="btn" @click='inviteTeacher=true'><p>邀请</p></div>
              <el-dialog class='dialog2 invitation' width='760px' :visible.sync="inviteTeacher" append-to-body>
                <div class="littleTitle">邀请函</div>
                <div class="line line4"><input type="text" placeholder="标题"></div>
                <div class="line line2"><textarea placeholder="正文..."></textarea></div>
                <div class="btn1" @click="invite()"><p>确定</p></div>
              </el-dialog>
            </el-dialog>
            <div class="teacher">
              <div class="detail">
                <div class="name">{{circleAdviser.userRealName}}</div>
                <div class="school">清华大学公共管理学院</div>
                <div class="position">副教授</div>
              </div>
              <div class="avatar"><img :src="circleAdviser.userProPic"></div>
            </div>
          </div>
          <div class="glory">
            <div class="littleTitle">荣誉墙<span v-show='isManagement'>[修改图片]</span></div>
            <div class="content"><img src=""></div>
          </div>
          <div class="childCircle">
            <div class="littleTitle" v-if="this.subCircle.length !== 0">子圈</div>
            <div class="list">
              <div class="item" v-for='(item, index) in subCircle' :key="index">
                <div class="sub-avatar-wrapper">
                  <img :src="item.circleProPic" class="sub-avatar">
                </div>
                <div class="sub-title">{{item.circleName}}</div>
              </div>
            </div>
          </div>
          <div class="alliance">
            <div class="littleTitle">与我联盟</div>
            <div v-if='circleInfo.inUnion'>
              <div>
                <div class="avatar" v-for="item in [1,2,3,]"><img src=""></div>
              </div>
              <div class="detail">
                <div class="title">公开课联盟</div>
                <div class="promise"><span>[盟约]</span>我们的原则是：分享公开课，创造和谐新联盟！</div>
              </div>
              <i class="el-icon-more"></i>
            </div>
            <div v-else class="btn certification" @click="joinOrCreate=true">加入/创建联盟</div>
            <el-dialog class='dialog1' width='760px' :visible.sync="joinOrCreate">
              <el-dialog class='dialog2' width='760px' :visible.sync="createAlliance" append-to-body>
                <div class="line line1"><span>联盟名称</span><input type="text" name=""></div>
                <div class="line line2"><span>联盟盟约</span><textarea></textarea></div>
                <div class="line line3"><span>标签</span><input type="text" name=""></div>
                <div class="line line4"><span>联盟成员</span><input type="text" name=""><i class="el-icon-search"></i></div>
                <div class="btn"><p>发出邀请</p></div>
                <div class="btn1"><p>确定</p></div>
              </el-dialog>
              <input type="text" name=""><i class="el-icon-search"></i>
              <div><h2>热门联盟</h2><div class="btn" @click="createAlliance=true"><p>创建联盟</p></div></div>
              <div class="hot">
                <div class="hotItem" v-for="(item,index) in [0,0,0,0,0,0]" :key='index'>创新者联盟</div>
              </div>
            </el-dialog>
          </div>
          <div class="btn certification" @click="goto('/tanquan/certificate')">圈子认证</div>
        </div>
      </div>
    </div>
    <foot-bar></foot-bar>
    <div class="write-message">
      <div class="write-wrapper">
        <div class="write-icon-wrapper" @click="gotoWrite">
          <img src='https://oss.yxlinker.com/master/write.png' class="write-icon">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import headNav from '../headNav'
  import footBar from '../footBar'
  import {mapState, mapMutations} from 'vuex'
  import {getStorage, setStorage} from '../../../api/util.js'
  import {getCircleDetail, getSubCircle, getPersonCircleIdentify} from '../../../api/index.js'
//  import {reqCircleInfo,reqCircleInformation,reqCircleAdviser} from '../../../api/index.js'
  export default{
    data(){
      return {
        haveAlliance:true,
        joinOrCreate:false,//
        innerVisible:false,//
        createAlliance:false,//
        joinAlliance:false,
        changeTeacher:false,
        inviteTeacher:false,
        circleInfo:{},
        circleInformation:{},
        circleAdviser:{},
        circleDetail: {},//圈子详情数据
        subCircle: [],//子圈信息
        circleIdentify: {}
      }
    },
    components:{
      headNav,
      footBar
    },
    computed: {
      ...mapState([
        'circleDetailId',
        'isManagement'
      ])
    },
    methods:{
      ...mapMutations([
        'getIsManagement'
        ]),
      //处理圈子身份的函数
      handleIdentify (circleIdentify) {
        if (circleIdentify.memberRole === 0) {
          return '游客'
        } else if (circleIdentify.memberRole === 1) {
          return '普通用户'
        } else if (circleIdentify.memberRole === 2) {
          return '圈子精英'
        } else if (circleIdentify.memberRole === 3) {
          return '管理员'
        } else if (circleIdentify.memberRole === 4) {
          return '圈主'
        }
      },
      //获取自己在圈子里的身份
      async _getCircleIdentify (circleId) {
        let result = await getPersonCircleIdentify(circleId)
        console.log(result)
        if (result.success) {
          return await Promise.resolve(result.data)
        }
      },
      //跳转到文章管理界面
      gotoWrite () {
        this.$router.push('/writeManagement')
      },
      //切换管理模式
      toggleManagement () {
        this.getIsManagement(!this.isManagement)
        setStorage('isManagement', this.isManagement)//将isManagement缓存在本地，以防止刷新以后vuex中的状态消失
        //如果是退出管理模式，并且当前路由是management,那么将路由切换到留言
        if (this.isManagement === false) {
          if (this.$route.path.indexOf('management') > -1) {
            let id = this.circleDetailId
            this.$router.push(`/circle/${id}/message`)
          }
        }
      },
      tab(p){
        this.$router.push(`/circle/${this.$route.params.circleId}/${p}`)
      },
      isCurrent(path){
        let rp=this.$route.path.split('/')
        return path==rp[3]
      },
      goto(p){
        this.$router.push(p)
      },
      //处理标签内容
      handleTag (tag) {
        if (this.circleDetail.circleTag) {
          if (tag.length >= 3) {
            return tag.slice(0, 3).join(',')
          } else {
            return tag.join(',')
          }
        }
      },
      //获取圈子详情
      async _getCircleDetail (circleId) {
        let result = await getCircleDetail(circleId)
        console.log(result)
        if (result.success) {
          return await Promise.resolve(result.data)
        }
      },
      //获取子圈
      async _getSubCircle (circleId) {
        let result = await getSubCircle(circleId)
        console.log(result)
        if (result.success) {
          return await Promise.resolve(result.data)
        }
      },
      invite(){
        this.$message({
          message: '邀请成功！',
          type: 'success'
        });
        this.inviteTeacher = false;
        this.changeTeacher = false;
      },
      async getCircleInfo(p){
        const res = await reqCircleInfo(p)
        if(res.status===0){
          this.circleInfo = res.data
        }

      },
      async getCircleAdviser(p){
        const res = await reqCircleAdviser(p)
        if(res.status===0){
          this.circleAdviser = res.data
        }

      },
      async getCircleInformation(p){
        const res = await reqCircleInformation(p)
        if(res.status===0){
          this.circleInformation = res.data
        }
      }
    },
    mounted(){
//      this.getCircleInfo({'circleId':this.$route.params.circleId})
//      this.getCircleAdviser({'circleId':this.$route.params.circleId})
//      this.getCircleInformation({'circleId':this.$route.params.circleId})
      let circleDetailId = getStorage('circleDetailId')
      console.log(circleDetailId)
      //获取圈子详情数据
      this._getCircleDetail(circleDetailId).then((res) => {
        this.circleDetail = res
      })
      //获取子圈
      this._getSubCircle(circleDetailId).then((res) => {
        this.subCircle = res.list
      })
      //获取自己在圈子里的身份
      this._getCircleIdentify(circleDetailId).then((res) => {
        this.circleIdentify = res
      })
      //如果已经是管理模式，刷新页面设置vuex中的状态不消失
      let isM = getStorage('isManagement')
      if (isM === true) {
        this.getIsManagement(isM)
      } else {
        setStorage('isManagement', this.isManagement)
      }
    },
    watch: {
      circleDetailId () {
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
  .write-message {
    position: fixed;
    width: 100px;
    right: -65px;
    top: 400px;
    transition: all 0.2s;
  }
  .write-message:hover {
    right: -20px;
  }
  .write-wrapper {
    width: 54px;
    height: 54px;
    border: 2px solid #4893a8;
    box-sizing: border-box;
    position: relative;
    border-radius: 50%;
    background-color: white;
    cursor: pointer;
    box-shadow: 0 0 1px 1px #4893a8;
  }
  .write-icon-wrapper {
    position: absolute;
    width: 46px;
    height: 46px;
    left: 2px;
    top: 2px;
    border-radius: 50%;
    background-color: #4893a8;
  }
  .write-icon {
    position: absolute;
    left: 6px;
    top: 6px;
    width: 34px;
    height: 34px;
  }
  .toggleManagement {
    cursor: pointer;
  }
  .tab {
    margin-bottom: 27px;
    font-size: 0
  }
  .tabitem {
    height: 30px;
    display: inline-block;
    list-style:none;
    border-right: solid 1px #8a8a8a;
    border-top solid 1.2px #8a8a8a;
    border-bottom solid 1px #8a8a8a;
    font-size: 18px;
    line-hegiht: 30px;
    padding 0 15px;
    color: #8a8a8a;
    cursor: pointer;
  }
    .tabitem:first-child {
      border-left solid 1px #8a8a8a;
    }
    .tabitem.current {
      border-top: solid 2px #4893a8;
      color: #474747;
    }
    .childCircle .list {
      width: 100%;
      text-decoration: none!important;
    }
    .childCircle .item {
      display: flex;
      height: 40px;
      padding: 10px 0 ;
    }
    .item .sub-avatar-wrapper {
      flex: 0 40px;
    }
    .item .sub-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .item .sub-title {
      flex: 1;
      margin-left: 30px;
      height: 40px;
      line-height: 50px;
      font-size: 16px;
      text-decoration: none;
      cursor: pointer;
    }
    .sub-title:hover {
      color: #4893a8;
    }
  input,textarea
    font-size 18px
    font-family: "Microsoft YaHei",Arial,Helvetica,sans-serif,"\5B8B\4F53";
  .littleTitle
    color #474747
    font-size 21.8px
    padding-left 25px
    height 23px
    line-height 23px
    position relative
    margin-bottom 38px
    span
      color #4893a8
      font-size 18px
      user-select none
      cursor pointer
    &:after
      content ""
      background-color #4893a8
      position absolute
      left 0
      width 10px
      height 23px
  .top
    margin-top 35px
    height 147px
    background-color #fff
    padding 35px
    border-radius 10px
    overflow: hidden;
    .left
      display inline-block
      vertical-align middle
      height 147px
      width 610px
      margin-right 52px
      .avatar
        vertical-align middle
        height 147px
        width 147px
        margin-right 26px
        background-color #4893a8
        display inline-block
        img {
          width: 147px;
          height: 147px;
        }
      .detail
        display inline-block
        vertical-align middle
        height 147px
        font-size 17.35px
        .name
          font-size 24.07px
          height 42px
          line-height 42px
          color #474747
        .tx
          color #747474
          line-height 32px
          height 32px
          span
            margin-right 18px
            color #9d9d9d
        .num
          span
            text-decoration underline
    .right
      display inline-block
      vertical-align middle
      height 123px
      width 338px


      font-size 15.99px
      .title
        position relative
        height 18px
        line-height 18px
        padding-left 20px
        color #747474
        margin-left 25px
        &:before
          content ""
          position absolute
          width 15px
          height 18px
          background-color #4893a8
          left 0
      .detail
        margin-top 9px
        width 65%
        padding 15px
        box-shadow 0 0 5px #4893a8
        color #4893a8
        margin-left 45px
        margin-top 20px
  .bottom
    margin-top 45px
    width 100%
    .left
      padding 35px 0 35px 35px
      background-color #fff
      border-radius 10px
      display inline-block
      width 750px
      margin-right 45px
      vertical-align top
      /*.tab*/
        /*margin-bottom 27px*/
        /*font-size: 0*/
        /*.tabitem*/
          /*height 30px*/
          /*display inline-block*/
          /*list-style none*/
          /*border-right solid 1px #8a8a8a*/
          /*border-top solid 1.2px #8a8a8a*/
          /*border-bottom solid 1px #8a8a8a*/
          /*font-size 18px*/
          /*line-height 30px*/
          /*padding 0 15px*/
          /*color #8a8a8a*/
          /*&:first-child*/
            /*border-left solid 1px #8a8a8a*/
        /*.current*/
          /*border-top solid 2px #4893a8*/
          /*color #474747*/
    .right
      display inline-block
      vertical-align top
      padding 35px
      border-radius 10px
      background-color #fff
      .littleTitle
        color #474747
        font-size 21.8px
        padding-left 25px
        height 23px
        line-height 23px
        position relative
        margin-bottom 38px
        span
          color #4893a8
          font-size 18px
          user-select none
          cursor pointer
        &:after
          content ""
          background-color #4893a8
          position absolute
          left 0
          width 10px
          height 23px
      .avatar
        vertical-align top
        display inline-block
        height 56px
        width 56px
        border-radius 50%
        background-color #4893a8
        margin-right 22px
        img
          width 100%
          overflow hidden
      .detail
        display inline-block
        vertical-align top
        font-size 15.99px
        color #5b5b5b
        line-height 17px
        padding-bottom 40px
        .nickName
          height 17px
          margin-bottom 16px
          .position
            height 13px
            width 48px
            border-radius 3px
            line-height 15px
            border solid 1px #4893a8
            color #4893a8
            text-align center
            font-size 10.17px
            display inline-block
            margin-left 20px
        .toggleManagement
          font-size 13px
          color #4893a8
          text-decoration underline
          user-select none
          margin 0px 0 5px 5px
        .btn
          margin-bottom 20px
          div
            height 20px
            width 45px
            background-color #f6f6f6
            margin-right 40px
            font-size 10.84px
            color #6c6c6c
            display inline-block
            padding-left 5px
            line-height 20px
            position relative
            &:after
              content ""
              width 0
              height 0
              top 8px
              right 3px
              border solid 2.5px transparent
              border-top solid 2.5px #6c6c6c
              position absolute
        .num
          height 17px
          line-height 17px
          margin-bottom 10px
          span
            color #aaaaaa
            text-decoration underline
      .teachers
        margin-bottom 20px
      .teacher
        .avatar
          margin 0
        .detail
          width 170px
          padding-left 25px
        .name
          font-size 18.75px
          color #474747
          line-height 24px
        .school,.position
          font-size 14.43px
          color #6c6c6c
      .dialog1
        .littleTitle
          margin -20px 0 25px 20px
        .search
          margin-left 60px
          span
            color #474747
            font-size 18px
          input
            margin-left 20px
            width 350px
            height 35px
            background-color #e9e9e9
            border 0
          i
            font-size 24px
            font-weight 600
            margin-top 5px
            position relative
            left 15px
        .hot
          margin-left 60px
          margin-top 30px
          .hostName
            display inline-block
            color #474747
            font-size 18px
            vertical-align top
          .hotItems
            display inline-block
            vertical-align top
            width 450px
          .hotItem
            display inline-block
            text-decoration underline
            width 110px
            margin-bottom 8px
            text-align center
            font-size 18px
            color #474747
        .btn
          font-size 18px
          color #4893a8
          line-height 30px
          height 30px
          width 60px
          text-align center
          border 1.5px solid #4893a8
          border-radius 5px
          margin-left 550px
      .glory
        .content
          margin-left 15px
          width 232px
          height 145px
          border solid 9px #f0f0f0
          margin-bottom 42px
          background-color #4893a8
      .alliance
        .avatar
          height 70px
          width 70px
          margin 0 13px
          border-radius 0
          &:last-child
            margin-right 0
        .detail
          display block
          width 265px
          padding 26px 0 25px 10px
          .title
            line-height 30px
            font-size 18.8px
            color #4c4c4c
          .promise
            line-height 25px
            font-size 14.79px
            color #4c4c4c
            span
              color #4893a8
        i
          font-size 40px
          color #6e6e6e
          float right
          margin-top 30px
        .dialog1
          input
            margin-left 55px
            width 600px
            height 40px
            background-color #e9e9e9
            border 0
          i
            font-size 30px
            font-weight 600
            margin-top 5px
            position relative
            left -20px
          h2
            margin-top 50px
            padding-left 20px
            color #8c8c8c
            display inline-block
          .btn
            font-size 14.53px
            margin-left 20px
            display inline-block
            text-align center
            border solid 1px #4893a8
            border-radius 3px
            padding 1px 1px
            height 16px
            width 64px
            line-height 16px
            color #4893a8
            cursor pointer
            &:hover
              border solid 1px #4893a8
              p
                width 64px
                height 16px
                color #fff
                border-radius 3px
                background-color #4893a8
          .hotItem
            display inline-block
            margin 0 70px
            line-height 68px
            font-size 18.33px
            color #7f7f7f
            text-decoration underline
            &:hover
              color #4893a8
      .childCircle
        .list
          padding-left 15px
          font-size 16.67px
          color #6c6c6c
          text-decoration underline
          line-height 30px
          margin-bottom 30px
      .certification
        margin-top 100px
        margin-bottom 50px
        text-align center
        height 40px
        line-height 40px
        border solid 1.5px #4893a8
        border-radius 5px
        font-size 21.8px
        color #474747
  .dialog2
    .line
      span
        display inline-block
        line-height 80px
        font-size 18.33px
        color #9d9a9a
        width 110px
        margin-left 80px
      input
        width 460px
        height 40px
        border solid #e9e9e9 1px
    .line4
      input
        background-color #f4f4f4
        width 410px
        border none
      i
        font-size 30px
        font-weight 600
        position relative
        top 5px
        left 20px
    .line2
      height 160px
      textarea
        vertical-align top
        margin-top 20px
        height 120px
        width 455px
        border solid 1px #e9e9e9
        resize none
    .btn
      font-size 14.53px
      margin-left 190px
      display inline-block
      text-align center
      border solid 1px #4893a8
      border-radius 3px
      padding 1px 1px
      height 16px
      width 64px
      line-height 16px
      color #4893a8
      cursor pointer
      &:hover
        border solid 1px #4893a8
        p
          width 64px
          height 16px
          color #fff
          border-radius 3px
          background-color #4893a8
    .btn1
      height 22px
      width 63px
      border solid 1.5px #4893a8
      padding 1px
      border-radius 3px
      margin-top 45px
      margin-left 580px
      right 0
      &:hover p
        color #fff
        background-color #4893a8
      p
        text-align center
        color #4893a8
        background-color #fff
        line-height 22.5px
  .invitation
    .littleTitle
      margin -20px 0 25px 20px
    .line
      textarea,input
        background-color #f4f4f4
        border solid 1.5px #e9e9e9
        width 560px
        margin-left 60px
        padding-left 15px

</style>
