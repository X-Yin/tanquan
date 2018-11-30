<template>
  <div class="search-all">
    <div class="all-wrapper">
      <div class="all-item" v-for="(item, index) in 5">
        <div class="item-content">
          <div class="avatar-wrapper">
            <img src="/static/ximages/妹纸.jpg" class="avatar">
          </div>
          <div class="des">
            <div class="tag">{{handleTags(['女生', '大学生活'])}}</div>
            <div class="des-detail">
              {{handleContent('女生宿舍里面，发生者一群不为人知的事情，我为什么会知道呢，因为宿舍里面有一个和我关系还不错的女生， 是他告诉我的，他为什么会告诉我这些呢，是因为他和我关系还不错。')}}
              <span class="des-btn">详情</span>
            </div>
          </div>
        </div>
        <div class="icons-wrapper">
          <icons :index="index"></icons>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import icons from '../common/icons.vue'
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
          return str + '...'
        }
      }
    },
    components: {
      icons
    }
  }
</script>

<style scoped>
  .all-item {
    padding: 20px 0;
  }
  .item-content {
    display: flex;
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
  .tag {
    color: #aaa7a7;
    font-size: 15px;
    margin-bottom: 4px;
  }
  .des-detail {
    font-size: 15px;
    color: #6c6c6c;
    line-height: 24px;
  }
  .des-btn {
    color: #4893a8;
    cursor: pointer;
  }
  .des-btn:hover {
    border-bottom: 1px solid #4893a8;
  }
  .icons-wrapper {
    margin-top: 15px;
    width: 60%;
  }
</style>