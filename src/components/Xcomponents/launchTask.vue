<template>
    <div class="launch-task">
      <div class="container">
        <div class="header">
          <span class="color-block"></span>
          <span class="header-text">发布任务</span>
        </div>
        <div class="wrapper">
          <form method="post" action="" class="form">
            <div class="title">
              <div class="name title-name">标题</div>
              <div class="input-wrapper">
                <input class="title-text" type="text">
              </div>
            </div>
            <div class="description">
              <div class="name">描述</div>
              <div class="input-wrapper">
                <div class="input-container">
                  <div class="setting">
                    <editor v-if="isEditorMounted" class="editor" :value="value" :setting="editorSetting" @input="getInput"></editor>
                  </div>
                </div>
                <div class="anonymous-wrapper">
                  <el-checkbox name="anonymous" class="anonymous" v-model="anonymous"></el-checkbox>
                  <span class="anonymous-text">匿名</span>
                </div>
              </div>
            </div>
            <div class="topic">
              <div class="name topic-name">话题</div>
              <div class="input-wrapper1">
                <div class="input-container1">
                  <!--<input type="text" class="topic-text">-->
                  <el-select v-model="selectTopicValue" placeholder="请选择">
                    <el-option v-for="item in topicOptions"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="mode">
              <div class="name mode-name">
                接单者模式
              </div>
              <div class="input-wrapper">
                <div class="oneWay-wrapper"  @click="changeTip(0)">
                  <el-radio name="directory" class="one-way" v-model="mode" label="oneWay">单向</el-radio>
                </div>
                <div class="doubleWay-wrapper"  @click="changeTip(1)">
                  <el-radio name="directory" class="double-way" v-model="mode" label="doubleWay">双向</el-radio>
                </div>
                <div class="tip"></div>
              </div>
            </div>
            <div class="type">
              <div class="name type-name">
                接单类型
              </div>
              <div class="input-wrapper">
                <div class="input-container2">
                  <div class="person-task-wrapper" @click="toggleState(0)" >
                    <el-radio name="task-type" class="person-task" ref="personTask" v-model="taskType" label="personTask">个人任务</el-radio>
                  </div>
                  <!--<div class="appoint-wrapper" v-show="personSelected"  @click="changeState('00')">-->
                  <!--<el-radio name="appoint-type" class="appoint" ref="appoint" v-model="personIsAppoint" label="appointObject">指定对象</el-radio>-->
                  <!--</div>-->
                  <!--<div class="unappoint-wrapper" v-show="personSelected" @click="changeState('01')">-->
                  <!--<el-radio name="appoint-type" class="unappoint" ref="unappoint"  v-model="personIsAppoint" label="unappointObject">不指定对象</el-radio>-->
                  <!--</div>-->
                  <!--<div class="search-container" v-show="personAppointSelected">-->
                  <!--<div class="person-search-result-wrapper">-->
                  <!--<input type="text" name="person-search-result" class="person-search-result" autocomplete="off" v-model="personResult" @blur="personSearchInputBlur">-->
                  <!--</div>-->
                  <!--<div class="person-search-wrapper" v-show="personSearchContentShow">-->
                  <!--<input type="text" name="person-search-content" class="person-search-content" autocomplete="off" v-model="personContent">-->
                  <!--<i class="search-icon el-icon-search"></i>-->
                  <!--<div class="search-tip" v-show="personContent !== ''">-->
                  <!--<ul>-->
                  <!--<li class="search-item" v-for="(item, index) in searchTips" :key="index" @click="selectPersonItem(item)">-->
                  <!--{{item}}-->
                  <!--</li>-->
                  <!--</ul>-->
                  <!--</div>-->
                  <!--</div>-->
                  <!--</div>-->
                </div>
                <div class="input-container3" style="margin-top: 20px;">
                  <div class="circle-task-wrapper" @click="toggleState(1)">
                    <el-radio name="task-type" class="circle-task" ref="circleTask" v-model="taskType" label="circleTask">圈子任务</el-radio>
                  </div>
                  <!--<div class="appoint-wrapper" v-show="circleSelected" @click="changeState('10')">-->
                  <!--<el-radio name="appoint-type" class="appoint" ref="appoint" v-model="circleIsAppoint" label="appointCircle">指定圈子</el-radio>-->
                  <!--</div>-->
                  <!--<div class="unappoint-wrapper" v-show="circleSelected" @click="changeState('11')">-->
                  <!--<el-radio name="appoint-type" class="unappoint" ref="unappoint" v-model="circleIsAppoint" label="unappointCirclce">不指定圈子</el-radio>-->
                  <!--</div>-->
                  <!--<div class="search-container" v-show="circleAppointSelected">-->
                  <!--<div class="circle-search-result-wrapper">-->
                  <!--<input type="text" name="circle-search-result" class="circle-search-result" autocomplete="off" v-model="circleResult" @blur="circleSearchInputBlur">-->
                  <!--</div>-->
                  <!--<div class="circle-search-wrapper" v-show="circleSearchContentShow">-->
                  <!--<input type="text" name="circle-search-content" class="circle-search-content" autocomplete="off" v-model="circleContent">-->
                  <!--<i class="search-icon el-icon-search"></i>-->
                  <!--<div class="search-tip" v-show="circleContent !=='' ">-->
                  <!--<ul>-->
                  <!--<li class="search-item" v-for="(item, index) in searchTips" :key="index" @click="selectCircleItem(item)">-->
                  <!--{{item}}-->
                  <!--</li>-->
                  <!--</ul>-->
                  <!--</div>-->
                  <!--</div>-->
                  <!--</div>-->
                </div>
              </div>
            </div>
            <!--<div class="time">-->
            <!--<div class="name time-name">-->
            <!--接单时间-->
            <!--</div>-->
            <!--<div class="input-wrapper">-->
            <!--<div class="time-wrapper">-->
            <!--&lt;!&ndash;<input type="text" name="time-day" class="time-day" autocomplete="off" @blur="handleTime($event, 7)">&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="time-day-text">天</span>&ndash;&gt;-->
            <!--&lt;!&ndash;<input type="text" name="time-hour" class="time-hour" autocomplete="off" @blur="handleTime($event, 23)">&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="time-hour-text">小时</span>&ndash;&gt;-->
            <!--<el-select v-model="selectDeadlineValue" placeholder="请选择">-->
            <!--<el-option v-for="item in deadlineOptions"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--<span class="time-tip">问题存在的天数</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <div class="deadline">
              <div class="name deadline-name">
                截止时间
              </div>
              <div class="input-wrapper">
                <div class="deadline-wrapper">
                  <!--<input type="text" name="deadline-day" class="deadline-day" autocomplete="off" @blur="handleTime($event, 6)">-->
                  <!--<span class="deadline-day-text">天</span>-->
                  <!--<input type="text" name="deadline-hour" class="deadline-hour" autocomplete="off" @blur="handleTime($event, 23)">-->
                  <!--<span class="deadline-hour-text">小时</span>-->
                  <el-select v-model="selectDeadlineValue" placeholder="请选择">
                    <el-option v-for="item in deadlineOptions"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                  <span class="deadline-tip">从成功接单起有回答权力的天数</span>
                </div>
              </div>
            </div>
            <div class="reward">
              <div class="name reward-name">
                奖励
              </div>
              <div class="input-wrapper">
                <div class="reward-wrapper">
                  <input type="text" name="reward" class="reward-content" autocomplete="off" @blur="handleTime($event, 999)">
                  <span class="reward-text">点</span>
                </div>
              </div>
            </div>
            <div class="release-btn-wrapper">
              <div class="release-btn">
                <div class="submit-btn" @click="_launchTask">发布</div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="appoint-circle" v-show="isFromId">
        <div class="mask" @click="hideMask"></div>
        <div class="circle-content">
          <div class="circle-title">请选择发布到哪个圈子</div>
          <div class="tag-wrapper">
            <el-select v-model="fromId" placeholder="请选择">
              <el-option v-for="item in circleOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="circle-submit" @click="circleSubmit">确定</div>
        </div>
      </div>
      <div class="mask1" v-loading="maskLoading" v-show="maskLoading"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery'
  import {reqSearchTip, uploadFile, getAllTopicTags, launchTask, userJoinCircle} from '../../api/index.js'
  import editor from '../common/editor.vue'
  export default {
    data () {
      return {
        path: '/tanqiu/launchTask',
        textarea: '',
        circleContent: '',
        personContent: '',
        personResult: '',
        circleResult: '',
        circleSelected: false,
        personSelected: false,
        personAppointSelected: false,
        circleAppointSelected: false,
        searchTips: [],
        searchResults: '',
        personSearchContentShow: false,//用来控制个人任务指定对象的searchTip的显示和隐藏
        circleSearchContentShow: false,//用来控制圈子任务指定对象的searchTip的显示和隐藏
        itemText: '',//在点击了searchTip以后，将item的值赋给该变量，从而隐藏searchTip
        value: '',
        content: '',//富文本编辑器的内容
        editorSetting:{
          height:220,
        },
        isEditorMounted: false,//表示tinymce是否被创建，用来解决切换路由以后，tinymce获取不到焦点的问题
        //单选框和复选框是否选择
        anonymous: false,//是否匿名
        mode: '',//接单模式为单向还是双向
        taskType: '',//接单类型为个人任务还是圈子任务
        personIsAppoint: '',//个人任务是否指定对象
        circleIsAppoint: '',//圈子任务是否指定对象
        topicOptions: [
        ],//话题标签的选择
        selectTopicValue: '',//话题标签的选择结果
        timeOptions: [
          {
            value: '选项1',
            label: '1小时',
          },
          {
            value: '选项2',
            label: '3小时',
          },
          {
            value: '选项3',
            label: '12小时',
          },
          {
            value: '选项4',
            label: '24小时',
          }
        ],//问题存在的时间的选择
        selectTimeValue: '',//问题存在的选择时间的结果
        deadlineOptions: [
          {
            value: '60',
            label: '1小时',
          },
          {
            value: '180',
            label: '3小时',
          },
          {
            value: '720',
            label: '12小时',
          },
          {
            value: '1440',
            label: '24小时',
          }
        ],//截止时间的选择
        selectDeadlineValue: '',//截止时间的结果
        circleOptions: [],//所加入的圈子的选择
        fromId: '',//选择的圈子
        isFromId: false,//选择的圈子的界面是否显示
        isCollapse: true,//更多设置是否折叠
        maskLoading: false,//发送任务的加载的显示
      }
    },
    created () {
      this._getAllTopicTags()//获取用户话题的标签
      this._userJoinCircle()//获取用户加入的所有圈子
      window.onscroll = null
      this.isEditorMounted = true//创建tinymce编辑器
    },
    methods: {
      //展开更多设置
      unfoldSetting () {
        if (this.isCollapse) {
          this.isCollapse = false
          let height = $('.more-setting-container').height()
          $('.more-setting-wrapper').animate({height: height + 50 + 'px'}, 200)
          $('.el-icon-caret-bottom').css({"transform": "rotateZ(-90deg)"})
        } else {
          this.isCollapse = true
          $('.more-setting-wrapper').animate({height: 0}, 200)
          $('.el-icon-caret-bottom').css({"transform": "rotateZ(0)"})
        }
      },
      //隐藏用户选择圈子的遮罩
      hideMask () {
        this.isFromId = false
        this.taskType = ''
        this.personSelected = true//将个人任务后面的是否指定对象按钮显示
        this.circleSelected = false//将圈子任务后面的是否指定圈子按钮隐藏
        this.circleAppointSelected = false//将圈子任务后面的指定圈子的搜索框隐藏
        this.searchResults = []//将圈子任务后面指定圈子的搜索框的提示内容置为空
        this.fromId = ''
      },
      //提交用户选择的以什么样的名义的圈子发布的任务
      circleSubmit () {
        if (this.fromId === '') {
          this.$message({
            type: 'error',
            showClose: true,
            message: '请至少选择一个圈子'
          })
        } else {
          this.isFromId = false
        }
      },
      //获取用户加入的圈子
      async _userJoinCircle () {
        let result = await userJoinCircle()
        console.log(result)
        if (result.success) {
          result.data.forEach((item) => {
            let object = {
              value: item.circleId,
              label: item.circleName
            }
            this.circleOptions.push(object)
          })
        }
      },
      //发布任务
      async _launchTask () {
        let questionTitle = $('.title-text').val()
        let questionContent = this.content
        let ret = /<img\S*src="(\S*)"[^>]+>/
        let questionPhoto = ''
        if (ret.test(questionContent.replace(/\s*/g, ''))) {
          questionPhoto = questionContent.replace(/\s*/g, '').match(ret)[1]
        }
        let questionAnonymity = this.anonymous
        let topicId = this.selectTopicValue//tagId
        let mode = this.mode//oneWay或者是doubleWay
        let type = this.taskType//personTask 或者是circleTask
        let taskType = ''
        if (mode === 'oneWay' && type === 'personTask') {
          taskType = 31
        } else if (mode === 'doubleWay' && type === 'personTask') {
          taskType = 32
        } else if (mode === 'oneWay' && type === 'circleTask') {
          taskType = 41
        } else if (mode === 'doubleWay' && type==='circleTask') {
          taskType = 42
        }
        let taskTimeLimit = this.selectDeadlineValue
        let taskAwardActiveness = $('.reward-content').val()
        if (questionTitle === '') {
          this.$message({
            type: 'error',
            showClose: true,
            message: '标题未设置！'
          })
        } else if (questionContent === '') {
          this.$message({
            type: 'error',
            showClose: true,
            message: '描述未设置！'
          })
        } else {
          this.maskLoading = true
          console.log(questionPhoto,questionAnonymity,questionContent,questionTitle,topicId,taskType,taskAwardActiveness,taskTimeLimit,this.fromId)
          let result = await launchTask(questionPhoto,questionAnonymity,questionContent,questionTitle,topicId,taskType,taskAwardActiveness,taskTimeLimit,this.fromId)
            console.log(result)
            if (result.success) {
              this.$message({
                type: 'success',
                showClose: true,
                message: '发布成功！'
              })
              this.clearData()
              this.$router.push('/tanqiu/square/task')
            } else {
              this.$message({
                type: 'error',
                showClose: true,
                message: result.msg
              })
          }
          this.maskLoading = false
        }
      },
      //清空发布任务输入框和单选框复选框的所有数据
      clearData () {
        $('.title-text').val('')
        this.content = ''
        this.anonymous = false
        this.selectTopicValue = ''
        this.mode = ''
        this.taskType = ''
        this.selectDeadlineValue = ''
        $('.reward-content').val('')
      },
      //获取话题标签
      async _getAllTopicTags () {
        let result = await getAllTopicTags()
        console.log(result)
        if (result.success) {
          result.data.forEach((item) => {
            let object = {
              value: item.tagId,
              label: item.tagName
            }
            this.topicOptions.push(object)
          })
        }
      },
      getInput (content) {
        this.content = content
      },
      toggleState (index) {
        if (index === 0) {
          this.personSelected = true//将个人任务后面的是否指定对象按钮显示
          this.circleSelected = false//将圈子任务后面的是否指定圈子按钮隐藏
          this.circleAppointSelected = false//将圈子任务后面的指定圈子的搜索框隐藏
          this.searchResults = []//将圈子任务后面指定圈子的搜索框的提示内容置为空
        } else {
          this.isFromId = true
          this.personSelected = false
          this.circleSelected = true
          this.personAppointSelected = false
          this.searchResults = []
        }
      },
      //当个人任务指定对象输入框失去焦点的时候 ，将searchTip隐藏
      personSearchInputBlur () {
        setTimeout(() => {
          this.personSearchContentShow = false
        }, 100)
      },
      circleSearchInputBlur () {
        setTimeout(() => {
          this.circleSearchContentShow = false
        }, 100)
      },
      //用于显示搜索提示的显示与隐藏
      changeState (str) {
        if (str === '00') {
          this.personAppointSelected = true
        } else if (str === '01') {
          this.personAppointSelected = false
        } else if (str === '10') {
          this.circleAppointSelected = true
        } else {
          this.circleAppointSelected = false
        }
      },
      //用于异步获取搜索提示的数据
      async getSearchResults (w) {
        let results = await reqSearchTip(w)
        if (results.code === 0) {
          this.searchTips = results.searchResults
        }
      },
      selectPersonItem (item) {
        this.personResult = item
        this.itemText = item
        this.personSearchContentShow = false
      },
      selectCircleItem (item) {
        this.circleResult = item
        this.itemText = item
        this.circleSearchContentShow = false
      },
      changeTip (index) {
        if (index === 0) {
          $('.tip').html('最快抢单者为接单者')
        } else {
          $('.tip').html('任意发布者根据有意向接单用户所提交的回答质量指定最终接单者')
        }
      },
      handleTime (e, size) {
        let value = e.target.value
        let reg = /^[0-9]+$/
        if (reg.test(value)) {
          if (parseInt(value) > size) {
            e.target.value = size
          }
        } else {
          e.target.value = ''
        }
      }
    },
    watch: {
      '$route' () {
        if (this.$route.path === this.path) {
          window.onscroll = null
          this.isEditorMounted = false
          setTimeout(() => {
            this.isEditorMounted = true//每次切换路由的时候重新创建一次tinymce，解决切换路由以后获取不到焦点的问题
          }, 20)
        }
      },
      personContent () {
        if (this.personContent !== '') {
          let value = this.personContent
          this.getSearchResults(value)
        }
      },
      circleContent () {
        if (this.circleContent !== '') {
          let value = this.circleContent
          this.getSearchResults(value)
        }
      },
      personResult () {
        this.personContent = this.personResult
        if (this.personResult !== '') {
          if (this.itemText !== this.personResult) {
            this.personSearchContentShow = true
          }
        }
      },
      circleResult () {
        this.circleContent = this.circleResult
        if (this.circleResult !== '') {
          if (this.itemText !== this.circleResult) {
            this.circleSearchContentShow = true
          }
        }
      }
    },
    components: {
      editor
    }
  }
