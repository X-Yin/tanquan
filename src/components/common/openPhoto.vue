<template>
  <div class="open-photo" v-if="showFlag">
    <div class="mask" @click="hide()"></div>
    <div class="photo-wrapper-c" :class="{'origin': isOrigin}">
      <img :src="url" class="photo-c">
      <div class="close-wrapper">
        <div class="line"></div>
        <div class="close-btn-wrapper">
          <i class="el-icon-circle-close-outline close-btn" @click="hide()"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import {getPosition} from '../../api/util.js'
  export default {
    props: {
      url: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        showFlag: false,
        widthLg: 0,//居中图片原本的宽度
        isOrigin: true
      }
    },
    mounted () {
    },
    methods: {
      show () {
        this.showFlag = true
      },
      hide () {
        this.isOrigin = true;
        this.showFlag = false
      }
    },
    watch: {
      showFlag () {
        if (this.showFlag) {
          setTimeout(() => {
            this.isOrigin = false
          }, 100)
          //this.isOrigin = false
        }
      }
    }
  }
</script>

<style scoped>
  .open-photo {
    position: fixed;
    z-index: 20;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .mini-img-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    overflow: hidden;
    opacity: 0;
  }
  .mask {
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.7);
  }
  .photo-wrapper-c {
    position: absolute;
    z-index: 20;
    max-width: 800px;
    max-height: 600px;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0) rotateY(0);
    transition: all 0.3s;
  }
  .photo-wrapper-c.origin {
    width: 200px;
    transform: translate3d(-50%, -50%, 0) rotateY(-90deg);
  }
  .photo-c {
    max-height: 600px;
    min-height: 200px;
  }
  .close-wrapper {
    position: absolute;
    width: 100px;
    height: 40px;
    top: 0;
    right: -100px;
  }
  .line {
    border-bottom: 2px solid white;
    display: inline-block;
    vertical-align: top;
    width: 50px;
    position: relative;
    top: 15px;
  }
  .close-btn-wrapper {
    display: inline-block;
    vertical-align: top;
    font-size: 40px;
    color: white;
    position: absolute;
    top: -12px;
    left: 48px;
  }
  .close-btn {
    cursor: pointer;
  }
</style>
