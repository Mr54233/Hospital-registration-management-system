<template lang="">
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>科室管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button type="success" @click.native="addDep">新增科室</el-button>
		<!-- 科室列表 -->
		<!-- del : "1" id : 1 pname : "发热门诊" -->
		<el-table :data="depList" border :row-class-name="tableRowClassName">
			<el-table-column label="科室名称" prop="pname" align="center"></el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="primary" @click.native="edit(scope)">编辑</el-button>
					<el-button type="danger" @click.native="confirmDel(scope)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
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
		this.getDepList();
	},
	data() {
		return {
			// 科室列表
			depList: [],
		};
	},
	methods: {
		// 获取科室列表
		async getDepList() {
			const { data: res } = await this.$http.get("/admin/getDepList");
			if (res.status !== 200) {
				return this.$message.error(res.message);
			} else {
				// this.$message.success(res.message);
				this.depList = res.data;
			}

			// console.log(this.depList);
		},
		// 编辑科室
		edit(scope) {
			// // console.log(scope);
			// this.dialogVisible = true;
			// this.editForm = scope.row;
			// console.log(this.editForm);
			this.$prompt("修改科室名称", "编辑科室", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				inputValue: scope.row.pname,
				inputPattern: /^[\u4e00-\u9fa5]{2,10}$/,
				inputErrorMessage: "科室名称为2-10个汉字",
			})
				.then(async ({ value }) => {
					const { data: res } = await this.$http.post("/admin/updateDep", {
						id: scope.row.id,
						pname: value,
					});
					if (res.status !== 200) {
						return this.$message.error(res.message);
					} else {
						this.$message.success(res.message);
						this.getDepList();
					}
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "取消输入",
					});
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
			this.$confirm("此操作将永久删除该科室, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(async () => {
                    const { data: res } = await this.$http.post("/admin/delDep", {
                        id: scope.row.id,
                    });
                    if (res.status !== 200) {
                        return this.$message.error(res.message);
                    } else {
                        this.$message.success(res.message);
                        this.getDepList();
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

        // 新增科室
        addDep() {
            this.$prompt("请输入科室名称", "新增科室", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputPattern: /^[\u4e00-\u9fa5]{2,10}$/,
                inputErrorMessage: "科室名称为2-10个汉字",
            })
                .then(async ({ value }) => {
                    const { data: res } = await this.$http.post("/admin/updateDep", {
                        pname: value,
                    });
                    // console.log(res[0]); 
                    if (res.status !== 200) {
                        return this.$message.error(res.message);
                    } else {
                        this.$message.success(res.message);
                        this.getDepList();
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "取消输入",
                    });
                });
        },
	},
};
</script>
