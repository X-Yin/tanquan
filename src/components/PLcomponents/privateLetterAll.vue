<template>
    <div class="privateLetter-all">
      <div class="set-btn">
        <div class="setAlreadyRead">全部设为已读</div>
        <div class="clearAll">清空所有私信</div>
      </div>
      <wait-task-wrapper  v-if="privateLetter.length === 0 && isNoCircleShow"></wait-task-wrapper>
      <no-task-text v-if="privateLetter.length === 0 && !isNoCircleShow " text="暂无私信"></no-task-text>
      <div class="wrapper">
        <div class="item" v-for="(item, index) in privateLetter" :key="index" >
          <div class="avatar-wrapper">
            <img :src="item.senderPropic" class="avatar">
          </div>
          <div class="description">
            <div class="des-title">
              <span @click="selectItem(item)" class="room-name">{{item.roomName}}</span>
              <span class="deleteDialog">[&nbsp;删除对话&nbsp;]</span>
            </div>
            <div class="des-time">{{item.lastSendTime}}</div>
            <div class="des-text">
              <span class="text"></span>
              <span class="messageCount" v-show="item.unReadNum !== 0">+{{item.unReadNum}}</span>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="loadingBtn-wrapper" v-show="loadingShow">-->
        <!--<loading-btn class="loadingBtn"></loading-btn>-->
      <!--</div>-->
    </div>
</template>

<script type="text/ecmascript-6">
  import noTaskText from '../Xcomponents/noTaskText.vue'
  import waitTaskWrapper from '../Xcomponents/waitTaskWrapper.vue'
  import {reqUserCircles, quitCircle, delCircle, getPrivateLetter} from '../../api/index.js'
  import {getPosition, deleteOne, getStorage, setStorage} from '../../api/util.js'
  import loadingBtn from '../Xcomponents/loadingBtn.vue'
  import {mapMutations, mapState} from 'vuex'
  import $ from 'jquery'
  export default {
    data () {
      return {
        privateLetter: [],
        path: '/privateletter/all',
        loadingShow: false,
        isLoadOnePage: true,
        isNoCircleShow: true,
        p: 1,
        pagesNumber: 2,
      }
    },
    computed: {
      ...mapState([
        'PLunReadNum'
      ])
    },
    created () {
      window.onscroll = null
    },
    mounted () {
      this._getPrivateLetter(this.p);
      let _this = this;
      //环信监听消息
      this.$conn.listen({
        onTextMessage(message) {
          console.log('privateLetterAll',message);
          let roomId = message.ext.roomId;
          //如果roomType为31的话，说明消息是私信
          if (message.ext.roomType === 31) {
            //如果来了一条新的私信，那么如果原来有这每一条私信的话，
            // 先删除，再放在第一个，如果没有的话，直接放在第一个
            let index = _this.privateLetter.findIndex((letter) => {
              return letter['roomId'] === roomId
            });
            if (index < 0) {
              //说明原来的私信列表里面没有这个房间
              let obj = {
                lastSendTime: _this.getTime(),
                lastestMsg: message.ext.msg,
                roomId: roomId,
                roomName: message.ext.roomName,
                roomType: 31,
                senderName: message.ext.roomName,
                senderPropic: message.ext.propic,
                unReadNum: 1
              };
              _this.privateLetter.unshift(obj);
            } else {
              //说明原来的私信列表里面有这个房间
              let unReadNum = _this.privateLetter[index].unReadNum;
              _this.privateLetter = deleteOne(_this.privateLetter[index], _this.privateLetter, 'roomId');
              let obj = {
                lastSendTime: _this.getTime(),
                lastestMsg: message.ext.msg,
                roomId: roomId,
                roomName: message.ext.roomName,
                roomType: 31,
                senderName: message.ext.roomName,
                senderPropic: message.ext.propic,
                unReadNum: unReadNum + 1
              };
              _this.privateLetter.unshift(obj);
              console.log(_this.privateLetter);
            }
            //设置红点
            let list = _this.PLunReadNum.slice();
            list.push(1)
            _this.getPLunReadNum(list);
          }
        }
      })
    },
    methods: {
      ...mapMutations([
        'getPLunReadNum'
      ]),
      //对于时间进行排序，时间大的放在上面
      timeSort (list) {
        let array = list.slice();
        array = array.sort((a, b) => {
          return new Date(b.lastSendTime).getTime() - new Date(a.lastSendTime).getTime()
        });
        return array
      },
      getTime () {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
      },
      selectItem (item) {
        setStorage('privateLetterDetailId', item.roomId);
        setStorage('privateLetterChatRoomName', item.roomName);
        this.$router.push(`/privateletter/${item.roomId}`)
      },
      async _getPrivateLetter (p) {
        let result = await getPrivateLetter(31);
        console.log(result);
        if (result.success) {
          this.privateLetter = result.data;
          this.privateLetter = this.timeSort(this.privateLetter);
          //查看所有的未读消息数，来设置PLunReadNum的值
          let dots = []
          this.privateLetter.forEach((item) => {
            for (let i = 0; i < item.unReadNum; i++) {
              dots.push(1)
            }
          })
          this.getPLunReadNum(dots);
        } else {
          this.isNoCircleShow = false;
          this.loadingShow = false;
        }
      },
    },
    watch: {
      '$route' (newPath, oldPath) {
        if (this.$route.path === this.path) {
          this.watchScroll()
        }
      },
      privateLetter () {
        if (this.privateLetter !== []) {
          //处理文本内容
          setTimeout(() => {
            this.privateLetter.forEach((item,index) => {
              let ret = /(jpg|png|jpeg)/g;
              let ret1 = /<p>/g;
              if (ret.test(item.lastestMsg) && !ret1.test(item.lastestMsg)) {
                $(`.des-text .text:eq(${index})`).html('[图片]')
              } else {
                $(`.des-text .text:eq(${index})`).html(item.lastestMsg)
              }
            })
          }, 20)
        }
      }
    },
    components: {
      loadingBtn,
      waitTaskWrapper,
      noTaskText
    }
  }
