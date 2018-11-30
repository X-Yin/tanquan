<template>
    <div class="help-text" v-show="showFlag">
      <div class="mask" @click="hide()"></div>
      <div class="content">
        <div class="wrapper">
          <div class="text-wrapper">
            <div class="text">助力:</div>
            <input type="text" class="input">
            <div class="text-bottom">点</div>
          </div>
          <div class="bottom">
            <div class="cancel-btn" @click="hide()">取消</div>
            <div class="confirm-btn" @click="confirm">确定</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  import {help} from '../../api/index.js'
  export default {
    props: {
      taskId: {
        type: Number,
        default: null
      },
      index: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        let value = $('.input').val('')
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      },
      //提交助力
      async confirm () {
        let value = $('.input').val()
        if (value === '') {
          this.$message({
            type: 'warning',
            showClose: true,
            message: '助力值不能为空！'
          })
        } else {
          let result = await help(this.taskId, value)
          console.log(result)
          if (result.success) {
            this.$emit('completeHelp', this.index)
            this.hide()
          } else {
            this.$message({
              type: 'error',
              showClose: true,
              message: result.msg
            })
          }
        }
      }
    }
  }
</script>

<style scoped>
  .help-text {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7);
  }
  .content {
    position: absolute;
    width: 400px;
    height: 250px;
    border-radius: 10px;
    background-color: white;
    z-index: 2;
    margin-top: 50vh;
    margin-left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  .wrapper {
    margin-top: 50px;
  }
  .text-wrapper {
    height: 100px;
    display: inline-block;
    margin-left: 57px;
    /*margin-left: 50%;*/
    /*transform: translateX(-50%);*/
  }
  .text-wrapper:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
  .text {
    font-size: 20px;
    color: #4893a8;
    margin-right: 20px;
    display: inline-block;
    vertical-align: middle;
  }
  .input {
    display: inline-block;
    vertical-align: middle;
    height: 30px;
    width: 150px;
    font-size: 18px;
    border: 1px solid #4893a8;
    outline: none;
    margin-right: 20px;
    text-indent: 2em;
  }
  .text-bottom {
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    color: #333;
    margin-right: 20px;
  }
  .bottom {
    margin-top: 30px;
    position: relative;
  }
  .cancel-btn {
    position: absolute;
    right: 110px;
    width: 45px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    color: #4893a8;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid #4893a8;
  }
  .confirm-btn {
    position: absolute;
    right: 30px;
    width: 45px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    color: #4893a8;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid #4893a8;
  }
</style>
