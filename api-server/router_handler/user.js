/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */

const db = require("../db/db");
const JWT = require("jsonwebtoken");

const secretKey = "hrms";

// 获取当前用户
exports.getUser = (req, res) => {
	// res.send(req.query)
	let sql = `select * from user where uname = '${req.query.name}'`;
	db.Query(sql).then((data) => {
		res.send(data[0]);
		// return data[0];
	});
};

// 注册用户的处理函数
exports.regUser = (req, res) => {
	let sql = `select * from user where uname = '${req.body.name}'`;
	let sql2 = `insert into user (uname,upassword) value ('${req.body.name}','${req.body.password}')`;
	db.Query(sql).then((data) => {
		// res.send(data[0]);
		if (data[0] != undefined) {
			res.send({
				status: 401,
				message: "注册失败,姓名已被注册",
			});
		} else {
			db.Query(sql2).then((data) => {
				res.send({
					// data:data,
					status: 200,
					message: "注册成功",
				});
			});
		}
	});
};

// 登录的处理函数
exports.login = (req, res) => {
	if (req.body.name == "" || req.body.password == "") {
		res.send({
			status: 400,
			message: "账号或者密码不能为空",
		});
	} else {
		let sql = `select * from user where uname = ${req.body.name} and upassword = ${req.body.password}`;
		db.Query(sql).then((data) => {
			// res.send(data)
			if (data[0].uname == req.body.name) {
				res.send({
					// data: data[0],
					status: 200,
					message: "登陆成功",
					token: JWT.sign({ name: req.body.name }, secretKey, {
						expiresIn: "1y",
					}),
				});
			} else {
				res.send({
					// data:data,
					status: 401.1,
					message: "账号或者密码错误,请重新输入",
				});
			}
		});
	}
	// res.send("login OK");
	// res.send(req.body,res.body);
	// db.Query
};

// 添加/修改 信息的处理函数
exports.addMsg = (req, res) => {
	// res.send(req.body)
	let token = req.headers.authorization.split(" ")[1];
	// res.send(token);
	JWT.verify(token, secretKey, (err, decoded) => {
		// res.send(decoded.name)
		if (decoded.name) {
			// let sql = `insert into user (usex,uage,uphone) value (${req.body.sex},${req.body.age},${req.body.phone}) select (usex,uage,uphone) from user where uname = ${decoded.name}`;
			let sql = `update user set usex=${req.body.sex},uage=${req.body.age},uphone=${req.body.phone} where uname = ${decoded.name}`;
			db.Query(sql).then((data) => {
				// console.log(data);
				res.send(data);
			});
		} else {
			res.send({
				status:400,
				message:'用户不存在'
			})
		}
	});
};
