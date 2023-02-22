<template>
	<div id="app">
		<!-- 面包屑区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>个人中心</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 展示用户的个人信息区域 -->
		<el-form :model="user">
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
			// // 1. 获取用户修改的个人信息
			// let user = this.user;
			// // 2. 发送请求到后端 , 修改用户的个人信息
			// this.$http
			// 	.post("/api/user/update", qs.stringify(user))
			// 	.then((res) => {
			// 		// 3. 判断是否修改成功
			// 		if (res.data.code == 200) {
			// 			// 4. 提示用户修改成功
			// 			this.$message({
			// 				message: "修改成功",
			// 				type: "success",
			// 			});
			// 		} else {
			// 			// 5. 提示用户修改失败
			// 			this.$message({
			// 				message: "修改失败",
			// 				type: "error",
			// 			});
			// 		}
			// 	})
			// 	.catch((err) => {
			// 		console.log(err);
			// 	});
		},
	},
};
</script>
<style scoped></style>
