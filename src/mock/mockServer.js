import Mock from 'mockjs'
import data from './data.json'

var Random = Mock.Random

//CHR
//返回圈子精英的接口
Mock.mock('/api/elites',{code:0,
  "elites|5-10":[
    {
      "nickName":"@cfirst"+"@clast",
      "region":"@city(true)",
      "avatar":"@image('200x200','@color','png')",
      "point|200-600":556,
      "residence":"@city(true)",
      "school":"华北电力大学（北京）",
      "position":"学生",
      "intro":"Nothing is impossible!!!"
    }
  ]
})
Mock.mock('/api/circles',{code:0,
  "circles|5-10":[
    {
      "circleName":"@ctitle(3,5)",
      "hostName":"@cfirst"+"@clast",
      "tags":['华北电力大学','河北','金融'],
      "avatar":"@image('200x200','@color','png')",
      "role":'圈子成员',
      "intro":"信息安全是指在技术与管理上对信息系统的硬件、软件、系统中的数据及依托其开展的业务进行保护，使得它们不会由于偶然的或者恶意的原因而遭到未经授权的访问、泄露、破坏、"
    }
  ]
})
Mock.mock('/api/acts',{code:0,
  "acts|5-10":[
    {
      "avatar":"@image('200x200','@color','png')",
      "title":"@ctitle(10,15)",
      "num|1-100":50,
      "like|1-100":50,
      "comment|1-100":50,
      "share|1-100":50,
      "save|1-100":50

    }
  ]
})
Mock.mock('/api/tasks',{code:0,
  "tasks|5-10":[
    {
      "avatar":"@image('200x200','@color','png')",
      "title":"@ctitle(10,15)",
      "detail":"@ctitle(10,15)",
      "reply|1-100":50,
      "like|1-100":50,
      "point|1-100":50,
      "help|1-100":50

    }
  ]
})



/*             XY探求页面数据                      */
//返回用户自己的数据,使用的地方是探求页面的search.vue下
Mock.mock('/api/me?account=不会飞的鱼', {code: 0,
  "me":  {
    "nickName":"不会飞的鱼",
    "region":"河北 保定",
    "point":"556",
    "residence":"北京 东城",
    "school":"华北电力大学（北京）",
    "position":"学生",
    "intro":"Nothing is impossible!!!",
    "questions": 18,
    "answers": 45,
    "initiate": 18,
    "underTake": 67,
    "avatar": "/static/ximages/avatar.png",
    "indexs": 865
  }
})

//返回探求页面search路由下的提问的提问者数据
Mock.mock(/\/api\/questioners\?p=(1|2)/, {code: 0,
  "questioners|5-10": [
    {
      "avatar": "/static/ximages/avatar-1.png",
      "question": "求一高数题答案，有悬赏，速来！",
      "name": "嗷嗷嗷",
      "time": "11:38",
      "attentions": 89,
      "thumbsUp": 563,
      "project": "高数",
      "description": "RT，求一靠谱大佬带飞！！！",
      "alreadyAnswers": 12,
      "pagesAll": 2
    }
  ]
})
//返回search路由下的任务数据
Mock.mock(/\/api\/tasks\?p=(1|2)/, {code: 0,
  "tasks|5-10": [
    {
      "avatar": "/static/ximages/avatar-1.png",
      "question": "求一高数题答案，有悬赏，速来！",
      "name": "嗷嗷嗷",
      "time": "11:38",
      "attentions": 89,
      "thumbsUp": 563,
      "project": "高数",
      "description": "RT，求一靠谱大佬带飞！！！",
      "alreadyAnswers": 12,
      "pagesAll": 2,
      "helpers": 22,
      "helpNum": 198,
      "avatars": ["/static/ximages/avatar-1.png", "/static/ximages/avatar-1.png", "/static/ximages/avatar-1.png", "/static/ximages/avatar-1.png", "/static/ximages/avatar-1.png","/static/ximages/avatar-1.png"]
    }
  ]
})

