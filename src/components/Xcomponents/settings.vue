<template>
    <div class="settings">
      <el-row style="height: 100%;">
        <el-col :span="16" class="setting-inner-wrapper">
          <div class="setting-item" v-for="(item, index) in settings" :key="index">
            <span class="text">{{item}}</span>
            <i class="icon el-icon-d-caret"></i>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="input-wrapper">
            <input type="text" class="search-input">
            <i class="icon-search el-icon-search"></i>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      settings: {
        type: Array,
        default () {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .settings {
    width: 100%;
    padding-left: 35px;
    box-sizing: border-box;
    background-color: white;
    height: 25px;
  }
  .setting-inner-wrapper {
    height: 25px;
    display: inline-block;
    vertical-align: top;
  }
  .setting-inner-wrapper:before {
    content: '';
    vertical-align: top;
    height: 100%;
    display: inline-block;
  }
  .setting-item {
    display: inline-block;
    margin-right: 15px;
    color: #5b5b5b;
    vertical-align: top;
    font-size: 0;
  }
  .text {
    border: 1px solid #adadad;
    display: inline-block;
    padding: 0 3px;
    border-radius: 2px;
    font-size: 16px;
  }
  .search-input {
    width: 180px;
    height: 22px;
    border: 0;
    background-color: #f7f7f7;
    display: inline-block;
    vertical-align: middle;
  }
  .icon {
    font-size: 18px;
    margin-left: 5px;
  }
  .input-wrapper {
    font-size: 0;
    margin-left: 10px;
  }
  .input-wrapper:before {
    display: inline-block;
    vertical-align: middle;
    height: 22px;
  }
  .icon-search.el-icon-search {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    background-size: 20px;
    background-image: url('/static/ximages/search-icon.png');
    background-repeat: no-repeat;
    margin-left: 10px;
    cursor: pointer;
  }
</style>
