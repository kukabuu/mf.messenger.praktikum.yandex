import { merge } from '../utils/merge.js';

type Object = {
	[key: string]: any;
}

export default {
	addItem(state: Object, payload: Object) {
		return merge(state, payload);
	},
	collectSignUpData(state: Object, payload: Object) {
		if (!state.signup) {
			state.signup = {};
		}
		if ('password-repeat' in payload) {
			delete payload['password-repeat'];
		}

		return merge(state, { signup : payload });
	},
	collectSignInData(state: Object, payload: Object) {
		if (!state.signin) {
			state.signin = {};
		}
		return merge(state, { signin: payload });
	},
	collectProfileData(state: Object, payload: Object) {
		if (!state.profile) {
			state.profile = {};
		}
		if ('avatar' in payload) {
			delete payload['avatar'];
		}
		return merge(state, { profile: payload });
	},
	collectPasswordData(state: Object, payload: Object) {
		if (!state.password) {
			state.password = {};
		}
		if ('password-repeat' in payload) {
			delete payload['password-repeat'];
		}

		return merge(state, { password : payload });
	},
	collectAvatarData(state: Object, payload: Object) {
		state.avatar = payload;
	},
	openChat(state: Object, payload: Object) {
		if (!state.lastOpenedChat) {
			state.lastOpenedChat = {};
		}

		return merge(state, { lastOpenedChat : payload });
	},
	getUsers(state: Object, payload: Object) {
		if (!state.users) {
			state.users = [];
		}

		return merge(state, { users : payload });
	},
};
