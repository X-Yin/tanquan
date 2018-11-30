import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import tanqiu from '@/pages/tanqiu'
import tanquan from '@/pages/tanquan'
import tanren from '@/pages/tanren'
//协议界面
import privacyPolicy from '../components/PPcomponents/privacyPolicy.vue'
//隐私界面
import private1 from '../components/Ncomponents/private.vue'
//写文章界面
import writeManagement from '../components/Wcomponents/writeManagement.vue'
//搜索大界面
import search from '../components/Scomponents/search.vue'
import searchCircle from '../components/Scomponents/searchCircle.vue'
import searchUser from '../components/Scomponents/searchUser.vue'
import searchAll from '../components/Scomponents/searchAll.vue'
//文章详情页
import articleDetail1 from '../components/common/articleDetail.vue'


//探圈 子界面
import probing from '@/components/Ccomponents/tanquan/probing'
import elite from '@/components/Ccomponents/tanquan/elite'
import library from '@/components/Ccomponents/tanquan/library'
import me from '@/components/Ccomponents/me/me'
//探圈 我的 子界面
import joinedCircle from '@/components/Ccomponents/me/joinedCircle'
import focusedCircle from '@/components/Ccomponents/me/focusedCircle'
import joinedAct from '@/components/Ccomponents/me/joinedAct'
import createdAct from '@/components/Ccomponents/me/createdAct'
import getTask from '@/components/Ccomponents/me/getTask'
import createdTask from '@/components/Ccomponents/me/createdTask'
import createdCircle from '@/components/Ccomponents/me/createdCircle'
import invitation from '@/components/Ccomponents/me/invitation'
import application from '@/components/Ccomponents/me/application'
//探圈 创建圈子 入口Probing
import createCircle from '@/components/Ccomponents/tanquan/createCircle'
//圈子 主页面 及子页面
import circleHome from '@/components/Ccomponents/circle/circle'
import circleFeed from '@/components/Ccomponents/circle/feed'
import circleArticle from '@/components/Ccomponents/circle/article'
import articleDetail from '@/components/Ccomponents/circle/articleDetail'
import circleActivity from '@/components/Ccomponents/circle/activity'
import circleLive from '@/components/Ccomponents/circle/live'
import circleTask from '@/components/Ccomponents/circle/task'
import circleResource from '@/components/Ccomponents/circle/resource'
import circleMember from '@/components/Ccomponents/circle/member'
import circleMessage from '@/components/Ccomponents/circle/message'
import circleManagement from '@/components/Ccomponents/circle/management'
//圈子 圈子认证 入口circleHome
import certificate from '@/components/Ccomponents/circle/certificate'
//探人 子页面
import helper from '@/components/Ccomponents/tanren/helper'
import learner from '@/components/Ccomponents/tanren/learner'

//XY

//tanqiu component
import myQuestionAnswer from '@/components/Xcomponents/myQuestionAnswer'
import myTask from '@/components/Xcomponents/myTask'
import square from '@/components/Xcomponents/square'
import question from '@/components/Xcomponents/question'
import task from '@/components/Xcomponents/task'
import myQuestion from '@/components/Xcomponents/myQuestion'
import myAnswer from '@/components/Xcomponents/myAnswer'
import myAttentionQuestion from '@/components/Xcomponents/myAttentionQuestion'
import myLaunchTask from '@/components/Xcomponents/myLaunchTask'
import myUnderTask from '@/components/Xcomponents/myUnderTask'
import myAttentionTask from '@/components/Xcomponents/myAttentionTask'
import launchTask from '@/components/Xcomponents/launchTask'
import taskDetail from '@/components/Xcomponents/taskDetail'
import taskApplication from '@/components/Xcomponents/taskApplication'
import otherAnswer from '@/components/Xcomponents/otherAnswer'
import notMeTaskApplication  from '@/components/Xcomponents/notMeTaskApplication'
import notMeOtherAnswer from '@/components/Xcomponents/notMeOtherAnswer'
import launchQuestion from '@/components/Xcomponents/launchQuestion'
import questionDetail from '@/components/Xcomponents/questionDetail'
import tqquestionAnswer from '@/components/Xcomponents/questionAnswer'
//me component
import self from '../pages/self.vue'
import dynamic from '../components/Mecomponents/dynamic.vue'
import circle from '../components/Mecomponents/circle.vue'
import questionAnswer from '../components/Mecomponents/questionAnswer.vue'
import live from '../components/Mecomponents/live.vue'
import selfTask from '../components/Mecomponents/task.vue'
import activity from '../components/Mecomponents/activity.vue'
import topic from '../components/Mecomponents/topic.vue'
import friend from '../components/Mecomponents/friend.vue'
import collect from '../components/Mecomponents/collect.vue'

