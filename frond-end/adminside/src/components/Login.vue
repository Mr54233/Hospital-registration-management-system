<template>
	<div id="app" class="login_container">
		<h1 class="title">医院挂号管理系统</h1>
		<div class="login_box">
			<!-- 登录面板 -->
			<h1 class="title">管理员登录</h1>
			<el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
				<el-form-item prop="adminName">
					<el-input
						v-model="loginForm.adminName"
						prefix-icon="iconfont icon-user"
						placeholder="请输入管理员名"
					></el-input>
				</el-form-item>

				<el-form-item prop="password">
					<el-input
						v-model="loginForm.password"
						prefix-icon="iconfont icon-3702mima"
						type="password"
						placeholder="请输入密码"
						@keyup.native.enter="login"
					></el-input>
				</el-form-item>

				<el-form-item class="btns">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button type="info" @click="resetLoginForm">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import qs from "qs";

export default {
	data() {
		return {

			logVa: false,

			loginForm: {
				adminName: "",
				password: "",
			},
			loginFormRules: {
				adminName: [
					{
						required: true,
						message: "请输入管理员名称",
						trigger: "blur",
					},
					{
						min: 2,
						max: 10,
						message: "长度是2到10个字符",
						trigger: "blur",
					},
				],
				password: [
					{
						required: true,
						message: "请输入注册密码",
						trigger: "blur",
					},
					{
						min: 5,
						max: 20,
						message: "密码长度是6到20个字符",
						trigger: "blur",
					},
				],
			},
		};
	},
	methods: {
		resetLoginForm() {
			// 此处的this就是登录组件本身
			this.$refs.loginFormRef.resetFields();
		},
		async login() {
			this.$refs.loginFormRef.validate((valid) => {
				// console.log(valid);
				this.logVa = valid;
			});
			if (this.logVa) {
				// axios 向api服务器端发送请求
				const { data: res } = await this.$http.post(
					"/admin/login",
					qs.stringify(this.loginForm)
				);
				// 在页面上显示登陆成功的信息
				if (res.status !== 200) return this.$message.error(res.message);
				this.$message.success("登陆成功");
				// 将返回数据中的令牌保存到sessionStorage
				window.localStorage.setItem("adminToken", res.token);
				window.localStorage.setItem("adminName", res.adminInfo);
				// 进入首页
				this.$router.push("/home");
			} else {
				this.$message.error("请按照规范填写用户名称和密码");
			}
		},
		goReg() {
			this.loginShow = !this.loginShow;
			this.regShow = !this.regShow;
		},
		backLogin() {
			this.loginShow = !this.loginShow;
			this.regShow = !this.regShow;
		},
		resetRegForm() {
			// 此处的this就是登录组件本身
			this.$refs.regFormRef.resetFields();
		},
		async reg() {
			this.$refs.regFormRef.validate((valid) => {
				// console.log(valid);
				this.regVa = valid;
			});
			if (this.regVa) {
				const { data: res } = await this.$http.post(
					"/user/regUser",
					qs.stringify(this.regForm)
				);
				// 在页面上显示登陆成功的信息
				if (res.status !== 200) return this.$message.error(res.message);
				this.$message.success("注册成功，返回登录页面");
				// 返回登录
				this.backLogin();
			} else {
				this.$message.error("请按照规范填写用户名称和密码");
			}
		},
	},
};
</script>

<style scoped>
.login_container {
	height: 100%;
	background-color: #039d50;
}

.title {
	position: absolute;
	left: 50%;
	top: 10%;
	transform: translate(-50%, -50%);
}

.login_box {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 450px;
	height: 300px;
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0 0 10px #ccc;
	margin: 0 auto;
}

.el-form {
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 20px;
	box-sizing: border-box;
	/* margin: 0 auto; */
}

.el-input {
	width: 100%;
}

.btns {
	float: right;
}
.lbtns {
	float: left;
}

.reg_box {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 450px;
	height: 350px;
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0 0 10px #ccc;
	margin: 0 auto;
}
</style>
