<template>
  <div class="send-message">
    <div class="text-wrapper">
      <div class="setting">
        <div class="photo-icon" @click="sendPhoto"></div>
        <div class="smile-icon" @click="showFace"></div>
        <div class="faces-wrapper" v-if="isFaceShow">
          <div class="arrow-top">
            <i class=" icon-top"></i>
          </div>
          <div class="faces-content">
            <div class="face-item" v-for="(item, index) in faces" :key="index">
              <img :src="item.faceUrl" class="face" @click="selectFace(item)">
            </div>
          </div>
        </div>
      </div>
      <send-message-text ref="text"
                         v-if="isEditorMounted"
                         :value="value"
                         @input="getInput"
                         @editorInited="editorInited"
                         :setting="editorSetting">
      </send-message-text>
      <div class="submit-btn-wrapper">
        <div class="submit-btn" @click="sendText">
          <span v-if="!isSending">发送</span>
          <i class="el-icon-loading loading-icon" v-if="isSending"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import sendMessageText from './sendMessageText.vue'
  import {sendMessage, getFaces, uploadFile} from '../../api/index.js'
  export default {
    props: {
      roomId: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        value: '',
        content: '',
        editorSetting: {
          height: 50
        },
        isEditorMounted: true,
        isSending: false,//是否正在发送
        isFaceShow: false,//是否显示表情包
        faces: [],//表情包
        photoIndex: 0,//正在上传的图片的index值
        photoIndexs: [],//上传的图片的index值
      }
    },
    mounted () {
      // this.isEditorMounted = false
      this._getFaces()//获取表情包
    },
    methods: {
      //上传图片
      async sendPhoto () {
        let _this = this;
        let input = document.createElement('input');
        $(input).attr('type', 'file');
        $(input).on('change', function () {
          let filePath = $(this).val();
          let size = this.files[0].size;
          console.log(size);
          if(!(/(jpg|png|JPG|PNG|jpeg|JPEG)/.test(filePath))) {
            _this.$message({
              type:  'warning',
              showClose: true,
              message: '请上传jpg,png,jpeg格式的图片！'
            })
          } else {
            if (size > 10485760) {
              _this.$message({
                type: 'warning',
                showClose: true,
                message: '上传图片的大小不能超过10M'
              })
            } else {
              let fr = new FileReader()
              fr.readAsDataURL(input.files[0])
              fr.onload = function () {
                //上传图片同时将图片发送
                _this._uploadFile(this.result)
              }
            }
          }
        })
        input.click()
      },
      //上传图片
      async _uploadFile (file) {
        let self = this;
        let unSendPhotoIndex = this.photoIndex++;
        this.$emit('isSendPhoto', file, unSendPhotoIndex);//正在上传图片
        let result = await uploadFile(file);
        console.log(result);
        if (result.success) {
          console.log(result.data, this.roomId);
          let result1 = await sendMessage(result.data, this.roomId, 8, 31);
          console.log(result1);
          if (result1.success) {
            self.$emit('sendPhotoSuccess', result1.data, unSendPhotoIndex);//发送成功的时候，向父组件派发事件
          }
        }
      },
      //替换a标签
      handleATag (content) {
        let self = this;
        //替换www开头的网址
        let ret = /www\S*.com/g;
        if (ret.test(content)) {
          let list = content.match(ret);
          list.forEach((item, index) => {
            content = content.replace(item, `<a href="https://${item}" target="_blank">${item}</a>`)
          })
        }
        return content
      },
      //插入表情包
      selectFace (item) {
        let img = `<img style="width:25px;height:25px;display:inline-block;vertical-align:bottom" src="${item.faceUrl}">`;
        this.$refs.text.insertContent(img);
        this.isFaceShow = false;
      },
      //获取表情包
      async _getFaces () {
        let result = await getFaces();
        console.log(result);
        if (result.success) {
          this.faces = result.data
        }
      },
      //显示表情包
      showFace () {
        this.isFaceShow = !this.isFaceShow
      },
      //发送文本消息
      async sendText () {
        if (this.content.length === 0) {
          this.$message({
            type: 'warning',
            message: '发送消息不能为空',
            showClose: true
          });
          return
        }
        this.isSending = true;
        //提取网址a标签
        this.content = this.handleATag(this.content);
        console.log(this.roomId, this.content);
        let result =  await sendMessage(this.content, this.roomId, 3, 31)
        console.log(result);
        if (result.success) {
          this.$emit('sendSuccess', result.data);//发送成功的时候，向父组件派发事件
          this.$refs.text.clearContent();
          this.content = ''
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: '发送失败！'
          })
        }
        this.isSending = false
      },
      editorInited () {
        setTimeout(() => {
          this.isEditorMounted = true
        }, 100)
      },
      getInput (content) {
        this.content = content
      },
    },
    components: {
      sendMessageText
    }
  }
</script>

<style scoped>
  .loading-icon {
    color: #4893a8;
    font-size: 20px;
  }
  .submit-btn-wrapper {
    margin-top: 15px;
    height: 30px;
  }
  .submit-btn {
    padding: 1px 8px;
    color: #4893a8;
    border: 1px solid #4893a8;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.1s;
    float: right;
  }
  .send-message {
    padding-bottom: 15px;
  }
  .setting {
    padding: 6px 0;
    position: relative;
  }
  .faces-wrapper {
    position: absolute;
    z-index: 10;
    top: 29px;
    left: 30px;
    width: 300px;
  }
  .arrow-top {
    width: 100%;
    height: 15px;
    overflow: hidden;
  }
  .icon-top {
    position: relative;
    top: -15px;
    margin-left: 15px;
    display: inline-block;
    vertical-align: bottom;
    width: 0;
    height: 0;
    border-right: 15px solid transparent;
    border-left: 15px solid transparent;
    border-top: 15px solid transparent;
    border-bottom: 15px solid #515151;
  }
  .faces-content {
    width: 100%;
    background-color: #515151;
    position: relative;
    top: -6px;
    border-radius: 5px;
    padding: 15px 0px 15px 20px;
  }
  .face-item {
    display: inline-block;
    vertical-align: top;
    width: 25px;
    height: 25px;
    margin-right: 15px;
    border: 1px solid transparent;
    cursor: pointer;
  }
  .face-item:hover {
    border: 1px solid rgba(255,255,255,0.2);
  }
  .face {
    width: 100%;
    height: 100%;
  }
  .photo-icon {
    width: 25px;
    height: 25px;
    background-image: url('/static/ximages/photo-icon.png');
    background-size: 25px 25px;
    background-repeat: no-repeat;
    margin-right: 20px;
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
    position: relative;
    top: -2px;
  }
  .smile-icon {
    width: 25px;
    height: 25px;
    background-image: url('/static/ximages/smile.png');
    background-size: 21px;
    background-repeat: no-repeat;
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
  }
</style>
