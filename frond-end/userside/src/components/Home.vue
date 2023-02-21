<template>
	<el-container class="home-container">
		<el-header>
			<span class="title">医院挂号系统</span>
			<el-dropdown>
				<span class="el-dropdown-link">
					{{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="goCenter">个人中心</el-dropdown-item>
					<el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
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
				<!-- 医生列表 -->
				<el-table :data="docList" border style="width: 100%">
					<el-table-column prop="dname" label="医生姓名" align="center">
					</el-table-column>
					<el-table-column
						prop="dsex"
						:formatter="sexFormate"
						label="医生性别"
						align="center"
					>
					</el-table-column>
					<el-table-column prop="dage" label="医生年龄" align="center">
					</el-table-column>
					<el-table-column prop="department" label="所属科室" align="center">
					</el-table-column>
					<el-table-column label="操作" align="center">
						<template v-slot="scope">
							<el-button type="success" @click="order(scope.row)"
								>挂号</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</el-main>
		</el-container>
		<!-- 挂号面板 -->
		<el-dialog
			title="挂号面板"
			:visible.sync="showDialog"
			width="30%"
			:before-close="handleClose"
		>
			<el-form :model="diaForm" :rules="diaFormRules" ref="diaFormRef">
				<el-form-item label="医生名称" :label-width="formLabelWidth">
					<el-input v-model="diaForm.dname" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="医生年龄" :label-width="formLabelWidth">
					<el-input v-model="diaForm.dage" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="所属科室" :label-width="formLabelWidth">
					<el-input v-model="diaForm.department" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="患者姓名" :label-width="formLabelWidth">
					<el-input v-model="userName" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item
					label="所患疾病"
					:label-width="formLabelWidth"
					prop="disease"
				>
					<el-input v-model="diaForm.disease"></el-input>
				</el-form-item>
				<!-- 今天开始的输入框 -->
				<el-form-item
					label="挂号时间"
					:label-width="formLabelWidth"
					prop="orderTime"
				>
					<el-date-picker
						v-model="diaForm.orderTime"
						type="date"
						placeholder="选择日期"
						value-format="yyyy-MM-dd"
						:picker-options="pickerOptions"
					></el-date-picker>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitReg">确 定 挂 号</el-button>
			</span>
		</el-dialog>
	</el-container>
</template>

<script>
import qs from "qs";

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
			userName: "",
			roomList: [],
			// 激活菜单的index
			activeIndex: "",
			roomName: "",
			docList: [],
			showDialog: false,
			formLabelWidth: "120px",
			diaForm: "",
			diaVal: "",
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() < Date.now() - 86400000; // 选当前时间之前的时间
				},
			},
			// 对话框规则
			diaFormRules: {
				disease: [
					{ required: true, message: "请输入患者所患疾病", trigger: "blur" },
				],
				orderTime: [
					{ required: true, message: "请选择挂号时间", trigger: "change" },
				],
			},
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
			this.diaForm = doc;
			this.showDialog = true;
		},
		async submitReg() {
			this.$refs.diaFormRef.validate((valid) => {
				this.diaVa = valid;
			});
			if (this.diaVa) {
				const { data: res } = await this.$http.post(
					"/reg/regMsg",
					qs.stringify(this.diaForm)
				);
				// 在页面上显示挂号成功的信息
				if (res.status !== 200) return this.$message.error(res.message);
				this.$message.success("挂号成功");
				// 关闭对话框
				this.showDialog = false;
			} else {
				this.$message.error("请按照规范填写所患疾病和预约日期");
			}
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
