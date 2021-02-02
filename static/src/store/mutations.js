import { merge } from '../utils/merge.js';
export default {
    addItem(state, payload) {
        return merge(state, payload);
    },
    collectSignUpData(state, payload) {
        if (!state.signup) {
            state.signup = {};
        }
        if ('password-repeat' in payload) {
            delete payload['password-repeat'];
        }
        return merge(state, { signup: payload });
    },
    collectSignInData(state, payload) {
        if (!state.signin) {
            state.signin = {};
        }
        return merge(state, { signin: payload });
    },
    collectProfileData(state, payload) {
        if (!state.profile) {
            state.profile = {};
        }
        if ('avatar' in payload) {
            delete payload['avatar'];
        }
        return merge(state, { profile: payload });
    },
    collectPasswordData(state, payload) {
        if (!state.password) {
            state.password = {};
        }
        if ('password-repeat' in payload) {
            delete payload['password-repeat'];
        }
        return merge(state, { password: payload });
    },
    collectAvatarData(state, payload) {
        state.avatar = payload;
    },
    openChat(state, payload) {
        if (!state.lastOpenedChat) {
            state.lastOpenedChat = {};
        }
        return merge(state, { lastOpenedChat: payload });
    },
    getUsers(state, payload) {
        if (!state.users) {
            state.users = [];
        }
        return merge(state, { users: payload });
    },
};
//# sourceMappingURL=mutations.js.map