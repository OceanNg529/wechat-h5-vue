/*
 * @Date: 2021-06-19 15:14:56
 * @LastEditors: ocean 13620113564@qq.com
 * @LastEditTime: 2022-06-14 16:35:07
 * @FilePath: /wechat-vue/src/main.js
 */
import Vue from 'vue'
import Cookies from 'js-cookie'
import ElementUI from 'element-ui';
//import './styles/element-variables.scss'
//import '@/styles/reset.css' // reset css
//import 'normalize.css/normalize.css' // normalize css



import App from './App.vue'
import router from './router'
import store from './store'

import './icons' // icon
import './permission' // permission control

//import 'lib-flexible'
// import animated from 'animate.css' //animate.css
// Vue.use(animated)

import Moment from 'moment' //time format

//定义全局时间戳过滤器
Vue.filter('formatDate', function (value) {
    return Moment.unix(value).format('YYYY-MM-DD')
})

// import VConsole from 'vconsole/dist/vconsole.min.js' //wechat debug
// let vConsole = new VConsole()

Vue.config.productionTip = false

Vue.use(ElementUI, {
    size: Cookies.get('size') || 'medium' // set element-ui default size
})


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')