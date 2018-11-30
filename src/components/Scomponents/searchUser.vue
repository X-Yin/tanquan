<template>
  <div class="search-user">
    <div class="user-wrapper">
      <div class="user-item" v-for="(item, index) in 5">
        <div class="avatar-wrapper">
          <img src="/static/ximages/妹纸.jpg" class="avatar">
        </div>
        <div class="des">
          <div class="user-name">
            <span class="name">不会飞的鱼</span>
            <i class="user-icon"></i>
          </div>
          <div class="sex">
            <span class="sex-icon"></span>
            <span class="address">河北 保定</span>
            <span class="point">指数：689</span>
          </div>
          <div class="position">
            <span class="position-tag">现居：</span>
            <span class="position-text">北京 东城</span>
          </div>
          <div class="des-detail">
            <span class="detail-tag">简介：</span>
            <span class="detail-text">走自己的路，让别人无路可走。</span>
          </div>
          <div class="setting">
            <span class="question-tag setting-tag">提问数：</span>
            <span class="question-text setting-text">22</span>
            <span class="answer-tag setting-tag tag">回答数</span>
            <span class="answer-text setting-text">22</span>
            <span class="launch-tag setting-tag tag">发起任务数：</span>
            <span class="launch-text setting-text">22</span>
            <span class="take-tag setting-tag tag">承接任务数：</span>
            <span class="take-text setting-text">22</span>
          </div>
        </div>
        <div class="btns-wrapper">
          <div class="btns">
           <div class="letter">私信</div>
           <div class="friend">+好友</div>
         </div>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
    
</script>

<style scoped>
  .user-item {
    display: flex;
    padding: 20px 0;
  }
  .avatar-wrapper {
    flex: 0 120px;
  }
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .des {
    flex: 1;
    margin-left: 30px;
  }
  .user-name {
    height: 32px;
    font-size: 17px;
    color: #5b5b5b;
  }
  .user-name:before {
    display: inline-block;
    vertical-align: middle;
    height: 32px;
  }
  .name {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
  }
  .user-icon {
    display: inline-block;
    vertical-align: middle;
    width: 18px;
    height: 18px;
    background-size:  18px;
    background-repeat: no-repeat;
    background-image: url('/static/ximages/check.png');
  }
  .sex, .position, .des-detail, .setting {
    height: 30px;
    font-size: 15px;
    color: #9d9d9d;
  }
  .sex:before, .position:before, .des-detail:before, .setting:before {
    display: inline-block;
    vertical-align: middle;
    height: 30px;
  }
  .sex-icon {
    display: inline-block;
    vertical-align: middle;
    width: 16px;
    height: 18px;
    background-size: 16px 18px;
    background-repeat: no-repeat;
    background-image: url('/static/ximages/arrow.png');
    margin-right: 20px;
  }
  .address {
    isplay: inline-block;
    vertical-align: middle;
  }
  .point {
    margin-left: 20px;
    isplay: inline-block;
    vertical-align: middle;
  }
  .position-tag, .detail-tag, .setting-tag {
    font-size: 16px;
    color: #7b7b7b;
  }
  .position-text, .detail-text, .setting-text {
    font-size: 15px;
    color: #9d9d9d;
  }
  .tag {
    margin-left: 20px;
  }
  .btns-wrapper {
    flex: 0 140px;
  }
  .btns {
    position: relative;
  }
  .letter, .friend {
    position: absolute;
    padding: 3px 10px;
    border: 1px solid #4893a8;
    color: #4893a8;
    cursor: pointer;
    border-radius: 3px;
    transition:all 0.2s;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);
  }
  .letter {
    top: 20px;
  }
  .friend {
    top: 80px;
  }
  .letter:hover, .friend:hover {
    color: white;
    background-color: #4893a8;
  }
</style>