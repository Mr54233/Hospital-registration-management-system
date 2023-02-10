/**
 * 在这里定义和用户相关的路由处理函数，供 /router/registered.js 模块进行调用
 */

const db = require("../db/db");
const JWT = require("jsonwebtoken");

const secretKey = "hrms";

// 获取科室
exports.getDepart = (req, res) => {
	let sql = `select * from department`;
	db.Query(sql).then((data) => {
		res.send(data);
	});
};

// 挂号
exports.regMsg = (req, res) => {
	let token = req.headers.authorization.split(" ")[1];
	// res.send(token)
	JWT.verify(token, secretKey, (err, decoded) => {
		// res.send(decoded)
		let sql = `select * from user where uname = ${decoded.name}`;
		db.Query(sql).then((data) => {
			// res.send(req.body)
			let user = data[0];
			// data = data[0]
			let sql1 = `insert into registered (ruserid,rusername,ruserphone,rdoctorid,rdoctorname,rtime,disease) value (${user.uid},'${user.uname}','${user.uphone}',${req.body.doctorid},'${req.body.doctorname}',STR_TO_DATE("${req.body.time}", "%Y-%m-%d"),'${req.body.disease}')`;
			// res.send(sql1)
			db.Query(sql1).then((data) => {
				res.send(data);
			});
		});
	});
};
