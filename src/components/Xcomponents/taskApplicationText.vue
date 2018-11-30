<template>
  <div class="taskApplicationText" v-show="showFlag">
    <div class="mask" @click="hide()"></div>
    <div class="text" ref="text">
      <div class="title">
        <span class="color-block"></span>
        接单申请
      </div>
      <div class="input-wrapper" v-if="showFlag">
        <!--<el-input :rows="10" type="textarea" placeholder="简要回答..." v-model="textarea"></el-input>-->
        <editor class="editor" :value="value" :setting="editorSetting" @input="getInput" ref="editor"></editor>
      </div>
      <div class="submit-btn">
        <span class="submit-text" @click="submit()">提交</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import  editor from '../common/editor.vue'
  import {takeTaskDoubleWay} from '../../api/index.js'
  import $ from 'jquery'
  export default {
    props: {
      taskId: ''
    },
    data () {
      return {
        showFlag: false,
        value: '',
        content: '',
        editorSetting: {
          height: 200
        }
      }
    },
    mounted () {
    },
    methods: {
      getInput (content) {
        this.content = content
      },
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
        this.content = ''
        this.$refs.editor.clearContent()
      },
      //提交内容
      async submit () {
        if (this.content === '') {
          this.$message({
            type: 'warning',
            showClose: true,
            message: '内容不能为空！'
          })
        } else {
          let result = await takeTaskDoubleWay(this.taskId, this.content)
          console.log(result)
          if (result.success) {
            this.$message({
              type: 'success',
              showClose: true,
              message: '申请发送成功！'
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
        }
      }
    },
    watch: {
      value () {
        console.log(this.value)
      }
    },
    components: {
      editor
    }
  }
</script>

<style scoped>
  .taskApplicationText {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
  }
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    background-color: rgba(0,0,0,0.3);
  }
  .text {
    position: absolute;
    width: 800px;
    height: 400px;
    padding: 30px;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    box-sizing: border-box;
    background-color: white;
  }
  .title {
    margin-bottom: 30px;
  }
  .color-block {
    display: inline-block;
    height: 18px;
    width: 10px;
    background-color: #01a9ce;
    position: relative;
    top: 2px;
    margin-right: 2px;
  }
  .submit-btn {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 86px;
    height: 30px;
    border-radius: 3px;
    border: 1px solid #01a9ce;
  }
  .submit-text{
    height: 26px;
    width: 80px;
    color: #01a9ce;
    border-radius: 3px;
    display: inline-block;
    margin: 2px 3px;
    text-align: center;
    line-height: 26px;
    font-size: 17px;
    cursor: pointer;
  }
  .submit-text:hover {
    background-color: #01a9ce;
    color: white;
  }
  .success {
    width: 200px;
    height: 120px;
    background-color: white;
    line-height: 120px;
    text-align: center;
    margin-left: 50%;
    transform: translateX(-50%) translateY(-50%);
    position: absolute;
    top: 50%;
  }
  .icon {
    color: green;
    font-weight: 900;
    margin-right: 10px;
  }
</style>
