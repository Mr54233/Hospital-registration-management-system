const express = require("express");
// 创建路由对象
const router = express.Router();

// 导入处理模块
const handler = require("../router_handler/registered");

// 查询科室
router.get("/getDepart", handler.getDepart);

// 挂号模块
router.post("/regMsg", handler.regMsg);

// 查询挂号信息
router.get("/getReg", handler.getReg);

// 将路由对象共享出去
module.exports = router;