//返回我的问答下我的提问的数据
Mock.mock(/\/api\/myQuestion\?p=(1|2)/, {code: 0,
  "myQuestions|5-10": [
    {
      "avatar": "/static/ximages/avatar-1.png",
      "question": "求一高数题答案，有悬赏，速来！",
      "name": "嗷嗷嗷",
      "time": "11:38",
      "attentions": 89,
      "thumbsUp": 563,
      "project": "高数",
      "description": "RT，求一靠谱大佬带飞！！！",
      "alreadyAnswers": 12,
      "pagesAll": 2
    }
  ]
})
//返回我的问答下的我的回答数据
Mock.mock(/\/api\/myAnswer\?p=(1|2)/, {code: 0,
  "myAnswers|5-10": [
    {
      "answer": "知识是符合文明方向的，人类对物质世界以及精神世界探索的总和。知识，至今也没有一个统一而明确的界定。有一个经典的界定来自于柏拉图：一条陈述能称得上只是必须满足三个条件...",
      "question": "求一高数题答案，有悬赏，速来！",
      "name": "嗷嗷嗷",
      "time": "11:38",
      "project": "高数",
      "attentions": 89,
      "thumbsUp": 563,
      "avatar": "/static/ximages/avatar-1.png",
      "pagesAll": 2
    }
  ]
})

//返回我的问答下我关注的我问题的数据
Mock.mock(/\/api\/myAttentionQuestion\?p=(1|2)/, {code: 0,
  "myAttentionQuestions|5-10": [
    {
      "avatar": "/static/ximages/avatar-1.png",
      "question": "求一高数题答案，有悬赏，速来！",
      "name": "嗷嗷嗷",
      "time": "11:38",
      "attentions": 89,
      "thumbsUp": 563,
      "project": "高数",
      "description": "RT，求一靠谱大佬带飞！！！",
      "alreadyAnswers": 12,
      "pagesAll": 2
    }
  ]
})
//返回我发起的任务的数据
Mock.mock(/\/api\/myLaunchTask\?p=(1|2)/, {code: 0,
  "myLaunchTasks|5-10": [
    {
      "avatar": "/static/ximages/avatar-1.png",
      "question": "求一高数题答案，有悬赏，速来！",
      "name": "嗷嗷嗷",
      "time": "11:38",
      "attentions": 89,
      "thumbsUp": 563,
      "project": "高数",
      "description": "RT，求一靠谱大佬带飞！！！",
      "alreadyAnswers": 12,
      "pagesAll": 2,
      "helpers": 22,
      "helpNum": 198,
      "id": 1,
      "avatars": ["/static/ximages/avatar-1.png", "/static/ximages/avatar-1.png", "/static/ximages/avatar-1.png", "/static/ximages/avatar-1.png", "/static/ximages/avatar-1.png","/static/ximages/avatar-1.png"]
    }
  ]
})
//返回我承接的任务的数据
Mock.mock(/\/api\/myUndertakeTask\?p=(1|2)/, {code: 0,
  "myUndertakeTasks|5-10": [
    {
      "avatar": "/static/ximages/avatar-1.png",
      "question": "求一高数题答案，有悬赏，速来！",
      "name": "嗷嗷嗷",
      "time": "11:38",
      "attentions": 89,
      "thumbsUp": 563,
      "project": "高数",
      "description": "RT，求一靠谱大佬带飞！！！",
      "alreadyAnswers": 12,
      "pagesAll": 2,
      "helpers": 22,
      "helpNum": 198,
      "avatars": ["/static/ximages/avatar-1.png", "/static/ximages/avatar-1.png", "/static/ximages/avatar-1.png", "/static/ximages/avatar-1.png", "/static/ximages/avatar-1.png","/static/ximages/avatar-1.png"]
    }
  ]
})

