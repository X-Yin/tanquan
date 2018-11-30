<template>
    <div class="private-letter-wrapper">
      <head-nav></head-nav>
      <div class="container">
        <div class="private-letter">
          <!--<div class="title">-->
            <!--<span class="color-block"></span>-->
            <!--<span class="title-text">私信</span>-->
          <!--</div>-->
          <el-row>
            <el-col :span="17" class="el-17">
              <router-view/>
            </el-col>
            <el-col :span="6" class="el-6" :offset="1">
              <div class="search-input-wrapper">
                <input type="text" placeholder="请输入联系人" name="search" class="search">
                <i class="el-icon-search search-icon"></i>
              </div>
              <div class="list-wrapper">
                <div class="attentionLetter">
                  <div class="attention-title">关注人私信<i class="el-icon-caret-right control al" @click="collapse(0)"></i></div>
                  <div class="attention-wrapper">
                    <div class="attention-content">
                      <div class="attention-item"  v-for="(item, index) in attentionLetter" :key="index">
                        <div class="attention-avatar-wrapper">
                          <img :src="item.avatar" class="attention-avatar">
                        </div>
                        <div class="attention-des">
                          <span class="attention-name">{{item.name}}</span>
                          <span class="attention-icon"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="unAttentionLetter">
                  <div class="unattention-title">未关注人私信<i class="el-icon-caret-right control ual" @click="collapse(1)"></i></div>
                  <div class="unattention-wrapper">
                    <div class="unattention-content">
                      <div class="unattention-item"  v-for="(item, index) in unattentionLetter" :key="index">
                        <div class="unattention-avatar-wrapper">
                          <img :src="item.avatar" class="unattention-avatar">
                        </div>
                        <div class="unattention-des">
                          <span class="unattention-name">{{item.name}}</span>
                          <span class="unattention-icon"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <foot-bar></foot-bar>
    </div>
</template>

<script type="text/ecmascript-6">
  import headNav from '../Ccomponents/headNav.vue'
  import footBar from '../Ccomponents/footBar.vue'
  import {reqAttentionLetter, reqUnAttentionLetter} from '../../api/index.js'
  import $ from 'jquery'
  export default {
    data () {
      return {
        attentionLetter: [],
        unattentionLetter: []
      }
    },
    mounted () {
      // this.getAttentionLetter()
      // this.getUnAttentionLetter()
    },
    methods: {
      async getAttentionLetter () {
        let result = await reqAttentionLetter()
        if (result.code === 0) {
          this.attentionLetter = result.attentionLetter
        }
      },
      async getUnAttentionLetter () {
        let result = await reqUnAttentionLetter()
        if (result.code === 0) {
          this.unattentionLetter = result.unattentionLetter
        }
      },
      collapse (index) {
        let right = /right/
        if (right.test(document.getElementsByClassName('control')[index].className)) {//改变图标的颜色和方向
          if (index === 0) {
            $('.al').removeClass('el-icon-caret-right').addClass('el-icon-caret-bottom')
            let height = $('.attention-content').height()
            $('.attention-wrapper').animate({height : height + 'px'}, 200)
          } else {
            $('.ual').removeClass('el-icon-caret-right').addClass('el-icon-caret-bottom')
            let height = $('.unattention-content').height()
            $('.unattention-wrapper').animate({height : height + 'px'}, 200)
          }
        } else {
          if (index === 0) {
            $('.al').addClass('el-icon-caret-right').removeClass('el-icon-caret-bottom')
            $('.attention-wrapper').animate({height :0}, 200)
          } else {
            $('.ual').addClass('el-icon-caret-right').removeClass('el-icon-caret-bottom')
            $('.unattention-wrapper').animate({height: 0}, 200)
          }
        }
      }
    },
    components: {
      headNav,
      footBar,
    }
  }
</script>

<style scoped>
  .el-17 {
    padding: 20px 20px;
    box-sizing: border-box;
    background-color: white;
    border-radius: 10px;
  }
  .el-6 {
    position: relative;
    left: -40px;
    background-color: white;
    padding-top: 20px;
    padding-left: 20px;
    box-sizing: border-box;
    border-radius: 10px;
    height: 740px;
  }
  .private-letter {
    min-height: 100vh;
    padding-top: 0px;
  }
  .title {
    background-color: white;
    padding-left: 20px;
    box-sizing: border-box;
    border-radius: 10px;
  }
  .title:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 40px;
  }
  .color-block {
    display: inline-block;
    vertical-align: middle;
    width: 15px;
    height: 20px;
    background-color: #4893a8;
  }
  .title-text {
    display: inline-block;
    vertical-align: middle;
    font-size: 24px;
    color: #595959;
    margin-left: 15px;
  }
  .search-input-wrapper:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 30px;
  }
  .search {
    display: inline-block;
    vertical-align: middle;
    width: 240px;
    height: 26px;
    border: 0;
    font-size: 15px;
    background-color: #f7f7f7;
    margin-right: 5px;
    text-indent: 1em;
  }
  .search-icon {
    font-size: 20px;
    color: #bebebe;
    cursor: pointer;
  }
  .list-wrapper {
    margin-top: 15px;
    height: 637px;
    overflow: auto;
    width: 100%;
    background-color: white;
    padding-top: 15px;
    padding-left: 15px;
    box-sizing: border-box;
  }
  .attention-title {
    color: #474747;
    font-size: 17px;
  }
  .control {
    cursor: pointer;
  }
  .el-icon-caret-bottom {
    color: #4893a8;
  }
  .attention-wrapper, .unattention-wrapper {
    height: 0;
    overflow: hidden;
  }
  .attention-item, .unattention-item {
    padding-top: 20px;
    display: flex;
  }
  .attention-avatar-wrapper, .unattention-avatar-wrapper {
    flex: 0 36px;
  }
  .attention-avatar, .unattention-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .attention-des, .unattention-des {
    flex: 1;
    margin-left: 20px;
  }
  .attention-des:before, .unattention-des:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 20px;
  }
  .attention-name, .unattention-name {
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    color: #858585;
    cursor: pointer;
    text-decoration: underline;
  }
  .attention-icon,.unattention-icon {
    display: inline-block;
    vertical-align: middle;
    width: 15px;
    height: 15px;
    background-image: url('/static/ximages/check.png');
    background-size: 15px;
    background-repeat: no-repeat;
    margin-left: 15px;
  }
  .unAttentionLetter {
    margin-top: 20px
  }
</style>
