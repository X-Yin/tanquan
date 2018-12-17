const mutations = {
  //探圈下面的函数
  getElites(state,elites){
    state.elites = elites
  },
  getcircles(state,circles){
    state.circles = circles
  },
  getacts(state,acts){
    state.acts = acts
  },
  gettasks(state,tasks){
    state.tasks = tasks
  },
  getCircleDetailId (state, circleDetailId) {
    state.circleDetailId = circleDetailId
  },
  getIsManagement (state, isManagement) {
    state.isManagement = isManagement
  },
  //搜索页面的函数
  getQuery (state, query) {
    state.query = query
  },
  //XY探求页面下的函数
  getQuestions (state, questions) {
	  state.questions = questions
  },
  getTasks (state, tasks) {
	  state.tasks = tasks
  },
  getMyAnswers (state, myAnswers) {
	  state.myAnswers = myAnswers
  },
  getMyAttentionQuestions (state, myAttentionQuestions) {
	  state.myAttentionQuestions = myAttentionQuestions
  },
  getMyLaunchTasks (state, myLaunchTasks) {
    state.myLaunchTasks = myLaunchTasks
  },
  getMyUndertakeTasks (state, myUndertakeTasks) {
    state.myUndertakeTasks = myUndertakeTasks
  },
  getMyAttentionTasks (state, myAttentionTasks) {
    state.myAttentionTasks = myAttentionTasks
  },
  getMyQuestions (state, myQuestions) {
	  state.myQuestions = myQuestions
  },
  getTaskDetailId (state, taskDetailId) {
	  state.taskDetailId = taskDetailId
  },
  getQuestionDetailId (state, questionDetailId) {
	  state.questionDetailId = questionDetailId
  },
  getIsMe (state, isMe) {
	  state.isMe = isMe
  },
  getTaskApplication (state, taskApplication) {
	  state.taskApplication = taskApplication
  },
  getNotMeTaskApplication (state, notMeTaskApplication) {
	  state.notMeTaskApplication = notMeTaskApplication
  },
  getOtherAnswer (state, otherAnswer) {
	  state.otherAnswer = otherAnswer
  },
  getNotMeOtherAnswer (state, notMeOtherAnswer) {
	  state.notMeOtherAnswer = notMeOtherAnswer
  },
  getQuestionAnswers (state, questionAnswers) {
	  state.questionAnswers = questionAnswers
  },
  //个人设置下面的函数
  getIsNameIdentify (state, isNameIdentify) {
    state.isNameIdentify = isNameIdentify
  },
  //XY我的页面下的函数
  getAvatar (state, avatar) {
    state.avatar = avatar
  },
  getSelf (state, self) {
	  state.self = self
  },
  getSelfDynamic (state, dynamic) {
	  state.dynamic = dynamic
  },
  getSelfCircle (state, circle) {
	  state.circle = circle
  },
  getSelfQuestionAnswer (state, questionAnswer) {
	  state.questionAnswer = questionAnswer
  },
  getSelfLive (state, live) {
	  state.live = live
  },
  getSelfTask (state, task) {
	  state.task = task
  },
  getSelfActivity (state, activity) {
	  state.activity = activity
  },
  getSelfTopic (state, topic) {
	  state.topic = topic
  },
  getSelfFriend (state, friend) {
	  state.friend = friend
  },
  getSelfCollect (state, collect) {
	  state.collect = collect
  },
  getFriendList (state, friendList) {
	  state.friendList = friendList
  },
  getTalkFriend (state, talkFriend) {
    state.talkFriend = talkFriend
  },
  getTalkHistory (state, talkHistory) {
	  state.talkHistory = talkHistory
  },
  getIsAuthentication (state, isAuthentication) {
	  state.isAuthentication = isAuthentication
  },
  getPrivateLetter (state, privateLetter) {
	  state.privateLetter = privateLetter
  },
  getPrivateLetterDetailId (state, privateLetterDetailId) {
	  state.privateLetterDetailId = privateLetterDetailId
  },
  getIsLogin (state, isLogin) {
	  state.isLogin = isLogin
  },
  getIsRegister (state, isRegister) {
	  state.isRegister = isRegister
  },
  getIsPasswordLogin (state, isPasswordLogin) {
	  state.isPasswordLogin = isPasswordLogin
  },
  getIsVerificationLogin (state, isVerificationLogin) {
	  state.isVerificationLogin = isVerificationLogin
  },
  getIsRegisterPhone (state, isRegisterPhone) {
	  state.isRegisterPhone = isRegisterPhone
  },
  getIsRegisterNamePassword (state, isRegisterNamePassword) {
	  state.isRegisterNamePassword = isRegisterNamePassword
  },
  getSessionId (state, sessionId) {
	  state.sessionId = sessionId
  },
  getIsLoginHuanxin (state, isLoginHuanxin) {
    state.isLoginHuanxin = isLoginHuanxin
  },
  getPLunReadNum (state, PLunReadNum) {
    state.PLunReadNum = PLunReadNum
  }
};
export default mutations
