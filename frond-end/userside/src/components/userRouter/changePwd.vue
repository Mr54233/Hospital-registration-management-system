<template>
	<div id="app">
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>修改密码</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 修改密码区域 -->
		<el-form
			ref="cFormRef"
			:model="form"
			label-position="left"
			label-width="80px"
			:rules="formRules"
		>
			<el-form-item label="新密码" prop="password">
				<el-input type="password" v-model="form.password"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="repassword">
				<el-input
					type="password"
					v-model="form.repassword"
					@keyup.native.enter="subPwd"
				></el-input>
			</el-form-item>
			<!-- 提交按钮 -->
			<el-form-item>
				<el-button type="primary" @click.native="subPwd">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import qs from "qs";
export default {
	name: "changePwd",
	props: { user: {} },
	data() {
		var repasswordValidator = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请再次输入密码"));
			} else if (value !== this.form.password) {
				callback(new Error("两次输入密码不一致!"));
			} else {
				callback();
			}
		};
		return {
			form: {
				uid: this.user.uid,
				password: "",
				repassword: "",
			},
			formRules: {
				password: [
					{
						required: true,
						message: "请输入新密码",
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
		subPwd() {
			this.$refs.cFormRef.validate((valid) => {
				console.log(valid);
				if (valid) {
					this.$http
						.post("/user/updatePwd", qs.stringify(this.form))
						.then((res) => {
							if (res.data.status === 200) {
								this.$message.success(res.data.message);
								// 清空表单
								this.$refs.cFormRef.resetFields();
								// 清空用户信息
								window.localStorage.clear();
								this.$message.success("请重新登录");
								// 跳转到登录页面
								this.$router.push("/login");
							} else {
								this.$message.error(res.data.message);
							}
						});
				} else {
					this.$message.error("请检查表单信息");
				}
			});
		},
	},
};
</script>
<style scoped>
.el-breadcrumb {
	margin: 10px 0 20px;
}
.el-input {
	width: 400px;
}
</style>
