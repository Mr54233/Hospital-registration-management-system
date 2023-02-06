/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */

const db = require('../db/db')
const JWT = require("jsonwebtoken");

const secretKey = "hrms";

// 获取当前用户
exports.getUser = (req,res) =>{
	// res.send(req.query)
	let sql = `select * from user where uname = '${req.query.name}'`
	db.Query(sql).then(data=>{
		res.send(data[0])
	})
}

// 注册用户的处理函数
exports.regUser = (req, res) => {
	let sql = `insert into user (uname,upassword) value ('${req.body.name}','${req.body.password}')`
	db.Query(sql).then(data=>{
		// console.log(data);
		res.send(data)
	})
	// res.send("reguser OK");
    // res.send(req,res)
};

// 登录的处理函数
exports.login = (req, res) => {
	if (req.body.name == "" || req.body.password == "") {
		res.send({
			status: 400,
			message: "账号或者密码不能为空",
		});
	} else {
		let sql = `select * from user where uname = ${req.body.name} and upassword = ${req.body.password}`
		db.Query(sql).then(data=>{
			// res.send(data)
			if(data){
				res.send({
					status: 200,
					message: "登陆成功",
					// 3. 向客户端发送jwt 令牌字符串
					token: JWT.sign({ name: req.body.name }, secretKey, {
						expiresIn: "1y",
					}),
				});
			}
		})
	}
	// res.send("login OK");
	// res.send(req.body,res.body);
    // db.Query
};
