import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

// 导入通用样式文件
import "./assets/css/global.css";

// 导入elementUI 样式和插件
import "element-ui/lib/theme-chalk/index.css";
import "./plugins/element";

// 导入第三方字体图标类样式
import "./assets/fonts/iconfont.css";

// 设置axios默认url
axios.defaults.baseURL = "http://127.0.0.1:3000";
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

// axios.defaults.withCredentials = true
// axios.defaults.baseURL = "base_url";

// 使用axios请求拦截器去完成路由守卫任务
axios.interceptors.request.use((config) => {
	config.headers.Authorization = window.localStorage.getItem("adminToken");
	return config;
});

// 将axios 绑定到vue原型对象上
Vue.prototype.$http = axios;

Vue.prototype.$socket = () => {};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
