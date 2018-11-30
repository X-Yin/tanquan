<template>
  <div class="join-act">
    <div class="settings">
      <div class="tab">
        <div class='tabitem' :class="{'current':current==1}" @click='tab(1)'>合作写文章</div><!--
         --><div class='tabitem' :class="{'current':current==2}" @click='tab(2)'>直播</div><!--
         --><div class='tabitem' :class="{'current':current==3}" @click='tab(3)'>通知</div>
      </div>
      <div class="btn">热度</div><i class="el-icon-d-caret"></i>
      <div class="search">
        <input style="background-color: #f7f7f7;border:none;height: 22px;margin-right: 18px;">
        <i class="icon el-icon-search" style="color: #bebebe;font-weight: 600;"></i>
      </div>
    </div>
    <div v-for='(item,index) in acts' :key='index' class="act">
      <div class='avatar'>
        <img  v-lazy="item.avatar" :src="item.avatar">
      </div>
      <div class="title">
        <p class="circleName">{{item.title}}</p>
      </div>
      <div class="action">
        <div>转发（{{item.share}}）</div>
        <div>评论（{{item.comment}}）</div>
        <div>点赞（{{item.like}}）</div>
        <div>收藏（{{item.save}}）</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import noTaskText from '../../Xcomponents/noTaskText.vue'
  import waitTaskWrapper from '../../Xcomponents/waitTaskWrapper.vue'
  import {getAllCircle, follow, delFollow} from '../../../api/index.js'
  import {getPosition} from '../../../api/util.js'
  import loadingBtn from '../../Xcomponents/loadingBtn.vue'
  export default{
    data(){
      return {
        dialogTableVisible:false,
        current:1,
      }
    },
    methods:{
      tab(n){
        this.current = n
      }
    },
    computed:{
      ...mapState(['elites','acts'])
    },
    mounted(){
      this.$store.dispatch('getElites')
      this.$store.dispatch('getActs')
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus" >
  .join-act
    padding-top 20px
    padding-right 20px
    box-sizing border-box
  .tab
    display inline-block

  .tabitem
    height 30px
    display inline-block
    list-style none
    border-left solid 1px #8a8a8a
    border-top solid 1.2px #8a8a8a
    border-bottom solid 1px #8a8a8a
    font-size 18px
    line-height 30px
    padding 0 10px
    color #8a8a8a
    &:last-child
      border-right solid 1px #8a8a8a
  .current
    border-top solid 2px #4893a8
    color #474747
  .settings
    position relative
    padding-left 15px
    .btn
      display inline-block
      text-align center
      border solid 1px #9e9e9e
      border-radius 2px
      padding 1px 4px
      margin-left 32px
      height 22px
      width 40px
      line-height 22px
      color #5b5b5b
    .search
      margin-left 164px
      display inline-block

  .act
    padding 45px 0px 45px 15px
    margin-top 8px
    .avatar
      display inline-block
      vertical-align middle
      img
        height 34px
        width 34px
        background-color #4893a8
    .title
      display inline-block
      vertical-align middle
      font-size 20.34px
      color #474747
      line-height 34px
      height 34px
      margin-left 20px
    .action
      div
        display inline-block
        position relative
        width 90px
        padding-left 30px
        margin-top 30px
        color #6c6c6c
        font-size 15.98px
        &:before
          content ""
          height 21px
          width 21px
          position absolute
          background-color #4893a8
          left 0

</style>
