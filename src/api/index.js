/*
与后台交互模块（依赖已封装的的ajax函数）
*/
import ajax from './ajax'
const BASE_URL = '/api'
 const URL = 'https://www.yxlinker.com/api'
// const URL = 'http://ginkgo.s1.natapp.cc'
//const URL = 'http://yxlinker.natapp1.cc'
//chr
export const reqElites = ()=>ajax(BASE_URL+'/elites')
export const reqCircles = ()=>ajax(BASE_URL+'/circles')
export const reqActs = ()=>ajax(BASE_URL+'/acts')


/*                                   上传文件的接口                          */
export const uploadFile = (file) => ajax(URL + '/user/upload64.do', {
  "base64Data": file
}, 'POST')

/*上传头像的接口*/
export const uploadAvatar = (file) => ajax(URL + '/user/change_head_img.do', {
  "base64Data": file
}, 'POST')

/*                   本地的sessionid获取用户的数据                         */
export const reqUser = (sessionid) => ajax(URL + '/user/get_current_user.do', {
  "JSESSIONID": sessionid
}, 'POST')

/*              注册接口                 */
//发送验证码信息
export const reqVerificationCode = (phone) => ajax(URL + '/user/register_send_msg.do', {
  "phone": phone
}, 'POST')
//将验证码拿到获得token值,也用来验证验证码是否正确
export const reqRegisterToken = (toValidateCode, phone) => ajax(URL + '/user/check_msg.do', {
  "toValidateCode": toValidateCode,
  "phone": phone
}, 'POST')
//在上一步拿到token值以后，在token有效值的时间内，提交用户名和密码
export const submitRegister = (name, password, phone, token) => ajax(URL + '/user/register_by_msg.do', {
  "name": name,
  "password": password,
  "phone": phone,
  "token": token
}, "POST")

/*                登录接口                      */
//手机号密码登录
export const phonePWLogin = (phone, password) => ajax(URL + '/user/login_phone_pwd.do', {
  "phone": phone,
  "pwd": password
}, 'POST')
//手机号验证码登录第一步，获取验证码
export const reqLoginVerificationCode = (phone) => ajax(URL + '/user/send_msg_check_user.do', {
  "phone": phone
}, 'POST')
//手机号验证码登录第二步
export const phoneVerificationLogin = (phone, toValidateCode) => ajax(URL + '/user/login_phone_msg.do', {
  "phone": phone,
  "toValidateCode": toValidateCode
}, 'POST')

//微信登录
export const weixinLogin = (code) => ajax(URL + '/user/weixin_call_back.do', {
  "code": code
}, 'POST')
//微信登录第二步，将后台返回的数据再重新提交给后台
export const weixinLoginSecond = (accessToken, expiresIn, refreshToken, scope, openid) => ajax(URL + '/user/weixin_login.do', {
  "accessToken": accessToken,
  "expiresIn": expiresIn,
  "refreshToken": refreshToken,
  "scope": scope,
  "openid": openid
}, 'POST')

//退出登录
export const logout = () => ajax(URL + '/user/logout.do', {}, 'POST')
//拿到第三方是否绑定的状态
export const reqBindStatus = () => ajax(URL + '/user/get_oauth_status.do', {}, 'POST')

//忘记密码第一步，发送验证码到手机
export const resetPasswordFirst = (phone) => ajax(URL + '/user/send_msg_check_user.do', {
  "phone": phone
}, 'POST')
//忘记密码第二步，将手机和验证码发送后台
export const resetPasswordSecond = (toValidateCode, phone) => ajax(URL + '/user/check_msg.do', {
  "toValidateCode": toValidateCode,
  "phone": phone
}, 'POST')
//忘记密码第三步，将第二步返回的token值和手机号和新的密码提交
export const resetPasswordThird = (passwordNew, forgetToken, phone) => ajax(URL + '/user/forget_reset_password_by_phone_msg.do', {
  "passwordNew": passwordNew,
  "forgetToken": forgetToken,
  "phone": phone
}, 'POST')

//邮箱密码登录
export const emailPasswordLogin = (email, pwd) => ajax(URL + '/user/login_email_pwd.do', {
  "email": email,
  "pwd": pwd
}, 'POST')

/*             个人设置                 */