</script>

<style scoped>
  .mask1 {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
  }
  .launch-task {
    width: 100%;
  }
  .container {
    width: 1180px;
    min-height: 100vh;
    margin: 0 auto;
    padding: 50px 25px 50px 25px;
    background-color: white;
    box-sizing: border-box;

  }
  .header {
    height: 30px;
  }
  .header:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
  .color-block {
    display: inline-block;
    width: 10px;
    height: 30px;
    background-color: #4993a8;
    vertical-align: middle;
  }
  .header-text {
    display: inline-block;
    margin-left: 10px;
    font-size: 26px;
    vertical-align: middle;
  }
  .wrapper {
    width: 100%;
    padding-left: 100px;
    box-sizing: border-box;
  }
  .form {
    width: 100%;
  }
  .title {
    margin-top: 40px;
    height: 45px;
    display: flex;
  }
  .name {
    display: inline-block;
    flex: 0 150px;
    font-size: 20px;
    letter-spacing: 2px;
  }
  .input-wrapper {
    flex: 1;
    position: relative;
  }
  .title-name {
    height: 45px;
    line-height: 45px;
  }
  .title-text {
    width: 603px;
    height: 39px;
    border: 0;
    background-color: #f4f4f4;
    /*border: 1px solid #4893a8;*/
    text-indent: 2em;
    font-size: 18px;
  }
  .description {
    margin-top: 40px;
    height: 351px;
    display: flex;
  }
  .more-setting-wrapper {
    overflow: hidden;
  }
  .setting-title {
    color: #01a9ce;
    font-size: 18px;
    cursor: pointer;
  }
  .setting-title:hover {
    color: #4893a8;
  }
  .el-icon-caret-bottom {
    transition: all linear 0.2s;
  }
  .input-container {
    width: 608px;
    height: 266px;
  }
  .setting {
    margin-top: 10px;
  }
  .anonymous-wrapper {
    position: absolute;
    bottom: 10px;
    left: 500px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    font-size: 0;
  }
  /*input[type=checkbox].anonymous, input[type=radio].one-way, input[type=radio].double-way, input[type=radio].person-task, input[type=radio].circle-task,*/
  /*input[type=radio].appoint, input[type=radio].unappoint*/
  /*{*/
    /*width: 10px;*/
    /*height: 10px;*/
    /*margin: 15px;*/
  /*}*/
  /*.anonymous::before, .one-way::before, .double-way::before, .person-task::before, .circle-task::before, .appoint::before, .unappoint::before {*/
    /*content: '';*/
    /*position: absolute;*/
    /*width: 24px;*/
    /*height: 24px;*/
    /*left: 8px;*/
    /*top: 8px;*/
    /*border: 1px solid #ccc;*/
    /*background-color: white;*/
    /*border-radius: 50%;*/
  /*}*/
  /*.anonymous::after, .one-way::after, .double-way::after,  .person-task::after, .circle-task::after, .appoint::after, .unappoint::after {*/
    /*content: '';*/
    /*position: absolute;*/
    /*width: 14px;*/
    /*height: 14px;*/
    /*left: 14px;*/
    /*top: 14px;*/
    /*background-color: white;*/
    /*border-radius: 50%;*/
    /*z-index: 2;*/
  /*}*/
  /*.anonymous:checked::after, .one-way:checked::after, .double-way:checked::after, .person-task:checked::after, .circle-task:checked::after,*/
  /*.appoint:checked::after, .unappoint:checked::after {*/
    /*background-color: green;*/
  /*}*/
  .anonymous-text, .oneWay-text, .doubleWay-text, .person-task-text, .circle-task-text, .appoint-text, .unappoint-text {
    color: #636363;
    font-size: 20px;
    margin-left: 10px;
    position: relative;
    top: 3px;
  }
  .topic {
    display: flex;
    margin-top: 40px;
    height: 45px;
  }
  .topic-name {
    height: 45px;
    line-height: 45px;
  }
  .input-wrapper1 {
    flex: 1;
  }
  .topic-text {
    width: 304px;
    height: 39px;
    border: none;
    background-color: #f4f4f4;
    text-indent: 2em;
    font-size: 18px;
  }
  .mode {
    display: flex;
    margin-top: 40px;
    height: 45px;
  }
  .mode-name {
    height: 45px;
    line-height: 45px;
  }
  .oneWay-wrapper, .doubleWay-wrapper {
    display: inline-block;
    width: 100px;
    height: 40px;
    line-height: 40px;
    position: relative;
    margin-left: 30px;
  }
  .doubleWay-wrapper {
    margin-left: 60px;
  }
  .tip {
    display: inline-block;
    margin-left: 60px;
    font-size: 13px;
    color: #a7a7a7;
  }
  .type {
    margin-top: 40px;
    display: flex;
    height: 110px;
  }
  .input-container2 {
    height: 45px;
    position: relative;
  }
  .input-container3 {
    height: 45px;
    position: relative;
  }
  .input-container3:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 45px;
  }
  .person-task-wrapper, .circle-task-wrapper {
    display: inline-block;
    margin-left: 30px;
    width: 160px;
    height: 40px;
    position: relative;
    line-height: 40px;
  }
  .appoint-wrapper, .unappoint-wrapper {
    display: inline-block;
    margin-left: 100px;
    width: 160px;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .unappoint-wrapper {
    margin-left: 40px;
  }
  .search-container {
    position: absolute;
    left: 300px;
    top: 50px;
    z-index: 2;
  }
  .person-search-result-wrapper, .circle-search-result-wrapper {
    position: absolute;
    width: 140px;
    height: 28px;
    padding: 1px 4px 4px 4px;
    box-sizing: border-box;
    left: 0;
    top: 0;
    background-color: #f4f4f4;
  }
  .person-search-result, .circle-search-result {
    width: 100%;
    height: 18px;
    border: 0;
    font-size: 13px;
    color: #a7a7a7;
  }
  .circle-search-wrapper, .person-search-wrapper {
    display: inline-block;
    width: 192px;
    height: 40px;
    background-color: #f4f4f4;
    padding: 6px 0 8px 8px;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 50px;
  }
  .circle-search-content, .person-search-content {
    width: 146px;
    height: 24px;
    border: 0;
    border-radius: 3px;
  }
  .search-icon {
    color: #959595;
    font-size: 20px;
    position: relative;
    top: 4px;
    cursor:pointer;
  }
  .search-tip {
    width: 192px;
    position: absolute;
    left: 0;
    top: 40px;
    background-color: #f4f4f4;
  }
  .search-tip ul {
    width: 192px;
    padding-left: 8px;
    padding-right: 8px;
    box-sizing: border-box;
    background-color: #f4f4f4;
    max-height: 120px;
    overflow: auto;
  }
  .search-item {
    width: 100%;
    height: 30px;
    line-height: 30px;
    list-style: none;
    color: #a7a7a7;
    cursor: pointer;
    font-size: 14px;
  }
  .search-item:hover {
    background-color: rgba(0,0,0,0.5)
  }
  .time {
    display: flex;
    margin-top: 40px;
  }
  .time-name {
    height: 45px;
    line-height: 45px;
  }
  .time-wrapper, .deadline-wrapper {
    height: 45px;
  }
  .time-wrapper:before, .deadline-wrapper:before, .reward-wrapper:before {
    content: '';
    height: 45px;
    display: inline-block;
    vertical-align: middle;
  }
  .time-day, .time-hour, .deadline-day, .deadline-hour {
    display: inline-block;
    vertical-align: middle;
    margin-left: 40px;
    width: 34px;
    height: 30px;
    background-color: #f4f4f4;
    border: 0;
    font-size: 20px;
    padding: 5px;
    box-sizing: border-box;
  }
  .time-day-text, .time-hour-text, .deadline-day-text, .deadline-hour-text, .reward-text {
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    color: #636363;
    margin-left: 20px;
  }
  .time-tip, .deadline-tip {
    display: inline-block;
    margin-left: 60px;
    font-size: 13px;
    color: #a7a7a7;
  }
  .deadline {
    margin-top: 40px;
    display: flex;
  }
  .deadline-name {
    height: 45px;
    line-height: 45px;
  }
  .reward {
    margin-top: 40px;
    display: flex;
  }
  .reward-name {
    height: 45px;
    line-height: 45px;
  }
  .reward-wrapper {
    height: 45px;
  }
  .reward-content {
    display: inline-block;
    vertical-align: middle;
    width: 50px;
    height: 30px;
    padding: 5px;
    box-sizing: border-box;
    background-color: #f4f4f4;
    font-size: 20px;
    margin-left: 40px;
    border: 0;
  }
  .release-btn-wrapper {
    width: 100%;
    margin-top: 40px;
    height: 45px;
    position: relative;
  }
  .release-btn {
    position: absolute;
    right: 150px;
    width: 80px;
    height: 35px;
    border: 1px solid #01a9ce;
    border-radius: 5px;
  }
  .submit-btn {
    border: 0;
    font-size: 20px;
    width: 75px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #01a9ce;
    margin: 2.5px;
    letter-spacing: 5px;
    background-color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  .submit-btn:hover {
    color: white;
    background-color: #01a9ce;
  }
  .appoint-circle {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 5;
  }
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    background-color: rgba(0,0,0,0.8);
  }
  .circle-content {
    position: absolute;
    z-index: 20;
    background-color: white;
    width: 400px;
    height: 250px;
    margin-top: 50vh;
    margin-left: 50%;
    transform: translate3d(-50%, -50%, 0);
    border-radius: 10px;
    padding: 30px;
  }
  .circle-title {
    font-size: 24px;
    color: #4893a8;
  }
  .tag-wrapper {
    margin-top: 50px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .circle-submit {
    position: absolute;
    bottom: 40px;
    right: 30px;
    border: 1px solid #4893a8;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #4893a8;
    cursor: pointer;
    border-radius: 4px;
  }
</style>
