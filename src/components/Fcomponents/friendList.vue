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
                  <img :src="userPhoto" class="avatar">
                </div>
                <div class="name">{{userName}}</div>
                <i class="check-icon"></i>
              </div>
              <div class="tab-wrapper">
                <div class="tab-item" @click="toggle(0)">
                  <div class="tab-icon-wrapper" :class="{'current': isMessage}">
                    <i class="tab-item-icon message-icon"></i>
                  </div>
                </div>
                <div class="tab-item" @click="toggle(1)">
                  <div class="tab-icon-wrapper" :class="{'current': isConcat}">
                    <i class="tab-item-icon concat-icon"></i>
                  </div>
                </div>
                <div class="tab-item" @click="toggle(2)">
                  <div class="tab-icon-wrapper" :class="{'current': isGroup}">
                    <i class="tab-item-icon group-icon"></i>
                  </div>
                </div>
              </div>
              <div class="message-wrapper" v-if="isMessage">
                <div class="item-wrapper">
                  <div class="message-item" v-for="(item, index) in 5" :key="index" @click="selectItem(item)">
                    <div class="message-avatar-wrapper">
                      <img src="/static/ximages/妹纸1.png" class="message-avatar">
                    </div>
                    <div class="message-detail">
                      <div class="room-name">不会飞的鱼</div>
                      <div class="room-lastest-message">今天心情好，老板涨工资，aaaaaaaaaaa</div>
                    </div>
                    <div class="message-setting">
                      <i class="delete-message-icon el-icon-close"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="concat-wrapper" v-if="isConcat">
                <div class="input-wrapper">
                  <input type="text" placeholder="搜索好友" v-model="friendName" class="search-input">
                  <i class="el-icon-search search-icon"></i>
                </div>
                <div class="item-wrapper" style="height: 470px;" v-show="friendName === ''">
                  <div class="top-settings">
                    <div class="create-group-btn-wrapper">
                      <div class="create-group-btn" @click="showCreateConcatGroup">
                        <i class="create-add-btn el-icon-plus"></i>
                        <span class="create-group-btn-text">创建分组</span>
                      </div>
                    </div>
                  </div>
                  <div class="dropdown-item-wrapper" v-for="(item, index) in dropdownList" :key="index">
                    <div class="dropdown-item">
                      <div class="dropdown-name">{{item.name}}</div>
                      <div class="dropdown-icon-wrapper">
                        <i class="dropdown-icon" @click="toggleCollapse(index)" :class="{'collapse': !dropdownFlags[index]}"></i>
                      </div>
                    </div>
                    <div class="height-wrapper" :class="{'collapse': !dropdownFlags[index]}">
                      <div class="height-item" v-for="(item1, index1) in 5" :key="index1">
                        <div class="height-item-wrapper">
                          <div class="height-avatar-wrapper">
                            <img src="/static/ximages/妹纸.jpg" class="height-avatar">
                          </div>
                          <div class="height-des">
                            <div class="height-name">不会飞的鱼</div>
                            <div class="height-signature">今天心情好，涨工资啦！aaaaaa</div>
                          </div>
                          <div class="height-setting">
                            <i class="setting-icon-wrapper el-icon-setting" @click="showConcatSettings(index, index1)" v-if="index !== 0"></i>
                            <div class="setting-dropdown" v-show="concatShowSettings[index][index1]">
                              <div class="setting-dropdown-list">
                                <div class="setting-dropdown-item">删除好友</div>
                                <div class="setting-dropdown-item" @click="showUpdateConcatGroup(item)">修改分组</div>
                                <div class="setting-dropdown-item" @click="showUpdateFriendRemark">修改备注</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="friend-invitation" v-if="index === 0">
                          <div class="invitation-btn confirm" v-if="true">同意</div>
                          <div class="invitation-btn have-confirm" v-if="false">已同意</div>
                          <div class="invitation-btn refuse" v-if="true">拒绝</div>
                          <div class="invitation-btn have-refuse" v-if="false">已拒绝</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item-wrapper search-friend-wrapper" v-if="friendName !== ''">
                  <div class="no-friend" v-if="friendSearchResult.length === 0">
                    搜索不到该好友
                  </div>
                  <div class="friend-search-result" v-if="friendSearchResult.length !== 0">
                    <div class="friend-result-list" v-for="(item, index) in friendSearchResult" :key="index">
                      <div class="friend-search-avatar-wrapper">
                        <img src="/static/ximages/妹纸1.png" class="friend-search-avatar">
                      </div>
                      <div class="friend-search-detail">
                        <div class="friend-search-name">不会飞的鱼</div>
                        <div class="friend-search-signature">今天心情好，老板涨工资了，aaaaaaaaa</div>
                      </div>
                      <div class="friend-search-setting" style="position: relative;">
                        <i class="setting-icon-wrapper el-icon-setting" @click="showConcatSearchSettings(index)"></i>
                        <div class="setting-dropdown" v-show="concatShowSearchSettings[index]">
                          <div class="setting-dropdown-list">
                            <div class="setting-dropdown-item">删除好友</div>
                            <div class="setting-dropdown-item" @click="showUpdateConcatGroup(item)">修改分组</div>
                            <div class="setting-dropdown-item">修改备注</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="group-wrapper" v-if="isGroup">
                <div class="input-wrapper">
                  <input type="text" placeholder="搜索群聊" v-model="groupName" class="search-input">
                  <i class="el-icon-search search-icon"></i>
                </div>
                <div class="item-wrapper " style="height: 470px;" v-if="groupName === ''">
                  <div class="top-settings">
                    <div class="create-group-btn-wrapper">
                      <div class="create-group-btn" @click="closeCreateGroup">
                        <i class="create-add-btn el-icon-plus"></i>
                        <span class="create-group-btn-text">创建群聊</span>
                      </div>
                    </div>
                  </div>
                  <div class="group-list" v-for="(item, index) in 5">
                    <div class="group-avatar-wrapper">
                      <img src="/static/ximages/妹纸1.png" class="group-avatar">
                    </div>
                    <div class="group-detail">
                      <div class="group-room-name">不会飞的鱼群聊</div>
                      <div class="group-lastest-message">小明：今天心情好，老板涨工资。aaaaaaa</div>
                    </div>
                    <div class="group-setting" style="position: relative;">
                      <i class="group-delete el-icon-setting" @click="showGroupSettings(index)"></i>
                      <div class="setting-dropdown" v-show="groupShowSettings[index]">
                        <div class="setting-dropdown-list">
                          <div class="setting-dropdown-item">删除群聊</div>
                          <div class="setting-dropdown-item">修改群名片</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item-wrapper search-group-wrapper" style="height: 470px;" v-if="groupName !== ''">
                  <div class="no-friend" v-if="groupSearchResult.length === 0">
                    搜索不到该群聊
                  </div>
                  <div class="group-search-result" v-if="groupSearchResult.length !== 0">
                    <div class="group-search-list" v-for="(item, index) in groupSearchResult" :key="index">
                      <div class="group-search-avatar-wrapper">
                        <img src="/static/ximages/妹纸.jpg" class="group-search-avatar">
                      </div>
                      <div class="group-search-detail">
                        <div class="group-search-room-name">不会飞的鱼群聊1</div>
                        <div class="group-search-lastest-message">小明：今天心情好，老板发工资。aaaaaaaa</div>
                      </div>
                      <div class="group-search-setting" style="position: relative;">
                        <i class="group-search-setting-icon el-icon-setting" @click="showGroupSearchSettings(index)"></i>
                        <div class="setting-dropdown" v-show="groupShowSearchSettings[index]">
                          <div class="setting-dropdown-list">
                            <div class="setting-dropdown-item">删除群聊</div>
                            <div class="setting-dropdown-item">修改群名片</div>
                          </div>
                        </div>
                      </div>
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
      <!--修改分组和同意好友申请的时候的弹窗-->
      <div class="update-concat-group-wrapper" v-if="isShowUpdateConcatGroup">
        <div class="update-concat-group-content">
          <div class="update-concat-group-title">请选择分组</div>
          <i class="el-icon-close update-concat-group-close" @click="closeUpdateConcatGroup"></i>
          <div class="options-wrapper">
            <el-select v-model="concatGroupValue" :placeholder="concatGroupValue">
              <el-option v-for="item in concatGroupOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="create-group-btn-1">
            <i class="el-icon-plus create-group-add-btn-1"></i>
            <span class="create-group-text-1" @click="showCreateConcatGroup">创建分组</span>
          </div>
          <div class="update-confirm">确定</div>
          <div class="update-cancel" @click="closeUpdateConcatGroup">取消</div>
        </div>
      </div>
      <!--重新创建分组的时候的弹窗-->
      <div class="create-concat-group-wrapper" v-if="isShowCreateConcatGroup">
        <div class="create-concat-group-content">
          <div class="create-concat-group-title">请输入新建分组的名称</div>
          <i class="el-icon-close create-concat-group-close" @click="closeCreateConcatGroup"></i>
          <div class="create-concat-group-input-wrapper">
            <el-input v-model="createConcatGroupValue" placeholder="请输入内容"></el-input>
          </div>
          <div class="update-confirm">确定</div>
          <div class="update-cancel" @click="closeCreateConcatGroup">取消</div>
        </div>
      </div>
      <!--修改好友备注的时候的弹窗-->
      <div class="update-friend-remark-wrapper" v-if="isShowUpdateFriendRemarks">
        <div class="update-friend-remark-content">
          <div class="update-friend-remark-title">请输入好友备注</div>
          <i class="el-icon-close update-friend-remark-close" @click="closeUpdateFriendRemark"></i>
          <div class="update-friend-remark-input-wrapper">
            <el-input v-model="updateFriendRemark" placeholder="请输入"></el-input>
          </div>
          <div class="update-confirm">确定</div>
          <div class="update-cancel" @click="closeUpdateFriendRemark">取消</div>
        </div>
      </div>
      <!--创建群聊的弹窗-->
      <div class="create-group" v-if="isShowCreateGroup">
        <div class="create-group-content">
          <div class="create-group-title">创建群聊</div>
          <i class="el-icon-close create-group-close" @click="closeCreateGroup"></i>
          <div class="create-group-input-wrapper">
            <el-input v-model="createGroupName" placeholder="请输入名称"></el-input>
          </div>
          <div class="update-confirm" @click="addMember">确定</div>
          <div class="update-cancel" @click="closeCreateGroup">取消</div>
          <div class="add-member-btn" @click="toggleAddMember">
            <i class="el-icon-plus"></i>
            <span>添加成员</span>
          </div>
          <!--在创建群聊的过程中，添加好友，显示好友列表的窗口-->
          <transition name="slide">
            <div class="add-member-friend-list-wrapper" v-if="isShowAddMember">
              <div class="add-member-friend-list">
                <div class="add-member-item" v-for="(item, index) in 10" :key="index">
                  <div class="add-member-item-avatar-wrapper">
                    <img src="/static/ximages/妹纸.jpg" class="add-member-item-avatar">
                  </div>
                  <div class="add-member-item-name">不会飞的鱼</div>
                  <div class="add-member-select" @click="toggleSelectMember(index)">
                    <transition name="fade">
                      <i class="add-member-select-no" v-show="!addMemberFlags[index]"></i>
                    </transition>
                    <transition name="fade">
                      <i class="add-member-select-ok el-icon-success" v-show="addMemberFlags[index]"></i>
                    </transition>
                  </div>
                </div>
              </div>
              <div class="add-member-right-arrow">
                <i class="el-icon-caret-right"></i>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <foot-bar></foot-bar>
    </div>