//验证身份第一步，发送短信验证码
export const authenticationFirst = (phone) => ajax(URL + '/user/send_msg_check_user.do', {
  "phone": phone
}, 'POST')
//验证身份第二步，检验验证码是否正确，并且返回token值
export const authenticatinSecond =(toValidateCode, phone) => ajax(URL + '/user/check_msg.do', {
  "toValidateCode": toValidateCode,
  "phone": phone
}, 'POST')

//绑定邮箱第三步，将本地的token值和用户填写的邮箱地址发送给后台
export const bindEmailThird = (token, email) => ajax(URL + '/user/bind_mail_send_mail.do', {
  "token": token,
  "mail": email
}, 'POST')
//绑定邮箱第四步
export const bindEmailFourth = (username, sid) => ajax(URL + '/user/bind_mail_check_mail.do', {
  "username": username,
  "sid": sid
}, 'POST')
//绑定邮箱第五步
export const bindEmailFifth = (username, mail, token) => ajax(URL + 'user/bind_mail_check_mail.do', {
  "username": username,
  "mail": mail,
  "token": token
}, 'POST')


//登录状态下修改密码
export const changeNewPassword = (token, passwordNew) => ajax(URL + '/user/reset_password.do', {
  "token": token,
  "passwordNew": passwordNew
}, 'POST')

//更换手机号码第三步，给新的手机号码发送验证码
export const changeNewPhoneThird = (phone, token) => ajax(URL + '/user/check_new_phone.do', {
  "token": token,
  "phone": phone
}, "POST")
//更换手机号码第四步，返回新的手机号码，并且提交验证码
export const changeNewPhoneFourth = (toValidateCode, phone) => ajax(URL + '/user/change_phone_check_msg.do', {
  "toValidateCode": toValidateCode,
  "phone": phone
}, 'POST')
//更换手机号第五步，将上一步的token值和手机号一起传送给后台
export const changeNewPhoneFifth = (token, phone) => ajax(URL + '/user/bind_phone.do', {
  "token": token,
  "phone": phone
}, 'POST')

//绑定微信第三步
export const bindWeixinThird = (code) => ajax(URL + '/user/weixin_call_back.do', {
 "code": code
}, 'POST')
//绑定微信第四步
export const bindWeixinFourth = (accessToken, expiresIn, refreshToken, scope, openid, phone, token) => ajax(URL + '/user/weixin_bind_user.do', {
  "accessToken": accessToken,
  "expiresIn": expiresIn,
  "refreshToken": refreshToken,
  "scope": scope,
  "openid": openid,
  "phone": phone,
  "token": token
}, "POST")

//解绑微信
export const unbindWeixin = (token) => ajax(URL + '/user/weixin_unbind_user.do', {
  "token": token
}, 'POST')
//修改个人资料
export const updateUserMsg = (userGender, userSignDec, userLocation, userMajor) => ajax(URL + '/user/update_information.do', {
   "userGender": userGender,
   "userSignDec": userSignDec,
   "userLocation":userLocation,
   "userMajor": userMajor
}, 'POST')



/*                探求                         */

/*                 1、发布任务                      */
//获取话题标签
export const getAllTopicTags = () => ajax(URL + '/tag/get_all_aaa_tags','GET')

//发布任务
export const launchTask = (questionPhoto,questionAnonymity,questionContent,questionTitle,topicId,taskType,taskAwardActiveness,taskTimeLimit,fromId) => ajax(URL + '/task/assign_task.do', {
  "questionPhoto": questionPhoto,//任务图片,上传的第一张图片
  "questionAnonymity": questionAnonymity,//匿名
  "questionContent": questionContent,//描述
  "questionTitle": questionTitle,//标题
  "topicId": topicId,//话题
  "taskType": taskType,//单向还是双向
  "taskAwardActiveness": taskAwardActiveness,//奖励的点数
  "taskTimeLimit": taskTimeLimit,//截止时间
  "fromId": fromId//所在圈子的id
}, 'POST')

//获取用户加入的圈子
export const userJoinCircle = () => ajax(URL + '/circle/get_circle_user_join_for_task.do', {}, 'POST')

