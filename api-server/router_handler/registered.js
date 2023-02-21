/**
 * 在这里定义和用户相关的路由处理函数，供 /router/registered.js 模块进行调用
 */

const db = require("../db/db");
const JWT = require("jsonwebtoken");
const { stack } = require("../router/user");

const secretKey = "hrms";

// 获取科室
exports.getDepart = (req, res) => {
	let sql = `select * from department`;
	db.Query(sql).then((data) => {
		res.send({
			status: 200,
			message: "获取成功",
			data: data,
		});
	});
};

// 获取科室下的医生信息
exports.getDoc = (req, res) => {
	// res.send(req.query);
	let sql = `select * from doctor where department = "${req.query.pname}"`
	db.Query(sql).then(data=>{
		// res.send(data)
			res.send({
				status:200,
				message:"获取成功",
				data:data
			})
	})
};

// 挂号
exports.regMsg = (req, res) => {
	let token = req.headers.authorization.split(" ")[1];
	// res.send(token)
	JWT.verify(token, secretKey, (err, decoded) => {
		// res.send(decoded)
		let sql = `select * from user where uname = ${decoded.username}`;
		db.Query(sql).then((data) => {
			// res.send(req.body)
			let user = data[0];
			// data = data[0]
			let sql1 = `insert into registered (ruserid,rusername,ruserphone,rdoctorid,rdoctorname,rtime,disease) value (${user.uid},'${user.uname}','${user.uphone}',${req.body.id},'${req.body.dname}',STR_TO_DATE("${req.body.orderTime}", "%Y-%m-%d"),'${req.body.disease}')`;
			// res.send(sql1)
			db.Query(sql1).then((data) => {
				// res.send(data);
				if(data.affectedRows == 1){
					res.send({
						status:200,
						message:"挂号成功"
					})
				}
			});
		});
	});
};

// 获取挂号信息
exports.getReg = (req, res) => {
	let token = req.headers.authorization.split(" ")[1];
	// res.send(token)
	JWT.verify(token, secretKey, (err, decoded) => {
		// res.send(decoded)
		let sql = `select * from registered where rusername = ${decoded.username}`;
		db.Query(sql).then((data) => {
			res.send(data);
		});
	});
};

// 删除挂号信息
exports.delReg = (req, res) => {
	let token = req.headers.authorization.split(" ")[1];
	JWT.verify(token, secretKey, (err, decoded) => {
		let sql = `update registered set del = 0 where rusername = ${decoded.username}`;
		db.Query(sql).then((data) => {
			res.send(data);
		});
	});
};
