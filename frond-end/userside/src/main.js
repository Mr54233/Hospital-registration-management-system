import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

// 导入elementUI 样式和插件
import "element-ui/lib/theme-chalk/index.css";
import "./plugins/element";

// 设置axios默认url
axios.defaults.baseURL = "http://localhost:3000";

// axios.defaults.withCredentials = true
// axios.defaults.baseURL = "base_url";

// 使用axios请求拦截器去完成路由守卫任务
axios.interceptors.request.use((config) => {
	config.headers.Authorization = window.sessionStorage.getItem("token");
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
