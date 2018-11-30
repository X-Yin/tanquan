<template>
    <div class="join-text" v-if="showFlag">
      <div class="content">
        <i class="el-icon-close close" @click="hide"></i>
        <div class="title-wrapper">
          <span class="color-block"></span>
          <span class="title">提交申请</span>
        </div>
        <div class="content-text-wrapper">
          <el-input type="textarea" class="textarea" v-model="content" placeholder="请输入申请内容" :rows="10"></el-input>
        </div>
        <div class="submit-wrapper">
          <div class="submit" @click="submit">提交</div>
        </div>
      </div>
      <div class="mask-wrapper" v-if="loading">
        <div class="mask" v-loading="loading"></div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  import {conditionJoinFirst} from '../../../api/index.js'
  export default {
    props: {
      item: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        showFlag: false,
        content: '',
        loading: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      },
      //提交申请
      submit () {
        this.join()
      },
      async join () {
        this.loading = true
        let content = this.content
        let circleId = this.item.circleId
        let result = await conditionJoinFirst(content, circleId)
        console.log(result)
        if (result.success) {
          this.$message({
            type: 'success',
            showClose: true,
            message: '申请成功，请耐心等待'
          })
          this.content = ''
          this.hide()
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: result.msg
          })
        }
        this.loading = false
      }
    },
    mounted () {
      $('.textarea textarea').css('resize', 'none')
    },
    watch: {
      showFlag () {
        if (this.showFlag) {
          setTimeout(() => {
            $('.textarea textarea').css('resize', 'none')
          }, 20)
        }
      }
    }
  }
</script>

<style scoped>
  .join-text {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 2;
  }
  .content {
    position: absolute;
    width: 700px;
    height: 400px;
    background-color: white;
    margin-left: 50%;
    margin-top: 50vh;
    transform: translate3d(-50%, -50%,0);
    padding: 30px;
    box-sizing: border-box;
  }
  .title-wrapper {
    position: relative;
    height: 50px;
  }
  .title-wrapper:before {
    display: inline-block;
    vertical-align: middle;
    height: 50px;
  }
  .color-block {
    display: inline-block;
    vertical-align: middle;
    width: 15px;
    height: 20px;
    background-color: #4893a8;
  }
  .title {
    display: inline-block;
    vertical-align: middle;
    color: #777;
    font-size: 17px;
    margin-left: 10px;
  }
  .close {
    position: absolute;
    right: 20px;
    top: 20px;
    transform: translateY(-50%);
    color: #777;
    font-size: 20px;
    cursor: pointer;
  }
  .close:hover {
    color: #4893a8;
  }
  .submit-wrapper {
    position: relative;
    width: 100%;
    height: 40px;
  }
  .submit {
    position: absolute;
    right: 0;
    top: 20px;
    width: 60px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #4893a8;
    border: 1px solid #4893a8;
    transition: all 0.2s;
    cursor: pointer;
  }
  .submit:hover {
    color: white;
    background-color: #4893a8;
  }
  .mask-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 5;
  }
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
</style>
