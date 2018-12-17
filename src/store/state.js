import {getCookie, getStorage} from '../api/util.js'
export default{
  //CHR
  elites:[],
  circles:[],
  acts:[],
  //探圈详情页
  circleDetailId: -1,
  isManagement: false,
  //搜索页面的数据
  query: '',
  //XY探求页面的数据
  questions: [],
  tasks: [],
  myQuestions: [],
  myAnswers: [],
  myAttentionQuestions: [],
  myLaunchTasks: [],
  myUndertakeTasks: [],
  myAttentionTasks: [],
  taskDetailId: '',
  questionDetailId: '',
  isMe: getMe(),//是否登录
  taskApplication: [],//任务发起人查看的接单申请
  notMeTaskApplication: [],//第三方查看接单者回答
  otherAnswer: [],//任务发起人查看回答
  notMeOtherAnswer: [],//第三方查看其他回答
  questionAnswers: [],//问题详情页下面的回答
  //XY我的下面的数据
  avatar: '',
  self: {},
  dynamic: [],
  circle: [],
  questionAnswer: [],
  live: [],
  task: [],
  activity: [],
  topic: [],
  friend: [],
  collect: [],
  //好友列表的数据
  friendList: [],
  talkFriend: {},
  talkHistory: [],
  //个人设置，身份验证
  isAuthentication: getAuthentication(),
  isNameIdentify: false,//是否实名认证过
  //私信列表数据
  privateLetter: [],
  privateLetterDetailId: 0,
  PLunReadNum: 0,//未读私信的条数
  //登录注册下面的数据
  isPasswordLogin: true,//密码登录
  isVerificationLogin: false,//验证码登录
  isLogin: true,//登录
  isRegister: false,//注册
  isRegisterPhone: true,//注册手机号码
  isRegisterNamePassword: false,//注册用户名和密码
  sessionId: getCookie('JSESSIONID'),//登录以后返回的用户数据
  //环信的数据
  isLoginHuanxin: false,//是否登陆环信
}

function getMe () {
  let cookie = getCookie('JSESSIONID')
  if (cookie !== undefined) {
    return true
  } else {
    return false
  }
}

function getAuthentication () {
  let cookie = getCookie('authenticationToken')
  if (cookie !== undefined) {
    return true
  } else {
    return false
  }
}
