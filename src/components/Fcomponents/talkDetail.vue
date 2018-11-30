<template>
    <div class="talk-detail">
      <div class="header">
        <div class="friend">
          <span class="friendName">{{talkFriend.nickName}}</span>
          <span class="check"></span>
        </div>
      </div>
      <div class="talk-modal">
        <div class="talk" ref="talk">
          <div ref="wrapper" class="wrapper">
            <div class="item" v-for="(item, index) in talkHistory" :key="index">
              <div class="other" v-show="item.identity === 'other'">
                <div class="time">{{item.time}}</div>
                <div class="detail-wrapper">
                  <div class="avatar-wrapper">
                    <img :src="talkFriend.avatar" class="avatar">
                    <div class="item-name">{{talkFriend.nickName}}</div>
                  </div>
                  <div class="content-modal">
                    <div class="content-modal">
                      <div class="arrow-other"></div>
                      <div class="content">{{item.talk}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="me" v-show="item.identity === 'me'">
                <div class="time">{{item.time}}</div>
                <div class="detail-wrapper">
                  <div class="content-modal">
                    <div class="content">{{item.talk}}</div>
                    <div class="arrow-me"></div>
                  </div>
                  <div class="avatar-wrapper">
                    <img :src="self.avatar" class="avatar">
                    <div class="item-name">{{self.nickName}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="input">
          <div class="setting">
            <i class="text-icon"></i>
            <i class="photo-icon"></i>
          </div>
          <el-input type="textarea" :rows="4" v-model="textarea" ref="input"></el-input>
          <div class="submit-btn" @click="submit">
            <span class="submit">发送</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import {reqTalkHistory} from '../../api/index.js'
  const HEIGHT = 435
  export default {
    data () {
      return {
        textarea: ''
      }
    },
    mounted () {
      this.getTalkHistory1()
    },
    computed: {
      ...mapState([
        'talkFriend',
        'self',
        'talkHistory'
      ])
    },
    methods: {
      ...mapMutations([
        'getTalkHistory'
      ]),
      async getTalkHistory1 () {
        let result = await reqTalkHistory(this.talkFriend.friendId)
        if (result.code === 0) {
          this.getTalkHistory(result.talkHistory)
        }
      },
      handleTime (str) {
        str = str + ''
        let string = '00'
        return string.substring(0, string.length - str.length) + str
      },
      submit () {
        let history = this.talkHistory.slice()
        let time = new Date ()
        let month = this.handleTime(time.getMonth() + 1)
        let day = this.handleTime(time.getDay())
        let hour = this.handleTime(time.getHours())
        let minute = this.handleTime(time.getMinutes())
        time = month + '-' + day + ' ' + hour + ':' + minute
        let talk = {
          "talk": this.textarea,
          "identity": "me",
          "time": time
        }
        history.push(talk)
        this.getTalkHistory(history)
        this.textarea = ''//清空输入框的内容
        this.$refs.input.focus()
      }
    },
    watch: {
      //聊天记录出现新消息的时候，滚动条自动滚动到底部
      talkHistory () {
        if (this.talkHistory !== []) {
          setTimeout(() => {
            let height = this.$refs.wrapper.offsetHeight
            this.$refs.talk.scrollTop = height - HEIGHT
          }, 20)
        }
      },
      //在更换不同的对话好友的时候，重新获取对应的聊天记录
      talkFriend() {
        this.getTalkHistory1()
      }
    }
  }
</script>

<style scoped>
  .header {
    width: 700px;
    height: 50px;
    background-color: #f1f1f1;
  }
  .friend {
    font-size: 20px;
    color: #333;
    text-align: center;
    height: 50px;
  }
  .friend:before {
    content:  '';
    display: inline-block;
    vertical-align: middle;
    height: 50px;
  }
  .friendName {
    display: inline-block;
    vertical-align: middle;
  }
  .check {
    display: inline-block;
    vertical-align: middle;
    width: 21px;
    height: 21px;
    background-image: url('/static/ximages/check.png');
    background-size: 21px;
    background-repeat: no-repeat;
    margin-left: 10px;
  }
  .talk-modal {
    width: 700px;
    height: 640px;
    background-color: #f1f1f1;
    margin-top: 10px;
    box-sizing: border-box;

  }
  .talk {
    height: 435px;
    overflow: auto;
    border-bottom: 1.5px solid #c2c2c2;
  }
  .talk::-webkit-scrollbar {
    width: 7px;
    background-color: transparent;
  }
  .talk::-webkit-scrollbar-button {
    display: none;
  }
  .talk::-webkit-scrollbar-track {
    display: none;
  }
  .talk::-webkit-scrollbar-track-piece {
    display: none;
  }
  .talk::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.2);
    border-radius: 5px;
  }
  .talk::-webkit-scrollbar-corner {
    display: none;
  }
  .wrapper {
    padding-bottom: 50px;
    overflow:  hidden;
  }
  .item {
    margin-top: 30px;
  }
  .time {
    text-align: center;
    color: #848484;
    font-size: 16px;
  }
  .detail-wrapper {
    margin-top: 22px;
    display: flex;
  }
  .avatar-wrapper {
    flex: 0 67px;
    margin-left: 20px;
  }
  .me .avatar-wrapper {
    margin-right: 20px;
  }
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .me .avatar {
    float: right
  }
  .item-name {
    font-size: 16px;
    color: #333;
    width: 67px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .me .item-name {
    text-align: right;
    clear: both;
    margin-top: 2px;
  }
  .content-modal {
    flex: 1;
    font-size: 0;
  }
  .arrow-other {
    width: 0;
    height: 0;
    border-width: 5px;
    border-color: white white transparent transparent;
    border-style: solid;
    display: inline-block;
    vertical-align: top;
  }
  .arrow-me {
    width: 0;
    height: 0;
    border-width: 5px;
    border-color: white transparent transparent white;
    border-style: solid;
    display: inline-block;
    vertical-align: top;
  }
  .content {
    width: 270px;
    background-color: white;
    display: inline-block;
    vertical-align: top;
    font-size: 15px;
    color: #636363;
    line-height: 25px;
    border-radius:0 9px 9px 9px ;
    padding: 15px 18px 25px 18px;
    box-sizing: border-box;
  }
  .me .detail-wrapper {
    padding-left: 297px;
    box-sizing: border-box;
  }
  .me .content {
    border-radius: 9px 0 9px 9px;
  }
  .input {
    padding: 15px 20px 0 20px;
  }
  .setting {
    padding-bottom: 10px;
  }
  .text-icon {
    display: inline-block;
    width: 24px;
    height: 20px;
    background-image: url('/static/ximages/A-icon.png');
    background-size: 24px 20px;
    background-repeat: no-repeat;
    margin-right: 10px;
  }
  .photo-icon {
    display: inline-block;
    width: 32px;
    height: 20px;
    background-image: url('/static/ximages/photo-icon.png');
    background-size: 32px 20px;
    background-repeat: no-repeat;
  }
  .submit-btn {
    width: 45px;
    height: 20px;
    border: 1.5px solid #4993a8;
    float: right;
    margin-right: 20px;
    margin-top: 10px;
    cursor: pointer;
    border-radius: 2px;
  }
  .submit {
    display: inline-block;
    width: 42px;
    height: 18px;
    color: #4993a8;
    margin: 1px 1.5px;
    text-align: center;
    line-height: 18px;
    border-radius: 2px;
  }
  .submit:hover {
    color: white;
    background-color: #4993a8;
  }
</style>
