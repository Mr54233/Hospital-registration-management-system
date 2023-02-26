<template lang="">
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>挂号管理</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 挂号列表 -->
		<!-- del : 0 disease : "胃痛" id : 1 rdoctorid : 14 rdoctorname : "孙嘉伦" rtime
		: "2023-06-08" ruserid : 1 rusername : "54" ruserphone : "12312341234" -->
		<el-table :data="regList" border :row-class-name="tableRowClassName">
			<el-table-column label="用户姓名" prop="rusername"></el-table-column>
			<el-table-column label="用户联系方式" prop="ruserphone"></el-table-column>
			<el-table-column label="所患疾病" prop="disease"></el-table-column>
			<el-table-column label="医生姓名" prop="rdoctorname"></el-table-column>
			<el-table-column label="挂号时间" prop="rtime"></el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="primary" @click.native="edit(scope)">编辑</el-button>
					<el-button type="danger" @click.native="confirmDel(scope)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
		<!-- 编辑挂号对话框 -->
		<el-dialog title="编辑挂号信息" :visible="editDialogVisible">
			<el-form :model="editForm" ref="editForm" label-width="80px">
				<el-form-item label="用户姓名">
					<el-input v-model="editForm.rusername"></el-input>
				</el-form-item>
				<el-form-item label="联系方式">
					<el-input v-model="editForm.ruserphone"></el-input>
				</el-form-item>
				<el-form-item label="所患疾病">
					<el-input v-model="editForm.disease"></el-input>
				</el-form-item>
				<el-form-item label="医生姓名">
					<el-input v-model="editForm.rdoctorname"></el-input>
				</el-form-item>
				<el-form-item label="挂号时间">
					<el-input v-model="editForm.rtime"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editReg">确 定</el-button>
			</span>
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
		this.getRegList();
	},
	data() {
		return {
			// 挂号列表
			regList: [],
			// 编辑挂号对话框
			editDialogVisible: false,
			// 编辑挂号表单
			editForm: {
				rusername: "",
				ruserphone: "",
				disease: "",
				rdoctorname: "",
				rtime: "",
			},
			// 编辑挂号规则
			editRules: {
				rusername: [
					{ required: true, message: "请输入用户姓名", trigger: "blur" },
					{
						min: 2,
						max: 10,
						message: "长度在 2 到 10 个字符",
						trigger: "blur",
					},
				],
				ruserphone: [
					{ required: true, message: "请输入用户联系方式", trigger: "blur" },
					{
						min: 11,
						max: 11,
						message: "长度为 11 个字符",
						trigger: "blur",
					},
				],
				disease: [
					{ required: true, message: "请输入所患疾病", trigger: "blur" },
					{
						min: 2,
						max: 10,
						message: "长度在 2 到 10 个字符",
						trigger: "blur",
					},
				],
				rdoctorname: [
					{ required: true, message: "请输入医生姓名", trigger: "blur" },
					{
						min: 2,
						max: 10,
						message: "长度在 2 到 10 个字符",
						trigger: "blur",
					},
				],
				rtime: [
					{ required: true, message: "请输入挂号时间", trigger: "blur" },
					{
						min: 2,
						max: 10,
						message: "长度在 2 到 10 个字符",
						trigger: "blur",
					},
				],
			},
		};
	},
	methods: {
		// 获取挂号列表
		async getRegList() {
			const { data: res } = await this.$http.get("/admin/getRegList");
			if (res.status !== 200) {
				return this.$message.error(res.message);
			}
			this.regList = res.data;
		},
		// 编辑挂号信息
		edit(scope) {
			this.editDialogVisible = true;
			this.editForm = scope.row;
		},

		// 提交编辑
		async editReg() {
			this.$refs.editForm.validate(async (valid) => {
				if (!valid) {
					return false;
				}
				const { data: res } = await this.$http.post("/admin/updateReg", {
					...this.editForm,
				});
				if (res.status !== 200) {
					return this.$message.error(res.message);
				}
				this.$message.success(res.message);
				this.editDialogVisible = false;
				this.getRegList();
			});
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
			this.$confirm("此操作将永久删除该挂号预约, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(async () => {
					const { data: res } = await this.$http.post("/admin/delReg", {
						id: scope.row.id,
					});
					if (res.status !== 200) {
						return this.$message.error(res.message);
					} else {
						this.$message.success(res.message);
						this.getRegList();
					}
					// this.delDoc(scope.row.id);
					// console.log(scope.row);
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除",
					});
				});
		},
	},
};
</script>
