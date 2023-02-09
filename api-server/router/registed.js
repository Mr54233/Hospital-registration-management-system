const express = require("express");
// 创建路由对象
const router = express.Router();

// 导入处理模块
const handler = require("../router_handler/registed");

// 查询科室
router.get("/getDepart", handler.getDepart);

// 挂号模块
router.post("/regMsg", handler.regMsg);

// 将路由对象共享出去
module.exports = router;
