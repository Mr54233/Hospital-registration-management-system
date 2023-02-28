<template lang="">
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>患者管理</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 用户列表 -->
		<!-- uage : 18 uid : 1 uname : "54" upassword : "123456" uphone : "12312341234"
		usex : 1 -->
		<el-table :data="userList" border :row-class-name="tableRowClassName">
			<el-table-column
				prop="uname"
				label="用户名"
				align="center"
			></el-table-column>
			<el-table-column
				prop="usex"
				label="性别"
				:formatter="sexFormate"
				align="center"
			></el-table-column>
			<el-table-column
				prop="uage"
				label="年龄"
				align="center"
			></el-table-column>
			<el-table-column
				prop="uphone"
				label="联系方式"
				align="center"
			></el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="primary" @click.native="edit(scope)">编辑</el-button>
					<el-button type="danger" @click.native="confirmDel(scope)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
		<!-- 编辑框 -->
		<el-dialog title="编辑用户" :visible="dialogVisible">
			<el-form
				label-position="left"
				:model="editForm"
				:rules="editFormRules"
				ref="editFormRef"
			>
				<el-form-item label="用户名" prop="uname" label-width="80px">
					<el-input v-model="editForm.uname"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="usex" label-width="80px">
					<el-radio-group v-model="editForm.usex">
						<el-radio :label="1">男</el-radio>
						<el-radio :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄" prop="uage" label-width="80px">
					<el-input v-model="editForm.uage"></el-input>
				</el-form-item>
				<el-form-item label="联系方式" prop="uphone" label-width="80px">
					<el-input v-model="editForm.uphone"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="editFormSubmit">确 定</el-button>
					<el-button @click="dialogVisible = false">取 消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<style>
.el-breadcrumb {
	margin: 10px 0 20px;
}

.el-table .hidden {
	display: none;
}
</style>

<script>
export default {
	created() {
		this.getUserList();
	},
	data() {
		return {
			// 用户列表
			userList: [],
			// 编辑表单
			editForm: {},
			dialogVisible: false,
			// 编辑表单验证规则
			editFormRules: {
				uname: [
					{ required: true, message: "请输入用户名", trigger: "blur" },
					{
						min: 2,
						max: 10,
						message: "长度在 2 到 10 个字符",
						trigger: "blur",
					},
				],
				usex: [{ required: true, message: "请选择性别", trigger: "change" }],
				uage: [{ required: true, message: "请输入年龄", trigger: "blur" }],
				uphone: [
					{ required: true, message: "请输入联系方式", trigger: "blur" },
				],
			},
			// 编辑表单验证
			editVal: "",
		};
	},
	methods: {
		// 获取用户列表
		async getUserList() {
			const { data: res } = await this.$http.get("/admin/getUserList");
			if (res.status !== 200) {
				return this.$message.error(res.message);
			} else {
				// this.$message.success(res.message);
				this.userList = res.data;
			}
			// console.log(this.userList);
		},
		// 编辑用户
		edit(scope) {
			// console.log(scope);
			this.dialogVisible = true;
			this.editForm = scope.row;
			console.log(this.editForm);
		},
		// 编辑表单提交
		async editFormSubmit() {
			this.$refs.editFormRef.validate(async (valid) => {
				if (valid) {
					const { data: res } = await this.$http.post(
						"/admin/updateUser",
						this.editForm
					);
					if (res.status !== 200) return this.$message.error("编辑用户失败");
					this.$message.success("编辑用户成功");
					this.dialogVisible = false;
					this.getUserList();
				} else {
					return false;
				}
			});
		},

		sexFormate(row, index) {
			if (row.usex == 1) {
				return "男";
			} else if (row.usex == 0) {
				return "女";
			}
		},

		tableRowClassName({ row, rowIndex }) {
			// console.log(row.del);
			if (row.del == 0) {
				// console.log("隐藏");
				return "hidden";
			}
			return "";
			// console.log(row);
		},

		confirmDel(scope) {
			this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					this.delUser(scope.row.uid);
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除",
					});
				});
		},

		async delUser(uid) {
			const { data: res } = await this.$http.post("/admin/delUser", { uid });
			if (res.status !== 200) {
				return this.$message.error(res.message);
			} else {
				this.$message.success(res.message);
			}
			this.getUserList();
		},
	},
};
</script>