//好友列表component
import friendList from '../components/Fcomponents/friendList.vue'
import talkDetail from '../components/Fcomponents/talkDetail.vue'


//登录component
import signup from '../components/Lcomponents/signup.vue'
import resetPassword from '../components/Lcomponents/resetPassword.vue'

//个人设置component
import personSetting from '../components/Pcomponents/personSetting.vue'
import bindEmail from '../components/Pcomponents/bindEmail.vue'
import selectPersonIdentify from '../components/Pcomponents/selectPersonIdentify.vue'
import nameIdentify from '../components/Pcomponents/nameIdentify.vue'
import personIdentify from '../components/Pcomponents/personIdentify.vue'

//私信页面component
import privateLetter from '../components/PLcomponents/privateLetter.vue'
import privateLetterAll from '../components/PLcomponents/privateLetterAll.vue'
import privateLetterDetail from '../components/PLcomponents/privateLetterDetail.vue'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/tanqiu',
      name: 'tanqiu',
      component: tanqiu,
      children: [
        {
          path: '/tanqiu',
          redirect: '/tanqiu/square'
        },
        {
          path: '/tanqiu/answer',
          component: myQuestionAnswer,
          children: [
            {
              path: '/tanqiu/answer',
              redirect: '/tanqiu/answer/myQuestion'
            },
            {
              path: '/tanqiu/answer/myQuestion',
              component: myQuestion
            },
            {
              path: "/tanqiu/answer/myAnswer",
              component: myAnswer
            },
            {
              path:"/tanqiu/answer/attentionQuestion" ,
              component: myAttentionQuestion
            }
          ]
        },
        {
          path: '/tanqiu/task',
          component: myTask,
          children: [
            {
              path: "/tanqiu/task",
              redirect: '/tanqiu/task/launch'
            },
            {
              path: "/tanqiu/task/launch",
              component: myLaunchTask
            },
            {
              path: "/tanqiu/task/underTake",
              component: myUnderTask
            },
            {
              path: "/tanqiu/task/attentionTask",
              component: myAttentionTask
            }
          ]
        },
        {
          path: '/tanqiu/square',
          component: square,
          children: [
            {
              path: '/tanqiu/square',
              redirect: '/tanqiu/square/question'
            },
            {
              path: '/tanqiu/square/question',
              component: question
            },
            {
              path: '/tanqiu/square/task',
              component: task
            }
          ]
        },
        {
          path: '/tanqiu/launchQuestion',
          component: launchQuestion
        },
        {
          path: '/tanqiu/launchTask',
          component: launchTask
        },
        {
          path: '/tanqiu/taskDetail/:id',
          component: taskDetail,
          children: [
            {
              path: '/tanqiu/taskDetail/:id/taskApplication',
              component: taskApplication
            },
            {
              path: '/tanqiu/taskDetail/:id/otherAnswer',
              component: otherAnswer
            },
            {
              path: '/tanqiu/taskDetail/:id/notMeTaskApplication',
              component: notMeTaskApplication
            },
            {
              path: '/tanqiu/taskDetail/:id/notMeOtherAnswer',
              component: notMeOtherAnswer
            }
          ]
        },
        {
          path: '/tanqiu/questionDetail/:id',
          component: questionDetail,
          children: [
            {
              path: '/tanqiu/questionDetail/:id/questionAnswer',
              component: tqquestionAnswer
            }
          ]
        }
      ]
    },
    {
      path: '/tanquan',
      name: 'tanquan',
      component: tanquan,
      children:[
        {
          path:'/tanquan',
          redirect:'/tanquan/probing'
        },
        {
          path:'elite',
          component: elite
        },
        {
          path:'library',
          component:library
        },
        {
          path:'me',
          component:me,
          children:[
            {
              path:'/',
              redirect:'joinedCircle'
            },
            {
              path:'joinedCircle',
              component:joinedCircle
            },
            {
              path:'focusedCircle',
              component:focusedCircle
            },
            {
              path:'joinedAct',
              component:joinedAct
            },
            {
              path:'createdAct',
              component:createdAct
            },
            {
              path:'getTask',
              component:getTask
            },
            {
              path:'createdTask',
              component:createdTask
            },
            {
              path:'createdCircle',
              component:createdCircle
            },
            {
              path: 'application',
              component: application
            },
            {
              path: 'invitation',
              component: invitation
            }
          ]
        },
        {
          path:'probing',
          component:probing
        },
        {
          path:'createCircle',
          component:createCircle
        },
        {
          path:'certificate',
          component:certificate
        },
      ]
    },
    {
      path: '/tanren',
      component: tanren,
      children:[
        {
          path:'/tanren',
          redirect:'/tanren/learner'
        },
        {
          path:'learner',
          component:learner
        },
        {
          path:'helper',
          component:helper
        }
      ]
    },
    {
      path: '/circle/:circleId/',
      name: 'circleHome',
      component: circleHome,
      children:[
        {
          path:'/circle/:circleId',
          redirect:'/circle/:circleId/feed'
        },
        {
          path: 'management',
          component: circleManagement
        },
        {
          path:'feed',
          component:circleFeed
        },
        {
          path:'article',
          component:circleArticle
        },
        {
          path:'activity',
          component:circleActivity
        },
        {
          path:'live',
          component:circleLive
        },
        {
          path:'task',
          component:circleTask
        },
        {
          path:'resource',
          component:circleResource
        },
        {
          path:'member',
          component:circleMember
        },
        {
          path:'message',
          component:circleMessage
        },
        {
          path:'article/:articleId/',
          component:articleDetail
        }
      ]
    },
    {
      path: '/self',
      name: 'self',
      component: self,
      children: [
        {
          path: '/self',
          redirect: '/self/dynamic'
        },
        {
          path: '/self/dynamic',
          component: dynamic
        },
        {
          path: '/self/circle',
          component: circle
        },
        {
          path: '/self/questionAnswer',
          component: questionAnswer
        },
        {
          path: '/self/live',
          component: live
        },
        {
          path: '/self/task',
          component: selfTask
        },
        {
          path: '/self/activity',
          component: activity
        },
        {
          path: '/self/topic',
          component: topic
        },
        {
          path: '/self/friend',
          component: friend
        },
        {
          path: '/self/collect',
          component: collect
        },
      ]
    },
    {
      name: 'friend',
      path: '/friend',
      component: friendList,
      children: [
        {
          path: '/friend/:id',
          component: talkDetail
        }
      ]
    },
    {
      name: 'signup',
      path: '/signup',
      component: signup
    },
    {
      name: 'resetPassword',
      path: '/resetPassword',
      component: resetPassword
    },
    {
      name: 'personSetting',
      path: '/personSetting',
      component: personSetting
    },
    {
      name: 'bindEmail',
      path: '/bindEmail',
      component: bindEmail
    },
    {
      name: 'selectPersonIdentify',
      path: '/selectPersonIdentify',
      component: selectPersonIdentify
    },
    {
      name: 'nameIdentify',
      path: '/nameIdentify',
      component: nameIdentify
    },
    {
      name: 'personIdentify',
      path: '/personIdentify',
      component: personIdentify
    },
    {
      name: 'privateLetter',
      path: '/privateletter',
      component: privateLetter,
      children: [
        {
          path: '/privateletter',
          redirect: '/privateletter/all'
        },
        {
          path: '/privateletter/all',
          component: privateLetterAll
        },
        {
          path: '/privateletter/:id',
          component: privateLetterDetail
        }
      ]
    },
    {
      name: 'writemanagement',
      path: '/writeManagement',
      component: writeManagement
    },
    {
      name: 'privacyPolicy',
      path: '/privacyPolicy',
      component: privacyPolicy
    },
    {
      name: 'private',
      path: '/private',
      component: private1
    },
    {
      name: 'search',
      path: '/search',
      component: search,
      children: [
        {
          path: '/search',
          redirect: '/search/searchAll'
        },
        {
          path: '/search/searchAll',
          component: searchAll
        },
        {
          path: '/search/searchCircle',
          component: searchCircle
        },
        {
          path: '/search/searchUser',
          component: searchUser
        }
      ]
    },
    {
      name: 'articleDetail',
      path: '/articleDetail',
      component: articleDetail1
    }
  ]
})

export default router
