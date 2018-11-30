<template>
	<div class="main">
		<div class="settings">
			<div class="btn1">发起live</div>
			<div class="btn">热度</div><i class="el-icon-d-caret"></i>
			<div class="search">
				<input type="text">
				<i class="icon el-icon-search" style="color: #bebebe;font-weight: 600;"></i>
			</div>
		</div>
		<div class="feed" v-for='(item,index) in elites' :key='index'>
			<div class="title"><span>[live]</span>你高中那一个瞬间最可怕？</div><div class="btn1" style="position: absolute;top: 32px;right: 0"><span>34</span>人参与</div>
			<div class="detail">
				<div class="detail1">
					<div class="author">发起人：<span>飞鸟</span></div>
					<div class="focus"><span>768</span>人关注</div>
					<div class="tags">标签：<span>{{['大学生活','女生'].toString()}}</span></div>
				</div>
				<div class="detail2">
				<P>{{'信息安全是指在技术与管理上对信息系统的硬件、软件、系统中的数据及依托其开展的业务进行保护，使得它们不会由于偶然的或者恶意的原因而遭到未经授权的访问、泄露、破坏、修改、审阅、检查、记录或销毁，保证信息系统连续可靠地正常'.substr(0,50)}}...<span>详情</span></P>
				</div>
			</div>
			<div class="itemFooter">
				<div class="itemData">
					<div>转发（5）</div>
					<div>评论（25）</div>
					<div>点赞（32）</div>
					<div>收藏（6）</div>
				</div>
				<div class="dislike">不感兴趣</div>
				<div class="action">···</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		data(){
			return{

			}
		},
		methods:{
		},
		computed:{
			...mapState(['elites'])
		},
		mounted(){
			this.$store.dispatch('getElites')
		}
	}
</script>

<style lang="stylus" rel="sheetstylus" scoped>
.main
	padding-right 46px

	
.settings
	margin-bottom 30px
	margin-bottom 23px
	position relative
	.btn1
		display inline-block
		text-align center
		background-color #4893a8
		padding 1px 4px
		height 17px
		font-size 13.08px
		line-height 17px
		border-top solid 1.5px rgba(255,255,255,0.65)
		border-right solid 1.5px #000
		border-bottom solid 1.5px #000
		color #fff
	.btn
		font-size 14.53px
		margin-left 338px
		display inline-block
		text-align center
		border solid 1px #9e9e9e
		border-radius 2px
		padding 1px 4px
		height 16px
		width 32px
		line-height 16px
		color #5b5b5b
	.search
		margin-left 38px
		display inline-block
		input
			width 120px
			background-color #f7f7f7
			border none
			height 22px
			margin-right 18px
.feed
	margin-bottom 44px
	position relative
	.btn1
		display inline-block
		text-align center
		border solid 1px #92bfcb
		border-radius 3px
		padding 1px 5px
		height 20px
		font-size 14.53px
		line-height 20px
		color #5b5b5b
		span
			color #4893a8
			text-decoration underline
	.time
		font-size 15.98px
		color #aaa7a7
		height 18px
		line-height 18px
		margin-bottom 14px
	.title
		font-size 18.16px
		color #000
		height 19px
		line-height 19px
		margin-bottom 13px
		padding-left 24px
		position relative
		&:hover
			color #4893a8
		&:before
			content ""
			width 19px
			height 19px
			position absolute
			left 0
			background-color #4893a8
		span
			color #4893a8
	.detail
		vertical-align middle
		display inline-block
		width 680px
		font-size 15.98px
		.detail1
			height 46px
			.author,.tags
				color #6c6c6c
				height 23px
				line-height 23px
				span 
					color #aaa7a7
			.focus
				color #aaa7a7
				height 23px
				line-height 23px
				span 
					color #4893a8
					text-decoration underline
			.focus,.author
				display inline-block
				margin-right 30px
		.detail2
			font-size 15.98px
			p
				color #6c6c6c
				line-height 29px
			span
				color #4893a8
				text-decoration underline
	.itemFooter
		margin-top 28px
		height 21px
		.itemData
			font-size 15.98px
			display inline-block
			div
				padding-left 25px
				width 95px
				display inline-block
				color #6c6c6c
				
				position relative
				&:before
					content ''
					width 21px
					height 21px
					background-color #4893a8
					position absolute
					left 0
		.dislike
			display inline-block
			width 110px
			color #b5b3b3
			text-align center
		.action
			font-size 20px
			line-height 21px
			height 21px
			width 55px
			text-align center
			display inline-block
			font-weight 900
			color #6c6c6c

</style>