/*                    2、探求广场                               */
//获取全部任务
export const getAllTask = (pageNum) => ajax(URL + '/task/get_all_tasks.do', {
  "pageNum": pageNum
}, 'POST')
//接单申请单向
export const takeTaskOneWay = (taskId) => ajax(URL + '/task/take_task_by_user.do', {
  "taskId": taskId
},'POST')
//接单申请双向
export const takeTaskDoubleWay = (taskId, applyContent) => ajax(URL + '/task/send_task_take_apply.do', {
  "taskId": taskId,
  "applyContent": applyContent
}, 'POST')
//关注
export const follow = (objectId, type) => ajax(URL + '/follow/follow.do', {
  "objectId": objectId,
  "type": type
}, 'POST')
//取消关注
export const delFollow = (objectId, type) => ajax(URL + '/follow/del_follow.do', {
  "objectId": objectId,
  "type": type
}, 'POST')
//点赞
export const prise = (objectId, type) => ajax(URL + '/common/prise.do', {
  "objectId": objectId,
  "type": type
}, 'POST')
//取消点赞
export const delPrise = (objectId, type) => ajax(URL + '/common/unprise.do', {
  "objectId": objectId,
  "type": type
}, 'POST')
//助力
export const help = (taskId, taskSupportAwardActiveness) => ajax(URL + '/task/support_task.do', {
  "taskId": taskId,
  "taskSupportAwardActiveness": taskSupportAwardActiveness
}, 'POST')
//搜索任务
export const searchTask = (pageNum, taskId) => ajax(URL + '/task/get_task_by_taskName.do', {
  "pageNum": pageNum,
  "taskId": taskId
}, 'POST')
//获取全部提问
export const reqQuestion = (pageNum) => ajax(URL + '/question/all_question.do', {
  "pageNum": pageNum
}, 'POST')

/*                          3、任务详情页                                          */
//获取任务详情
export const reqTaskDetail = (id) => ajax(URL + '/task/get_task_info.do', {
  "taskId": id
}, 'POST')

//任务详情页任务发起人获取接单申请的数据
export const reqTaskApplication = (pageNum, taskId) => ajax(URL + '/task/get_all_task_take_apply.do', {
  "pageNum": pageNum,
  "taskId": taskId
}, 'POST')

//发起人选择接单者
export const chooseTaker = (applyId, pass) => ajax(URL + '/apply/deal_invite.do', {
  "applyId": applyId,
  "pass": pass
}, 'POST')
//评价任务
export const commentTask = (answerUserId, score, taskId, priseContent) => ajax(URL + '/task/give_score_to_task_answer.do', {
  "answerUserId": answerUserId,
  "score": score,
  "taskId": taskId,
  "priseContent": priseContent
}, 'POST')
//获取接单者回答
export const reqNotMeTaskApplication = (pageNum, taskId) => ajax(URL + '/task/get_taker_answer_list.do', {
  'pageNum': pageNum,
  "taskId": taskId
}, 'POST')
//发起人获取回答
export const reqAnswer = () => ajax(URL + '', {}, 'POST')
//第三方获取其他回答
export const reqOtherAnswer = (pageNum, taskId) => ajax(URL + '/task/get_other_answer_list.do', {
  "pageNum": pageNum,
  "taskId": taskId
}, 'POST')
//第三方回答任务
export const otherAnswerTask = (answerUserId, answerQuestionId, answerContent, answerPhoto, answerAnoymity, giveTaskWork) => ajax(URL + '', {
  "answerUserId":answerUserId ,
  "answerQuestionId": answerQuestionId,
  "answerContent": answerContent,
  "answerPhoto": answerPhoto,
  "answerAnoymity": answerAnoymity,
  "giveTaskWork": giveTaskWork
}, 'POST')


/*                     4、我的任务                                           */
//我关注的任务
export const reqMyAttentionTasks = (userId, pageNum, type) => ajax(URL +  '/follow/follow_list.do', {
  "userId": userId,
  "pageNum": pageNum,
  "type": type
}, 'POST')
//我发起的任务
export const reqMyLaunchTasks = (pageNum) => ajax(URL + '/task/get_my_start_task.do', {
  "pageNum": pageNum
}, 'POST')
//我承接的任务
export const reqMyUndertakeTasks = (pageNum) => ajax(URL + '/task/get_took_tasks.do', {
  "pageNum": pageNum
}, 'POST')
//回答我承接的任务
export const answerTask = (answerQuestionId, answerContent, answerPhoto, answerAnoymity, giveTaskWork) => ajax(URL + '/task/repply_task.do', {
  "answerQuestionId": answerQuestionId,
  "answerContent": answerContent,
  "answerPhoto": answerPhoto,
  "answerAnoymity": answerAnoymity,
  "giveTaskWork": giveTaskWork
}, 'POST')
//获取任务全部的接单者
export const getTaskApplicationer = (taskId) => ajax(URL + '/task/get_taker_list.do', {
  "taskId": taskId
}, 'POST')
/*                 5、发布提问                                                    */
//发布提问
export const launchQuestion = (questionTopicId, questionPhoto, questionAnonymity, questionContent, questionTitle) => ajax(URL + '/question/ask_question.do', {
  "questionTopicId": questionTopicId,
  "questionPhoto": questionPhoto,
  "questionAnonymity": questionAnonymity,
  "questionContent": questionContent,
  "questionTitle": questionTitle
}, 'POST')

