<template>
  <div class="write-management">
    <head-nav></head-nav>
    <div class="container content-wrapper">
      <div class="title-copy" style="position: absolute;z-index: -1;width:10px;height:10px;overflow: hidden;white-space: nowrap">
        <div class="title-copy-content" style="display: inline-block;font-size: 20px;"></div>
      </div>
      <div class="return" @click="back()">
        <i class="el-icon-d-arrow-left"></i>
        <span class="return-text">返回</span>
      </div>
      <div class="content">
        <div class="side-bar-wrapper">
          <div class="side-bar">
          <div class="nav">
            <div class="nav-item">
              <div class="nav-title" :class="{'current': index1 === 0}" @click="current(0)">
                我未发布的文章
              </div>
              <i class="arrow el-icon-arrow-right" @click="dropdownCurrent(0)"></i>
              <div class="dropdown-wrapper">
                <div class="dropdown-menu">
                 <div class="menu-item-1" v-for="(item, index) in unPublistText" :class="{'current': index1 === 0 && dropdownIndex === index}" @click="menuItemCurrent(0,item, index)">
                   <div class="menu-item-title">{{handleTitle(item.articleName)}}</div>
                   <div class="time">{{handleTime(item.articleCreateTime)}}</div>
                 </div>
                </div>
              </div>
            </div>
            <div class="nav-item">
              <div class="nav-title" :class="{'current': index1 === 1}" @click="current(1)">
                我的推文
              </div>
              <i class="arrow el-icon-arrow-right" @click="dropdownCurrent(1)"></i>
              <div class="dropdown-wrapper">
                <div class="dropdown-menu">
                 <div class="menu-item-1" v-for="(item, index) in myPublistText" :class="{'current': index1 === 1 && dropdownIndex === index}" @click="menuItemCurrent(1,item, index)">
                   <div class="menu-item-title">{{handleTitle(item.articleName)}}</div>
                   <div class="time">{{handleTime(item.articleCreateTime)}}</div>
                 </div>
                </div>
              </div>
            </div>
            <div class="nav-item">
              <div class="nav-title" :class="{'current': index1 === 2}"  @click="current(2)">
                公开的文章
              </div>
              <i class="arrow el-icon-arrow-right" @click="dropdownCurrent(2)"></i>
              <div class="dropdown-wrapper">
                <div class="dropdown-menu">
                 <div class="menu-item-1" v-for="(item, index) in myPublicText" :class="{'current': index1 === 2 && dropdownIndex === index}" @click="menuItemCurrent(2, item, index)">
                   <div class="menu-item-title">{{handleTitle(item.articleName)}}</div>
                   <div class="time">{{handleTime(item.articleCreateTime)}}</div>
                 </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div class="write" :class="{'editorStyle': !isEditorStyle}" @click="" v-if="isEditorSet">
          <div class="btns-wrapper">
            <div class="keep-btn" @click="_keepText">保存</div>
            <div class="delete-btn" v-if="articleId !== ''" @click="deleteText">删除</div>
            <div class="launch-btn" v-if="articleId !== '' && !isLaunched" @click="showSelect">发布</div>
            <div class="new-btn" @click="newText">+新建</div>
          </div>
          <div class="write-title-wrapper">
            <input type="text" class="write-title-input" v-model="title" placeholder="请输入文章标题">
          </div>
          <write-text @editorInited="editorInited" ref="editor" class="editor" :value="value" :setting="editorSetting" @input="getInput"></write-text>
        </div>
      </div>
    </div>
    <div class="loading-mask-wrapper" v-if="loading">
      <div class="loading-mask" v-loading="loading"></div>
    </div>
    <div class="launch-mask-wrapper" v-if="isShowSelect">
      <div class="launch-content">
        <div class="close" @click="hideSelect">x</div>
        <div class="launch-title">请选择要发布的类型</div>
        <div class="launch-btns-wrapper">
          <div class="btn" :class="{'current': selectLaunchType === 0}" @click="selectPublic">公开文章</div>
