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

// 管理挂号订单
router.post("/updateAppo", handler.updateAppo);

// 管理用户个人信息
router.post("/updateUser", handler.updateUser);

// 管理科室/医生信息
router.post("/updateDoc", handler.updateDoc);
router.post("/updateDep", handler.updateDep);

// 将路由对象共享出去
module.exports = router;