/*                 6、问题详情页                                    */
export const reqQuestionDetail = (id) => ajax(URL + '/question/question_info.do', {
  "questionId": id
}, 'POST')
//获取问题回答的接口
export const reqQuestionAnswers = (pageNum, questionId, type) => ajax(URL + '/question/answer_list.do', {
  "pageNum": pageNum,
  "questionId": questionId,
  "type": type
}, 'POST')
/*                    7、我的问答                                  */
//我发出的问题的数据
export const reqMyQuestions = (userId, type, pageNum) => ajax(URL + '/question/my_ask_question_list.do', {
  "userId": userId,
  "type": type,
  "pageNum": pageNum
}, 'POST')
//我回答的问题的数据
export const reqMyAnswers = (pageNum, userId, type) => ajax(URL + '/question/my_answer_question_list.do', {
  "pageNum": pageNum,
  "userId": userId,
  "type": type
}, 'POST')

/*                              8、探圈                                           */
//创建圈子通过关注数
export const createCircleByAttention = (circleName, circleProPic, circleNotices, circleRecruit, circleType, tagIds, joinConditionType, openInvite) => ajax(URL + '/circle/build_circle_by_follow_num.do', {
  "circleName": circleName,
  "circleProPic": circleProPic,
  "circleNotices": circleNotices,
  "circleRecruit": circleRecruit,
  "circleType": circleType,
  "tagIds": tagIds,
  "joinConditionType": joinConditionType,
  "openInvite": openInvite
}, 'POST')
//创建圈子通过申请
export const createCircleByApplication = (circleName, circleProPic, circleNotices, circleRecruit, circleType, tagIds, joinConditionType, openInvite, applicationContent) => ajax(URL + '/circle/build_circle_by_application.do', {
  "circleName": circleName,
  "circleProPic": circleProPic,
  "circleNotices": circleNotices,
  "circleRecruit": circleRecruit,
  "circleType": circleType,
  "tagIds": tagIds,
  "joinConditionType": joinConditionType,
  "openInvite": openInvite,
  "applicationContent": applicationContent
}, 'POST')
//创建圈子通过邀请码
export const createCircleByInvitationCode = (circleName, circleProPic, circleNotices, circleRecruit, circleType, tagIds, code,joinConditionType, openInvite, applicationContent) => ajax(URL + '/circle/build_circle_by_code.do', {
  "circleName": circleName,
  "circleProPic": circleProPic,
  "circleNotices": circleNotices,
  "circleRecruit": circleRecruit,
  "circleType": circleType,
  "tagIds": tagIds,
  "code": code,
  "joinConditionType": joinConditionType,
  "openInvite": openInvite,
}, 'POST')
/*                    探圈下面的圈子动态            */
export const getAllCircleFeed = (pageNum) => ajax(URL + '/timeline/get_all_circle_timelines.do', {
  "pageNum": pageNum
}, 'POST')
/*                     探圈下面圈子库                                          */
//获取全部圈子
export const getAllCircle  = (pageNum) => ajax(URL + '/circle/get_all_circle.do', {
  "pageNum": pageNum
}, 'POST')
//直接加入
export const noConditionJoin  = (circleId) => ajax(URL + '/circle/add_circle.do', {
  "circleId": circleId
}, 'POST')
//申请加入第一步
export const conditionJoinFirst = (applyContent, circleId) => ajax(URL + '/circle/apply_join_circle.do', {
  "applyContent": applyContent,
  "circleId": circleId
}, 'POST')
/*                        探圈下面圈子精英                                                     */
export const reqUserElite = (pageNum) => ajax(URL + '/circle/get_all_elite', {
  "pageNum": pageNum
}, 'POST')
/*                     探圈下面我的                   */
//获取用户加入的圈子
export const reqUserCircles = (pageNum) => ajax(URL + '/circle/get_circle_user_join.do', {
  "pageNum": pageNum
}, 'POST')
//获取用户关注的圈子
export const reqUserAttentionCircle = (pageNum, type, userId) => ajax(URL + '/follow/follow_list.do', {
  "pageNum": pageNum,
  "type": type,
  "userId": userId
}, 'POST')
//获取用户加入的活动
export const reqUserJoinActivity = (pageNum) => ajax(URL + '', {
  "pageNum": pageNum
}, 'POST')
//获取用户创建的圈子
export const reqUserCreatedCircle = (pageNum) => ajax(URL + '/circle/get_my_create_circle.do', {
  "pageNum": pageNum
}, 'POST')
//获取用户发起的任务
export const reqUserCircleTask = (pageNum) => ajax(URL + '', {
  "pageNum": pageNum
}, 'POST')
//获取我的申请
export const reqMyApplication = (pageNum) => ajax(URL + '/apply/get_my_circle_apply.do', {
  "pageNum": pageNum
}, 'POST')
//获取我的邀请
export const reqMyInvitation = (pageNum) => ajax(URL + '/apply/get_my_circle_invite.do', {
  "pageNum": pageNum
}, 'POST')
//处理申请
export const handleInvitation = (applyId, pass, replaceUserId, circleId) => ajax(URL + '/apply/deal_invite.do', {
  "applyId": applyId,
  "pass": pass,
  "replaceUserId": replaceUserId,
  "circleId": circleId
}, 'POST')
//退出圈子
export const quitCircle = (circleId) => ajax(URL + '/circle/leave_circle.do', {
  "circleId": circleId
}, 'POST')
//圈主删除圈子
export const delCircle = (circleId) => ajax(URL + '/circle/del_circle.do', {
  "circleId": circleId
}, 'POST')
/*                   圈子详情页                            */
//使用circleId获取圈子详情
export const getCircleDetail = (circleId) => ajax(URL + '/circle/get_circle_info.do', {
  "circleId": circleId
}, 'POST')
//获取子圈
export const getSubCircle = (fatherCircleId) => ajax(URL + '/circle/get_sub_circle.do', {
  "fatherCircleId": fatherCircleId
}, 'POST')
//获取圈内可接任务
export const getCircleTask = (circleId, pageNum) => ajax(URL + '/task/get_circle_task_by_circle_id.do', {
  "circleId": circleId,
  "pageNum": pageNum
}, 'POST')
//获取个人中心的数据
export const getPersonCircleIdentify = (circleId) => ajax(URL + '/circle/get_my_circle_role.do', {
  "circleId": circleId
}, 'POST')
//获取圈子推文
export const getCircleText = (circleId, pageNum) => ajax(URL + '/article/article_circle_list.do',  {
  "circleId": circleId,
  "pageNum": pageNum
}, 'POST')
//获取文章详情
export const getArticleDetail = (objectId) => ajax(URL + '/article/article_info.do', {
  "objectId": objectId
}, 'POST')
//获取圈子动态
export  const getCircleFeed = (circleId, pageNum) => ajax(URL + '/timeline/get_circle_timelines.do', {
  "circleId": circleId,
  "pageNum": pageNum
}, 'POST')
//获取管理记录中的申请
export const getCircleInvitation = (circleId, pageNum) => ajax(URL + '/apply/get_all_apply_by_circle_id.do', {
  "circleId": circleId,
  "pageNum": pageNum
}, "POST")
//处理申请
export const handleCircleInvitation  = (applyId, circleId, pass) => ajax(URL + '/apply/deal_invite.do', {
  "applyId": applyId,
  "circleId": circleId,
  "pass": pass
}, 'POST')
/*               获取圈子成员                  */
//获取圈主身份
export const getCircleMaster = (circleId) => ajax(URL + '/circle/get_circle_master.do', {
  "circleId": circleId
}, 'POST')
export const getCircleManager = (circleId) => ajax(URL + '/circle/get_circle_admin.do', {
  "circleId": circleId
}, 'POST')
export const getCircleMember = (circleId, pageNum) => ajax(URL + '/circle/get_circle_member.do', {
  "circleId": circleId,
  "pageNum": pageNum
}, 'POST')

