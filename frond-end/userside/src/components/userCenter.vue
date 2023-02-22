<template lang="">
	<el-container>
		<!-- 个人中心 -->
		<el-header>
			<span class="title">个人中心</span>
			<span>
				{{ username }}
			</span>
			<el-button type="info" @click.native="goBack"> 返回挂号页面 </el-button>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<el-menu background-color="#333744" text-color="#fff" router>
					<el-menu-item index="/userInfo">
						<span>个人信息</span>
					</el-menu-item>
					<el-menu-item index="/regInfo">
						<span>挂号信息</span>
					</el-menu-item>
					<el-menu-item index="/changePwd">
						<span>修改密码</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<!-- 主体部分 -->
			<el-main>
                <router-view :user="user"></router-view>
            </el-main>
		</el-container>
	</el-container>
</template>
<script>
export default {
	data() {
		return {
			username: "",
			user: {},
		};
	},
	created() {
		this.getUsername();
		this.getUserInfo();
	},
	methods: {
		// 获取用户名
		getUsername() {
			this.username = window.localStorage.getItem("username");
		},
		// 返回挂号页面
		goBack() {
			this.$router.push("/home");
		},
		// 获取用户信息
		async getUserInfo() {
			const { data } = await this.$http.get("/user/getUser", {
				params: {
					username: this.username,
				},
			});
			if (data.status === 200) {
				this.user = data.data[0];
				// this.$message.success(data.message);
				// console.log(this.user);
			} else {
				this.$message.error(data.message);
			}
		},
	},
};
</script>
<style scoped>
.el-header {
	background-color: #373d41;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.title {
	flex: 1;
}

.el-header span {
	margin-right: 10px;
	font-size: 20px;
	color: #fff;
}
.el-aside {
	/* height: 100vh; */
	background-color: #333744;
}
.el-menu {
    align-items: center;
	height: 100vh;
}
</style>
