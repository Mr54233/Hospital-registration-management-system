const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

const { expressjwt } = require("express-jwt");

// 使用cors允许跨域访问
app.use(cors());

// 使用urlencoded进行解析
app.use(express.urlencoded({ extended: false }));

// 挂载和配置JWT 中间件

// 设置密钥
const secretKey = "hrms";

// 配置express-jwt
// unless() ; 配置那些地址的请求不需要解密来验证身份
app.use(
	expressjwt({ secret: secretKey, algorithms: ["HS256"] }).unless({
		path: ["/user/login", "/user/regUser", "/user/getUser"],
	})
);

// 导入并注册用户路由模块
const userRouter = require("./router/user");
app.use("/user", userRouter);

// 挂号模块
const reg = require("./router/registed");
app.use("/reg", reg);

// 错误处理
app.use((err, req, res, next) => {
	// token解析失败导致的错误
	if (err.name == "UnauthorizedError") {
		return res.send({ status: 401, message: "无效的token" });
	}
	// 其他原因导致的错误
	res.send(err.message);
});

app.listen(port, () => console.log(`http://localhost:${port}`));
