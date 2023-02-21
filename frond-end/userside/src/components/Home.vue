<template>
	<el-container class="home-container">
		<el-header>
			<span class="title">医院挂号系统</span>
			<el-dropdown>
				<span class="el-dropdown-link">
					{{ userName
					}}<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="goCenter"
						>个人中心</el-dropdown-item
					>
					<el-dropdown-item @click.native="logout"
						>退出登录</el-dropdown-item
					>
				</el-dropdown-menu>
			</el-dropdown>
		</el-header>
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
				<!-- <span>{{ docList }}</span> -->
				<el-table :data="docList" border style="width: 100%">
					<el-table-column
						prop="dname"
						label="医生姓名"
						align="center"
					>
					</el-table-column>
					<el-table-column
						prop="dsex"
						:formatter="sexFormate"
						label="医生性别"
						align="center"
					>
					</el-table-column>
					<el-table-column
						prop="dage"
						label="医生年龄"
						align="center"
					>
					</el-table-column>
					<el-table-column
						prop="department"
						label="所属科室"
						align="center"
					>
					</el-table-column>
					<el-table-column label="操作" align="center">
						<template v-slot="scope">
							<el-button
								type="success"
								@click="order(scope.row)"
								>挂号</el-button
							>
							<el-button
								type="primary"
								@click="preOrder(scope.row.id)"
								>预约</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</el-main>
		</el-container>
		<el-dialog
			title="挂号面板"
			:visible.sync="showDialog"
			width="30%"
			:before-close="handleClose"
		>
			<!-- <span>这是一段信息</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showDialog = false">取 消</el-button>
				<el-button type="primary" @click="showDialog = false"
					>确 定</el-button
				>
			</span> -->
			<el-form :model="theDoc">
				<el-form-item label="医生名称" :label-width="formLabelWidth">
					<el-input v-model="theDoc.dname" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="医生年龄" :label-width="formLabelWidth">
					<el-input v-model="theDoc.dage" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="所属科室" :label-width="formLabelWidth">
					<el-input v-model="theDoc.department" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="挂号时间" :label-width="formLabelWidth">
					<el-input ></el-input>
				</el-form-item>
			</el-form>
		</el-dialog>
	</el-container>
</template>

<script>
export default {
	// 在创建了vue对象之后 , 请求api服务器端提供的导航菜单数据
	created() {
		this.getRoomList();
		// 当创建完vue实例对象 , 获取localStorage中的激活菜单的index
		this.activeIndex = 1;
		// this.activeIndex = window.localStorage.getItem("activeIndex");

		this.preGetDoc();
		this.roomName = window.localStorage.getItem("roomName");

		// 获取用户名
		this.getUserName();
		// this.userName = this.$store.state.username
	},
	data() {
		return {
			formLabelWidth:"120px",
			userName: "",
			roomList: [],
			// 激活菜单的index
			activeIndex: "",
			roomName: "",
			docList: [],
			showDialog: false,
			theDoc:"",
		};
	},
	methods: {
		// 获取用户姓名
		getUserName() {
			this.userName = window.localStorage.getItem("username");
			// this.username = this.$store.state.username
			// this.$store.dispatch("changeUserName",userName)
		},
		// 跳转个人中心
		goCenter() {
			this.$router.push("/userCenter");
		},
		// 退出登陆的处理方法
		logout() {
			// 1. 清空localStorage中的token
			window.localStorage.clear();
			// 2. 强制进入到登陆页面
			this.$router.push("/");
			this.$message.success("退出登录成功");
		},
		// 获取科室数据
		async getRoomList() {
			const { data: res } = await this.$http.get("/reg/getDepart");
			// console.log(res);
			if (res.status !== 200) {
				return this.$message.error(res.message);
			} else {
				this.roomList = res.data;
				window.localStorage.setItem("activeIndex", 1);
			}
		},
		setActiveIndex(activeIndex) {
			this.activeIndex = activeIndex;
			// 将激活菜单的index保存到localStorage中
			window.localStorage.setItem("activeIndex", activeIndex);
		},

		async preGetDoc() {
			const { data: res } = await this.$http.get("/reg/getDoc", {
				params: { pname: "发热门诊" },
			});
			// console.log(res);
			if (res.status !== 200) {
				return this.$message.error(res.message);
			} else {
				this.docList = res.data;
				window.localStorage.setItem("roomName", "发热门诊");
			}
		},

		async getDocName(rname) {
			const { data: res } = await this.$http.get("/reg/getDoc", {
				params: { pname: rname },
			});
			// console.log(res);
			if (res.status !== 200) {
				return this.$message.error(res.message);
			} else {
				this.docList = res.data;
			}
		},
		sexFormate(row, index) {
			if (row.dsex == 1) {
				return "男";
			} else if (row.dsex == 0) {
				return "女";
			}
		},
		order(doc) {
			// console.log(doc);
			this.theDoc = doc
			this.showDialog = !this.showDialog;
		},
		preOrder(id) {
			console.log(id);
		},
		handleClose(done) {
			this.$confirm("确认关闭？")
				.then((_) => {
					done();
				})
				.catch((_) => {});
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