//返回我关注的任务的数据
Mock.mock(/\/api\/myAttentionTask\?p=(1|2)/, {code: 0,
  "myAttentionTasks|5-10": [
    {
      "avatar": "/static/ximages/avatar-1.png",
      "question": "求一高数题答案，有悬赏，速来！",
      "name": "嗷嗷嗷",
      "time": "11:38",
      "attentions": 89,
      "thumbsUp": 563,
      "project": "高数",
      "description": "RT，求一靠谱大佬带飞！！！",
      "alreadyAnswers": 12,
      "pagesAll": 2,
      "helpers": 22,
      "helpNum": 198,
      "avatars": ["/static/ximages/avatar-1.png", "/static/ximages/avatar-1.png", "/static/ximages/avatar-1.png", "/static/ximages/avatar-1.png", "/static/ximages/avatar-1.png","/static/ximages/avatar-1.png"],
      "id": 2
    }
  ]
})
//返回发布任务下接单类型中的搜索提示
Mock.mock(/\/api\/searchTip\?w=\w*/, {code: 0,
  "searchResults": ["企鹅1", "企鹅2", "企鹅3", "企鹅4", "企鹅5"]
})

//返回我发起的任务的的详情数据
Mock.mock(/\/api\/taskDetail\?id=1/, {code: 0,
  "taskDetail": {
    "question": "在国外留学，有个黑人室友是怎样的体验？",
    "name": "不会飞的鱼",
    "time": "8月1日 11:28",
    "taskType": "圈子任务",
    "deadline": "8月4日",
    "reward": "187",
    "answer": "我很幸运的，遇到一个逗比泥哥，hhh故事是这样开始的大一开学前学校给我们发了一个问卷表，大概是问你是早睡还是晚睡等生活习惯这种问题，我和我的室友k" +
    "填的完全相反，但这样被分到一间房了。他是篮网粉，我是尼克斯粉，就连喜欢的球队也是纽约市的死对头...我们一个suite四个房间，一共六个人，两个双人间，两个单人间，" +
    "我和泥哥就住在那个双人间。见到大家第一天，就问大家你们是什么专业的。结果：'computer science,computer science,computer science,computer science," +
    "computer science', 'Architecture'......对我被分错寝室了，不过我也是嫌麻烦的人，所以也没多管什么就先那样住了下来。这估计也是我做过少有的成功决策之一吧。",
    "avatars": ["/static/ximages/avatar-1.png", "/static/ximages/avatar-1.png", "/static/ximages/avatar-1.png", "/static/ximages/avatar-1.png","/static/ximages/avatar-1.png"],
    "helpers": 22,
    "helpNum": 198,
    "isMyTask": true
  }
})
//返回我发起的任务，任务详情页接单申请数据
Mock.mock(/\/api\/taskApplication\?id=1&p=(1|2)/, {code: 0,
  "taskApplication|5-10": [
    {
      "name": "嘿嘿嘿",
      "avatar": "/static/ximages/avatar-1.png",
      "answer": "我妈拿给我用的水杯，里面充电之后可以净化水质，我想既然能净化，应该比普通杯子贵一些吧，知道一天我朋友看到这个杯子觉得好看，问我在哪儿买的，" +
      "我给她拍下来在淘宝一查才知道。。。丫的这被子竟然要998，我尼玛大写的懵逼。自此以后用这个杯子都小心翼翼的，生怕给摔了。",
      "isApplicationer": false,
      "isComment": false,
      "pagesAll": 2
    }
  ]
})
//返回我发起的任务任务详情页其他回答的数据
Mock.mock(/\/api\/otherAnswer\?id=1&p=(1|2)/, {code: 0,
  "otherAnswer|5-10": [
    {
      "name": "嘿嘿嘿",
      "avatar": "/static/ximages/avatar-1.png",
      "answer": "我妈拿给我用的水杯，里面充电之后可以净化水质，我想既然能净化，应该比普通杯子贵一些吧，知道一天我朋友看到这个杯子觉得好看，问我在哪儿买的，" +
      "我给她拍下来在淘宝一查才知道。。。丫的这被子竟然要998，我尼玛大写的懵逼。自此以后用这个杯子都小心翼翼的，生怕给摔了。",
      "forward": 3,
      "comment": 56,
      "thumbUp": 75,
      "collect": 64,
      "pagesAll": 2
    }
  ]
})