<!--           <div class="btn" :class="{'current': selectLaunchType === 1}" @click="selectColumn">文章专栏</div>
          <div class="btn" :class="{'current': selectLaunchType === 2}" @click="selectCircle">圈子专题</div> -->
          <div class="btn" :class="{'current': selectLaunchType === 3}" @click="selectPush">推文</div>
        </div>
        <div class="select-circle-wrapper" v-if="selectLaunchType === 2 || selectLaunchType === 3">
          <el-select v-model="selectCircleValue"
                       filterable
                       remote
                       reserve-keyword
                       :remote-method="remoteMethod"
                       placeholder="请选择要发布的圈子">
              <el-option v-for="item in circleOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
        </div>
        <div class="submit-btn" @click="_launchText">提交</div>
      </div>
    </div>
    <confirm-text ref="confirm" title="确认要删除该文章吗？" @confirm="confirmDel">
    </confirm-text>
    <foot-bar></foot-bar>
  </div>
</template>

<script>
  import headNav from '../Ccomponents/headNav.vue'
  import footBar from '../Ccomponents/footBar.vue'
  import writeText from './writeText.vue'
  import {keepText, getUnpublistText, getUserJoinAllCircle, launchText, delText, getMyPublishText, getMyPublicText} from '../../api/index.js'
  import $ from 'jquery'
  import confirmText from '../common/confirmText.vue'
  export default {
    data () {
      return {
        index1: 0,//表示当前的nav-item
        dropdownIndex: -1,//表示当前的下拉菜单的index值
        value: '',//tinymce的值
        editorSetting: {
          height: 600
        },
        content: '',//用户输入的内容
        isEditorStyle: false,//将tinymce透明度设置为0，以便样式设置
        contentTimer: null,//编辑器输入内容的频率
        title: '',//文章的标题
        loading: false,//用户进行操作时，loading显示的遮罩
        isEditorSet: true,//是否创建tinymce编辑器
        articleId: '',//当前显示的文章的id
        unPublistText: [],//未发布的文章
        isLaunched: false,//表示该文章是否发布过
        isShowSelect: false,//点击发布显示选择发布文章类型的弹窗
        selectLaunchType: -1,//选择发布文章的类型的id
        circleList: [],//获取所有的圈子
        circleOptions: [],//话题标签的选择
        selectCircleValue: '',//话题标签的选择结果
        myPublistText: [],//我的推文列表
        myPublicText: [],//我的公开的文章的列表
      }
    },
    mounted () {
      //获取未发布的文章
      this._getUnpublistText()
      //获取我的推文
      this._getMyPublishText()
      //获取我公开的文章
      this._getMyPublicText()
    },
    methods: {
      //删除文章，弹出确认框
      deleteText () {
        this.$refs.confirm.show()
      },
      //确认删除文章
      confirmDel () {
        this._delText()
      },
      showSelect () {
        this.isShowSelect = true
      },
      hideSelect () {
        this.isShowSelect = false
      },
      //选择公开文章
      selectPublic () {
        this.selectLaunchType = 0
      },
      //选择文章专栏
      selectColumn () {
        this.selectLaunchType = 1
      },
      //选择圈子专题
      selectCircle () {
        this.circleOptions = []
        this.circleList = []
        this.selectType = -1
        this.selectCircleValue = ''
        setTimeout(() => {
        this.selectLaunchType = 2
        this._getUserJoinAllCircle()
        }, 20)
      },
      //选择推文
      selectPush () {
        this.circleOptions = []
        this.circleList = []
        this.selectType = -1
        this.selectCircleValue = ''
        setTimeout(() => {
          this.selectLaunchType = 3
          this._getUserJoinAllCircle()
        }, 20)
      },
      //远程搜索标签的函数
      remoteMethod (query) {
        if (query !== '') {
          this.circleOptions = this.circleList.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        } else {
          this.circleOptions = this.circleList;
        }
      },
      //在进行异步操作以后，将数据清空
      deleteData () {
        //重新刷新编辑器，内容置为空
            this.newText()
            //由于接下里要重新获取未发布的文章的数据，所以要将下拉菜单收起
            this.dropdownIndex = -1
            this.selectLaunchType = -1
            this.articleId = ''
            this.selectCircleValue = ''
            this.dropdownCurrent(this.index1)
      },
      //创建新的文章
      newText () {
        this.articleId = ''
        this.isEditorSet = false
        setTimeout(() => {
          this.dropdownIndex = -1
          this.title = ''
          this.isEditorStyle = false//将tinymce透明度设置为0
          this.isEditorSet = true
        }, 20)
      },
      //删除文章
      async _delText () {
        this.loading = true
        let type = -1
        if (this.index1 === 0) {
          type = -1
        } else if (this.index1 === 1) {
          type = 3
        } else if (this.index1 === 2) {
          type = 0
        }
        console.log(this.articleId, type)
        let result = await delText(this.articleId, type)
        console.log(result)
        if (result.success) {
          this.$message({
            type: 'success',
            showClose: true,
            message: '删除成功！'
          })
          this.deleteData()
          //重新获取未发布的文章的数据
            this._getUnpublistText()
            //获取我的推文
            this._getMyPublishText()
            //获取公开的文章 
            this._getMyPublicText()
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: result.msg
          })
        }
        this.loading = false
      },
      //发布文章
      async _launchText () {
        let type = ''
        let targetId = ''
        let articleId = ''
        if (this.selectLaunchType === 3) {
          type = this.selectLaunchType
          targetId = this.selectCircleValue
          articleId = this.articleId
        } else if (this.selectLaunchType === 0) {
          type = this.selectLaunchType
          targetId = ''
          articleId = this.articleId
        }
        if (type === '') {
          this.$message({
            type: 'warning',
            showClose: true,
            message: "请选择类型"
          })
          return
        } 
        if (type === 3 && targetId === '') {
          this.$message({
            type: 'warning',
            showClose: true,
            message: '请选择圈子'
          })
          return
        }
        this.loading = true
        console.log(articleId, targetId, type)
        let result = await launchText(articleId, targetId, type)
        console.log(result)
        if (result.success) {
          this.$message({
            type: 'success',
            showClose: true,
            message: '发布成功！'
          })
          this.hideSelect()
          this.deleteData()
            //重新获取未发布的文章的数据
            this._getUnpublistText()
            //重新获取推文
            this._getMyPublishText()
            //重新获取公开的文章
            this._getMyPublicText()
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: result.msg
          })
        }
        this.loading = false
      },
      //保存文章
      async _keepText () {
        let articleName = $('.write-title-input').val()
        let articleContent = this.content
        let ret = /<img\S*src="(\S*)"[^>]+>/;
        let articlePhoto = ''
        if (ret.test(articleContent.replace(/\s*/g, ''))) {
          articlePhoto = articleContent.replace(/\s*/g, '').match(ret)[1]
          console.log(articlePhoto)
        }
        let articleType = 0
        if (articleName.length === 0) {
          this.$message({
            type: 'warning',
            showClose: true,
            message: '文章名为空！'
          })
        } else if (articleContent.length === 0) {
          this.$message({
            type: 'warning',
            showClose: true,
            message: "文章内容为空！"
          })
        } else {
          this.loading = true
          console.log(articleName, articleContent, articlePhoto, articleType)
          let result = await keepText(articleName, articleContent, articlePhoto, this.articleId)
          console.log(result)
          if (result.success) {
            this.$message({
              type: 'success',
              showClose: true,
              message: '保存成功！'
            })
            this.deleteData()
            //重新获取未发布的文章的数据
            this._getUnpublistText()
            //获取我的推文
            this._getMyPublishText()
            //获取公开的文章
            this._getMyPublicText()
          }
          this.loading = false
        }
      },
      //获取未发布的文章
      async _getUnpublistText () {
        let result = await getUnpublistText()
        console.log(result)
        if (result.success) {
          this.unPublistText = result.data
        }
      },
      //获取我的推文
      async _getMyPublishText () {
        let result = await getMyPublishText()
        console.log(result)
        if (result.success) {
          this.myPublistText = result.data
        }
      },
      //获取我公开的文章
      async _getMyPublicText () {
        let result = await getMyPublicText()
        console.log(result)
        if (result.success) {
          this.myPublicText = result.data
        }
      },
      //获取用户加入的所有的圈子
      async _getUserJoinAllCircle () {
        let _this = this
        let result = await getUserJoinAllCircle()
        console.log(result)
        if (result.success) {
          let list = result.data
          list.forEach((item) => {
            _this.circleList.push({
              value: item.circleId,
              label: item.circleName
            })
          })
          console.log(this.circleList)
          this.circleOptions = this.circleList
        }
      },
      //tinymce已经创建好了的回调函数
      editorInited () {
        this.isEditorStyle = false
        setTimeout(() => {
          this.isEditorStyle = true
        }, 200)
      },
      getInput (content) {
        this.content = content
      },
      back () {
        this.$router.go(-1)
      },
      //更换当前nav-item的标识
      current (index) {
        this.dropdownIndex = -1//每次点击nav-title的时候将下拉菜单的样式消失
        this.index1 = index
      },
      //处理下拉菜单的文章标题
      handleTitle (title) {
        if (title.length > 6) {
          return title.substring(0, 7) + '...'
        } else {
          return title
        }
      },
      //处理下拉菜单的文章的时间
      handleTime (time) {
        return time.substring(0, 10)
      },
      //处理下拉菜单
      dropdownCurrent (index) {
        let name = document.getElementsByClassName('arrow')[index].className
        if (/current/.test(name)) {
          //说明已经是出于下拉状态了
          $(`.dropdown-wrapper:eq(${index})`).animate({
            height: '0px'
          })
          $(`.arrow:eq(${index})`).removeClass('current')
        } else {
          //说明还没处于下拉状态
          let height = $(`.dropdown-menu:eq(${index})`).height()
          $(`.dropdown-wrapper:eq(${index})`).animate({height: height + 'px'}, 200)
          $(`.arrow:eq(${index})`).addClass('current')
        }
      },
      //下拉菜单的点击事件
      menuItemCurrent (index,item, menuIndex) {
        this.index1 = index
        this.dropdownIndex = menuIndex
        if (index === 0) {
          //点击的是未发布的文章
          this.isLaunched = false
          this.articleId = item.articleId
          this.title = item.articleName
          this.$refs.editor.setEditorContent(item.articleContent)
        } else if (index === 1) {
          //点击的是我的推文
          this.isLaunched = true
          this.articleId = item.articleId
          this.title = item.articleName
          this.$refs.editor.setEditorContent(item.articleContent)
        } else if (index === 2) {
          //点击的是我公开的文章
          this.isLaunched = true
          this.articleId = item.articleId
          this.title = item.articleName
          this.$refs.editor.setEditorContent(item.articleContent)
        }
      }
    },
    watch: {
      title () {
        let input = $('.write-title-input')
        if (this.title.length === 0) {
          input.css({
            "width": "180px"
          })
        } else {
          $('.title-copy-content').text(this.title)
          let width = $('.title-copy-content').width()
          input.css({
            "width": width + 40 + 'px'
          })
        }
      }
    },
    components: {
      headNav,
      footBar,
      writeText,
      confirmText
    }
  }
