<template>
	<div class="create-task">
		<div class="settings">
			<div class="tab">
						<div class='tabitem' :class="{'current':current==1}" @click='tab(1)'>圈子任务</div><!--
					 --><div class='tabitem' :class="{'current':current==2}" @click='tab(2)'>联名任务</div>
					</div>
			<div class="btn">热度</div><i class="el-icon-d-caret"></i>
			<div class="search">
				<input style="background-color: #f7f7f7;border:none;height: 22px;margin-right: 18px;">
				<i class="icon el-icon-search" style="color: #bebebe;font-weight: 600;"></i>
			</div>
		</div>
		<div v-for='(item,index) in tasks' :key='index' class="task">
			<div class='avatar'>
				<img  v-lazy="item.avatar" :src="item.avatar">
			</div>
			<div class="title">
				<div class="name">{{item.title}}</div>
				<div class="detail">{{item.detail}}</div>
			</div>
			<div class="action">
				<div class="btn">查看回答</div>
				<div class="data1">{{item.reply}}人已回答，{{item.like}}人已点赞</div>
				<div><img class='avatar' v-for='item in elites.slice(0,3)' v-lazy="item.avatar" :src="item.avatar"><i class="el-icon-more"></i></div>
				<div class="data2">等{{item.help}}人已助力{{item.point}}点</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				dialogTableVisible:false,
				current:1,
			}
		},
		methods:{
			tab(n){
				this.current = n
			}
		},
		computed:{
			...mapState(['elites','tasks'])
		},
		mounted(){
			this.$store.dispatch('getElites')
			this.$store.dispatch('getTasks')
		}
	}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus" >
.create-task
  padding-top 20px
  padding-right 20px
  box-sizing border-box
.tab
	display inline-block

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
	position relative
	padding-left 15px
	.btn
		display inline-block
		text-align center
		border solid 1px #9e9e9e
		border-radius 2px
		padding 1px 4px
		margin-left 32px
		height 22px
		width 40px
		line-height 22px
		color #5b5b5b
	.search
		margin-left 164px
		display inline-block

.task
	padding 45px 0px 45px 15px
	margin-top 8px
	.avatar
		display inline-block
		height 72px
		width 124px
		overflow hidden
		vertical-align middle
		img
			width 100%
			background-color #4893a8
	.title
		display inline-block
		font-size 20.34px
		color #474747
		line-height 34px
		height 72px
		margin-left 20px
		vertical-align middle
		.name
			position relative
			padding-left 85px
			&:before
				content ""
				width 34px
				height 34px
				position absolute
				left 0
				background-color #4893a8
			&:after
				content ""
				width 34px
				height 34px
				position absolute
				left 44px
				background-color #4893a8
		.detail
			padding-top 10px
			font-size 15.98px
			color #8a8a8a
	.action
		margin-top 10px
		padding 15px 0 0 15px
		border-top solid 3px #f8f8f8
		font-size 15.98px
		color #6e6e6e
		.data1
			font-size 13.08px
			margin-right 70px
		div
			display inline-block
			vertical-align middle
		.btn
			color #4893a8
			border solid 1.5px #4893a8
			line-height 25px
			border-radius 3px
			text-align center
			height 25px
			width 82px
			margin-right 10px
		.avatar
			vertical-align middle
			width 36px
			height 36px
			border-radius 50%
			margin-left 10px
		i
			font-size 30px
			margin 0 20px
			color #6c6c6c
			vertical-align middle

</style>
