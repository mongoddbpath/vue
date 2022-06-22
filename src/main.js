// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'

// 引入自定义全局变量
// import global_ from '@/components/Global.vue'

// 引入axios
import axios from 'axios'

// 核心插件
import d2Admin from '@/plugin/d2admin'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import D2Crud from '@d2-projects/d2-crud'
// store
import store from '@/store/index'

// 菜单和路由设置
import router from './router'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import { frameInRoutes } from '@/router/routes'
// 根据不同的身份渲染不同的路由菜单
import selectmenu from '@/menu/selectMenu'
import util from '@/libs/util.js'

// 将全局变量挂载到原型
// Vue.prototype.GLOBAL = global_

// 核心插件
Vue.use(d2Admin)
Vue.use(ElementUI)
Vue.use(D2Crud)

// 将axios加入原型链，可以通过$axios来对axios进行引用
Vue.prototype.$axios = axios
Vue.prototype.$util = util

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuAside)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
    // 根据不同的身份渲染不同的路由菜单
    selectmenu()
  }
}).$mount('#app')
