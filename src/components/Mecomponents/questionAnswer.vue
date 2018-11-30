<template>
    <div class="question-answer">
      <no-task-text v-if="question.length === 0 " text="暂无提问"></no-task-text>
      <div>
        <div class="item" v-for="(item, index) in question" :key="index">
          <div class="question">
            <div class="wrapper">
              <div class="question-avatar-wrapper" v-if="item.questionPhoto">
                <img v-lazy="item.questionPhoto" class="question-avatar">
              </div>
              <div class="question-description">
                <div class="question-title">
                  <span class="color-block-1"></span>
                  <span class="color-block-1"></span>
                  <span class="question-name" @click="gotoQuestionDetail(item)">{{item.questionTitle}}</span>
                </div>
                <div class="question-des">
                  {{handleContent(item.questionContent)}}
                </div>
              </div>
            </div>
            <div class="icons-wrapper">
              <icons :index="index"></icons>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import icons from '../common/icons'
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {getPosition, getStorage, setStorage} from '../../api/util.js'
  import loadingBtn from '../Xcomponents/loadingBtn.vue'
  import noTaskText from '../Xcomponents/noTaskText.vue'
  import waitTaskWrapper from '../Xcomponents/waitTaskWrapper.vue'
  import {getUserQuestion} from '../../api/index.js'
  export default {
    data () {
      return {
        loadingShow: false,
        isLoadOnePage: true,
        isNoQuestionShow: true,
        question: [],
        p: 1,
        pagesNumber: 1,
      }
    },
    computed: {
    },
    created () {
      window.onscroll = null
    },
    mounted () {
      this._getQuestion()
    },
    methods: {
      ...mapMutations([
          'getQuestionDetailId'
        ]),
      //跳转到问题详情页
      gotoQuestionDetail (question) {
        //将taskId缓存到本地
        setStorage('questionDetailId', question.questionId)
        this.getQuestionDetailId(question.questionId)
        this.$router.push(`/tanqiu/questionDetail/${question.questionId}/questionAnswer`)
      },
      //处理问题的内容
      handleContent (content) {
        let ret = /<[^>]+>/g
        content = content.replace(ret, '')
        if (content.length > 15) {
          return content.substring(0, 15) + '...'
        } else {
          return content
        }
      },
      async _getQuestion () {
        let personPageId = getStorage('personPageId')
        let result = await getUserQuestion(personPageId)
        console.log(result)
        if (result.success) {
          this.question = result.data
        }
      },
    },
    watch: {
    },
    components: {
      noTaskText,
      waitTaskWrapper,
      loadingBtn,
      icons
    }
  }
</script>

<style scoped>
.icons-wrapper {
  width: 60%;
  margin-top: 20px;
}
  .item {
    margin-top: 30px;
  }
  .time-text {
    color: #8a8a8a;
    font-size: 20px;
    height: 40px;
    line-height: 40px;
  }
  .wrapper {
    display: flex;
    width: 100%;
    margin-top: 30px;
  }
  .question-avatar-wrapper {
    flex: 0 140px;
    height: 85px;
    overflow: hidden;
  }
  .question-avatar {
    width: 125px;
    margin: 0 15px 0 0;
  }
  .question-description {
    flex: 1;
    height: 85px;
  }
  .question-title {
    height: 30px;
  }
  .question-title:before{
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 30px;
    width: 0;
  }
  .color-block-1 {
    display: inline-block;
    vertical-align: middle;
    width: 25px;
    height: 25px;
    background-color: #4993a8;
    margin-left: 10px;
  }
  .question-name{
    display: inline-block;
    vertical-align: middle;
    font-size: 24px;
    color: #222;
    margin-left: 20px;
    cursor: pointer;
  }
  .question-name:hover {
    color: #4893a8;
  }
  .question-des{
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    color: #6c6c6c;
    margin-left: 10px;
    margin-top: 15px;
  }
  .setting {
    width: 100%;
    height: 50px;
    margin-top: 30px;
  }
  .setting:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 50px;
  }
  .forward, .comment, .collect, .thumbUp, .uninterest, .more {
    display: inline-block;
    vertical-align: middle;
    margin-left: 30px;
  }
  .forward {
    margin-left: 42.5px;
  }
  .forward:before, .comment:before, .collect:before, .thumbUp:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height:  50px;
  }
  .icon {
    display: inline-block;
    vertical-align: middle;
    width: 25px;
    height: 25px;
    background-color: #4993a8;
    margin-right: 10px;
  }
  .text {
    display: inline-block;
    vertical-align: middle;
    color: #6c6c6c;
    font-size: 18px;
  }
  .uninterest {
    height:  50px;
    line-height: 50px;
    font-size: 15px;
    color: #a5a5a5;
    margin-left: 70px;
  }
  .more-icon {
    color: rgb(108,108,108);
    font-size: 20px;
  }
  .wrapper1 {
    margin-left: 42.5px;
    margin-top: 30px;
  }
  .answer-title {
    font-size: 20px;
    color: #222;
  }
  .answer-avatar-wrapper {
    flex: 0 233px;
    height: 115px;
  }
  .answer-avatar {
    width: 160px;
    height: 100px;
    margin: 0 30px 0 42.5px;
  }
  .answer-description {
    color: #848484;
    line-height: 30px;
  }
  .answer-detail-btn {
    color: #01a9ce;
    text-decoration: underline;
  }
  .loadingBtn-wrapper {
    margin: 50px 0;
  }
  .item:last-child {
    margin-bottom: 50px;
  }
</style>
