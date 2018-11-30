<template>
    <div class="loadingBtn">
      <span class="text">加载中</span><div class="more-wrapper"><span class="more-1">...</span></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  export default {
  }
</script>

<style scoped>
  .loadingBtn {
    width: 680px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid #a5a5a5;
    text-align: center;
    line-height: 45px;
    color: #a5a5a5;
    margin: 0 auto;
  }
  .text {
    display: inline-block;
    vertical-align: bottom;
  }
  .more-wrapper {
    display: inline-block;
    vertical-align: bottom;
    width: 20.45px;
    overflow: hidden;
    font-size: 20px;
    height: 44.8px;
  }
  .more-1 {
    display: inline-block;
    vertical-align: bottom;
    letter-spacing: 2px;
    animation: move1 0.5s infinite;
  }
  @keyframes move1 {
    0% {
      transform: translateX(-100%)
    }
    100% {
      transform: translateX(0)
    }
  }
</style>
