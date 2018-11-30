import {reqElites,reqCircles,reqActs, reqMe, reqQuestioners, reqTasks, reqMyQuestions,reqMyAnswers, reqMyAttentionQuestions, reqMyLaunchTasks, reqMyUndertakeTasks, reqMyAttentionTasks,
reqSelf, reqSelfDynamic, reqSelfCircle, reqSelfQuestionAnswer, reqSelfLive, reqSelfTask, reqSelfActivity, reqSelfTopic, reqSelfFriend, reqSelfCollect,
  reqFriendList, reqPrivateLetter, getAllTask
} from '../api/index.js'


export default {
  /*       CHR         */
  // 异步获取elite列表
  async getElites ({commit}) {
    // 发送异步ajax请求
    const result = await reqElites()
    // 提交一个mutation
    if (result.code === 0) {
      const elites = result.elites
      commit('getElites', elites)
    }
  },
  async getCircles ({commit}) {
    // 发送异步ajax请求
    const result = await reqCircles()
    // 提交一个mutation
    if (result.code === 0) {
      const circles = result.circles
      commit('getcircles', circles)
    }
  },
  async getActs ({commit}) {
    // 发送异步ajax请求
    const result = await reqActs()
    // 提交一个mutation
    if (result.code === 0) {
      const acts = result.acts
      commit('getacts', acts)
    }
  },
  async getTasks ({commit}) {
    // 发送异步ajax请求
    const result = await reqTasks()
    // 提交一个mutation
    if (result.code === 0) {
      const tasks = result.tasks
      commit('gettasks', tasks)
    }
  },
  /*          XY探求页面下的函数            */
  async getQuestioners ({commit, state}, p) {
    const result = await reqQuestioners(p)
    if (result.code === 0) {
      const questioners = state.questioners.concat(result.questioners)
      commit('getQuestioners', questioners)
    }
  },
  async getTasks ({commit, state}, p) {
    const result = await getAllTask(p)
    console.log(result)
    if (result.success) {
      const tasks = state.tasks.concat(result.data.list)
      commit('getTasks', tasks)
      return await result.data
    }
  },
  async getMyQuestions ({commit, state}, p) {
    const result = await reqMyQuestions(p)
    if (result.code === 0) {
      const myQuestions = state.myQuestions.concat(result.myQuestions)
      commit('getMyQuestions', myQuestions)
    }
  },
  async getMyAnswers ({commit, state}, p) {
    const result = await reqMyAnswers(p)
    if (result.code === 0) {
      const myAnswers = state.myAnswers.concat(result.myAnswers)
      commit('getMyAnswers', myAnswers)
    }
  },
  async getMyAttentionQuestions ({commit, state}, p) {
    const result = await reqMyAttentionQuestions(p)
    if (result.code === 0) {
      const myAttentionQuestions = state.myAttentionQuestions.concat(result.myAttentionQuestions)
      commit('getMyAttentionQuestions', myAttentionQuestions)
    }
  },
  async getMyLaunchTasks ({commit, state}, p) {
    const result = await reqMyLaunchTasks(p)
    if (result.code === 0) {
      const myLaunchTask = state.myLaunchTasks.concat(result.myLaunchTasks)
      commit('getMyLaunchTasks', myLaunchTask)
    }
  },
  async getMyUndertakeTasks ({commit, state}, p) {
    const result = await reqMyUndertakeTasks(p)
    if (result.code === 0) {
      const myUndertakeTasks = state.myUndertakeTasks.concat(result.myUndertakeTasks)
      commit('getMyUndertakeTasks', myUndertakeTasks)
    }
  },
  async getMyAttentionTasks ({commit, state}, p) {
    const result = await reqMyAttentionTasks(p)
    if (result.code === 0) {
      const myAttentionTasks = state.myAttentionTasks.concat(result.myAttentionTasks)
      commit('getMyAttentionTasks', myAttentionTasks)
    }
  },
  /*          XY我的页面下的函数                               */
  async getSelf ({commit, state}) {
    let result = await reqSelf()
    if (result.code === 0) {
      let self = result.self
      commit('getSelf', self)
    }
  },
  async getSelfDynamic ({commit, state}, p) {
    let result = await reqSelfDynamic(p)
    if (result.code === 0) {
      let dynamic = state.dynamic.concat(result.dynamic)
      commit('getSelfDynamic', dynamic)
    }
  },
  async getSelfCircle ({commit, state}, p) {
    let result = await reqSelfCircle(p)
    if (result.code === 0) {
      let circle = state.circle.concat(result.circle)
      commit('getSelfCircle', circle)
    }
  },
  async getSelfQuestionAnswer ({commit, state}, p) {
    let result = await reqSelfQuestionAnswer(p)
    if (result.code === 0) {
      let questionAnswer = state.questionAnswer.concat(result.questionAnswer)
      commit('getSelfQuestionAnswer', questionAnswer)
    }
  },
  async getSelfLive ({commit, state}, p) {
    let result = await reqSelfLive(p)
    if (result.code === 0) {
      let live = state.live.concat(result.live)
      commit('getSelfLive', live)
    }
  },
  async getSelfTask ({commit, state}, p) {
    let result = await reqSelfTask(p)
    if (result.code === 0) {
      let task = state.task.concat(result.task)
      commit('getSelfTask', task)
    }
  },
  async getSelfActivity ({commit, state}, p) {
    let result = await reqSelfActivity(p)
    if (result.code === 0) {
      let activity = state.activity.concat(result.activity)
      commit('getSelfActivity', activity)
    }
  },
  async getSelfTopic ({commit, state}, p) {
    let result = await reqSelfTopic(p)
    if (result.code === 0) {
      let topic = state.topic.concat(result.topic)
      commit('getSelfTopic', topic)
    }
  },
  async getSelfFriend ({commit, state}, p) {
    let result = await reqSelfFriend(p)
    if (result.code === 0) {
      let friend = state.friend.concat(result.friend)
      commit('getSelfFriend', friend)
    }
  },
  async getSelfCollect ({commit, state}, p) {
    let result = await reqSelfCollect(p)
    if (result.code === 0) {
      let collect = state.collect.concat(result.collect)
      commit('getSelfCollect', collect)
    }
  },
  /*                XY好友列表的数据                                   */
  async getFriendList ({commit, state}, p) {
    let result = await reqFriendList()
    if (result.code === 0) {
      let friendList = result.friendList
      commit('getFriendList', friendList)
    }
  },
  /*                XY私信列表的数据                                */
  async getPrivateLetter ({commit, state}, p) {
    let result = await reqPrivateLetter(p)
    if (result.code === 0) {
      let privateLetter = state.privateLetter.concat(result.privateLetter)
      commit('getPrivateLetter', privateLetter)
    }
  }
}
