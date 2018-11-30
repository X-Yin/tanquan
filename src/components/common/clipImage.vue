<template>
    <div class="clipImage" v-if="showFlag"  @mousemove="allmove($event)" @mouseup="allup($event)">
      <div class="image-wrapper">
        <!--用来获取图片完整宽高-->
        <img class="image" :src="src">
      </div>
      <!--用来cropbox的图片-->
      <img class="img" :src="src">
      <!--用来显示的图片-->
      <img class="file" style="position: absolute; left: 0;top: 0;width: 200px;">
      <div class="left">
        <img :src="src" class="image-bottom" draggable="false">
        <img :src="src" class="image-top" draggable="false">
        <div class="mask"></div>
        <div class="btns-wrapper" @mousedown.stop="mousedown($event)" v-if="src !== ''">
          <div class="left-top btn" @mousedown.stop="mousedownNW($event)"></div>
          <div class="right-top btn" @mousedown.stop="mousedownNE($event)"></div>
          <div class="bottom-right btn" @mousedown.stop="mousedownSE($event)"></div>
          <div class="bottom-left btn" @mousedown.stop="mousedownSW($event)"></div>
        </div>
      </div>
      <div class="right">
        <div class="avatar-wrapper">
          <img :src="src" class="avatar" style="left: 0; top: 0">
        </div>
        <div class="setting-wrapper">
          <div class="confirm" @click="submit()">确定</div>
          <div style="flex:1"></div>
          <div class="cancel" @click="hide()">取消</div>
        </div>
      </div>
      <div class="loading-mask-wrapper" v-show="isLoading">
        <div class="loading-mask" v-loading="isLoading"></div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  import {getPosition, setStorage, getStorage} from '../../api/util.js'
  import {uploadAvatar, uploadFile} from '../../api/index.js'
  import {mapMutations} from 'vuex'
  const LENGTH = 200
  export default {
    props: {
      src: {
        type: String,
        default: ''
      },
      mode: {
        type: String,
        default: 'avatar'
      }
    },
    mounted () {
    },
    data () {
      return {
        showFlag: false,
        isMouseDown: false,
        wrapperX: 0,//选取框的坐标值X
        wrapperY: 0,//选取框的坐标值Y
        moveX: 0,//扩减选取框的X
        moveY: 0,//扩减选取框的Y
        wrapperWidth: LENGTH,//选取框的宽度
        wrapperHeight: LENGTH,//选区框的高度
        wrapperTop: 0,//选取框开始时的top值
        wrapperLeft: 0,//选取框开始时的left值
        left: 0,//选取框最开始偏移的left值
        top: 0,//选取框最开始偏移的top值
        result: {},//最后切割图片的结果
        isNW: false,
        isNE: false,
        isSE: false,
        isSW: false,
        offset: 0,//移动的间距
        isLoading: false
      }
    },
    methods: {
      ...mapMutations([
        'getAvatar'
      ]),
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      },
      async _uploadAvatar (file) {
        this.isLoading = true
        let result = await uploadAvatar(file)
        console.log(result)
        if (result.success) {
          this.isLoading = false
          this.$message({
            type: 'success',
            showClose: true,
            message: '头像上传成功！'
          })
          this.hide()
          this.getAvatar(result.data)//修改vuex中的avatar信息
          //修改本地的user中的头像信息
          let user = getStorage('user')
          user.userProPic = result.data
          setStorage('user', user)
        } else {
            this.$message({
            type: 'error',
            showClose: true,
            message: result.msg
          })
        }
        this.isLoading = false
      },
      async _returnUrl (file) {
        this.isLoading = true
        let result = await uploadFile(file)
        console.log(result)
        if (result.success) {
          this.isLoading = false
          this.$message({
            type: 'success',
            showClose: true,
            message: '上传成功！'
          })
          this.hide()
          this.$emit('uploadImage', result.data)
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: result.msg
          })
        }
        this.isLoading = false
      },
      submit () {
        let clipImage = document.getElementsByClassName('clipImage')[0]
        let rightDiv = clipImage.getElementsByClassName('right')[0]
        let left = -parseInt(rightDiv.getElementsByClassName('avatar')[0].style.left)
        let top = -parseInt(rightDiv.getElementsByClassName('avatar')[0].style.top)
        let height = $('.clipImage .avatar').height()
        let height1 = $('.clipImage .image').height()//图片的原始高度
        let scale = height1 / height //获取比例
        let _this = this
        $('.clipImage .img').cropbox({
          result: {
            cropX: left * scale ,
            cropY: top * scale,
            cropW: LENGTH * scale,
            cropH: LENGTH * scale
          },
          showControls: 'never'
        }, function () {
          let data = this.getDataURL()
//          $('.file').attr('src', data)
          //分为普通裁剪和上传头像裁剪两种
          if (_this.mode === 'avatar') {
            _this._uploadAvatar(data)
          } else if (_this.mode === 'other') {
            _this._returnUrl(data)
          }
        })
      },
      setLeft (element, left) {
        element.css({
          "left": left + 'px'
        })
      },
      setTop (element, top) {
        element.css({
          "top": top + 'px'
        })
      },
      setClip (element, top, left, bottom, right) {
        element.css({
          'clip': `rect(${top}px ${left}px ${bottom}px ${right}px)`
        })
      },
      setWidth (element, width) {
        element.css({
          'width': width + 'px'
        })
      },
      setImageTop () {
        //设置选取框中的图片的显示
        let imageTop = $('.btns-wrapper').offset().top - $('.image-bottom').offset().top
        let imageBottom = $('.btns-wrapper').offset().top - $('.image-bottom').offset().top + $('.btns-wrapper').height()
        let imageRight = $('.btns-wrapper').offset().left - $('.image-bottom').offset().left + $('.btns-wrapper').width()
        let imageLeft = $('.btns-wrapper').offset().left - $('.image-bottom').offset().left
        this.setClip($('.image-top'),this.int(imageTop), this.int(imageRight), this.int(imageBottom), this.int(imageLeft))
      },
      setAvatar () {
        //设置右边的avatar的大小和位置的变化
        let scale = LENGTH / $('.btns-wrapper').width()
        this.setWidth($('.clipImage .avatar'), $('.image-bottom').width() * scale)
        let offsetLeft = ($('.btns-wrapper').offset().left - $('.image-bottom').offset().left) * scale
        let offsetTop = ($('.btns-wrapper').offset().top - $('.image-bottom').offset().top) * scale
        this.setLeft($('.clipImage .avatar'), -this.int(offsetLeft))
        this.setTop($('.clipImage .avatar'), -this.int(offsetTop))
      },
      int (number) {
        return Math.floor(number)
      },
      //向上运动
      moveTop (offset) {
        $('.btns-wrapper').css({
          "top": this.wrapperTop - offset + 'px',
          "height": this.wrapperHeight + offset + 'px'
        })
      },
      //向左运动
      moveLeft (offset) {
        $('.btns-wrapper').css({
          "left": this.wrapperLeft - offset + 'px',
          "width": this.wrapperWidth + offset + 'px'
        })
      },
      //向右运动
      moveRight (offset) {
        $('.btns-wrapper').width(this.wrapperWidth + offset + 'px')
      },
      moveBottom (offset) {
        $('.btns-wrapper').height(this.wrapperHeight + offset + 'px')
      },//向下运动
      allmove (e) {
        e.stopPropagation()
        //控制选区框的移动
        if (this.isMouseDown) {
          let element = $('.btns-wrapper')
          let image = $('.image-top')
          let avatar = $('.clipImage .avatar')
          let imageWidth = image.width()
          let imageHeight = image.height()
          let btnsWrapperPos = {left: $('.btns-wrapper').offset().left, top: $('.btns-wrapper').offset().top}
          let imageBottomPos = {left: $('.image-bottom').offset().left, top: $('.image-bottom').offset().top}
          let left = this.left +  e.clientX - this.wrapperX//获取移动的x值
          let top = this.top + e.clientY - this.wrapperY//获取移动的y值
          if (left < 0 ) {
            left = 0
          } else if (left + $('.btns-wrapper').width() >= $('.image-bottom').width() -3) {
            left = $('.image-bottom').width() - $('.btns-wrapper').width() -3
          }
          if (top < 0) {
            top = 0
          } else if ( top + $('.btns-wrapper').height() >= $('.image-bottom').height() - 3) {
            top =  $('.image-bottom').height() - $('.btns-wrapper').height() -3
          }
          //获取图片clip的边界值
          let imageTop = btnsWrapperPos.top - imageBottomPos.top
          let imageRight = btnsWrapperPos.left - imageBottomPos.left + $('.btns-wrapper').width()
          let imageBottom = btnsWrapperPos.top - imageBottomPos.top + $('.btns-wrapper').height()
          let imageLeft = btnsWrapperPos.left - imageBottomPos.left
          if (imageRight - imageLeft < $('.btns-wrapper').width()) {
            imageRight = $('.btns-wrapper').width() + imageLeft
          }
          if (imageBottom - imageTop < $('.btns-wrapper').width()) {
            imageBottom = $('.btns-wrapper').width() + imageTop
          }
          //移动选取框
          this.setLeft(element, this.int(left))
          this.setTop(element, this.int(top))
          //设置图片的clip属性
          this.setClip(image, this.int(imageTop), this.int(imageRight), this.int(imageBottom), this.int(imageLeft))
          //设置右边的avatar的偏移值，保持在原地不动
          let scale = LENGTH / $('.btns-wrapper').width()
          let offsetLeft = ($('.btns-wrapper').offset().left - $('.image-bottom').offset().left) * scale
          let offsetTop = ($('.btns-wrapper').offset().top - $('.image-bottom').offset().top) * scale
          this.setLeft($('.clipImage .avatar'), -this.int(offsetLeft))
          this.setTop($('.clipImage .avatar'), -this.int(offsetTop))
        }
        //控制选区框的大小
        let offsetX = e.clientX - this.moveX
        let offsetY = e.clientY - this.moveY
        let offset = 0
        //选区两者中的最小值，但是这样可能会造成的问题就是offset可能一会儿为正，一会儿为负，所以在向不同的方向移动时要判断offsetX和offsetY的正负
        if (Math.abs(offsetX) >= Math.abs(offsetY)) {
          offset = offsetY
        } else {
          offset = offsetX
        }
        //设定上下左右界限
        let rightBorder = $('.image-bottom').width() + $('.image-bottom').offset().left - 2 - $('.btns-wrapper').offset().left - this.wrapperWidth
        let bottomBorder = $('.image-bottom').height() + $('.image-bottom').offset().top - this.wrapperHeight - $('.btns-wrapper').offset().top
        let topBorder = this.wrapperTop
        let leftBorder = this.wrapperLeft
        //右下角运动
        if (this.isSE) {
          let minBorder = LENGTH - this.wrapperWidth
          if (offset  > rightBorder && offset < bottomBorder) {
            //在下界限不超过的情况下，设定右界限的最小值
            offset = rightBorder
          } else if (offset <= minBorder) {
            //宽高不能小于200
            offset = minBorder
          } else if (offset >= bottomBorder && offset <= rightBorder) {
            //在右界限不超过的情况下，设定下界限的最小值
            offset = bottomBorder
          } else if (offset >= rightBorder && offset > bottomBorder) {
            //如果既超过了下界限又超过了右界限，取两者的最小值
            offset = Math.min(bottomBorder, rightBorder)
          }
          this.moveRight(this.int(offset))
          this.moveBottom(this.int(offset))

          this.setImageTop()
          this.setAvatar()
        }
        //右上角移动
        if (this.isNE) {
          //向右上角移动,此时offsetY<0,offsetX>0,意思也就是选取框要扩大，所以offset取绝对值
          let offset1 = Math.abs(offset)
          if (offsetY < 0) {
            if (offset1 >= rightBorder && offset1 < topBorder) {
              //在不超过上界限的情况下，取右界限的最小值
              offset1 = rightBorder
            } else if (offset1 >= topBorder && offset1 < rightBorder) {
              //在不超过右界限的情况下，取上界限的最小值
              offset1 = topBorder
            } else if (offset1 > topBorder && offset1 > rightBorder) {
              //如果既超过了上界限又超过了右界限，取两者的最小值
              offset1 = Math.min(topBorder, rightBorder)
            }
            this.moveTop(Math.abs(this.int(offset1)))
            this.moveRight(Math.abs(this.int(offset1)))
          } else { //向右上角的反向移动,此时offsetY>0,offsetX<0，意思也就是选取框要缩小，所以offset取负数
            let offset1 = Math.abs(offset)
            let minBorder = this.wrapperWidth - LENGTH
            if (offset1 >= minBorder) {
              offset1 = minBorder
            }
            this.moveTop(-Math.abs(this.int(offset1)))
            this.moveRight(-Math.abs(this.int(offset1)))
          }
          this.setImageTop()
          this.setAvatar()
        }
        //左下角移动
        if (this.isSW) {
          //向左下角移动,此时offsetY>0,offsetX<0,意思也就是选取框要扩大，所以offset取绝对值
          if (offsetX < 0) {
            let offset1 = Math.abs(offset)
            if (offset1 >= leftBorder && offset1 <= bottomBorder) {
              //在不超过下界限的情况下，取左界限的最小值
              offset1 = leftBorder
            } else if (offset1 >= bottomBorder && offset1 <= leftBorder) {
              //在不超过左界限的情况下，取下界限的最小值
              offset1 = bottomBorder
            } else if (offset1 >= bottomBorder && offset1 >= leftBorder) {
              //如果既超过了下界限又超过了左界限，取两者的最小值
              offset1 = Math.min(bottomBorder, leftBorder)
            }
            this.moveLeft(Math.abs(this.int(offset1)))
            this.moveBottom(Math.abs(this.int(offset1)))
          } else {
            //向左下角反向移动,此时offsetY<0,offsetX>0,意思也就是选取框要缩小，所以offset取负数
            let minBorder = this.wrapperWidth - LENGTH
            let offset1 = Math.abs(offset)
            if (offset1 >= minBorder) {
              offset1 = minBorder
            }
            this.moveLeft(-Math.abs(offset1))
            this.moveBottom(-Math.abs(offset1))
          }
          this.setImageTop()
          this.setAvatar()
        }
        //左上角移动
        if (this.isNW) {
          //向左上角移动,此时offsetX和offsetY都小于0
          if (offsetX < 0) {
            let offset1 = Math.abs(offset)
            if (offset1 >= leftBorder && offset1 <= topBorder) {
              offset1 = leftBorder
            } else if (offset1 >= topBorder && offset1 <= leftBorder) {
              offset1 = topBorder
            } else if (offset1 >= topBorder && offset1 >= leftBorder) {
              offset1 = Math.min(topBorder, leftBorder)
            }
            this.moveLeft(this.int(offset1))
            this.moveTop(this.int(offset1))
          } else {
            //向左上角移动,此时offsetX和offsetY都大于0
            let minBorder = this.wrapperWidth - LENGTH
            let offset1 = Math.abs(offset)
            if (offset1 > minBorder) {
              offset1 = minBorder
            }
            this.moveLeft(-this.int(offset1))
            this.moveTop(-this.int(offset1))
          }
          this.setImageTop()
          this.setAvatar()
        }
      },
      allup (e) {
        e.stopPropagation()
        this.isSE = false
        this.isSW = false
        this.isNE = false
        this.isNW = false
        this.isMouseDown = false
      },
      //选取框的mouseDown
      mousedown (e) {
        e.stopPropagation()
        this.isMouseDown = true
        this.wrapperX = e.clientX
        this.wrapperY = e.clientY
        this.left = $('.btns-wrapper').offset().left - $('.image-bottom').offset().left
        this.top =  $('.btns-wrapper').offset().top - $('.image-bottom').offset().top
      },
      //左上角
      mousedownNW (e) {
        e.stopPropagation()
        this.isNW = true
        this.moveX = e.clientX
        this.moveY = e.clientY
        this.wrapperWidth = $('.btns-wrapper').width()
        this.wrapperHeight = $('.btns-wrapper').height()
        this.wrapperLeft = $('.btns-wrapper').offset().left - $('.image-bottom').offset().left
        this.wrapperTop = $('.btns-wrapper').offset().top - $('.image-bottom').offset().top
      },
      //右上角
      mousedownNE (e) {
        e.stopPropagation()
        this.isNE = true
        this.moveX = e.clientX
        this.moveY = e.clientY
        this.wrapperWidth = $('.btns-wrapper').width()
        this.wrapperHeight = $('.btns-wrapper').height()
        this.wrapperTop = $('.btns-wrapper').offset().top - $('.image-bottom').offset().top
      },
      //右下角
      mousedownSE (e) {
        e.stopPropagation()
        this.isSE = true
        this.moveX = e.clientX
        this.moveY = e.clientY
        this.wrapperWidth = $('.btns-wrapper').width()
        this.wrapperHeight = $('.btns-wrapper').height()
      },
      //左下角
      mousedownSW (e) {
        e.stopPropagation()
        this.isSW = true
        this.moveX = e.clientX
        this.moveY = e.clientY
        this.wrapperWidth = $('.btns-wrapper').width()
        this.wrapperHeight = $('.btns-wrapper').height()
        this.wrapperLeft = $('.btns-wrapper').offset().left - $('.image-bottom').offset().left
      }
    },
    watch: {
    }
  }
