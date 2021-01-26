import Store from '../core/Store/index.js';

export default {
	addItem(context: Store, payload: object) {
		context.commit('addItem', payload);
	},
	clearItem(context: Store, payload: object) {
		context.commit('clearItem', payload);
	},
	collectSignUpData(context: Store, payload: object) {
		context.commit('collectSignUpData', payload);
	},
	collectSignInData(context: Store, payload: object) {
		context.commit('collectSignInData', payload);
	},
	collectProfileData(context: Store, payload: object) {
		context.commit('collectProfileData', payload);
	},
	collectPasswordData(context: Store, payload: object) {
		context.commit('collectPasswordData', payload);
	},
	collectAvatarData(context: Store, payload: object) {
		context.commit('collectAvatarData', payload);
	},
	openChat(context: Store, payload: object) {
		context.commit('openChat', payload);
	},
	getUsers(context: Store, payload: object) {
		context.commit('getUsers', payload);
	},
};
