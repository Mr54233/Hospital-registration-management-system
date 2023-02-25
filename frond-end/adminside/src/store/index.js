import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		username: "",
	},
	getters: {},
	mutations: {
		changeUserName(state, uname) {
			state.username = uname;
		},
	},
	actions: {
		changeUserName(ctx, uname) {
			ctx.commit("changeUserName", uname);
		},
	},
	modules: {},
});
