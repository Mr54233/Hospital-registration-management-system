<template>
	<div id="app">
		<!-- 面包屑区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>挂号信息</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 展示用户挂号的信息 -->
		<el-table :data="regInfo" border :row-class-name="tableRowClassName">
			<el-table-column
				prop="rusername"
				label="挂号人"
				width="180"
			></el-table-column>
			<el-table-column
				prop="disease"
				label="所患疾病"
				width="180"
			></el-table-column>
			<el-table-column
				prop="rdoctorname"
				label="挂号医生"
				width="180"
			></el-table-column>
			<el-table-column
				prop="rtime"
				label="挂号时间"
				width="180"
			></el-table-column>
			<el-table-column
				prop="ruserphone"
				label="联系方式"
				width="180"
			></el-table-column>
			<!-- 操作按钮 -->
			<el-table-column label="操作" width="260">
				<template slot-scope="scope">
					<el-button
						size="mini"
						type="danger"
						@click="cancelAppo(scope.$index, scope.row)"
						>取消预约</el-button
					>
					<el-button
						size="mini"
						type="primary"
						@click="changeAppo(scope.$index, scope.row)"
						>更改预约时间</el-button
					>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="更改预约时间" :visible.sync="dialogVisible" width="30%">
			<el-form :model="form" label-width="80px">
				<el-form-item label="预约时间">
					<el-date-picker
						v-model="form.date"
						type="date"
						placeholder="选择日期"
						value-format="yyyy-MM-dd"
						:picker-options="pickerOptions"
					></el-date-picker>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="changeTime">确 定</el-button>
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
	name: "regInfo",
	props: { user: {} },
	created() {
		this.getUserRegInfo();
	},
	data() {
		return {
			regInfo: [],
			dialogVisible: false,
			form: {
				id: "",
				username: "",
				date: "",
			},
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() < Date.now() - 86400000; // 选当前时间之前的时间
				},
			},
		};
	},
	methods: {
		getUserRegInfo() {
			this.$http
				.get("/reg/getReg")
				.then((res) => {
					// this.regInfo = res.data;
					// console.log(this.regInfo);
					if (res.data.status === 200) {
						this.regInfo = res.data.data;
						// console.log(this.regInfo);
					} else {
						this.$message.error(res.message);
					}
				})
				.catch((err) => {
					console.log(err);
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
		// 取消预约
		cancelAppo(index, row) {
			// console.log(row);
			this.$confirm("此操作将取消该预约, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					this.$http
						.post("/reg/delReg", {
							id: row.id,
							username: row.rusername,
						})
						.then((res) => {
							// console.log("res");
							// console.log(res);
							if (res.data.status === 200) {
								this.$message.success(res.data.message);
								this.$router.go(0);
							} else {
								this.$message.error(res.data.message);
							}
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除",
					});
				});
		},
		// 更改预约时间按钮
		changeAppo(index, row) {
			console.log(row);
			this.dialogVisible = true;
			this.form.id = row.id;
			this.form.username = row.rusername;
			// console.log(this.form);
		},
		// 更改预约时间
		changeTime() {
			// console.log(this.form);
			this.$http
				.post("/reg/updateReg", this.form)
				.then((res) => {
					// console.log(res);
					if (res.data.status === 200) {
						this.$message.success(res.data.message);
						this.$router.go(0);
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
