<template>
    <div class="confirmText" v-if="showFlag">
      <div class="content">
        <div class="title">{{title}}</div>
        <div class="btn-wrapper">
          <div class="confirm-btn" @click="confirm">确定</div>
          <div class="cancel-btn" @click="cancel">取消</div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '是否确定退出？'
      },
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      },
      confirm () {
        this.hide()
        this.$emit('confirm', this.item)
      },
      cancel () {
        this.hide()
      }
    }
  }
</script>

<style scoped>
  .confirmText {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.6);
    z-index: 3;
  }
  .content {
    width: 400px;
    height: 200px;
    background-color: white;
    border-radius: 5px;
    position: absolute;
    margin-left: 50%;
    margin-top: 50vh;
    transform: translate3d(-50%, -50%, 0);
    padding: 30px;
    box-sizing: border-box;
  }
  .title {
    font-size: 20px;
    text-align: center;
    color: #777;
  }
  .btn-wrapper {
    margin-top: 50px;
    height: 35px;
    position: relative;
  }
  .confirm-btn, .cancel-btn {
    width: 70px;
    height: 26px;
    font-size: 16px;
    text-align: center;
    line-height: 26px;
    color: #4893a8;
    border-radius: 3px;
    cursor: pointer;
    border: 1px solid #4893a8;
    position: absolute;
  }
  .confirm-btn {
    top: 0;
    left:  50px;
  }
  .cancel-btn {
    top: 0;
    right: 50px;
  }
  .confirm-btn:hover, .cancel-btn:hover {
    color: white;
    background-color: #4893a8;
  }
</style>
