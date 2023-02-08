const express = require("express");
// 创建路由对象
const router = express.Router();

// 导入处理模块
const handler = require("../router_handler/user");

// 获取当前用户
router.get("/getUser", handler.getUser);

// 注册新用户
router.post("/regUser", handler.regUser);

// 登录
router.post("/login", handler.login);

// 添加信息
router.put("/addMsg", handler.addMsg)

// 将路由对象共享出去
module.exports = router;