//获取留言列表
export const getCircleMessage = (circleId, pageNum) => ajax(URL + '/circle/circle_words_list.do', {
  "circleId": circleId,
  "pageNum": pageNum
}, 'POST')
//创建留言
export const writeMessage = (commentObjectId, commentType, commentContent, commentAnonymity) => ajax(URL + '/circle/add_circle_words.do', {
  "commentObjectId": commentObjectId,
  "commentType": commentType,
  "commentContent": commentContent,
  "commentAnonymity": commentAnonymity
}, 'POST')
/*                文章系统                      */
//获取未发布的文章
export const getUnpublistText = () => ajax(URL + '/article/unpublish_article_list.do', {}, 'POST')
//获取我的推文
export const getMyPublishText = () => ajax(URL + '/article/publish_article_circle_list.do', {}, 'POST')
//获取公开的文章
export const getMyPublicText = () => ajax(URL + '/article/public_article.do', {}, 'POST')
//保存文章
export const keepText = (articleName, articleContent, articlePhoto, articleId) => ajax(URL + '/article/write_article.do', {
  "articleName": articleName,
  "articleContent": articleContent,
  "articlePhoto": articlePhoto,
  "articleId": articleId
}, 'POST')
//获取用户加入的所有的圈子，不分页的
export const getUserJoinAllCircle = () => ajax(URL + '/circle/get_circle_user_join_for_article.do', {}, 'POST')
//发布文章
export const launchText = (articleId, targetId, type) => ajax(URL + '/article/publish_article.do', {
  "articleId": articleId,
  "targetId": targetId,
  "type": type
}, 'POST')
//删除文章
export const delText = (articleId, type) => ajax(URL + '/article/del_article.do', {
  "articleId": articleId,
  "type": type
}, 'POST')
/*                探人                    */
//获取助学者
export const getProbeTeacher = (pageNum) => ajax(URL + '/probe/probe_teacher_list.do', {
  "pageNum": pageNum
}, 'POST')
//获取学习者
export const getLearner = (pageNum) => ajax(URL + '/probe/probe_student_list.do', {
  "pageNum": pageNum
}, 'POST')
/*                   个人主页下的数据                  */
//个人主页下面通过userId来获取数据
export const getUserInfo = (userId) => ajax(URL + '/user/get_information.do', {
  "userId": userId
}, 'POST')
//个人主页获取圈子数据
export const getUserCircle = (userId, pageNum) => ajax(URL + '/circle/look_circle_user_join.do', {
  "userId": userId,
  "pageNum": pageNum
}, 'POST')
//个人主页获取提问数据
export const getUserQuestion = (userId) => ajax(URL + '/question/question_list_for_information.do', {
  "userId": userId
}, 'POST')
//个人主页获取任务数据
export const getUserTask = (userId, pageNum) => ajax(URL + '/task/get_tasks_for_info.do', {
  "userId": userId,
  "pageNum": pageNum
}, 'POST')
//获取用户的动态
export const getUserFeed = (userId, pageNum) => ajax(URL + '/user/my_timeline_list.do', {
  "userId": userId,
  "pageNum": pageNum
}, 'POST')

