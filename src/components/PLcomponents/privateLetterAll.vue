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
            <img v-lazy="item.senderPropic" class="avatar">
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
      <div class="loadingBtn-wrapper" v-show="loadingShow">
        <loading-btn class="loadingBtn"></loading-btn>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import noTaskText from '../Xcomponents/noTaskText.vue'
  import waitTaskWrapper from '../Xcomponents/waitTaskWrapper.vue'
  import {reqUserCircles, quitCircle, delCircle, getPrivateLetter} from '../../api/index.js'
  import {getPosition, deleteOne, getStorage, setStorage} from '../../api/util.js'
  import loadingBtn from '../Xcomponents/loadingBtn.vue'
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
    created () {
      window.onscroll = null
    },
    mounted () {
      this._getPrivateLetter(this.p)
    },
    methods: {
      selectItem (item) {
        setStorage('privateLetterDetailId', item.roomId);
        setStorage('privateLetterChatRoomName', item.roomName);
        this.$router.push(`/privateletter/${item.roomId}`)
      },
      loadMore (p, cb) {
        setTimeout(() => {
          cb(p)
          if (p === this.pagesNumber) {
            this.loadingShow = false
          }
        }, 500)
      },
      watchScroll () {
        //为了防止发生this漂移
        let self = this
        window.onscroll = function () {
          //获取滚动条的y值
          let y = window.scrollY
          //获取浏览器的视口高度
          let clientHeight = window.innerHeight
          //获取加载按钮在页面上的位置
          if (self.loadingShow) {
            let btn = getPosition(document.getElementsByClassName('loadingBtn')[0])
            let top = btn.top
            if (y + clientHeight >= top) {
              if (self.isLoadOnePage) {
                self.isLoadOnePage = false
                if (self.pagesNumber > self.p) {
                  self.p++
                  //请求下一页的数据
                  self.loadMore(self.p, self._getPrivateLetter)
                }
              }
            }
          }
        }
      },
      async _getPrivateLetter (p) {
        let result = await getPrivateLetter(p, 31);
        console.log(result);
        if (result.success) {
          let tasks = this.privateLetter.slice()
          if (result.data.list.length === 0) {
            this.isNoCircleShow = false
            this.loadingShow = false
          } else {
            tasks = tasks.concat(result.data.list)
            this.privateLetter = tasks
            this.pagesNumber = result.data.lastPage
            this.isLoadOnePage = true
          }
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
          setTimeout(() => {
            if (this.p !== this.pagesNumber) {
              this.loadingShow = true
            }
          }, 20)
          this.watchScroll()
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
