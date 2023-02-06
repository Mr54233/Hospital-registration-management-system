/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */

const db = require('../db/db')

// 获取当前用户
exports.getUser = (req,res) =>{
	// console.log(req.body);
	// res.send(req.body.name)
	let sql = `select * from user where uname = '${req.body.name}'`
	db.Query(sql).then(data=>{
		res.send(data)
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
	res.send("login OK");
	// res.send(req.body,res.body);
    // db.Query
};
