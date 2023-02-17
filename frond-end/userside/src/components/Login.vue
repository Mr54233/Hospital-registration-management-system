<template>
	<div id="app" class="login_container">
		<h1 class="title">医院挂号系统</h1>
		<div class="login_box" v-show="loginShow">
			<!-- 登录面板 -->
			<h1 class="title">用户登录</h1>
			<el-form
				ref="loginFormRef"
				:model="loginForm"
				:rules="loginFormRules"
			>
				<el-form-item prop="username">
					<el-input
						v-model="loginForm.username"
						prefix-icon="iconfont icon-user"
						placeholder="请输入用户名"
					></el-input>
				</el-form-item>

				<el-form-item prop="password">
					<el-input
						v-model="loginForm.password"
						prefix-icon="iconfont icon-3702mima"
						type="password"
						placeholder="请输入密码"
					></el-input>
				</el-form-item>

				<el-button class="lbtns" type="success" @click="goReg"
					>注册</el-button
				>
				<el-form-item class="btns">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button type="info" @click="resetLoginForm"
						>重置</el-button
					>
				</el-form-item>
			</el-form>
		</div>

		<div class="reg_box" v-show="regShow">
			<!-- 注册面板 -->
			<h1 class="title">用户注册</h1>
			<el-form ref="regFormRef" :model="regForm" :rules="regFormRules">
				<el-form-item prop="username">
					<el-input
						v-model="regForm.username"
						prefix-icon="iconfont icon-user"
						placeholder="请输入注册用户名"
					></el-input>
				</el-form-item>

				<el-form-item prop="password">
					<el-input
						v-model="regForm.password"
						prefix-icon="iconfont icon-3702mima"
						type="password"
						placeholder="请输入注册密码"
					></el-input>
				</el-form-item>

				<el-form-item prop="repassword">
					<el-input
						v-model="regForm.repassword"
						prefix-icon="iconfont icon-3702mima"
						type="password"
						placeholder="请再次输入密码"
					></el-input>
				</el-form-item>

				<el-button class="lbtns" type="success" @click="backLogin"
					>返回登录</el-button
				>
				<el-form-item class="btns">
					<el-button type="primary" @click="reg">注册</el-button>
					<el-button type="info" @click="resetRegForm"
						>重置</el-button
					>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import qs from "qs";

export default {
	data() {
		var repasswordValidator = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请再次输入密码"));
			} else if (value !== this.regForm.password) {
				callback(new Error("两次输入密码不一致!"));
			} else {
				callback();
			}
		};
		return {
			loginShow: true,
			regShow: false,
			logVa: false,
			regVa: false,
			loginForm: {
				username: "",
				password: "",
			},
			loginFormRules: {
				username: [
					{
						required: true,
						message: "请输入注册名称",
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
						min: 6,
						max: 20,
						message: "密码长度是6到20个字符",
						trigger: "blur",
					},
				],
			},
			regForm: {
				username: "",
				password: "",
				repassword:"",
			},
			regFormRules: {
				username: [
					{
						required: true,
						message: "请输入用户名称",
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
						min: 6,
						max: 20,
						message: "密码长度是6到20个字符",
						trigger: "blur",
					},
				],
				repassword: [
					{
						required: true,
						message: "请输入确认密码",
						trigger: "blur",
					},
					{ validator: repasswordValidator, trigger: "blur" },
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
					"/user/login",
					qs.stringify(this.loginForm)
				);
				// 在页面上显示登陆成功的信息
				if (res.status !== 200) return this.$message.error(res.message);
				this.$message.success("登陆成功");
				// 将返回数据中的令牌保存到sessionStorage
				window.localStorage.setItem("token", res.token);
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
				this.backLogin()
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
	background-color: #2592a8;
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
