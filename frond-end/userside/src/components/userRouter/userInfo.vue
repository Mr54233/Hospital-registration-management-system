<template>
	<div id="app">
		<!-- 面包屑区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>个人中心</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 展示用户的个人信息区域 -->
		<el-form :model="user" label-position="left" label-width="80px">
			<el-form-item label="用户名">
				<el-input v-model="user.uname"></el-input>
			</el-form-item>
			<el-form-item label="性别">
				<!-- <el-input type="checkbox" v-model="user.usex"></el-input> -->
				<el-radio-group v-model="user.usex">
					<el-radio :label="1">男</el-radio>
					<el-radio :label="0">女</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="年龄">
				<el-input v-model="user.uage"></el-input>
			</el-form-item>
			<el-form-item label="联系方式">
				<el-input v-model="user.uphone"></el-input>
			</el-form-item>
			<!-- 提交按钮 -->
			<el-form-item>
				<el-button type="primary" @click="submitInfo">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import qs from "qs";
export default {
	name: "userInfo",
	props: { user: {} },
	data() {
		return {
			// user: {},
		};
	},
	methods: {
		// 提交修改的个人信息
		submitInfo() {
			console.log(this.user);
			let user = this.user;
			this.$http
				.post("/user/addMsg", qs.stringify(user))
				.then((res) => {
					if (res.data.status === 200) {
						this.$message.success(res.data.message);
					} else {
						this.$message.error(res.data.message);
					}
				})
				.catch((err) => {
					console.log(err);
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
