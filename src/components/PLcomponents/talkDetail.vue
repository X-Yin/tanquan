<template>
    <div class="privateLetter-detail">
      <div class="back-icon" @click="back"><i class="el-icon-arrow-left"></i>返回</div>
      <div class="header">
        {{roomName}}
        <span class="online" v-if="isOnline">（在线）</span>
        <span class="offline" v-if="!isOnline">（离线）</span>
      </div>
      <div class="content">
        <div class="wrapper">
          <div class="content-wrapper">
            <div class="load-more" v-if="p < pagesNumber">
              <div class="load-more-text" @click="loadMore" v-show="!isLoading">获取更多历史消息</div>
              <div class="load-more-loading" v-show="isLoading">
                <i class="el-icon-loading"></i>
              </div>
            </div>
            <div class="item" v-for="(item, index) in talkHistory1" :key="index">
              <div class="other talk-c" v-if="item.senderName !== userName && item.messageType !== 8">
                <div class="talk-time" v-show="item.isShowTime">{{item.sendTime}}</div><br>
                <div class="talk-content-wrapper">
                  <div class="avatar-wrapper">
                    <img :src="item.senderProPhoto" class="avatar">
                    <!--<span class="name">{{item.senderName}}</span>-->
                  </div>
                  <div class="talk-wrapper">
                    <div class="talk-content"></div>
                  </div>
                </div>
              </div>
              <div class="other talk-c" v-if="item.senderName !== userName && item.messageType === 8">
                <div class="talk-time" v-show="item.isShowTime">{{item.sendTime}}</div>
                <div class="talk-content-wrapper">
                  <div class="avatar-wrapper">
                    <img v-lazy="item.senderProPhoto" class="avatar">
                    <!--<span class="name">{{item.senderName}}</span>-->
                  </div>
                  <div class="photo-wrapper">
                    <div class="photo-content">
                      <i class="talk-arrow-other el-icon-caret-left"></i>
                      <img :src="item.messageContent" class="photo" @click="openPhoto($event)">
                    </div>
                  </div>
                </div>
              </div>
              <div class="me talk-c" v-if="item.senderName === userName && item.messageType !== 8">
                <div class="talk-time" v-show="item.isShowTime">{{item.sendTime}}</div><br>
                <div class="talk-content-wrapper">
                  <div class="talk-wrapper">
                    <div class="talk-content">
                    </div>
                  </div>
                  <div class="avatar-wrapper">
                    <img v-lazy="item.senderProPhoto" class="avatar">
                    <!--<span class="name">{{item.senderName}}</span>-->
                  </div>
                </div>
              </div>
              <div class="me talk-c mePhoto" v-if="item.senderName === userName && item.messageType === 8">
                <div class="talk-time" v-show="item.isShowTime">{{item.sendTime}}</div><br>
                <div class="talk-content-wrapper">
                  <div class="photo-wrapper">
                    <div class="photo-content"
                         v-loading="!item.id && !talkHistory[index].isHaveSend"
                         element-loading-text="图片正在上传中"
                         element-loading-spinner="el-icon-loading"
                         element-loading-background="rgba(255,255,255, 0.8)"
                    >
                      <i class="talk-arrow-me el-icon-caret-right"></i>
                      <img :src="item.messageContent" class="photo" @click="openPhoto($event)">
                    </div>
                  </div>
                  <div class="avatar-wrapper">
                    <img v-lazy="item.senderProPhoto" class="avatar">
                    <!--<span class="name">{{item.senderName}}</span>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="send-message-wrapper">
          <send-message :roomId="roomId" @sendSuccess="sendSuccess" @sendPhotoSuccess="sendPhotoSuccess" @isSendPhoto="isSendPhoto"></send-message>
        </div>
      </div>
      <open-photo ref="openPhoto" :url="url"></open-photo>
    </div>
</template>

