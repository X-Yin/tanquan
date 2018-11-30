<template>
    <div class="icons">
<!--       <div class="forward-wrapper">
        <div class="forward-container">
          <p class="wrapper" @click="forward"><i class="icon-14 icon"></i><span class="text">转发</span></p>
        </div>
      </div> -->
      <div class="comment-wrapper" :class="{'task-type': mode === 9 || mode === 2}" @click="">
        <div class="comment-container">
          <p class="wrapper" @click.stop="comment"><i class="icon-3 icon"></i><span class="text">评论</span></p>
        </div>
      </div>
      <div class="prise-wrapper">
        <div class="prise-container">
          <p class="wrapper" @click.stop="prise"><i class="icon-10 icon"></i><span class="text">点赞</span></p>
        </div>
      </div>
<!--       <div class="collect-wrapper">
        <div class="collect-container">
          <p class="wrapper" @click.stop="collect"><i class="icon-8 icon"></i><span class="text">收藏</span></p>
        </div>
      </div> -->
    </div>
</template>

<script type="text/ecmascript-6">
  import {prise, delPrise} from '../../api/index.js'
  import $ from 'jquery'
  export default {
    props: {
      index: {
        type: Number,
        default: 0
      },
      item: {
        type: Object,
        default: () => {
          return {}
        }
      },
      id: {
        type: Number,
        default: 0
      },
      //文章是1，都显示,提问是2，任务是9,不显示评论
      mode: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        isForward: false,
        isComment: false,
        isPrise: false,
        isCollect: false
      }
    },
    methods: {
      animate (index) {
        $(`.icon-${index}:eq(${this.index})`).css({
          "transform": "scale(1.2)"
        });
        setTimeout(() => {
          $(`.icon-${index}:eq(${this.index})`).css({
            "transform": "scale(1)"
          })
        }, 200)
      },
      forward () {
        this.isForward = !this.isForward
      },
      comment () {
        // this.isComment = !this.isComment
        this.$emit('comment', this.item)
      },
      async prise () {
        this.isPrise = !this.isPrise
        if (this.isPrise) {
          console.log(this.id, this.mode)
          let result = await prise(this.id, this.mode)
          console.log(result)
          if (result.success) {}
        } else {
          console.log(this.id, this.mode)
          let result = await delPrise (this.id, this.mode)
          console.log(result)
        }
      },
      collect () {
        this.isCollect = !this.isCollect
      }
    },
    watch: {
      isForward () {
        if (this.isForward) {
          $(`.icon-14:eq(${this.index})`).addClass('current')
        } else {
          $(`.icon-14:eq(${this.index})`).removeClass('current')
        }
        this.animate(14)
      },
      isComment () {
        if (this.isComment) {
          $(`.icon-3:eq(${this.index})`).addClass('current')
        } else {
          $(`.icon-3:eq(${this.index})`).removeClass('current')
        }
        this.animate(3)
      },
      isPrise () {
        if (this.isPrise) {
          $(`.icon-10:eq(${this.index})`).addClass('current')
        } else {
          $(`.icon-10:eq(${this.index})`).removeClass('current')
        }
        this.animate(10)
      },
      isCollect () {
        if (this.isCollect) {
          $(`.icon-8:eq(${this.index})`).addClass('current')
        } else {
          $(`.icon-8:eq(${this.index})`).removeClass('current')
        }
        this.animate(8)
      }
    },
    created () {
      //判断之前是否已经点赞过了
      this.isPrise = this.item.prise === 1
      if (this.isPrise) {
        $(`.icon-10:eq(${this.index})`).addClass('current')
      } else {
        $(`.icon-10:eq(${this.index})`).removeClass('current')
      }
    }
  }
</script>

<style scoped>
  .task-type {
    width: 1px!important;
    height: 1px!important;
    opacity: 0;
    overflow: hidden;
  }
  .icons {
    width: 100%;
  }
  .forward-wrapper, .comment-wrapper, .prise-wrapper, .collect-wrapper {
    width: 120px;
    height: 40px;
    display: inline-block;
    vertical-align: top;
  }
  .wrapper {
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
  .icon {
    font-size: 20px;
    color: #878787;
    cursor: pointer;
    position: relative;
    top: 2px;
    transition: all 0.2s;
    display: inline-block;
  }
  .icon.current {
    color: #4893a8;
  }
  .text {
    font-size: 15px;
    cursor: pointer;
    color: #333;
    margin-left: 10px;
  }
  .text:hover {
    color: #4893a8;
  }
  @keyframes scale1 {
    0%{
      transform: translateX(0)
    }
    100% {
      transform: translateX(20px)
    }
  }
</style>
