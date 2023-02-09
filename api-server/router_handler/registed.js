/**
 * 在这里定义和用户相关的路由处理函数，供 /router/registed.js 模块进行调用
 */

const db = require("../db/db");
const JWT = require("jsonwebtoken");

const secretKey = "hrms";

// 获取科室
exports.getDepart = (req,res)=>{
    let sql = `select * from department`
    db.Query(sql).then(data=>{
        res.send(data)
    })
}

// 挂号
exports.regMsg = (req, res) => {
    let token = req.headers.authorization.split(" ")[1];
    // res.send(token)
    JWT.verify(token,secretKey,(err,decoded)=>{
        res.send(decoded)
        
    })
};