</script>

<style scoped>
  .room-name {
    cursor: pointer;
  }
  .room-name:hover {
    color: #4893a8;
  }
  .privateLetter-all {
    min-height: 100vh;
  }
  .set-btn {
    margin-top: 20px;
    padding-bottom: 30px;
  }
  .setAlreadyRead, .clearAll {
    color: #949494;
    height: 25px;
    line-height: 25px;
    padding: 0 10px;
    font-size: 16px;
    border: 1px solid #949494;
    display: inline-block;
    cursor: pointer;
    border-radius: 3px;
  }
  .clearAll {
    margin-left: 30px;
  }
  .item {
    margin-top: 35px;
    display: flex;
  }
  .item:last-child {
    margin-bottom: 50px;
  }
  .avatar-wrapper {
    flex: 0 85px;
    height: 85px;
  }
  .avatar {
    width: 85px;
    height: 85px;
    border-radius: 50%;
  }
  .description {
    flex: 1;
    margin-left: 40px;
  }
  .des-title {
    color: #595959;
    font-size: 18px;
    font-weight: 600;
    position: relative;
  }
  .deleteDialog {
    position: absolute;
    right: 0;
    top: 0;
    color: #4893a8;
    font-size: 16px;
    cursor: pointer;
  }
  .des-time {
    margin-top: 8px;
    color: #c6c6c6;
    font-size: 16px;
  }
  .des-text {
    margin-top: 10px;
    position: relative;
  }
  .text  {
    display: inline-block;
    width: 526px;
    color: #474747;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .messageCount {
    position: absolute;
    right: 0;
    top: 0;
    width: 42px;
    height: 23px;
    border-radius: 4px;
    background-color: #ec6941;
    text-align:  center;
    line-height: 23px;
    font-size: 14px;
    color: white;
    cursor: pointer;
  }
  .loadingBtn-wrapper {
    margin: 50px 0;
  }
</style>
