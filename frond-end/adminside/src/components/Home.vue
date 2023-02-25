<template>
	<el-container class="home-container">
		<!-- 头部 -->
		<el-header>
			<span class="title">医院挂号系统</span>
			<el-dropdown>
				<span class="el-dropdown-link">
					{{ adminName }}<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="goCenter">个人中心</el-dropdown-item>
					<el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</el-header>
		<!-- 侧边栏 -->
		<el-container style="height: 500px">
			<!-- 侧边栏宽度 -->
			<el-aside width="200px">
				<el-menu
					background-color="#333744"
					text-color="#fff"
					active-text-color="#409eff"
					router
				>
					<el-menu-item index="/user">
						<i class="el-icon-user"></i>
						<span slot="title">用户管理</span>
					</el-menu-item>
					<el-menu-item index="/doctor">
						<i class="el-icon-s-custom"></i>
						<span slot="title">医生管理</span>
					</el-menu-item>
					<el-menu-item index="/department">
						<i class="el-icon-office-building"></i>
						<span slot="title">科室管理</span>
					</el-menu-item>
					<el-menu-item index="/registered">
						<i class="el-icon-tickets"></i>
						<span slot="title">挂号管理</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<!-- 主体部分 -->
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import qs from "qs";

export default {
	created() {
		this.getAdminName();
	},
	data() {
		return {
			adminName: "",
		};
	},
	methods: {
		// 获取管理员姓名
		getAdminName() {
			this.adminName = localStorage.getItem("adminName");
		},
		// 退出登录
		logout() {
			this.$confirm("确定退出登录吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					localStorage.removeItem("token");
					this.$router.push("/login");
					this.$message({
						type: "success",
						message: "退出登录成功!",
					});
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消退出",
					});
				});
		},
	},
};
</script>

<style scoped>
.home-container {
	height: 100%;
}

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
	background-color: #333744;
}
.el-main {
	background-color: #eaedf1;
}
</style>
