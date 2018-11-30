<template>
  <div class="search-circle">
    <div class="circle-wrapper">
      <div class="circle-item" v-for="(item, index) in 5">
        <div class="avatar-wrapper">
          <img src="/static/ximages/妹纸.jpg" class="avatar">
        </div>
        <div class="des">
          <div class="name">
            <span class="name-text">经济园地</span>
            <span class="name-icon"></span>
          </div>
          <div class="tag-wrapper">
            <span class="tag-title">标签：</span>
            <span class="tags">{{handleTags(['大学生活', '女生'])}}</span>
          </div>
          <div class="des-detail">
            <span class="detail-title">简介：</span>
            <span class="detail-text">
              {{handleContent('女生宿舍里面，发生者一群不为人知的事情，我为什么会知道呢，因为宿舍里面有一个和我关系还不错的女生， 是他告诉我的，他为什么会告诉我这些呢，是因为他和我关系还不错。')}}
            </span>
          </div>
        </div>
        <div class="btns-wrapper">
          <div class="btns">
            <div class="join">未关注</div>
            <div class="attention">未加入</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      //处理标签内容
      handleTags (tags) {
        if (tags.length >= 2) {
          return tags.slice(0, 2).join(',')
        } else {
          return tags.join(',')
        }
      },
      //处理问题详情
      handleContent (str) {
        if (str.length > 50) {
          return str.substring(0, 51) + '...'
        } else {
          return str
        }
      }
    }
  }
</script>

<style scoped>
  .circle-item {
    display: flex;
    padding: 20px 0;
  }
  .avatar-wrapper {
    flex: 0 120px;
  }
  .avatar {
    width: 120px;
    height: 120px;
  }
  .des {
    flex: 1;
    margin-left: 30px;
  }
  .name {
    height: 30px;
    font-size: 17px;
    color: #5b5b5b;
  }
  .name:before {
    height: 30px;
    display: inline-block;
    vertical-align: middle;
  }
  .name-text {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
  }
  .name-icon {
    display: inline-block;
    vertical-align: middle;
    width: 17px;
    height: 17px;
    background-size: 17px;
    background-repeat: no-repeat;
    background-image: url('/static/ximages/check-icon-blue.png');
  }
  .tag-wrapper, .des-detail {
    height: 30px;
  }
  .tag-title, .detail-title {
    font-size: 15px;
    color: #808080;
  }
  .tags, .detail-text {
    color: #b3b3b3;
  }
  .btns-wrapper {
    flex: 0 150px;
  }
  .btns {
    position: relative;
  }
  .join, .attention {
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
  .join {
    top: 20px
  }
  .attention {
    top: 80px;
  }
  .join:hover, .attention:hover {
    color: white;
    background-color: #4893a8;
  }
</style>