/*                 个人认证                  */
//实名认证
export const nameIdentify = (identificateName, identificateIdCard, token, phone,identificateType   ) => ajax(URL + '/identificate/commit_identificate', {
  "identificateName": identificateName,
  "identificateIdCard": identificateIdCard,
  "token": token,
  "phone": phone,
  "identificateType": identificateType
}, 'POST')
//身份认证
export const personIdentify = (identificateName,identificateIdCard,identificateIdCardPic,identificateOrganization,identificateDesc,identificateProve,token,phone,identificateType) => ajax(URL + '/identificate/commit_identificate', {
    "identificateName": identificateName,
    "identificateIdCard": identificateIdCard,
    "identificateIdCardPic": identificateIdCardPic,
    "identificateOrganization": identificateOrganization,
    "identificateDesc": identificateDesc,
    "identificateProve": identificateProve,
    "token": token,
    "phone": phone,
    "identificateType": identificateType
}, 'POST')


/*          私信               */
//获取私信列表
export const getPrivateLetter = (type) => ajax(URL + '/message/get_unread_message.do', {
  "type": type
}, 'POST')
//获取私信详情
export const getPrivateLetterDetail = (roomid, pageNum) => ajax(URL + '/message/get_room_lastest_num_msgs.do', {
  "roomId": roomid,
  "pageNo": pageNum
},'POST')
//发送私信到房间  tag
export const sendMessage = (msg, roomId, messageType, roomType) => ajax(URL + '/im/send', {
  "msg": msg,
  "roomId": roomId,
  "messageType": messageType,
  "roomType": roomType
}, 'POST')
//获取 表情包
export const getFaces = () => ajax(URL + '/message/get_face', {}, 'POST')

