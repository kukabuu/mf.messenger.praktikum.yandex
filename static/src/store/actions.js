export default {
    addItem(context, payload) {
        context.commit('addItem', payload);
    },
    clearItem(context, payload) {
        context.commit('clearItem', payload);
    },
    collectSignUpData(context, payload) {
        context.commit('collectSignUpData', payload);
    },
    collectSignInData(context, payload) {
        context.commit('collectSignInData', payload);
    },
    collectProfileData(context, payload) {
        context.commit('collectProfileData', payload);
    },
    collectPasswordData(context, payload) {
        context.commit('collectPasswordData', payload);
    },
    collectAvatarData(context, payload) {
        context.commit('collectAvatarData', payload);
    },
    openChat(context, payload) {
        context.commit('openChat', payload);
    },
    getUsers(context, payload) {
        context.commit('getUsers', payload);
    },
};
//# sourceMappingURL=actions.js.map