<template>
	<div id="app" class="login_container">
			<h1 class="title">医院挂号系统</h1>
		<div class="login_box">
			<!-- 表单区域 -->
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

				<el-form-item class="btns">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button type="info" @click="resetLoginForm"
						>重置</el-button
					>
				</el-form-item>
			</el-form>
		</div>
		<div class="reg_box">
			<h1 class="title">用户注册</h1>
		</div>
	</div>
</template>

<script>
import qs from "qs";

export default {
	data() {
		return {
			loginForm: {
				username: '',
				password: ''
			},
			loginFormRules: {
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
						message: "请输入登陆密码",
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
		};
	},
	methods: {
		resetLoginForm() {
			// 此处的this就是登录组件本身
			this.$refs.loginFormRef.resetFields();
		},
		async login() {
			// axios 向api服务器端发送请求
			const { data: res } = await this.$http.post(
				"/user/login",
				qs.stringify(this.loginForm)
			);

			// 在页面上显示登陆成功的信息
			if (res.status !== 200)
				return this.$message.error(res.message);
			this.$message.success("登陆成功");
			// 将返回数据中的令牌保存到sessionStorage
			window.sessionStorage.setItem("token", res.token);
			// 进入后台管理子系统的首页中去
			this.$router.push("/home");
		},
	},
};
</script>

<style scoped>
.login_container {
	height: 100%;
	background-color: #2592a8;
}

.title{
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

.reg_box{
	display: none;
}
</style>
