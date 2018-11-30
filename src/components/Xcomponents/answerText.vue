<template>
  <div class="answerText" v-if="showFlag">
    <div class="mask" @click="hide()"></div>
    <div class="text" ref="text"  v-loading="!isHaveAllApplicationer">
      <div class="title">
        <span class="color-block"></span>
        我要回答
      </div>
      <div class="input-wrapper" v-if="showFlag">
        <!--<el-input :rows="10" type="textarea" placeholder="简要回答..." v-model="textarea"></el-input>-->
        <editor class="editor" :value="value" :setting="editorSetting" @input="getInput" ref="editor"></editor>
      </div>
      <div class="anonymous-wrapper">
        <el-checkbox name="anonymous" class="anonymous" v-model="anonymous"></el-checkbox>
        <span class="anonymous-text">匿名</span>
      </div>
      <div class="submit-btn">
        <span class="submit-text" @click="submit()">提交</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import  editor from '../common/editor.vue'
  import {answerTask, otherAnswerTask, getTaskApplicationer} from '../../api/index.js'
  import {getStorage} from '../../api/util.js'
  import {mapState} from 'vuex'
  import $ from 'jquery'
  export default {
    props: {
      taskContentId: ''
    },
    data () {
      return {
        showFlag: false,
        value: '',
        content: '',
        editorSetting: {
          height: 200
        },
        anonymous: false,
        isHaveAllApplicationer: false,//是否获取了所有接单者的数据
        isApplicationer: false,//是否是接单者
      }
    },
    mounted () {
      this._getAllApplicationer()
    },
    computed: {
      ...mapState([
        'taskDetailId'
      ])
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
          let content = this.content
          let answerUserId = getStorage('user').userId
          let ret = /<img\S*src="(\S*)"[^>]+>/
          let answerPhoto = ''
          if (ret.test(content.replace(/\s*/g, ''))) {
            answerPhoto = content.replace(/\s*/g, '').match(ret)[1]
          }
          let answerContent = this.content
          let answerAnoymity = this.anonymous
          let giveTaskWork = this.isApplicationer//不是接单者传false，是接单者传true
          console.log(answerUserId, this.taskContentId, answerContent, answerPhoto, answerAnoymity, giveTaskWork)
          let result = await answerTask(this.taskContentId, answerContent, answerPhoto, answerAnoymity, giveTaskWork)
          console.log(result)
          if (result.success) {
            this.$message({
              type: 'success',
              showClose: true,
              message: '回答成功！'
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
      },
      //获取全部的接单者信息
      async _getAllApplicationer () {
        let taskId = getStorage('taskDetailId')
        if (taskId !== '') {
          let result = await getTaskApplicationer(taskId)
          console.log(result)
          if (result.success) {
            this.isHaveAllApplicationer = true
            let userId = getStorage('user').userId
            for (let i of result.data) {
              if (i === userId) {
                this.isApplicationer = true
              }
            }
          }
        }
      }
    },
    watch: {
      value () {
        console.log(this.value)
      },
      taskDetailId (newValue, oldValue) {
        if (oldValue !== '') {
          this._getAllApplicationer()
        }
      }
    },
    components: {
      editor
    }
  }
</script>

<style scoped>
  .answerText {
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
  .anonymous-wrapper {
    width: 100px;
    height: 40px;
    line-height: 40px;
    font-size: 0;
    position: absolute;
    bottom: 40px;
  }
  .anonymous-text{
    color: #636363;
    font-size: 20px;
    margin-left: 10px;
    position: relative;
    top: 3px;
  }
</style>
