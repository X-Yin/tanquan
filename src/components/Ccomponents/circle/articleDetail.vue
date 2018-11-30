<template>
	<div class="main article-detail">
		<div class="return" ><span @click="$router.go(-1)">返回</span></div>
		<div class="title">{{articleDetail.articleName}}</div>
		<div class="intro">
			<div class="author">作者：<span>{{articleDetail.articleAuthorName}}</span></div>
			<div class="time">{{articleDetail.articleCreateTime}}</div>
		</div>
		<div class="bodyPart">
		</div>
		<div class="icons-wrapper">
			<icons></icons>
		</div>
		<div class="message">
			<div class="avatar"><img src=""></div>
			<div class="detail">
				<div class="words"><span>嗷嗷叫小狮子</span>：收获了很多学习资料，谢谢了！希望以后有更多的资源分享啊~</div>
				<div class="itemFooter">
					<div class="time">12:45</div>
					<div class="btn">举报</div>
					<div class="btn-r">回复</div>
					<div class="num">(90)</div>
				</div>
				<div class="replys">
					<div class="reply">
						<div class="detail">
							<div class="words"><span>嗷嗷叫小狮子</span>：收获了很多学习资料，谢谢了！希望以后有更多的资源分享啊~</div>
							<div class="itemFooter">
								<div class="time">12:45</div>
								<div class="btn">举报</div>
								<div class="btn-r">回复</div>
								<div class="num">(90)</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {getStorage} from '../../../api/util.js'
import {getArticleDetail} from '../../../api/index.js'
import icons from '../../common/icons'
import $ from 'jquery'
	export default{
		data () {
			return {
				articleDetail: {}
			}
		},
		mounted () {
			let articleId = getStorage('articleDetailId')
			console.log(articleId)
			this._getArticleDetail(articleId)
		},
		methods: {
			//获取文章详情
			async _getArticleDetail (articleId) {
				let result = await getArticleDetail(articleId)
				console.log(result)
				if (result.success) {
					this.articleDetail = result.data
				}
			}
		},
		watch: {
			articleDetail () {
				$('.bodyPart').html(this.articleDetail.articleContent)
			}
		},
		components: {
			icons
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.icons-wrapper {
	width: 60%;
	margin-top: 30px;
}
.return
	height 18px
	line-height 18px
	padding-left 20px
	font-size 17.78px
	color #676767
	margin-bottom 19px
	span
		cursor pointer
		user-select none
		position relative
		&:before
			content "<"
			position absolute
			left -18px
.title
	height 21px
	line-height 21px
	padding-left 28px
	font-size 20.74px
	color #474747
.intro
	height 75px
	line-height 37px
	padding-left 30px
	padding-top: 30px;
	padding-bottom 10px
	color #797979
	font-size 17.78px
	span
		color #a8a6a7
	.author,.time
		display inline-block
		width 205px
.img
	height 270px
	width 605px
	margin-left 27px
	background-color #4893a8
	img
		width 100%
.bodyPart
	margin-top 30px
	font-size  16.24px
	color #727272
	padding: 0 20px;
	box-sizing: border-box;
	p
		padding 13px 0
		line-height 27px
.itemFooter
	margin-top 28px
	height 21px
	user-select none
	margin-bottom 30px
	padding-left 10px
	.itemData
		font-size 15.98px
		display inline-block
		div
			padding-left 25px
			width 103px
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
.message
	padding 25px 0
	border-bottom solid 3px #e8e8e8
	.avatar
		vertical-align top
		display inline-block
		width 40px
		height 40px
		margin-right 17px
		border-radius 50%
		background-color #4893a8
	.detail
		display inline-block
		.words
			font-size 15.98px
			color #a8a8a8
			span
				color #474747
				text-decoration underline
		.itemFooter
			vertical-align top
			div
				display inline-block
				
				color #474747
				font-size 14.53px
			.time
				margin-right 411px
			.num
				position relative
				margin-left 24px
				padding-left 23px
				&:before
					position absolute
					margin-top 2px
					left 0
					content ""
					height 17px
					width 17px
					background-color #4893a8
			.btn-r
					margin-left 20px
					position relative
					&:before
						content ""
						position absolute
						height 18px
						margin-top 1px
						width 2px
						background-color #a8a8a8
						left -13px
		.replys
			background-color #f2f2f2
			padding 0 32px
			margin-top 7px
			.reply
				padding 28px 0 20px 0
				border-bottom solid 3px #e8e8e8
				.time
					margin-right 340px 

</style>