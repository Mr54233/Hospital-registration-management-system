const express = require("express");
const router = express.Router();

// 导入处理模块
const handler = require("../router_handler/admin");

// 管理员登录
router.post("/login", handler.login);

// 获取用户列表
router.get("/getUserList", handler.getUserList);

// 删除用户
router.post("/delUser", handler.delUser);

// 管理用户个人信息
router.post("/updateUser", handler.updateUser);


// 获取医生列表
router.get("/getDocList", handler.getDocList);

// 新增医生
router.post("/addDoc", handler.addDoc);

// 删除医生
router.post("/delDoc", handler.delDoc);

// 修改医生信息
router.post("/updateDoc", handler.updateDoc);



// 获取挂号列表
router.get("/getRegList", handler.getRegList);

// 管理挂号订单
router.post("/updateReg", handler.updateReg);

// 删除挂号订单
router.post("/delReg", handler.delReg);

// 获取科室列表
router.get("/getDepList", handler.getDepList);

// 删除科室
router.post("/delDep", handler.delDep);

// 管理科室信息
router.post("/updateDep", handler.updateDep);

// 将路由对象共享出去
module.exports = router;
