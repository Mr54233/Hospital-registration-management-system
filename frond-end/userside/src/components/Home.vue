<template>
	<el-container class="home-container">
		<el-header>
			<span>医院挂号系统</span>
			<el-button type="info" @click="logout"
				>退出登录</el-button
			></el-header
		>
		<el-container style="height: 500px">
			<!-- 侧边栏宽度 -->
			<el-aside width="200px">
				<el-menu
					:default-active="activeIndex.toString()"
					class="el-menu-vertical"
					background-color="#333744"
					text-color="#fff"
					active-text-color="#409eff"
				>
					<el-menu-item
						:index="room.id + ''"
						v-for="room in roomList"
						:key="room.id"
						@click="
							setActiveIndex(room.id);
							getDocName(room.pname);
						"
					>
						<span>{{ room.pname }}</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main>
				<span>{{ docList }}</span>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
export default {
	// 在创建了vue对象之后 , 请求api服务器端提供的导航菜单数据
	created() {
		this.getRoomList();
		// 当创建完vue实例对象 , 获取localStorage中的激活菜单的index
		this.activeIndex = window.localStorage.getItem("activeIndex");
	},
	data() {
		return {
			roomList: [],
			// 激活菜单的index
			activeIndex: "",
			roomName: "",
			docList: [],
		};
	},
	methods: {
		// 退出登陆的处理方法
		logout() {
			// 1. 清空localStorage中的token
			window.localStorage.clear();
			// 2. 强制进入到登陆页面
			this.$router.push("/");
		},
		// 获取科室数据
		async getRoomList() {
			const { data: res } = await this.$http.get("/reg/getDepart");
			// console.log(res);
			if (res.status !== 200) {
				return this.$message.error(res.message);
			} else {
				this.roomList = res.data;
			}
		},
		setActiveIndex(activeIndex) {
			this.activeIndex = activeIndex;
			// 将激活菜单的index保存到localStorage中
			window.localStorage.setItem("activeIndex", activeIndex);
		},
		async getDocName(rname) {
			this.roomName = rname;
			const { data: res } = await this.$http.get("/reg/getDoc",{params:{pname : this.roomName}});
			// console.log(res);
			if(res.status !== 200){
				return this.$message.error(res.message)
			} else {
				this.docList = res.data
			}
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
.el-header span {
	font-size: 20px;
	color: #fff;
}

.el-aside {
	background-color: #333744;
}
.el-main {
	background-color: #eaedf1;
}
.el-submenu span {
	margin-right: 10px;
}

/* .toggle-button {
	background-color: #4a5064;
	font-size: 10px;
	line-height: 24px;
	color: #fff;
	text-align: center;
	letter-spacing: 0.2rem;
	cursor: pointer;
} */
</style>
