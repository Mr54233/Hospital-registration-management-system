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
	if(req.body.username != undefined && req.body.password != undefined){
		let sql = `select * from user where uname = '${req.body.username}'`;
		let sql2 = `insert into user (uname,upassword) value ('${req.body.username}','${req.body.password}')`;
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
	} else {
		res.send({
			status:404,
			message:'账号或密码不能为空'
		})
	}
};

// 登录的处理函数
exports.login = (req, res) => {
	if (req.body.username == undefined || req.body.password == undefined) {
		res.send({
			status: 400,
			message: "账号或者密码不能为空",
			data:req.body
		});
	} else {
		let sql = `select * from user where uname = ${req.body.username} and upassword = ${req.body.password}`;
		db.Query(sql).then((data) => {
			// res.send(data)
			if (data[0]!= undefined && data[0].uname == req.body.username) {
				res.send({
					// data: data[0],
					status: 200,
					message: "登陆成功",
					token: JWT.sign({ username: req.body.username }, secretKey, {
						expiresIn: "1y",
					}),
				});
			} else {
				res.send({
					data:data,
					status: 401.1,
					message: "账号或者密码错误,请重新输入",
				});
			}
		});
	}

	// console.log(req.body);
};

// 添加/修改 信息的处理函数
exports.addMsg = (req, res) => {
	// res.send(req.body)
	let token = req.headers.authorization.split(" ")[1];
	// res.send(token);
	JWT.verify(token, secretKey, (err, decoded) => {
		// res.send(decoded.name)
		if (decoded.username) {
			// let sql = `insert into user (usex,uage,uphone) value (${req.body.sex},${req.body.age},${req.body.phone}) select (usex,uage,uphone) from user where uname = ${decoded.name}`;
			let sql = `update user set usex=${req.body.sex},uage=${req.body.age},uphone=${req.body.phone} where uname = ${decoded.username}`;
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
