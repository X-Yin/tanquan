<template>
	<div class="container learner-wrapper">
		<div class="tab">
			<div class="tabitem" :class="{'current':current==1}" @click='tab(1)'>标签</div><!--
		 --><div class="tabitem" :class="{'current':current==2}" @click='tab(2)'>推荐</div><!--
		 --><div class="tabitem" :class="{'current':current==3}" @click='tab(3)'>全部</div>
		</div>
		<div class="settings">
			<div class="btn">选择标签</div>
			<div class="search"><input type="text"><i class="icon el-icon-search" style="color: #bebebe;font-weight: 600;margin-left: 15px"></i></div>
		</div>
		<wait-task-wrapper  v-if="people.length === 0 && isNoTextShow"></wait-task-wrapper>
         <no-task-text v-if="people.length === 0 && !isNoTextShow " text="暂无学习者"></no-task-text>
		<div class="learner" v-for="(item, index) in people" :key="index">
			<div class='avatar' v-if="item.userProPic !== ''">
				<img  v-lazy="item.userProPic">
			</div>
			<div class="detail">
				<div class="detail1">
					<p class="nickName">{{item.userName}}</p><i></i>
					<div></div>
				</div>
				<div class="detail2">
					<div class="gender">{{item.userGender=== 0 ? '': item.userGender === 1 ? '男': '女'}}</div>
					<div class="point">指数：{{item.userActiveness}}</div>
				</div>
				<div class="detail3">
					<div class="residence">现居&nbsp<span>{{item.userLocation}}</span></div>
					<div class="school"><span><span v-show="item.userMajor" style="color:#333">研究方向&nbsp;</span>{{item.userMajor}}</span></div>
					<div class="btn-wrapper">
						<span class="btn-title">提问:</span>
						<span class="btn-content">{{item.userQuestionNumber}}</span>
						<span class="btn-title">回答:</span>
						<span class="btn-content">{{item.userGoodAnswerNumber}}</span>
						<span class="btn-title">发起任务:</span>
						<span class="btn-content">{{item.userAssignTaskNumber}}</span>
						<span class="btn-title">承接任务:</span>
						<span class="btn-content">{{item.userTakeTaskNumber}}</span>
					</div>
					<div class="intro">简介：<span>{{item.userSignDec}}</span></div>
				</div>
			</div>
			<div class="action">
				<div class="btn1" @click="_getRoomInfo(item)" v-if="item.userId !== userId">私信</div>
				<div class="btn2" v-if="item.userId !== userId">+好友</div>
			</div>
		</div>
		<div class="loading-wrapper" v-show="loadingShow">
      <loading-btn class="loadingBtn"></loading-btn>
    </div>
	</div>
</template>
<script>
  import {getLearner, getRoomInfo} from '../../../api/index.js'
  import noTaskText from '../../Xcomponents/noTaskText.vue'
  import waitTaskWrapper from '../../Xcomponents/waitTaskWrapper.vue'
  import {getPosition, deleteOne, getStorage, setStorage} from '../../../api/util.js'
  import loadingBtn from '../../Xcomponents/loadingBtn.vue'
	export default{
		data(){
			return{
				current:1,
				path: /\/tanren\/learner/,
        loadingShow: false,
        isLoadOnePage: true,
        isNoTextShow: true,
        people: [],
        p: 1,
        pagesNumber: 1,
        userId: getStorage('user').userId
			}
		},
		methods:{
		  //点击私信按钮，获取roomid和roonName
      async _getRoomInfo(item) {
        let result = await getRoomInfo(item.userId);
        console.log(result);
        if (result.success) {
          setStorage('privateLetterDetailId', result.data.roomId);
          setStorage('privateLetterChatRoomName', result.data.roomName);
          this.$router.push(`/privateletter/${result.data.roomId}`)
        }
      },
			tab(i){
				this.current = i
			},
			async _getPeople (p) {
        let result = await getLearner(p)
        console.log(result)
        if (result.success) {
          let tasks = this.people.slice()
          if (result.data.list.length === 0) {
            this.isNoTextShow = false//让无任务文字显示
            this.loadingShow = false
          } else {
            tasks = tasks.concat(result.data.list)
            this.people = tasks
            this.pagesNumber = result.data.lastPage
            this.isLoadOnePage = true
          }
        }
      },
      loadMore (p, cb) {
        setTimeout(() => {
          cb(p)
          if (p === this.pagesNumber) {
            this.loadingShow = false
          }
        }, 500)
      },
      watchScroll () {
        //为了防止发生this漂移
        let self = this
        window.onscroll = function () {
          //获取滚动条的y值
          let y = window.scrollY
          //获取浏览器的视口高度
          let clientHeight = window.innerHeight
          //获取加载按钮在页面上的位置
          if (self.loadingShow) {
            let btn = getPosition(document.getElementsByClassName('loadingBtn')[0])
            let top = btn.top
            if (y + clientHeight >= top) {
              if (self.isLoadOnePage) {
                self.isLoadOnePage = false
                if (self.pagesNumber > self.p) {
                  self.p++
                  //请求下一页的数据
                  self.loadMore(self.p, self._getPeople)
                }
              }
            }
          }
        }
      },
		},
		mounted(){
      this._getPeople(this.p)
    },
    watch: {
      '$route'() {
        if (this.path.test(this.$route.path)) {
          this.watchScroll()
        }
      },
      people () {
        if (this.people !== []) {
          setTimeout(() => {
            if (this.p !== this.pagesNumber) {
              this.loadingShow = true
            }
          }, 20)
          this.watchScroll()
        }
      }
    },
    components: {
      noTaskText,
      waitTaskWrapper,
      loadingBtn,
    }
	}
