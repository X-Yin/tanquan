<template>
    <div class="friendList">
      <head-nav></head-nav>
      <div class="container">
        <div class="wrapper">
          <div class="title">
            <span class="color-block"></span>
            <span class="title-text">好友</span>
          </div>
          <div class="talk-wrapper">
            <div class="list">
              <div class="me">
                <div class="avatar-wrapper">
                  <img :src="self.avatar" class="avatar">
                </div>
                <div class="name">{{self.nickName}}</div>
                <i class="check-icon"></i>
              </div>
              <div class="input-wrapper">
                <input type="text" placeholder="搜索好友" v-model="friendName" class="search-input">
                <i class="el-icon-search search-icon"></i>
              </div>
              <div class="item-wrapper">
                <div class="item" v-for="(item, index) in friendList" :key="index" @click="selectItem(item)">
                  <div class="item-avatar-wrapper">
                    <img :src="item.avatar" class="item-avatar">
                  </div>
                  <div class="detail">
                    <div class="item-name">
                      <span class="item-name-text">{{item.nickName}}</span>
                      <i class="item-check-icon"></i>
                    </div>
                    <div class="motto">
                      {{item.motto}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="view-wrapper">
              <router-view :item="item"></router-view>
            </div>
          </div>
        </div>
      </div>
      <foot-bar></foot-bar>
    </div>
</template>

<script type="text/ecmascript-6">
  import headNav from '../Ccomponents/headNav.vue'
  import {mapState, mapActions, mapMutations} from 'vuex'
  import footBar from '../Ccomponents/footBar.vue'
  export default {
    data () {
      return {
        friendName: '',
        item: {}
      }
    },
    computed: {
      ...mapState([
        'friendList',
        'self',
        'talkFriend'
      ])
    },
    created () {
      this.getFriendList()
      this.getSelf()
    },
    methods: {
      ...mapActions([
        'getFriendList',
        'getSelf'
      ]),
      ...mapMutations([
        'getTalkFriend'
      ]),
      selectItem (item) {
        this.getTalkFriend(item)
        this.$router.push(`/friend/${item.friendId}`)
      }
    },
    watch: {
    },
    components: {
      headNav,
      footBar
    }
  }
</script>

<style scoped>
  .wrapper {
    min-height: 100vh;
    padding-top: 50px;
    padding-bottom: 80px;
  }
  .title {
    height: 30px;
    margin-bottom: 25px;
  }
  .title:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 30px;
  }
  .color-block {
    display: inline-block;
    vertical-align: middle;
    width: 15px;
    height: 25px;
    background-color: #4993a8;
  }
  .title-text {
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    color: #222;
    margin-left: 20px;
  }
  .talk-wrapper {
    display: flex;
  }
  .list {
    flex: 0 310px;
    width: 310px;
    background-color: #5a5a5a;
  }
  .me {
    height: 90px;
    background-color: #474747;
  }
  .me:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 90px;
  }
  .avatar-wrapper {
    display: inline-block;
    vertical-align: middle;
    margin-left: 20px;
    width: 50px;
    height: 50px;
    font-size: 0;
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: relative;
  }
  .name {
    display: inline-block;
    vertical-align: middle;
    color: white;
    margin-left: 10px;
  }
  .check-icon {
    display: inline-block;
    vertical-align: middle;
    width: 21px;
    height: 21px;
    background-image: url('/static/ximages/check.png');
    background-size: 21px;
    background-repeat: no-repeat;
    margin-left: 10px;
  }
  .input-wrapper {
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
    margin-top: 20px;
    padding-bottom: 20px;
  }
  .input-wrapper:before {
    content: '';
    display: inline-block;
    vertical-align:  middle;
    height: 30px;
  }
  .search-input {
    display: inline-block;
    vertical-align: middle;
    width: 242px;
    height: 22px;
    border: 0;
    background-color: #f7f7f7;
    color: #b4b4b4;
  }
  .search-icon {
    display: inline-block;
    vertical-align: middle;
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #bfbfbf;
    margin-left: 1px;
    cursor: pointer;
  }
  .item-wrapper {
    height: 540px;
    -ms-overflow-style: none;
    overflow: auto;
  }
  .item-wrapper::-webkit-scrollbar {
    width: 7px;
    background-color: transparent;
  }
  .item-wrapper::-webkit-scrollbar-button {
    display: none;
  }
  .item-wrapper::-webkit-scrollbar-track {
    display: none;
  }
  .item-wrapper::-webkit-scrollbar-track-piece {
    display: none;
  }
  .item-wrapper::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.2);
    border-radius: 5px;
  }
  .item-wrapper::-webkit-scrollbar-corner {
    display: none;
  }
  .item {
    display: flex;
    cursor: pointer;
    padding: 10px 0;
  }
  .item:hover {
    background-color: #474747;
  }
  .item-avatar-wrapper {
    flex: 0 50px;
    margin-left: 20px;
    width: 50px;
    height: 50px;
  }
  .item-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .detail {
    flex: 1;
    margin-left: 15px;
    height: 50px;
  }
  .item-name {
    height: 30px;
  }
  .item-name:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 30px;
  }
  .item-name-text {
    display: inline-block;
    vertical-align: middle;
    font-size: 15px;
    color: #f4f4f4;
  }
  .item-check-icon {
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    width: 15px;
    height: 15px;
    background-image: url('/static/ximages/check.png');
    background-size: 15px;
    background-repeat: no-repeat;
  }
  .motto {
    height: 20px;
    line-height: 20px;
    font-size: 13px;
    color: #6e6e6e;
    width: 205px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .item:first-child {
    margin-top: 0;
  }
  .item:last-child {
    padding-bottom: 20px;
  }
  .view-wrapper {
    flex: 1;
    margin-left: 40px;
  }
</style>
