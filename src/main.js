// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUi from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './css/elementui-theme.scss'
import router from './router'
import store from './store'
// import './mock/mockServer.js'
import './fonts/fonts-1/style.css'
import './fonts/fonts-2/style.css'
import '../static/jquery.form'
Vue.use(ElementUi)
import './css/base.css'
import './css/cropbox.css'
import '../static/cropbox.js'


import WebIM from 'easemob-websdk'
Vue.prototype.$WebIM = WebIM;
window.WebIM = WebIM;
Vue.prototype.$conn = new WebIM.connection({
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
  url: WebIM.config.xmppURL,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  apiUrl: WebIM.config.apiURL,
  isAutoLogin: true
});


import VueLazyload from 'vue-lazyload'


Vue.config.productionTip = false

Vue.use(VueLazyload,{
	error:'https://oss.yxlinker.com/master/person.png',
	loading:'https://oss.yxlinker.com/master/person.png',

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