//返回不是 我发起的任务的任务详情数据
Mock.mock(/\/api\/taskDetail\?id=2/, {code: 0,
  "taskDetail": {
    "question": "在国外留学，有个黑人室友是怎样的体验2？",
    "name": "不会飞的鱼",
    "time": "8月1日 11:28",
    "taskType": "圈子任务",
    "deadline": "8月4日",
    "reward": "187",
    "answer": "我很幸运的，遇到一个逗比泥哥，hhh故事是这样开始的大一开学前学校给我们发了一个问卷表，大概是问你是早睡还是晚睡等生活习惯这种问题，我和我的室友k" +
    "填的完全相反，但这样被分到一间房了。他是篮网粉，我是尼克斯粉，就连喜欢的球队也是纽约市的死对头...我们一个suite四个房间，一共六个人，两个双人间，两个单人间，" +
    "我和泥哥就住在那个双人间。见到大家第一天，就问大家你们是什么专业的。结果：'computer science,computer science,computer science,computer science," +
    "computer science', 'Architecture'......对我被分错寝室了，不过我也是嫌麻烦的人，所以也没多管什么就先那样住了下来。这估计也是我做过少有的成功决策之一吧。",
    "avatars": [],
    "helpers": 0,
    "helpNum": 0,
    "isMyTask": false
  }
})
//返回不是我发起的任务的接单者回答数据
Mock.mock(/\/api\/notMeTaskApplication\?id=2/, {code: 0,
  "taskApplication": {
    "name": "嘿嘿嘿",
    "avatar": "/static/ximages/avatar-1.png",
    "answer": "我妈拿给我用的水杯，里面充电之后可以净化水质，我想既然能净化，应该比普通杯子贵一些吧，知道一天我朋友看到这个杯子觉得好看，问我在哪儿买的，" +
    "我给她拍下来在淘宝一查才知道。。。丫的这被子竟然要998，我尼玛大写的懵逼。自此以后用这个杯子都小心翼翼的，生怕给摔了。",
    "score": 5,
    "comment": "逻辑清晰，文笔优雅，实为优秀，回答一则！，唉，几十年前，我一个人走在路上...",
    "thumbUp": 78
  }
})
//返回不是我发起的任务的其他回答数据
Mock.mock(/\/api\/notMeOtherAnswer\?id=2&p=(1|2)/, {code: 0,
  "otherAnswer|5-10": [
    {
      "name": "嘿嘿嘿",
      "avatar": "/static/ximages/avatar-1.png",
      "answer": "我妈拿给我用的水杯，里面充电之后可以净化水质，我想既然能净化，应该比普通杯子贵一些吧，知道一天我朋友看到这个杯子觉得好看，问我在哪儿买的，" +
      "我给她拍下来在淘宝一查才知道。。。丫的这被子竟然要998，我尼玛大写的懵逼。自此以后用这个杯子都小心翼翼的，生怕给摔了。",
      "forward": 3,
      "comment": 56,
      "thumbUp": 75,
      "collect": 64,
      "pagesAll": 2
    }
  ]
})


