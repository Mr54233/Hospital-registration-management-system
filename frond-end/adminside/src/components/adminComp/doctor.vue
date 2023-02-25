<template lang="">
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 10px 0">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>医生管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button type="success" @click="addDialogVisible = true"
			>新增医生</el-button
		>
		<!-- 用户列表 -->
		<!-- dage : 46 del : "1" department : "发热门诊" dname : "孟子韬" dsex : "1" id :
		1 -->
		<el-table :data="docList" border :row-class-name="tableRowClassName">
			<el-table-column prop="dname" label="医生姓名"></el-table-column>
			<el-table-column
				prop="dsex"
				label="性别"
				:formatter="sexFormate"
			></el-table-column>
			<el-table-column prop="dage" label="年龄"></el-table-column>
			<el-table-column prop="department" label="所属科室"></el-table-column>
			<el-table-column label="操作">
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
				<el-form-item label="医生姓名" prop="dname" label-width="80px">
					<el-input v-model="editForm.dname"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="dsex" label-width="80px">
					<el-radio-group v-model="editForm.dsex">
						<el-radio :label="1">男</el-radio>
						<el-radio :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄" prop="dage" label-width="80px">
					<el-input v-model="editForm.dage"></el-input>
				</el-form-item>
				<el-form-item label="所属科室" prop="department" label-width="80px">
					<el-input v-model="editForm.department"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="editFormSubmit">确 定</el-button>
					<el-button @click="dialogVisible = false">取 消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 新增编辑框 -->
		<el-dialog title="新增医生" :visible="addDialogVisible">
			<el-form
				label-position="left"
				:model="addForm"
				:rules="addFormRules"
				ref="addFormRef"
			>
				<el-form-item label="医生姓名" prop="dname" label-width="80px">
					<el-input v-model="addForm.dname"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="dsex" label-width="80px">
					<el-radio-group v-model="addForm.dsex">
						<el-radio :label="1">男</el-radio>
						<el-radio :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄" prop="dage" label-width="80px">
					<el-input v-model="addForm.dage"></el-input>
				</el-form-item>
				<el-form-item label="所属科室" prop="department" label-width="80px">
					<el-input v-model="addForm.department"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="addFormSubmit">确 定</el-button>
					<el-button @click="addDialogVisible = false">取 消</el-button>
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
		this.getDocList();
	},
	data() {
		return {
			// 医生列表
			docList: [],
			// 编辑表单
			editForm: {},
			dialogVisible: false,
			// 编辑表单验证规则
			editFormRules: {
				dname: [
					{ required: true, message: "请输入用户名", trigger: "blur" },
					{
						min: 2,
						max: 10,
						message: "长度在 2 到 10 个字符",
						trigger: "blur",
					},
				],
				dsex: [{ required: true, message: "请选择性别", trigger: "change" }],
				dage: [{ required: true, message: "请输入年龄", trigger: "blur" }],
				department: [
					{ required: true, message: "请输入所属科室", trigger: "blur" },
				],
			},

			// 新增表单
			addForm: {},
			addDialogVisible: false,
			// 新增表单验证规则
			addFormRules: {
				dname: [
					{ required: true, message: "请输入用户名", trigger: "blur" },
					{
						min: 2,
						max: 10,
						message: "长度在 2 到 10 个字符",
						trigger: "blur",
					},
				],
				dsex: [{ required: true, message: "请选择性别", trigger: "change" }],
				dage: [{ required: true, message: "请输入年龄", trigger: "blur" }],
				department: [
					{ required: true, message: "请输入所属科室", trigger: "blur" },
				],
			},
		};
	},
	methods: {
		// 获取医生列表
		async getDocList() {
			const { data: res } = await this.$http.get("/admin/getDocList");
			if (res.status !== 200) return this.$message.error("获取医生列表失败");
			this.docList = res.data;
			// console.log(this.docList);
		},
		// 编辑医生
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
						"/admin/updateDoc",
						this.editForm
					);
					if (res.status !== 200) return this.$message.error("编辑用户失败");
					this.$message.success("编辑医生成功");
					this.dialogVisible = false;
					this.getDocList();
				} else {
					return false;
				}
			});
		},

		sexFormate(row, index) {
			if (row.dsex == 1) {
				return "男";
			} else if (row.dsex == 0) {
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
			this.$confirm("此操作将永久删除该医生, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					this.delDoc(scope.row.id);
					// console.log(scope.row);
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除",
					});
				});
		},

		async delDoc(id) {
			const { data: res } = await this.$http.post("/admin/delDoc", { id });
			if (res.status !== 200) {
				return this.$message.error(res.message);
			} else {
				this.$message.success(res.message);
			}
			this.getDocList();
		},

		addFormSubmit() {
			this.$refs.addFormRef.validate(async (valid) => {
				if (valid) {
					const { data: res } = await this.$http.post(
						"/admin/addDoc",
						this.addForm
					);
					if (res.status !== 200) return this.$message.error("添加医生失败");
					this.$message.success("添加医生成功");
					this.addDialogVisible = false;
					this.getDocList();
				} else {
					return false;
				}
			});
		},
	},
};
</script>
