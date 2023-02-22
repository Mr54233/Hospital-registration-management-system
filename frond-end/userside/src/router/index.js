import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login";
import Home from "../components/Home";
import userCenter from "../components/userCenter";
import userInfo from "../components/userRouter/userInfo";
import regInfo from "../components/userRouter/regInfo";
import changePwd from "../components/userRouter/changePwd";

Vue.use(VueRouter);

const routes = [
	{ path: "/", redirect: "/login" },
	{ path: "/login", component: Login },
	{ path: "/home", component: Home },
	{
		path: "/userCenter",
		component: userCenter,
		children: [
			{ path: "/", redirect: "/userInfo" },
			{ path: "/userInfo", component: userInfo },
			{ path: "/regInfo", component: regInfo },
			{ path: "/changePwd", component: changePwd },
		],
	},
];

const router = new VueRouter({
	mode: "history",
	// base: process.env.BASE_URL,
	routes,
});

export default router;
