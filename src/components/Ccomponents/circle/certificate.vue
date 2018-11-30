<template>
	<div class="container">
		<div class="littleTitle">圈子认证</div>
		<div class="separator">PART 1</div>
		<div class="line">
			<span>联系人姓名</span>
			<input type="text">
		</div>
		<div class="line">
			<span>手机号码</span>
			<input type="text">
			<div class="btn">发送验证码</div>
			<input type="text" style="width: 110px">
			<div class="btn">确定</div>
		</div>
		<div class="line">
			<span>联系邮箱</span>
			<input type="text">
			<span class="remarks">请填写常用邮箱</span>
		</div>
		<div class="separator">PART 2</div>
		<div class="line">
			<span>圈子名称</span>
			<input type="text">
			<span class="remarks">14字以内</span>
		</div>
		<div class="line">
			<span>圈子简介</span>
			<input type="text" style="width: 563px">
			<span class="remarks">50字以内</span>
		</div>
		<div class="line2">
			<span>头像</span>
			<div class="imgWrapper">上传图片<img src=""></div>
			<div class="remarksWrapper">
				<p class="rb">在网站上用以展示和传播的圈子头像</p>
				<p class="rl">图片尺寸：200*200像素，文件小于5M，支持jpg、gif、png或bmp格式的图片</p>
			</div>
		</div>
		<div class="line">
			<span>标签</span>
			<input type="text">
		</div>
		<div class="line2">
			<span>承诺书签名</span>
			<div class="imgWrapper">上传图片<img src=""></div>
			<div class="remarksWrapper">
				<p class="rb">上传带有负责人签名的“承诺书签名扫描件”，若为公司申请认证入驻需要加盖企业公章。<br><span>点击此处下载XX网站承诺书</span></p>
				<p class="rl">文件小于5M，支持jpg、gif、png或bmp格式的图片</p>
			</div>
		</div>
		<div class="separator">PART 3</div>
		<div class="line">
			<span>企业名称</span>
			<input type="text">
			<span class="remarks">填写贵企业/机构/学校名称</span>
		</div>
		<div class="line">
			<span style="line-height: 22px;vertical-align: top">营业执照<br>号码</span>
			<input type="text" style="vertical-align: top">
			<span class="remarks" style="vertical-align: top;line-height: 20px">请和营业执照上注册号保持一致或三证合一统一社会信用代码，若为学校，则填写相应的办学许可证号</span>
		</div>
		<div class="line2">
			<span style="line-height: 22px">营业执照<br>扫描件</span>
			<div class="imgWrapper">上传图片<img src=""></div>
			<div class="remarksWrapper">
				<p class="rb">请注意保持清晰各项描述可见，且申请时间在有效范围之内</p>
				<p class="rl">文件小于20M，支持jpg、gif、png或bmp格式的图片</p>
			</div>
		</div>
		<div class="line2">
			<span>法人身份证<br>正面照</span>
			<div class="imgWrapper">上传图片<img src=""></div>
			<div class="remarksWrapper">
				<p class="rb">请保持身份证姓名、身份证号码清晰可见</p>
				<p class="rl">文件小于20M，支持jpg、gif、png或bmp格式的图片</p>
			</div>
		</div>
		<div class="line2">
			<span>法人身份证<br>反面照</span>
			<div class="imgWrapper">上传图片<img src=""></div>
			<div class="remarksWrapper">
				<p class="rb">请保持身份证姓名、身份证号码清晰可见</p>
				<p class="rl">文件小于20M，支持jpg、gif、png或bmp格式的图片</p>
			</div>
		</div>
		<div class="line">
			<span>微信</span>
			<input type="text" placeholder="请填写微信号" style="width: 375px">
		</div>
		<div class="line">
			<span>微博</span>
			<input type="text" placeholder="请输入微博链接" style="width: 375px">
		</div>
		<div class="btn1">提交</div>
	</div>
</template>
<script>
	export default{

	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.container
	padding-top 65px
	color #4c4c4c
.littleTitle
	font-size 23.8px
	padding-left 25px
	position relative
	line-height 26px
	height 26px
	margin-bottom 55px
	&:before
		content ''
		background-color #4893a8
		position absolute
		height 26px
		width 11px
		left 0
.separator
	font-size 23.8px
	color #c9c9c9
	padding-left 60px
	margin-bottom 34px
	position relative
	height 28px
	line-height 28px
	&:before
		content ''
		background-color #c9c9c9
		height 6px
		width 55px
		position absolute
		left 0
		top 14px
	&:after
		content ''
		background-color #c9c9c9
		height 6px
		width 1035px
		position absolute
		left 148px
		top 14px
.line
	height 41px
	line-height 41px
	padding-left 32px
	margin-bottom 42px
	span
		font-size 20.32px
		width 130px
		display inline-block
	input
		width 203px
		height 39px
		border 1px solid #c9c9c9
		padding-left 17px
	.btn
		color #4893a8
		border solid #4893a8 1.5px
		height 25px
		font-size 17px
		line-height 25px
		padding 0 5px
		margin 0 10px
		display inline-block
		border-radius 5px
	.remarks
		font-size 17px
		color #8c8889
		margin-left 15px
		width 290px
.line2
	height 220px
	padding-left 32px
	margin-bottom 42px
	span
		vertical-align top
		font-size 20.32px
		width 130px
		display inline-block
	.imgWrapper
		height 218px
		width 218px
		color #8c8c8c
		border solid #c9c9c9 1px
		font-size 20.42px
		line-height 218px
		text-align center
		display inline-block
		vertical-align top
		position relative
		img
			width 100%
			height 100%
			position absolute
			left 0
	.remarksWrapper
		display inline-block
		width 300px
		margin-left 10px
		padding-top 24px
		color #8c8889
		.rb
			font-size 17px
			margin-bottom 20px
			line-height 19px
			span
				color #4893a8
				text-decoration underline
				font-size 17px
				width 300px
		.rl
			font-size 13.6px
			line-height 16px
.btn1
	margin 20px 0 87px 770px
	color #4893a8
	font-size 27.2px
	padding 0 28.5px
	height 52px
	width 55px
	line-height 52px
	border solid #4893a8 1.5px
	border-radius 5px
</style>