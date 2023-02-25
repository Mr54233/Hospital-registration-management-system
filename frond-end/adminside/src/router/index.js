import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login";
import Home from "../components/Home";
import user from "../components/adminComp/user";
import doctor from "../components/adminComp/doctor";
import department from "../components/adminComp/department";
import registered from "../components/adminComp/registered";

Vue.use(VueRouter);

const routes = [
	{ path: "/", redirect: "/login" },
	{ path: "/login", component: Login },
	{
		path: "/home",
		component: Home,
		children: [
			{ path: "/user", component: user },
			{ path: "/doctor", component: doctor },
			{ path: "/department", component: department },
			{ path: "/registered", component: registered },
		],
	},
];

const router = new VueRouter({
	mode: "history",
	// base: process.env.BASE_URL,
	routes,
});

export default router;