/*                    XY我的数据                             */
//返回个人信息的数据
Mock.mock('/api/self', {code: 0,
  "self": {
    "nickName":"不会飞的鱼",
    "region":"河北 保定",
    "point":"556",
    "residence":"北京 东城",
    "school":"华北电力大学（北京）",
    "position":"学生",
    "intro":"Nothing is impossible!!!",
    "questions": 18,
    "answers": 45,
    "initiate": 18,
    "underTake": 67,
    "avatar": "/static/ximages/avatar-2.png",
    "indexs": 865,
    "motto": "做好人，好做人",
    "myAttention": 134,
    "attentionMe": 780
  }
})
//返回动态数据
Mock.mock(/\/api\/dynamic\?p=(1|2)/, {code: 0,
  "dynamic": [
    {
      "avatar": "/static/ximages/avatar-1.png",
      "circler": "蝴蝶",
      "label": "华北电力大学 河北 金融",
      "mark": "circle",
      "time": '一天前',
      "title": "经济园地",
      "pagesAll": 2
    },
    {
      "avatar": "/static/ximages/avatar-1.png",
      "question": "求一高数题答案，有悬赏，速来！",
      "description": "RT, 求一靠谱大佬带飞...",
      "forward": 3,
      "comment": 56,
      "thumbUp": 78,
      "collect": 67,
      "mark": "question",
      "time": '一天前',
      "pagesAll": 2
    },
    {
      "question": "你高中的时候，那个瞬间最可怕？",
      "launcher": "飞鸟",
      "attentioners": 780,
      "label": "女生 大学生活",
      "description": "女生宿舍里，一个女生偷拍另一个女生换衣服的照片发到一个群上， 那个群里有五六个男生，其中一个是和我关系...",
      "forward": 3,
      "comment": 56,
      "thumbUp": 78,
      "collect": 67,
      "mark": "live",
      "time": '一天前',
      "pagesAll": 2
    },
    {
      "mark": "task",
      "avatar": "/static/ximages/avatar-1.png",
      "question": "求一高数题答案，有悬赏，速来！",
      "description": "RT, 求一靠谱大佬带飞...",
      "forward": 3,
      "comment": 56,
      "thumbUp": 78,
      "collect": 67,
      "time": '一天前',
      "pagesAll": 2
    },
    {
      "question": "你高中的时候，那个瞬间最可怕？",
      "launcher": "飞鸟",
      "attentioners": 780,
      "label": "女生 大学生活",
      "description": "女生宿舍里，一个女生偷拍另一个女生换衣服的照片发到一个群上， 那个群里有五六个男生，其中一个是和我关系...",
      "forward": 3,
      "comment": 56,
      "thumbUp": 78,
      "collect": 67,
      "mark": "activity",
      "time": '一天前',
      "pagesAll": 2
    },
    {
      "mark": "topic",
      "project": "高数",
      "time": '一天前',
      "pagesAll": 2
    },
    {
      "mark": "friend",
      "name": "会飞的鱼",
      "time": '一天前',
      "avatar": "/static/ximages/avatar-1.png",
      "pagesAll": 2
    },
    {
      "mark": "collect",
      "title": "成语接龙活动开始啦！",
      "avatar": "/static/ximages/avatar-1.png",
      "description": "女生宿舍里，一个女生偷拍另一个女生换衣服的照片发到一个群上， 那个群里有五六个男生，其中一个是和我关系还挺好的，（我不在 这个群里，那我为什么会知道呢？）",
      "forward": 3,
      "comment": 56,
      "thumbUp": 78,
      "collect": 67,
      "time": '一天前',
      "pagesAll": 2
    }
  ]
})
//返回圈子数据
Mock.mock(/\/api\/circle\?p=(1|2)/, {code: 0,
  "circle|5-10": [
    {
      "avatar": "/static/ximages/avatar-1.png",
      "circler": "蝴蝶",
      "label": "华北电力大学 河北 金融",
      "mark": "circle",
      "time": '一天前',
      "title": "经济园地",
      "pagesAll": 2
    }
  ]
})
//返回问答数据
Mock.mock(/\/api\/questionAnswer\?p=(1|2)/, {code: 0,
  "questionAnswer|2-3": [
    {
      "avatar": "/static/ximages/avatar-1.png",
      "question": "求一高数题答案，有悬赏，速来！",
      "description": "RT, 求一靠谱大佬带飞...",
      "forward": 3,
      "comment": 56,
      "thumbUp": 78,
      "collect": 67,
      "mark": "question",
      "time": '一天前',
      "pagesAll": 2
    },
    {
      "mark": "answer",
      "title": "成语接龙活动开始啦！",
      "avatar": "/static/ximages/avatar-1.png",
      "description": "女生宿舍里，一个女生偷拍另一个女生换衣服的照片发到一个群上， 那个群里有五六个男生，其中一个是和我关系还挺好的，（我不在 这个群里，那我为什么会知道呢？）",
      "forward": 3,
      "comment": 56,
      "thumbUp": 78,
      "collect": 67,
      "time": '一天前',
      "pagesAll": 2
    }
  ]
})
//返回live数据
Mock.mock(/\/api\/live\?p=(1|2)/, {code:0,
  "live|4-8": [
    {
      "question": "你高中的时候，那个瞬间最可怕？",
      "launcher": "飞鸟",
      "attentioners": 780,
      "label": "女生 大学生活",
      "description": "女生宿舍里，一个女生偷拍另一个女生换衣服的照片发到一个群上， 那个群里有五六个男生，其中一个是和我关系...",
      "forward": 3,
      "comment": 56,
      "thumbUp": 78,
      "collect": 67,
      "mark": "live",
      "time": '一天前',
      "pagesAll": 2
    }
  ]
})
//返回任务数据
Mock.mock(/\/api\/task\?p=(1|2)/, {code:0,
  "task|5-10": [
    {
      "avatar": "/static/ximages/avatar-1.png",
      "question": "求一高数题答案，有悬赏，速来！",
      "description": "RT, 求一靠谱大佬带飞...",
      "forward": 3,
      "comment": 56,
      "thumbUp": 78,
      "collect": 67,
      "mark": "task",
      "time": '一天前',
      "pagesAll": 2
    }
  ]
})
//返回活动数据
Mock.mock(/\/api\/activity\?p=(1|2)/, {code:0,
  "activity|4-8": [
    {
      "question": "你高中的时候，那个瞬间最可怕？",
      "launcher": "飞鸟",
      "attentioners": 780,
      "label": "女生 大学生活",
      "description": "女生宿舍里，一个女生偷拍另一个女生换衣服的照片发到一个群上， 那个群里有五六个男生，其中一个是和我关系...",
      "forward": 3,
      "comment": 56,
      "thumbUp": 78,
      "collect": 67,
      "mark": "activity",
      "time": '一天前',
      "pagesAll": 2
    }
  ]
})
//返回话题数据
Mock.mock(/\/api\/topic\?p=(1|2)/, {code: 0,
  "topic|3-6": [
    {
      "mark": "topic",
      "project": "高数",
      "time": '一天前',
      "pagesAll": 2
    },
    {
      "mark": "topic",
      "project": "建筑图纸",
      "time": '一天前',
      "pagesAll": 2
    }
  ]
})
//返回好友数据
Mock.mock(/\/api\/friend\?p=(1|2)/, {code: 0,
  "friend|4-8": [
    {
      "nickName":"不会飞的鱼",
      "region":"河北 保定",
      "point":"689",
      "residence":"北京 东城",
      "school":"华北电力大学（北京）",
      "position":"学生",
      "avatar": "/static/ximages/avatar.png",
      "description": "是美丽的狗子，不是单纯的傻子",
      "pagesAll": 2
    }
  ]
})
//返回收藏数据
Mock.mock(/\/api\/collect\?p=(1|2)/, {code: 0,
  "collect|5-10": [
    {
      "title": "关于写作",
      "time": "2018.9.14",
      "collectNum": 19,
      "pagesAll": 2
    }
  ]
})