</template>

<script type="text/ecmascript-6">
  import headNav from '../Ccomponents/headNav.vue'
  import {mapState, mapActions, mapMutations} from 'vuex'
  import footBar from '../Ccomponents/footBar.vue'
  import {getStorage, setStorage} from '../../api/util.js'
  export default {
    data () {
      return {
        friendName: '',//搜索的好友名称
        groupName: '',//搜索的群聊的名称
        item: {},
        userPhoto: '',//用户的头像
        userName: '',//用户的名称
        isMessage: true,//显示消息列表
        isConcat: false,//显示联系人列表
        isGroup: false,//显示群组列表
        dropdownList: [
          {
            name: '新朋友'
          },
          {
            name: '亲人'
          },
          {
            name: '朋友'
          },
          {
            name: '同学'
          },
        ],
        dropdownFlags: [true, true, true, true],//用来判断下拉菜单的
        friendSearchResult: [1,1,1,1,1],//搜索到的好友的结果数组
        groupSearchResult: [1,1,1,1,1],//搜索到的群聊的结果数组
        concatShowSettings: [],//用来显示联系人下面的除了新朋友之外的其他分组的好友设置
        concatShowSearchSettings: [],//用来显示联系人下面的搜索的好友设置
        groupShowSettings: [],//用来显示群组下面的群聊设置
        groupShowSearchSettings: [],//用来显示群聊下面的搜索群聊的设置
        concatGroupOptions: [
          {
            value: '亲人',
            label: '亲人'
          },
          {
            value: '朋友',
            label: '朋友'
          },
          {
            value: '同学',
            label: '同学'
          },
        ],//用来显示所有的分组
        concatGroupValue: '',//用来显示当前选择的分组
        isShowUpdateConcatGroup: false,//用来显示是否要显示修改分组的界面
        isShowCreateConcatGroup: false,//用来显示是否要创建分组的界面
        createConcatGroupValue: '',//新创建的分组的名称
        isShowUpdateFriendRemarks: false,//用来显示是否要显示修改好友备注的界面
        updateFriendRemark: '',//输入的好友的备注的名称
        isShowCreateGroup: false,//是否显示创建群聊的弹窗
        createGroupName: '',//创建群聊的时候用户输入的名称
        isShowAddMember: false,//是否显示添加好友的好友列表的弹窗
        addMemberFlags: [false, false, false,false, false, false,false, false, false,false]
      }
    },
    computed: {
      ...mapState([
        'friendList',
        'self',
        'talkFriend'
      ])
    },
    mounted () {
      let user = getStorage('user');
      this.userPhoto = user.userProPic;
      this.userName = user.userName;
    },
    created () {
      //设置联系人下面的好友设置
      for (let i = 0; i < 4; i++) {
        this.concatShowSettings.push([]);
      }
      for (let i = 0; i < 4; i++) {
        if (i === 0) {
        } else {
          for (let j = 0; j < 5; j++) {
            this.concatShowSettings[i].push(false)
          }
        }
      }
      //设置搜索联系人下面的好友设置
      for (let i = 0; i < 5; i++) {
        this.concatShowSearchSettings.push(false);
      }
      //设置群聊下面的设置
      for (let i = 0; i < 5; i++) {
        this.groupShowSettings.push(false);
      }
      //设置群聊下面的搜索的设置
      for (let i = 0; i < 5; i++) {
        this.groupShowSearchSettings.push(false);
      }
    },
    methods: {
      //提交添加好友
      addMember () {
        if (this.createGroupName === '') {
          this.$message({
            type: 'warning',
            showClose: true,
            message: '群聊的名称不能为空'
          })
        } else {
          let flag = false;
          this.addMemberFlags.forEach((item) => {
            if (item) {
              flag = item
            }
          });
          if (!flag) {
            this.$message({
              type: 'warning',
              showClose: true,
              message: '至少添加一个好友'
            })
          } else {}
        }
      },
      //在创建群聊的界面添加好友是否选择了该好友
      toggleSelectMember (index) {
        let list = this.addMemberFlags.slice();
        list[index] = !list[index];
        this.addMemberFlags = list;
      },
      //是否显示添加好友的好友列表的弹窗
      toggleAddMember () {
        this.isShowAddMember = !this.isShowAddMember;
      },
      //显示创建群聊的弹窗
      closeCreateGroup () {
        this.isShowCreateGroup = !this.isShowCreateGroup
      },
      //隐藏修改好友备注的函数
      closeUpdateFriendRemark () {
        this.isShowUpdateFriendRemarks = false;
      },
      //显示修改好友备注的函数
      showUpdateFriendRemark () {
        this.isShowUpdateFriendRemarks = !this.isShowUpdateFriendRemarks;
      },
      //隐藏创建分组显示的函数
      closeCreateConcatGroup () {
        this.isShowCreateConcatGroup = false;
      },
      //显示创建分组的函数
      showCreateConcatGroup () {
        this.isShowCreateConcatGroup = !this.isShowCreateConcatGroup
      },
      //隐藏修改分组显示的函数
      closeUpdateConcatGroup () {
        this.isShowUpdateConcatGroup = false;
      },
      //显示修改分组的函数
      showUpdateConcatGroup (item) {
        //参数的item用来设置concatGroupValue的值
        this.concatGroupValue = item.name;
        this.isShowUpdateConcatGroup = !this.isShowUpdateConcatGroup;
      },
      //显示群聊下面的搜索的设置
      showGroupSearchSettings  (index) {
        let list = this.groupShowSearchSettings.slice();
        list[index] = !list[index];
        this.groupShowSearchSettings = list;
      },
      //显示群聊设置
      showGroupSettings (index) {
        let list = this.groupShowSettings.slice();
        list[index] = !list[index];
        this.groupShowSettings = list;
      },
      //显示搜索的好友的设置
      showConcatSearchSettings (index) {
        let list = this.concatShowSearchSettings.slice();
        list[index] = !list[index];
        this.concatShowSearchSettings = list;
      },
      //显示不同分组下面的设置展示
      showConcatSettings (index, index1) {
        let list = [].concat(JSON.parse(JSON.stringify(this.concatShowSettings)));
        list[index][index1] = !list[index][index1];
        this.concatShowSettings = list;
      },
      //折叠下拉菜单
      toggleCollapse (index) {
        let list = this.dropdownFlags.slice();
        list[index] = !list[index];
        this.dropdownFlags = list;
      },
      //切换消息联系人和群组的显示
      toggle (index) {
        if (index === 0) {
          this.isMessage = true;
          this.isConcat = false;
          this.isGroup= false;
        } else if (index === 1) {
          this.isMessage = false;
          this.isConcat = true;
          this.isGroup= false;
        } else {
          this.isMessage = false;
          this.isConcat = false;
          this.isGroup= true;
        }
      },
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
  .slide-enter-active, .slide-leave-active {
    transition: all .2s;
  }
  .slide-enter, .slide-leave-to {
    transform: translateX(-50px);
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  /*创建群聊的样式*/
  .add-member-btn {
    font-size: 15px;
    color: #4893a8;
    cursor: pointer;
    transition: all .2s;
    position: absolute;
    bottom: 30px;
    left: 30px;
    border-radius: 3px;
    border: 1px solid #4893a8;
    padding: 3px 7px;
  }
  .add-member-btn:hover {
    background-color: #4893a8;
    color: white;
  }
  .add-member-friend-list-wrapper {
    position: absolute;
    left: -240px;
    width: 210px;
    height: 300px;
    border-radius: 5px;
    background-color: white;
    top: -25px;
  }
  .add-member-friend-list {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    padding: 10px;
    box-sizing: border-box;
  }
  .add-member-right-arrow {
    position: absolute;
    right: -15px;
    font-size: 25px;
    color: white;
    bottom: 50px;
  }
  .add-member-item {
    display: flex;
    padding: 15px 0;
  }
  .add-member-item-avatar-wrapper {
    flex: 0 40px;
  }
  .add-member-item-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .add-member-item-name {
    width: 75px;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    flex: 1;
    color: #777;
    margin-left: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
  }
  .add-member-select {
    flex: 0 30px;
    height: 40px;
    margin-left: 15px;
    cursor: pointer;
    overflow: hidden;
  }
  .add-member-select-ok {
    display: inline-block;
    width: 18px;
    height: 18px;
    font-size: 18px;
    padding: 11px 6px;
    color: #4893a8;
  }
  .add-member-select-no {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 1px solid #4893a8;
    margin: 11px 6px;
    border-radius: 50%;
  }
  /*修改好友备注的样式 update-friend-remark*/
  .update-friend-remark-input-wrapper, .create-group-input-wrapper {
    margin-top: 30px;
    width: 50%;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  /*在联系人下面的top的样式，包含创建分组*/
  .top-settings {
    width: 100%;
    height: 25px;
    padding: 0 15px;
    box-sizing: border-box;
  }
  .create-group-btn {
    padding: 2px 5px;
    border: 1px solid #ccc;
    color: #ccc;
    border-radius: 3px;
    cursor: pointer;
    display: inline-block;
    font-size: 13px;
    transition: all .2s;
  }
  .create-group-btn:hover {
    background-color: #4893a8;
    border-color: #4893a8;
    color: white;
  }
  .create-concat-group-input-wrapper {
    width: 50%;
    margin-top: 30px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  /*修改分组的样式update-concat-group-wrapper*/
  .update-concat-group-wrapper, .create-concat-group-wrapper, .update-friend-remark-wrapper, .create-group {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background-color: rgba(0,0,0,0.7);
  }
  .create-concat-group-wrapper {
    z-index: 10;
  }
  .update-concat-group-content, .create-concat-group-content, .update-friend-remark-content, .create-group-content {
    position: absolute;
    width: 400px;
    height: 250px;
    background-color: white;
    border-radius: 8px;
    padding: 15px;
    box-sizing: border-box;
    left: 50%;
    top: 50vh;
    transform: translate3d(-50%, -50%, 0);
  }
  .update-concat-group-close, .create-concat-group-close, .update-friend-remark-close, .create-group-close {
    position: absolute;
    right: 10px;
    top: 10px;
    display: inline-block;
    font-size: 20px;
    color: #4893a8;
    cursor: pointer;
  }
  .update-concat-group-title, .create-concat-group-title, .update-friend-remark-title, .create-group-title {
    font-size: 18px;
    color: #4893a8;
    text-align: center;
    padding: 0 0 20px 0;
  }
  .options-wrapper {
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 30px;
  }
  .create-group-btn-1 {
    position: absolute;
    bottom: 30px;
    left: 30px;
    padding: 2px 6px;
    color: #4893a8;
    border: 1px solid #4893a8;
    border-radius: 3px;
    cursor: pointer;
    font-size: 15px;
    transition: all .2s;
  }
  .create-group-btn-1:hover {
    color: white;
    background-color: #4893a8;
  }
  .update-confirm, .update-cancel {
    padding: 3px 7px;
    border: 1px solid #4893a8;
    color: #4893a8;
    cursor: pointer;
    transition: all .2s;
    border-radius: 3px;
  }
  .update-confirm:hover, .update-cancel:hover {
    color: white;
    background-color: #4893a8;
  }
  .update-confirm {
    position: absolute;
    bottom: 30px;
    right: 120px;
  }
  .update-cancel {
    position: absolute;
    bottom: 30px;
    right: 20px;
  }
  /*其他样式*/
  .height-setting {
    flex: 0 50px;
    position: relative;
  }
  .setting-dropdown {
    position: absolute;
    top: 25px;
    right: 0px;
    z-index: 2;
  }
  .setting-dropdown-list {
    width: 80px;
    background-color: white;
    border-radius: 5px;
  }
  .setting-dropdown-item {
    width: 80px;
    height: 28px;
    border-bottom: 1px solid #4893a8;
    text-align: center;
    line-height: 28px;
    color: #4893a8;
    cursor: pointer;
    font-size: 13px;
  }
  .setting-dropdown-item:hover {
    background-color: #4893a8;
    color: white;
  }
  .setting-dropdown-item:last-child {
    border-bottom: 0;
  }
  .setting-icon-wrapper {
    cursor: pointer;
    color: #a5a5a5;
    display: inline-block;
    font-size: 15px;
    margin-left: 20px;
  }
  /*群聊下面的样式*/
  .group-wrapper {
    position: relative;
  }
  .group-list, .group-search-list {
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.2s;
  }
  .group-list:hover, .group-search-list:hover {
    background-color: #474747;
  }
  .group-avatar-wrapper, .group-search-avatar-wrapper {
    flex: 0 50px;
  }
  .group-avatar, .group-search-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .group-detail, .group-search-detail {
    flex: 1;
    margin-left: 10px;
  }
  .group-room-name, .group-search-room-name {
    font-size: 18px;
    color: white;
  }
  .group-lastest-message, .group-search-lastest-message {
    color: #a5a5a5;
    font-size: 14px;
    margin-top: 3px;
    width: 150px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .group-setting {
    flex: 0 50px;
  }
  .group-delete {
    cursor: pointer;
    color: #a5a5a5;
    display: inline-block;
    margin-left: 20px;
  }
  .group-search-setting {
    flex: 0 50px;
  }
  .group-search-setting-icon {
   font-size: 15px;
    color: #a5a5a5;
    margin-left: 20px;
    cursor: pointer;
    display: inline-block;
  }
  /*concat页面下面的search样式*/
  .concat-wrapper {
    position: relative;
  }
  .item-wrapper.search-friend-wrapper {
    height: 470px!important;
    overflow: auto;
  }
  .search-friend-wrapper, .search-group-wrapper {
    position: absolute!important;
    width: 100%;
    z-index: 2;
    background-color: #5a5a5a;
  }
  .no-friend {
    text-align: center;
    color: #a5a5a5;
    height: 150px;
    line-height: 150px;
    font-size: 24px;
  }
  .friend-result-list {
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    transition: all .2s;
    cursor: pointer;
  }
  .friend-result-list:hover {
    background-color: #474747;
  }
  .friend-search-avatar-wrapper {
    flex: 0 50px;
  }
  .friend-search-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .friend-search-detail {
    flex: 1;
    margin-left: 10px;
  }
  .friend-search-name {
    font-size: 18px;
    color: white;
  }
  .friend-search-signature {
    color: #a5a5a5;
    font-size: 14px;
    margin-top: 3px;
    width: 160px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
  }
  .friend-search-setting {
    flex: 0 50px;
  }
  /*message页面的style样式*/
  .message-item {
    display: flex;
    padding: 10px 10px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .message-item:hover {
    background-color: #474747;
  }
  .message-avatar-wrapper {
    flex: 0 5px;
  }
  .message-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .message-detail {
    flex: 1;
    margin-left: 10px;
  }
  .room-name {
    font-size: 18px;
    color: white;
  }
  .room-lastest-message {
    font-size: 14px;
    color: #a5a5a5;
    margin-top: 2px;
    width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .message-setting {
    flex: 0 50px;
    padding-right: 10px;
    box-sizing: border-box;
  }
  .delete-message-icon {
    cursor: pointer;
    color: white;
    display: inline-block;
    margin-left: 20px;
  }
  .message-item-time {
    color: #a5a5a5;
    font-size: 15px;
    margin-top: 8px;
  }
  /*其他样式*/
  .friend-invitation {
    height: 33px;
  }
  .refuse, .have-refuse {
    margin-right: 30px;
  }
  .invitation-btn {
    display: inline-block;
    padding: 2px 8px;
    border: 1px solid #4893a8;
    border-radius: 3px;
    cursor: pointer;
    color: #4893a8;
    transition: all 0.2s;
    float: right;
  }
  .invitation-btn:hover {
    color: white;
    background-color: #4893a8;
  }
  .height-wrapper {
    width: 100%;
    overflow: hidden;
    transition: all 0.2s;
    height: 0;
  }
  .height-wrapper.collapse {
    height: auto;
  }
  .height-item-wrapper {
    display: flex;
  }
  .height-item {
    padding: 10px 15px;
    box-sizing: border-box;
    transition: all .2s;
    cursor: pointer;
  }
  .height-item:hover {
    background-color: #474747;
  }
  .height-avatar-wrapper {
    flex: 0 50px;
  }
  .height-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .height-des {
    flex: 1;
    margin-left: 20px;
  }
  .height-name {
    font-size: 18px;
    color: white;
  }
  .height-signature {
    color: #ccc;
    font-size: 13px;
    width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dropdown-item-wrapper {
    padding: 15px 0;
    min-height: 15px;
  }
  .dropdown-name {
    font-size: 18px;
    color: #4893a8;
    float: left;
    padding-left: 15px;
  }
  .dropdown-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-size: 20px;
    background-image:url('/static/ximages/arrow-right.png');
    background-repeat: no-repeat;
    float: right;
    cursor: pointer;
    transition: all 0.2s;
    margin-right: 15px;
  }
  .dropdown-icon.collapse {
    transform: rotateZ(90deg);
  }
  .tab-wrapper {
    width: 100%;
    height: 40px;
    padding-bottom: 15px;
    display: flex;
  }
  .tab-item {
    flex: 1;
  }
  .tab-item-icon {
    display: inline-block;
    width: 30px;
    height: 30px;
    cursor: pointer;
    background-size: 30px;
    background-repeat: no-repeat;
    margin-top: 8px;
  }
  .tab-icon-wrapper {
    height: 42px;
    width: 30px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .tab-icon-wrapper.current {
    border-bottom: 1.5px solid #4893a8;
  }
  .message-icon {
    background-image: url('/static/ximages/message-icon.png');
  }
  .concat-icon {
    background-image: url('/static/ximages/concat-icon.png');
  }
  .group-icon {
    background-image: url('/static/ximages/group-icon.png');
  }
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
    color: #555;
    outline: none;
    border-radius: 6px;
    text-indent: 2em;
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
    position: relative;
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