</script>

<style scoped>
  .launch-mask-wrapper {
    position: fixed;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.5);
  }
  .launch-content {
    position: absolute;
    left: 50%;
    top: 50vh;
    transform: translate3d(-50%, -50%, 0);
    width: 500px;
    min-height: 350px;
    background-color: white;
    border-radius: 8px;
    padding: 30px;
    box-sizing: border-box;
    position: relative;
  }
  .close {
    position: absolute;
    right: 20px;
    top: 10px;
    cursor: pointer;
    font-size: 20px;
  }
  .close:hover {
    color: #4893a8;
  }
  .launch-title {
    text-align: center;
    font-size: 20px;
    color: #4893a8;
  }
  .launch-btns-wrapper {
    margin-top: 30px;
  }
  .btn {
    display: inline-block;
    width: 80px;
    height: 24px;
    text-align: center;
    cursor: pointer;
    line-height: 24px;
    transition: all 0.2s;
    border: 1px solid #4893a8;
    color: #4893a8;
    margin-right: 30px;
    border-radius: 3px;
  }
  .btn:last-child {
    margin-right: 0;
  }
  .btn:hover, .launch-content .submit-btn:hover {
    color: white;
    background-color: #4893a8;
  }
  .btn.current {
    background-color: #4893a8;
    color: white;
  }
  .launch-content .submit-btn {
    width: 60px;
    height: 24px;
    text-align: center;
    cursor: pointer;
    line-height: 24px;
    transition: all 0.2s;
    border: 1px solid #4893a8;
    color: #4893a8;
    margin-right: 30px;
    border-radius: 3px;
    position: absolute;
    right: 30px;
    bottom: 20px;
  }
  .select-circle-wrapper {
    display: inline-block;
    margin-top: 40px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .loading-mask-wrapper {
    position: fixed;
    z-index: 20;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .loading-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .content-wrapper {
    min-height: 100vh;
    padding-bottom: 30px;
    background-color: white;
  }
  .return {
    margin-top: 40px;
    margin-left: 100px;
    color: #777;
    font-size: 20px;
    cursor: pointer;
    display: inline-block;
    margin-bottom: 30px;
    border-bottom: 1px solid transparent;
  }
  .return:hover {
    border-bottom: 1px solid #777;
  }
  .content {
    display: flex;
  }
  .side-bar {
    flex: 0 250px;
    padding-top: 30px;
    padding-bottom: 30px;
    width: 250px;
    min-height: 400px;
    background-color: #4f4f4f;
  }
  .nav-item {
    position: relative;
  }
  .nav-title {
    width: 100%;
    color: white;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    padding: 15px 15px 15px 10px;
    box-sizing: border-box;
    letter-spacing: 1px;
  }
   .nav-title.current {
    background-color: #4893a8;
  }
  .arrow {
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 15px;
    cursor: pointer;
    font-size: 20px;
    color: white;
    transition: all 0.2s;
  }
  .arrow.current {
    transform: rotateZ(90deg);
  }
  .dropdown-wrapper {
    height: 0;
    overflow: hidden;
  }
  .menu-item-1 {
    padding: 10px 0 10px 20px;
    width: 100%;
    box-sizing: border-box;
    color: rgba(255,255,255,0.5);
    font-size: 14px!important;
    cursor: pointer;
    position: relative;
  }
  .menu-item-1.current {
    color: #4893a8;
  }
  .menu-item-1:hover {
    color: #4893a8;
  }
  .menu-item-title, .time {
    display: inline-block;
    vertical-align: top;
  }
  .time {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .write {
    flex: 1;
    margin-left: 40px;
    margin-right: 40px;
  }
  .editorStyle .editor {
    opacity: 0;
  }
  .btns-wrapper {
    width: 100%;
    height: 60px;
    position: relative;
  }
  .keep-btn {
    padding: 4px 10px;
    border: 1px solid green;
    color: green;
    cursor: pointer;
    font-size: 17px;
    display: inline-block;
    vertical-align: top;
    border-radius: 3px;
    transitio: all 0.2s;
  }
  .keep-btn:hover {
    color: white;
    background-color: green;
  }
  .delete-btn {
    padding: 4px 10px;
    border: 1px solid red;
    color: red;
    cursor: pointer;
    font-size: 17px;
    display: inline-block;
    vertical-align: top;
    border-radius: 3px;
    margin-left: 20px;
    transition: all 0.2s;
  }
  .delete-btn:hover {
    color: white;
    background-color: red;
  }
  .launch-btn {
    padding: 4px 10px;
    border: 1px solid #4893a8;
    color: #4893a8;
    cursor: pointer;
    font-size: 17px;
    display: inline-block;
    vertical-align: top;
    border-radius: 3px;
    margin-left: 20px;
    transition: all 0.2s;
  }
  .launch-btn:hover {
    color: white;
    background-color: #4893a8;
  }
  .new-btn {
    padding: 4px 10px;
    border: 1px solid #409EFF;
    color: #409EFF;
    cursor: pointer;
    font-size: 17px;
    display: inline-block;
    vertical-align: top;
    border-radius: 3px;
    margin-left: 20px;
    transition: all 0.2s;
  }
  .new-btn:hover {
    color: white;
    background-color: #409EFF;
  }
  .write-title-wrapper {
    width: 100%;
    height: 60px;
  }
  .write-title-input {
    border-bottom: 1px solid #333;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    outline: none;
    font-size: 20px;
    width: 180px;
    font-weight: 600;
    color: #333;
    margin-left: 50%;
    transform: translateX(-50%);
    max-width: 800px!important;
    text-indent: 1em;
  }
</style>