//点击私信聊天按钮，调取roomid和roomname
export const getRoomInfo = (userId) => ajax(URL + '/message/get_or_create_room.do', {
  "receiverId": userId
}, 'POST');
//标记为已读
export const haveReadMessage = (roomId) => ajax(URL + '/message/mark_as_have_read.do', {
  "roomId": roomId
}, 'POST')











//XY探求页面下面的数据
export const reqMe = (account) => ajax(BASE_URL + `/me?account=${account}`)
export const reqQuestioners = (p) => ajax(BASE_URL + `/questioners?p=${p}`)
export const reqTasks = (p) => ajax(BASE_URL + `/tasks?p=${p}`)
// export const reqMyQuestions = (p) => ajax(BASE_URL + `/myQuestion?p=${p}`)
// export const reqMyAnswers = (p) => ajax(BASE_URL + `/myAnswer?p=${p}`)
export const reqMyAttentionQuestions = (p) => ajax(BASE_URL + `/myAttentionQuestion?p=${p}`)
// export const reqMyLaunchTasks = (p) => ajax(BASE_URL + `/myLaunchTask?p=${p}`)
// export const reqMyUndertakeTasks = (p) => ajax(BASE_URL + `/myUndertakeTask?p=${p}`)
// export const reqMyAttentionTasks = (p) => ajax(BASE_URL + `/myAttentionTask?p=${p}`)
export const reqSearchTip = (w) => {
  return ajax(BASE_URL + `/searchTip?w=${w}`)
}
// export const reqTaskDetail = (id) => ajax(BASE_URL + `/taskDetail?id=${id}`)
// export const reqTaskApplication = (p) => ajax(BASE_URL + `/taskApplication?id=1&p=${p}`)
// export const reqOtherAnswer = (p) => ajax(BASE_URL + `/otherAnswer?id=1&p=${p}`)
// export const reqNotMeTaskApplication = () => ajax(BASE_URL + `/notMeTaskApplication?id=2`)
export const reqNotMeOtherAnswer = (p) => ajax(BASE_URL + `/notMeOtherAnswer?id=2&p=${p}`)

//XY我的下面的数据
export const reqSelf = () => ajax(BASE_URL + '/self')
export const reqSelfDynamic = (p) => ajax(BASE_URL + `/dynamic?p=${p}`)
export const reqSelfCircle = (p) => ajax(BASE_URL + `/circle?p=${p}`)
export const reqSelfQuestionAnswer = (p) => ajax(BASE_URL + `/questionAnswer?p=${p}`)
export const reqSelfLive = (p) => ajax(BASE_URL + `/live?p=${p}`)
export const reqSelfTask = (p) => ajax(BASE_URL + `/task?p=${p}`)
export const reqSelfActivity = (p) => ajax(BASE_URL + `/activity?p=${p}`)
export const reqSelfTopic = (p) => ajax(BASE_URL + `/topic?p=${p}`)
export const reqSelfFriend = (p) => ajax(BASE_URL + `/friend?p=${p}`)
export const reqSelfCollect = (p) => ajax(BASE_URL + `/collect?p=${p}`)

//XY好友列表的数据
export const reqFriendList = () => ajax(BASE_URL + `/friendList`)
export const reqTalkHistory = (id) => ajax(BASE_URL + `/friendTalkHistory?friendId=${id}`)

//XY私信列表的数据
export const reqPrivateLetter = (p) => ajax(BASE_URL + `/privateletter?p=${p}`)
export const reqAttentionLetter = () => ajax(BASE_URL + `/attentionletter`)
export const reqUnAttentionLetter = () => ajax(BASE_URL + '/unattentionletter')
export const reqPrivateLetterDetail = (id) => ajax(BASE_URL + `/privateletterdetail?id=${id}`)