/*                      XY好友列表数据                                        */
Mock.mock(/\/api\/friendList/, {code: 0,
  "friendList|10-15": [
    {
      "nickName": "@cfirst" + "@clast",
      "motto": "你关注了我，就是我的老婆你关注了我，就是我的老婆",
      "avatar": "/static/ximages/avatar-2.png",
      "friendId|1-15": 1
    }
  ]
})

Mock.mock(/\/api\/friendTalkHistory\?friendId=\w*/, {code: 0,
  "talkHistory": [
    {
      "talk": "(*゜ロ゜)我们的目标是------吃饱喝足每一天",
      "time": "6-13 18:30",
      "identity": "other"
    },
    {
      "talk": "(*゜ロ゜)我们的目标是------吃饱喝足每一天",
      "time": "6-14 16:30",
      "identity": "me"
    },
    {
      "talk": "(*゜ロ゜)我们的目标是------吃饱喝足每一天",
      "time": "6-15 19:30",
      "identity": "other"
    }
  ]
})

/*              XY私信列表数据                        */
Mock.mock(/\/api\/privateletter\?p=(1|2)/, {code: 0,
  "privateLetter": [
    {
      "title": "银杏管理团队",
      "time": "11:28",
      "message": "您好！非常遗憾的通知您,在xxxx任务中，您接单失败，是否将接单失败您好！非常遗憾的通知您,在xxxx任务中，您接单失败，是否将接单失败",
      "avatar": "/static/ximages/avatar-2.png",
      "count": 99,
      "pagesAll": 2,
      "id": 1
    },
    {
      "title": "粉丝管理",
      "time": "11:28",
      "message": "xxx已关注您",
      "avatar": "/static/ximages/avatar-2.png",
      "count": 99,
      "pagesAll": 2,
      "id": 1
    },
    {
      "title": "接单邀请",
      "time": "11:28",
      "message": "您好！xxx邀请您进行xxxxxxxx任务接单，详情任务请戳>>>>",
      "avatar": "/static/ximages/avatar-2.png",
      "count": 99,
      "pagesAll": 2,
      "id": 1
    },
    {
      "title": "河北妈妈团",
      "time": "11:28",
      "message": "对于孩子奶粉的选择，我们只能用另一种思维.....",
      "avatar": "/static/ximages/avatar-2.png",
      "count": 99,
      "pagesAll": 2,
      "id": 1
    }, {
      "title": "河北妈妈团",
      "time": "11:28",
      "message": "对于孩子奶粉的选择，我们只能用另一种思维.....",
      "avatar": "/static/ximages/avatar-2.png",
      "count": 99,
      "pagesAll": 2,
      "id": 1
    }
  ]
})
//关注人私信数据
Mock.mock(/\/api\/attentionletter/, {code: 0,
  "attentionLetter|3-5": [
    {
      "avatar": '/static/ximages/avatar-2.png',
      "name": "小鸟小鸟"
    }
  ]
})
//未关注人私信
Mock.mock(/\/api\/unattentionletter/, {code: 0,
  "unattentionLetter|3-5": [
    {
      "name": "会飞的鱼",
      "avatar": "/static/ximages/avatar-2.png"
    }
  ]
})
//私信详情数据
Mock.mock(/\/api\/privateletterdetail\?id=1/, {code:0,
  "privateLetterDetail":  {
    "talkHistory": [
      {
        "identity": "other",
        "talk": "现在我要和你分享一个深藏在我内心的秘密（假设你有足够的耐心，因为我的故事比较长，但是很精彩）。我叫刘雪冰，是两个孩子的妈妈，" +
        "20年前我嫁给了相恋四年的大学同学，老公的家境虽然称不上大富大贵，但是相处融洽。",
        "time": "11:28",
        "avatar": "/static/ximages/avatar-2.png",
        "name": "河北妈妈团"
      },
      {
        "identity": "me",
        "talk": "现在我要和你分享一个深藏在我内心的秘密（假设你有足够的耐心，因为我的故事比较长，但是很精彩）。我叫刘雪冰，是两个孩子的妈妈，" +
        "20年前我嫁给了相恋四年的大学同学，老公的家境虽然称不上大富大贵，但是相处融洽。",
        "time": "11:28",
        "avatar": "/static/ximages/avatar-2.png",
        "name": "不会飞的鱼"
      },
      {
        "identity": "other",
        "talk": "现在我要和你分享一个深藏在我内心的秘密（假设你有足够的耐心，因为我的故事比较长，但是很精彩）。我叫刘雪冰，是两个孩子的妈妈，" +
        "20年前我嫁给了相恋四年的大学同学，老公的家境虽然称不上大富大贵，但是相处融洽。",
        "time": "11:28",
        "avatar": "/static/ximages/avatar-2.png",
        "name": "河北妈妈团"
      }
    ],
    "name": "河北妈妈团"
  }
})

//返回上传图片的数据
Mock.mock('/api/uploadImage', {
  "image": {
    "location":  "/static/ximages/妹纸1.png"
  }
})