</script>
<style scoped lang="stylus" rel="stylesheeet">
.btn-title {
  color: #333!important;
  display: inline-block;
  vertical-align: top;
}
.btn-content {
  color: #a5a5a5!important;
  display: inline-block;
  vertical-align: top;
  margin-right: 13px;
}
.btn1, .btn2 {
  display: inline-block;
  border-radius: 3px;
  cursor: pointer;
  color: #4893a8;
  border: 1px solid #4893a8;
  padding: 3px 6px;
  transition: all 0.2s;
  margin: 0 auto;
  margin-left: 50%;
  transform: translateX(-50%);
}
.btn1:hover, .btn2:hover {
  color: white;
  background-color: #4893a8;
}
.btn1 {
  padding: 3px 9px;
}
.btn2 {
  margin-top: 30px;
}
.learner-wrapper
  padding-top 20px
  margin-top 20px
  background-color white
  padding-right 20px
  padding-left 20px
  padding-bottom 40px
  box-sizing border-box
ul
	margin-left 30px
li
	height 30px
	display inline-block
	list-style none
	border-left solid 1px #8a8a8a
	border-top solid 1px #8a8a8a
	border-bottom solid 1px #8a8a8a
	font-size 18px
	line-height 30px
	padding 0 10px
	color #8a8a8a
	&:last-child
		border-right solid 1px #8a8a8a
.tab
	margin 20px 0 30px 20px
.tabitem
	height 30px
	display inline-block
	list-style none
	border-left solid 1px #8a8a8a
	border-top solid 1.2px #8a8a8a
	border-bottom solid 1px #8a8a8a
	font-size 18px
	line-height 30px
	padding 0 10px
	color #8a8a8a
	&:last-child
		border-right solid 1px #8a8a8a
.current
	border-top solid 2px #4893a8
	color #474747
.settings
	padding-left 50px
	margin-bottom 35px
	position relative
	.btn
		display inline-block
		text-align center
		border solid 1px #9e9e9e
		border-radius 2px
		height 20px
		width 80px
		line-height 20px
		color #5b5b5b
	.search
		margin-left 615px
		display inline-block
		input
			width 204px
			height 22px
			background-color #f7f7f7
			border none
.learner
	padding 22px 0px 20px 32px
	border solid 2px transparent
	transition border 0.5s
	margin-bottom 25px
	.avatar
		vertical-align top
		display inline-block
		height 110px
		width 110px
		border-radius 50%
		background-color #4893a8
		overflow hidden
		img
			width 100%
	.detail
		vertical-align top
		display inline-block
		width 570px
		margin-left 25px
		.detail1
			.nickName
				display inline-block
				font-size 15.98px
				height 16px
				line-height 16px
				margin-bottom 8px
		.detail2
			font-size 14.68px
			color #9d9d9d
			.gender
				display inline-block
			.region
				display inline-block
				height 17px
				line-height 17px
			.point
				display inline-block
		.detail3
			font-size 15.98px
			color #474747
			div
				height 17px
				line-height 17px
				margin-top 11px
				span
					color #9d9d9d
			.residence
				display inline-block
			.school
				margin-left 25px
				display inline-block
			.num
				span
					margin-right 20px
			.motto
				line-height 24px
				height 24px
				margin-top 15px

	.action
		display inline-block
		width 275px
		padding-top 22px

</style>
