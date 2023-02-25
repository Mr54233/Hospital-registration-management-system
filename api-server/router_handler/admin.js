const db = require("../db/db");
const JWT = require("jsonwebtoken");

const secretKey = "hrms";

// 管理员登录
exports.login = (req, res) => {
	if (req.body.adminName == undefined || req.body.password == undefined) {
		res.send({
			status: 400,
			message: "账号或者密码不能为空",
			data: req.body,
		});
	} else {
		let sql = `select * from admin where aname = "${req.body.adminName}" and apassword = "${req.body.password}"`;
		db.Query(sql).then((data) => {
			// res.send(data)
			if (data[0] != undefined && data[0].aname == req.body.adminName) {
				res.send({
					// data: data[0],
					status: 200,
					message: "登陆成功",
					token:
						"Bearer " +
						JWT.sign({ adminName: req.body.adminName }, secretKey, {
							expiresIn: "1y",
						}),
					adminInfo: req.body.adminName,
				});
			} else {
				res.send({
					data: data,
					status: 401.1,
					message: "账号或者密码错误,请重新输入",
				});
			}
		});
	}
};

// 获取订单信息
exports.getAppo = (req, res) => {
	let token = req.headers.authorization.split(" ")[1];
	// res.send(token);
	JWT.verify(token, secretKey, (err, decoded) => {
		// res.send(decoded.username)
		if (decoded.adminName) {
			let sql = `select * from registered`;
			db.Query(sql).then((data) => {
				res.send({
					data: data,
					status: 200,
					message: "获取成功",
				});
			});
		} else {
			res.send({
				status: 401,
				message: "请先登录",
			});
		}
	});
};

// 管理挂号订单
exports.updateAppo = (req, res) => {
	let token = req.headers.authorization.split(" ")[1];
	// res.send(token);
	JWT.verify(token, secretKey, (err, decoded) => {
		// res.send(decoded.username)
		if (decoded.adminName) {
			let sql = `update registered set ruserphone = ${req.body.ruserphone}, rtime = ${req.body.rtime},disease = ${req.body.disease} where id = ${req.body.id}`;
			db.Query(sql).then((data) => {
				res.send({
					data: data,
					status: 200,
					message: "修改成功",
				});
			});
		} else {
			res.send({
				status: 401,
				message: "请先登录",
			});
		}
	});
};

// 获取用户列表
exports.getUserList = (req, res) => {
	let token = req.headers.authorization.split(" ")[1];
	// res.send(token);
	JWT.verify(token, secretKey, (err, decoded) => {
		if (decoded.adminName) {
			let sql = `select * from user`;
			db.Query(sql).then((data) => {
				res.send({
					data: data,
					status: 200,
					message: "获取成功",
				});
			});
		} else {
			res.send({
				status: 401,
				message: "请先登录",
			});
		}
	});
};

// 管理用户信息
exports.updateUser = (req, res) => {
	let token = req.headers.authorization.split(" ")[1];
	// res.send(token);
	JWT.verify(token, secretKey, (err, decoded) => {
		if (decoded.adminName) {
			let sql = `update user set uname = "${req.body.uname}", uphone =" ${req.body.uphone}", uage = "${req.body.uage}", usex = "${req.body.usex}" where uid = "${req.body.uid}"`;
			db.Query(sql).then((data) => {
				res.send({
					data: data,
					status: 200,
					message: "修改成功",
				});
			});
		} else {
			res.send({
				status: 401,
				message: "请先登录",
			});
		}
	});
};

// 删除用户
exports.delUser = (req, res) => {
	let token = req.headers.authorization.split(" ")[1];
	// res.send(token);
	JWT.verify(token, secretKey, (err, decoded) => {
		if (decoded.adminName) {
			let sql = `update user set del = 0 where uid = "${req.body.uid}"`;
			db.Query(sql).then((data) => {
				res.send({
					data: data,
					status: 200,
					message: "删除成功",
				});
			});
		} else {
			res.send({
				status: 401,
				message: "请先登录",
			});
		}
	});
};

// 管理科室信息
exports.updateDep = (req, res) => {
	let token = req.headers.authorization.split(" ")[1];
	// res.send(token);
	JWT.verify(token, secretKey, (err, decoded) => {
		if (decoded.adminName) {
			// 如果id不存在，说明是添加科室，否则是修改科室信息
			if (req.body.id == undefined) {
				let sql = `select * from department where pname = ${req.body.pname}`;
				db.Query(sql).then((data) => {
					if (data[0] != undefined) {
						res.send({
							status: 402,
							message: "科室已存在",
						});
					} else {
						let sql = `insert into department (pname) values (${req.body.pname})`;
						db.Query(sql).then((data) => {
							res.send({
								data: data,
								status: 200,
								message: "添加成功",
							});
						});
					}
				});
			} else {
				// id存在，说明是修改科室信息
				let sql = `update department set pname = ${req.body.pname} where id = ${req.body.id}`;
				db.Query(sql).then((data) => {
					res.send({
						data: data,
						status: 200,
						message: "修改成功",
					});
				});
			}
		}
	});
};

// 管理医生信息
exports.updateDoc = (req, res) => {
	let token = req.headers.authorization.split(" ")[1];
	// res.send(token);
	JWT.verify(token, secretKey, (err, decoded) => {
		if (decoded.adminName) {
			let sql = `update doctor set dname = ${req.body.dname}, dage = ${req.body.dage}, dsex = ${req.body.dsex}, department = ${req.body.department} where id = ${req.body.id}`;
			db.Query(sql).then((data) => {
				res.send({
					data: data,
					status: 200,
					message: "修改成功",
				});
			});
		} else {
			res.send({
				status: 401,
				message: "请先登录",
			});
		}
	});
};
