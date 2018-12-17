<template>
  <div class="friend-invitation-wrapper" v-if="showFlag">
    <div class="content">
      <i class="close el-icon-close" @click="hide()"></i>
      <div class="content-inner-wrapper">
        <div class="invite-message">
          <div class="invite-message-title">申请内容:</div>
          <div class="invite-message-input">
            <el-input v-model="inviteMessage" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="select-group">
          <div class="select-group-title">选择分组:</div>
          <div class="select-group-input-wrapper">
            <el-select v-model="selectGroup" placeholder="选择分组">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="confirm-btn">确定</div>
      <div class="cancel-btn" @click="hide()">取消</div>
      <div class="create-group-btn-wrapper" @click="showGroup">
        <i class="el-icon-plus create-group-btn"></i>
        <span class="create-group-btn-text">创建分组</span>
      </div>
    </div>
    <div class="create-group-content" v-if="isShowGroup">
      <i class="close el-icon-close" @click="hideGroup()"></i>
      <div class="create-group-title">请输入分组的名称</div>
      <div class="create-group-input-wrapper">
        <el-input v-model="createGroup"></el-input>
      </div>
      <div class="confirm-btn">确定</div>
      <div class="cancel-btn" @click="hideGroup()">取消</div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  export default {
    data () {
      return {
        showFlag: false,//是否显示的标志
        inviteMessage: '我是',//申请的内容
        selectGroup: '',//选择的分组的内容
        options: [
          {
            label: '亲人',
            value: '亲人'
          },
          {
            label: '朋友',
            value: '朋友'
          },
          {
            label: '同学',
            value: '同学'
          }
        ],//可供选择的分组
        isShowGroup: false,//是否显示创建分组
      }
    },
    methods: {
      //显示创建分组
      showGroup () {
        this.isShowGroup = true;
      },
      //隐藏创建分组
      hideGroup () {
        this.isShowGroup = false;
      },
      show () {
        this.showFlag = true;
        setTimeout(() => {
          $('.el-input__inner:eq(0)').focus().select();
        }, 100)
      },
      hide () {
        this.showFlag = false;
        //在隐藏的时候将数据清空
        this.selectGroup = '';
        this.inviteMessage = '我是';
        this.createGroup = '';
      }
    }
  }
</script>

<style scoped>
  .friend-invitation-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0,0,0,0.7);
    z-index: 2;
  }
  .content {
    position: absolute;
    width: 400px;
    height: 250px;
    background-color: white;
    left: 50%;
    top: 50vh;
    transform: translate3d(-50%, -50%, 0);
    border-radius: 8px;
    padding: 15px;
    box-sizing: border-box;
  }
  .close {
    position: absolute;
    right: 20px;
    top: 20px;
    color: #4893a8;
    cursor: pointer;
    font-size: 20px;
  }
  .invite-message {
    height: 50px;
    width: 300px;
    margin: 40px auto;
    margin-bottom: 0!important;
  }
  .invite-message:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 50px;
  }
  .invite-message-title {
    font-size: 20px;
    color: #4893a8;
    display: inline-block;
    vertical-align: middle;
  }
  .invite-message-input {
    width: 194px;
    margin-left: 15px;
    display: inline-block;
    vertical-align: middle;
  }
  .select-group {
    height: 50px;
    width: 300px;
    margin: 20px auto;
    margin-bottom: 0!important;
  }
  .select-group:before {
    content: '';
    height: 50px;
    display: inline-block;
    vertical-align: middle;
  }
  .select-group-title {
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    color: #4893a8;
  }
  .select-group-input-wrapper {
    display: inline-block;
    vertical-align: middle;
    margin-left: 15px;
  }
  .confirm-btn, .cancel-btn {
    position: absolute;
    bottom: 30px;
    border-radius: 3px;
    cursor: pointer;
    color: #4893a8;
    border: 1px solid #4893a8;
    padding: 2px 6px;
    transition: all .2s;
  }
  .confirm-btn {
    right: 100px;
  }
  .cancel-btn {
    right: 20px;
  }
  .confirm-btn:hover, .cancel-btn:hover {
    background-color: #4893a8;
    color: white;
  }
  .create-group-btn-wrapper {
    position: absolute;
    bottom: 30px;
    left: 20px;
    border: 1px solid #4893a8;
    color: #4893a8;
    border-radius: 3px;
    cursor: pointer;
    transition: all .2s;
    padding: 2px 6px;
    font-size: 13px;
  }
  .create-group-btn-wrapper:hover {
   color: white;
   background-color: #4893a8;
 }
  .create-group-content {
    position: absolute;
    z-index: 20;
    width: 400px;
    height: 250px;
    background-color: white;
    border-radius: 8px;
    top: 50vh;
    left: 50%;
    transform: translate3d(-50%,-50%, 0);
  }
  .create-group-title {
    text-align: center;
    font-size: 20px;
    color: #4893a8;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .create-group-input-wrapper {
    width: 200px;
    margin: 0 auto;
  }
</style>
