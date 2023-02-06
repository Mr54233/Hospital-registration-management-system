const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

// 使用cors允许跨域访问
app.use(cors());

// 使用urlencoded进行解析
app.use(express.urlencoded({ extended: false }));

// 导入并注册用户路由模块
const userRouter = require("./router/user");
app.use("/api", userRouter);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`http://localhost:${port}`));