</script>

<style scoped>
  .loading-mask-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .loading-mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .clipImage {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-width: 1180px;
    background-color: rgba(0,0,0,0.8);
    user-select: none;
    z-index: 100;
  }
  .image-wrapper {
    width: 200px;
    height: 200px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    opacity: 0;
    overflow: hidden;
  }
  .img {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: -1;
    min-width: 200px;
    min-height: 200px;
    max-width: 600px;
    max-height: 600px;
  }
  .left {
    position: absolute;
    left: 200px;
    /*margin-top: 50vh;*/
    /*transform: translateY(-50%);*/
    top: 50px;
    font-size: 0;
  }
  .image-bottom {
    max-width: 600px;
    max-height: 600px;
    min-width: 200px;
    min-height: 200px;
  }
  .image-top {
    max-width: 600px;
    max-height: 600px;
    min-width: 200px;
    min-height: 200px;
    position: absolute;
    clip: rect(0 200px 200px 0);
    left: 0;
    top: 0;
    z-index: 3;
  }
  .mask {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    background-color: rgba(255,255,255,0.4);
    z-index: 2;
  }
  .btns-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
    border: 1.5px solid white;
    z-index: 10;
    cursor: move;
  }
  .btn {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: white;
  }
  .left-top {
    cursor: nw-resize;
    left: -5px;
    top: -5px;
  }
  .right-top {
    cursor: ne-resize;
    right: -5px;
    top: -5px;
  }
  .bottom-right {
    cursor: se-resize;
    right: -5px;
    bottom: -5px;
  }
  .bottom-left {
    cursor: sw-resize;
    bottom: -5px;
    left: -5px;
  }
  .right {
    position: absolute;
    right: 50px;
    width: 300px;
    /*margin-top: 50vh;*/
    /*transform: translateY(-50%);*/
    top: 50px;
  }
  .avatar-wrapper {
    width: 200px;
    height: 200px;
    position: relative;
    margin: 0 auto;
    overflow: hidden;
  }
  .avatar {
    max-width: 600px;
    max-height: 600px;
    min-width: 200px;
    min-height: 200px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .setting-wrapper {
    margin-top: 50px;
    display: flex;
  }
  .confirm, .cancel {
    flex: 2;
    width: 100px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #4893a8;
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    color: #4893a8;
    cursor: pointer;
    margin: 0 auto;
    transition: all 0.2s;
  }
  .confirm:hover, .cancel:hover {
    background-color: #4893a8;
    color: white;
  }
</style>
