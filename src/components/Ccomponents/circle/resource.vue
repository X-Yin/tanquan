<template>
	<div class="main">
		<div class="settings">
			<div :class="{'btn':true,'tab-current':current=='video'}" @click="tab('video')"><p>视频</p></div>
			<div :class="{'btn':true,'tab-current':current=='article'}" @click="tab('article')"><p>文章</p></div>
			<div :class="{'btn':true,'tab-current':current=='voice'}" @click="tab('voice')"><p>音频</p></div>
			<div :class="{'btn':true,'tab-current':current=='image'}" @click="tab('image')"><p>图片</p></div>
			<div class="btn1">我要上传</div>
			<div class="btn" style="margin-left: 200px">热度</div><i class="el-icon-d-caret"></i>
			<div class="search">
				<input type="text">
				<i class="icon el-icon-search" style="color: #bebebe;font-weight: 600;"></i>
			</div>
		</div>
		<div :class="classObject" v-for="item in [1,1,1,1,1,1]">
			<div class="img">
				<img src="">
				<div class="time">28:45</div>
			</div>
			<div class="words">
				<div class="title">王教授推荐初中生必读书目！<i class="el-icon-arrow-up"></i></div>
				<div class="detail">{{'1956年，两位高中生提奥和库特在看去西柏林看电影的路上见到了匈牙利十月起义的新闻报道。为了对起义的死者表示悼念，他们和同班同学们决定，一起在课堂上无视老师，突发沉默一分钟。然而这短短的一分钟彻底改变了班上同学的命运，许多人从此被东德安全局视为眼中钉，加以监视和迫害。在班级被强行解散后，他们却决心在西德重新结集，不过是以作为逃亡者的新身份。'.substr(0,75)}}...<span>详情</span></div>
				<div class="voiceIcon"><img src="/static/voiceIcon.png"><span>15'56"</span></div>
				<div class="num"><img src="/static/res-num.png">642</div>
				<div class="date"><img src="/static/res-date.png">2018.8.13</div>
				<div class="author">上传者：<span>会飞的鱼</span></div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				current:'video'
			}
		},
		computed:{
			classObject(){
				return{
					'video':this.current=='video',
					'image':this.current=='image',
					'voice':this.current=='voice',
					'article':this.current=='article'
				}
			},
			isCurrent(p){
				return this.current==p
			}
		},
		methods:{
			tab(p){
				this.current = p
				return
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet">
.main
	padding-right 10px

.settings
	margin-bottom 30px
	position relative
	.btn
		font-size 14.53px
		margin-left 20px
		display inline-block
		text-align center
		border solid 1px #9e9e9e
		border-radius 3px
		padding 1px 1px
		height 16px
		width 32px
		line-height 16px
		color #5b5b5b
		cursor pointer
	.tab-current
		border solid 1px #4893a8
		p
			width 32px
			height 16px
			color #fff
			border-radius 3px
			background-color #4893a8
	.btn1
		position absolute
		display inline-block
		text-align center
		left 268px
		background-color #4893a8
		padding 1px 6px
		height 14px
		font-size 13.08px
		line-height 14px
		border-top solid 1.5px rgba(255,255,255,0.65)
		border-right solid 1.5px #000
		border-bottom solid 1.5px #000
		color #fff
	.search
		margin-left 38px
		display inline-block
		input
			width 106px
			background-color #f7f7f7
			border none
			height 22px
			margin-right 18px
.video
	display inline-block
	width 170px
	height 215px
	margin-right 7px
	margin-bottom 20px
	font-size 13.08px
	border solid 1px #e7e7e7
	.img
		width 170px
		height 100px
		background-color #4893a8
		position relative
		img
			width 100%
		.time
			position absolute
			bottom 0
			right 0
			background-color rgba(0,0,0,0.5)
			color #fff
			text-align center
			width 54px
			height 20px
			line-height 20px
			font-weight 600
	.words
		padding 8px 12px
		color #969aa1
		line-height 25px
		.title
			letter-spacing 1.5px
			color #5b5b5b
			line-height 20px
			height 45px
		.detail,i
			display none
		.num
			display inline-block
		.date
			float right
		.author
			span
				text-decoration underline
		img
			vertical-align middle
			margin-right 5px
		.voiceIcon
			display none
.image
	width 170px
	height 200px
	margin-right 6px
	margin-bottom 18px
	display inline-block
	background-color #4893a8
	.img
		width 100%
		height 100%
		img
			width 100%
		.time
			display none
	.words,i
		display none
.article
	margin-bottom 26px
	.img,.num,.date,.author,.voiceIcon
		display none
	.words
		.title
			font-size 18.16px
			color #000
			font-weight 600
		.detail
			font-size 15.98px
			color #6c6c6c
			line-height 30px
			padding-top 12px
			span
				color #4893a8
				text-decoration underline
				cursor pointer
.voice
	margin-bottom 26px
	.img,.detail,.num,.date,.author,i
		display none
	.title
		font-size 18.16px
		color #000
	.voiceIcon
		height 34px
		padding 13px 0 25px 0
		img
			height 100%
			vertical-align bottom
		span
			font-size 14.53px
			color #5b5b5b
			padding-left 10px
			vertical-align bottom
</style>