<script type="text/ecmascript-6">
  import {getPrivateLetterDetail, haveReadMessage} from '../../api/index.js'
  import {getStorage, getPosition} from '../../api/util.js'
  import {mapState, mapMutations} from 'vuex'
  import sendMessage from '../SMComponents/sendMessage.vue'
  import openPhoto from '../common/openPhoto.vue'
  import $ from 'jquery'
  const HEIGHT = 430;
  export default {
    data () {
      return {
        talkHistory: [],
        talkHistory1: [],
        isLoading: false,//是否正在加载历史消息
        name: '',
        textarea: '',
        p: 1,
        pagesNumber: 1,
        userName: '',//自己的姓名
        roomName: getStorage('privateLetterChatRoomName'),//房间名称
        roomId: getStorage('privateLetterDetailId'),//房间id
        isScrollToBottom: true,//是否要滚动条在数据改变的时候，自动滚动到底部
        isKeepScrollState: false,//是否要滚动条保持在当前的状态，用于获取历史消息的时候
        isSendingPhoto: false,//是否正在上传图片
        isOnline: false,//是否在线
        url: ''
      }
    },
    mounted () {
      this.userName = getStorage('user').userName;
      this.getTalkHistory();
      let self = this;
      console.log(self.roomId);
      this.$conn.listen({
        onTextMessage (message) {
          console.log(message);
          //收到消息拼接到talkHistory后面
          console.log(message.ext.roomId, self.roomId, message.ext.roomId === self.roomId)
          if (message.ext.roomId === self.roomId) {
            let obj = {
              sendTime: message.ext.sendTime,
              senderProPhoto: message.ext.propic,
              senderName: '',
              messageContent: message.ext.msg,
              messageType: message.ext.messageType
            };
            self.isScrollToBottom = true;//如果新收到了消息就让滚动到底部
            self.talkHistory.push(obj);
            console.log(self.talkHistory)
          }
        }
      })
    },
    created () {
      let time = '12-09 18:09:22';
      let second = ':' + time.split(':')[2];
      time = time.replace(second, '');
      console.log(time);
    },
    methods: {
      //处理时间显示的秒数隐藏
      hideTimeSecond (time) {
        let second = ':' + time.split(':')[2];
        time = time.replace(second, '');
        return time;
      },
      //提取一个时间的年份，月份，等具体的信息
      getTimeDetail (time) {
        let ret = /[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{2}:[0-9]{2}:[0-9]{2}/;
        if (ret.test(time)) {
          return {
            year: time.split('-')[0],
            month: time.split('-')[1],
            day: time.split('-')[2].split(' ')[0],
            hour: time.split(' ')[1].split(':')[0],
            minute: time.split(':')[1],
            second: time.split(':')[2]
          }
        }
      },
      //判断是不是在今年，这个月发的消息,然后对于时间的显示处理一下
      handleIsToday (time) {
        let ret = /[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{2}:[0-9]{2}:[0-9]{2}/;
        if (ret.test(time)) {
          let timeNow = this.getTimeDetail(this.getTime());
          let timeObj = this.getTimeDetail(time);
          if (timeNow.year === timeObj.year) {
            if (timeNow.month === timeObj.month) {
              if (timeNow.day === timeObj.day) {
                //如果是在今天发的消息，那么就不显示月份和天数，如果不是的话，就显示月份和天数
                time = time.replace(/[0-9]{4}-[0-9]{2}-[0-9]{2}\s/, '');
                return time;
              } else {//如果月份相等，但是天数相等，也返回带月份的时间
                time = time.replace(/[0-9]{4}-/, '');
                return time
              }
            } else {//如果月份不相等，返回带月份的时间
              time = time.replace(/[0-9]{4}-/, '');
              return time
            }
          } else {//如果年份不相等的话，那么将时间整个返回
            return time;
          }
        }
      },
      //处理时间显示问题，第一个参数是对象数组，第二个参数是时间在对象中的key值，第三个参数是要新添加的key值，第四个参数是时间的阈值，以分钟为单位
      handleTimeShow (array, name, newKey,threshold) {
        console.log(array);
        for (let i = 0; i < array.length; i++) {
          if (i === 0) {
            array[i][newKey] = true
          }
          if (i > 0) {
            let time1 = this.getTimeDetail(array[i-1][name]);
            let time2 = this.getTimeDetail(array[i][name]);
            if (time1.year === time2.year && time1.month === time2.month && time1.day === time2.day && time1.hour === time2.hour) {
              //如果在两个时间的年份，月份，天数，小时都相等的情况下，只判断分钟的差别，如果超过阈值，就将新添加的key值设置为true，即显示时间，否则相反
              if (parseInt(time2.minute) - parseInt(time1.minute) > threshold) {
                array[i][newKey] = true
              } else {
                array[i][newKey] = false
              }
            } else {
              array[i][newKey] = true
            }
          }
        }
        return array;
      },
      //打开图片的预览模式
      openPhoto (el) {
        this.url = $(el.path[0]).attr('src');
        this.$refs.openPhoto.show()
      },
      back () {
        this.$router.go(-1);
        //this._haveReadMessage();//将该聊天室的消息标记为已读
      },
      //返回前要标记为已读
      async _haveReadMessage () {
        let roomId = getStorage('privateLetterDetailId');
        let result = await haveReadMessage(roomId);
        console.log(result);
        if (result.success) {
          this.$router.go(-1);
        }
      },
      //正在上传图片
      isSendPhoto (file, unSendPhotoIndex) {
        let obj = {
          sendTime: this.getTime(),
          senderProPhoto: getStorage('user').userProPic,
          senderName: getStorage('user').userName,
          messageContent: file,
          messageType: 8,
          unSendPhotoIndex: unSendPhotoIndex,
          isHaveSend: false
        };
        this.talkHistory.push(obj);
        this.isScrollToBottom = true;//如果新发送了消息就让滚动到底部
        this.isKeepScrollState = false;//如果是获取历史消息就让滚动条保持在当前状态
        this.isSendingPhoto = true
      },
      //图片发送成功的时候，取消加载的显示
      sendPhotoSuccess (content, unSendPhotoIndex) {
        let index1 = 0;
        let list = this.talkHistory;
        list.forEach((item, index) => {
          if (item.unSendPhotoIndex === unSendPhotoIndex) {
            index1 = index
          }
        });
        this.talkHistory[index1].isHaveSend = true;
        console.log(this.talkHistory)
      },
      //发送成功的时候，将消息拼接到下面去
      sendSuccess (content) {
        let obj = {
          sendTime: this.getTime(),
          senderProPhoto: getStorage('user').userProPic,
          senderName: getStorage('user').userName,
          messageContent: content.messageContent,
          messageType: 3
        };
        this.talkHistory.push(obj);
        this.isScrollToBottom = true;//如果新发送了消息就让滚动到底部
        this.isKeepScrollState = false  //取消滚动条保持在当前消息位置
      },
      //将时间的一位数处理成为两位数
      handleTimeTwoLength  (time) {
        time = time + '';
        return '00'.substring(time.length) + time;
      },
      getTime () {
        let date = new Date();
        let year = date.getFullYear();
        let month = this.handleTimeTwoLength(date.getMonth() + 1);
        let day = this.handleTimeTwoLength(date.getDate());
        let hour = this.handleTimeTwoLength(date.getHours());
        let minute = this.handleTimeTwoLength(date.getMinutes());
        let second = this.handleTimeTwoLength(date.getSeconds());
        return `${year}-${month}-${day}` + ' ' + `${hour}:${minute}:${second}`
      },
      //获取更多历史消息
      loadMore () {
        this.isScrollToBottom = false;//获取历史消息的时候不让滚动到底部
        this.isKeepScrollState = true;//获取历史消息的时候让滚动条保持在当前的消息位置
        this.p++;
        this.getTalkHistory()
      },
      async getTalkHistory () {
        this.isLoading = true;
        let roomid = getStorage('privateLetterDetailId');
        console.log(roomid, this.p);
        let result = await getPrivateLetterDetail(roomid, this.p);
        console.log(result);
        this.isLoading = false;
        if (result.success) {
          this.pagesNumber = result.data.lastPage;
          this.isOnline = result.data.list[0].online;
          //为talkHistory赋值，新发的信息拼接在下面
          let list = result.data.list.slice();
          let list1 = this.talkHistory.reverse();
          list = list1.concat(list);
          this.talkHistory = list.reverse();
        }
      }
    },
    watch: {
      privateLetterDetailId () {
        this.getTalkHistory(this.privateLetterDetailId)
      },
      talkHistory () {
        this.talkHistory1 = [].concat(JSON.parse(JSON.stringify(this.talkHistory)));
        let wrapper = document.getElementsByClassName('wrapper')[0];
        //滚动条滚动到底部
        if (this.isScrollToBottom) {
          setTimeout(() => {
            let height = document.getElementsByClassName('content-wrapper')[0].offsetHeight;
            console.log(height);
            wrapper.scrollTop = height - HEIGHT + 20
          }, 100);
        }
        //如果是获取历史消息的话，那么让滚动条保持在当前的位置
        if (this.isKeepScrollState) {
          setTimeout(() => {
            let heights = 0;
            let items = document.getElementsByClassName('item');
            for (let i = 0; i < items.length; i++) {
              if (i < 5) {
                heights += items[i].offsetHeight;
              }
            }
            wrapper.scrollTop = heights;
          }, 100)
        }
        //将messageContent渲染到页面上
        setTimeout(() => {
          this.talkHistory.forEach((item,index) => {
            if (item.messageType === 3) {
              let html1 = '';
              if (item.senderName === getStorage('user').userName) {
                html1 = '<i class="el-icon-caret-right" style="position: absolute;display:inline-block;font-size:25px;color:#f7f7f7;right:-15px;top:12px;"></i>';
              } else {
                html1 = '<i class="el-icon-caret-left" style="position: absolute;display:inline-block;font-size:25px;color:#f7f7f7;left:-15px;top:12px;"></i>';
              }
              $(`.talk-c:eq(${index}) .talk-content`).html(html1 + item.messageContent)
            }
          })
        }, 20);
        //处理时间，如果时间是在3分钟以内的话，就不显示时间
        setTimeout(() => {
          let list = [].concat(JSON.parse(JSON.stringify(this.talkHistory)));
          //先处理是否显示时间
          list = this.handleTimeShow(list, 'sendTime', 'isShowTime', 1);
          //然后再处理时间的显示的具体的格式，即是否显示年份，月份日期等
          for (let i = 0; i < list.length; i++) {
            list[i].sendTime = this.handleIsToday(list[i].sendTime);
          }
          //隐藏秒数
          for (let i = 0; i < list.length; i++) {
            list[i].sendTime = this.hideTimeSecond(list[i].sendTime);
          }
          this.talkHistory1 = list;
        }, 20)
      }
    },
    components: {
      sendMessage,
      openPhoto
    }
  }
</script>

<style scoped>
  .talk-arrow-other {
    position: absolute!important;
    display: inline-block!important;
    font-size: 30px!important;
    color: #f7f7f7!important;
    top: 12px!important;
    left: -17px!important;
  }
  .talk-arrow-me {
    position: absolute!important;
    display: inline-block!important;
    font-size: 30px!important;
    color: #f7f7f7!important;
    top: 12px!important;
    right: -17px!important;
  }
  .online, .offline {
    display: inline-block;
    font-size: 15px;
    margin-left: 10px;
  }
  .online {
    color: green;
  }
  .offline {
  }
  .back-icon {
    color: #a5a5a5;
    font-size: 20px;
    cursor: pointer;
    margin: 20px 0 20px 40px;
    text-decoration: underline;
  }
  .back-icon:hover {
    color: #4893a8;
  }
  .send-message-wrapper {
    margin-top: 20px;
    padding: 0 26px;
    background-color: #f7f7f7;
  }
  .talk-time {
    margin-bottom: 15px;
  }
  .load-more {
    width: 100%;
    padding-top: 20px;
  }
  .load-more-text {
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #4893a8;
    cursor: pointer;
  }
  .load-more-loading {
    color: #4893a8;
    font-size: 24px;
    text-align: center;
  }
  .header {
    margin-top: 20px;
    width: 718px;
    height: 52px;
    background-color: #f7f7f7;
    text-align: center;
    line-height: 52px;
    color: #333;
    font-size: 22px;
    font-weight: 600;
  }
  .content {
    width: 718px;
    height: 650px;
    background-color: white;
    margin-top: 15px;
  }
  .wrapper {
    height:  430px;
    overflow: auto;
  }
  .content-wrapper {
    overflow: hidden;
    padding-bottom: 50px;
    box-sizing: border-box;
  }
  .wrapper::-webkit-scrollbar {
    width: 7px;
    background-color: transparent;
  }
  .wrapper::-webkit-scrollbar-button {
    display: none;
  }
  .wrapper::-webkit-scrollbar-track {
    display: none;
  }
  .wrapper::-webkit-scrollbar-track-piece {
    display: none;
  }
  .wrapper::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.2);
    border-radius: 5px;
  }
  .wrapper::-webkit-scrollbar-corner {
    display: none;
  }
  .item {
    padding-top: 40px;
  }
  .talk-content-wrapper {
    display: flex;
  }
  .avatar-wrapper {
    flex: 0 70px;
  }
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: relative;
  }
  .name {
    display: block;
    margin-top: 15px;
    font-size: 20px;
    color: #333;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .talk-wrapper, .photo-wrapper {
    flex: 1;
    margin-left: 30px;
  }
  .photo-content {
    max-width: 200px;
    padding: 15px 15px;
    background-color: #f7f7f7;
    margin-right: 40px;
    position: relative;
  }
  .me .photo-content {
    float: right;
  }
  .photo {
    width: 100%;
    cursor: pointer;
  }
  .talk-wrapper-inner {
    float: right;
  }
  .talk-content {
    display: inline-block;
    vertical-align: bottom;
    max-width: 380px;
    min-width: 70px;
    border-radius: 5px;
    background-color: #f7f7f7;
    color: #333;
    font-size: 16px;
    line-height: 25px;
    padding: 17px 17px;
    box-sizing: border-box;
    word-break: break-all;
    position: relative;
  }
  .me .talk-content {
    float: right;
    margin-right: 40px;
  }
  .talk-time {
    display: inline-block;
    vertical-align: bottom;
    color: #c7c7c7;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .divide-line {
    height: 20px;
    display: flex;
    align-items: center;
  }
  .line {
    flex: 1;
    display: inline-block;
    width: 100%;
    height: 1.5px;
    background-color: #c9c9c9;
  }
  .line-text {
    flex: 0 120px;
    padding: 0 5px;
    font-size: 15px;
    color: #c9c9c9;
    text-align: center;
    box-sizing: border-box;
  }
  .input-wrapper {
    height: 170px;
    width: 100%;
    background-color: #f7f7f7;
    margin-top: 20px;
    padding: 0 26px;
    box-sizing: border-box;
  }
  .setting {
    height: 40px;
  }
  .setting:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 40px;
  }
  .A-icon {
    display: inline-block;
    vertical-align: middle;
    width: 23px;
    height: 20px;
    background-image: url('/static/ximages/A-icon.png');
    background-size: 23px 20px;
    background-repeat:no-repeat;
  }
  .photo-icon {
    display: inline-block;
    vertical-align: middle;
    width: 30px;
    height: 20px;
    background-image: url('/static/ximages/photo-icon.png');
    background-size: 30px 20px;
    background-repeat: no-repeat;
    margin-left: 16px;
  }
  .submit-btn-wrapper {
    width: 100%;
    margin-top: 10px;
    position: relative;
  }
  .submit-btn {
    width: 45px;
    height: 20px;
    border-radius: 4px;
    border: 1.5px solid #4893a8;
    color: #4893a8;
    line-height: 20px;
    text-align: center;
    position: absolute;
    right: 0;
    cursor: pointer;
  }
</style>
