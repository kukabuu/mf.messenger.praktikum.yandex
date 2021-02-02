"use strict";
exports.__esModule = true;
var merge_js_1 = require("../utils/merge.js");
exports["default"] = {
    addItem: function (state, payload) {
        return merge_js_1.merge(state, payload);
    },
    collectSignUpData: function (state, payload) {
        if (!state.signup) {
            state.signup = {};
        }
        if ('password-repeat' in payload) {
            delete payload['password-repeat'];
        }
        return merge_js_1.merge(state, { signup: payload });
    },
    collectSignInData: function (state, payload) {
        if (!state.signin) {
            state.signin = {};
        }
        return merge_js_1.merge(state, { signin: payload });
    },
    collectProfileData: function (state, payload) {
        if (!state.profile) {
            state.profile = {};
        }
        if ('avatar' in payload) {
            delete payload['avatar'];
        }
        return merge_js_1.merge(state, { profile: payload });
    },
    collectPasswordData: function (state, payload) {
        if (!state.password) {
            state.password = {};
        }
        if ('password-repeat' in payload) {
            delete payload['password-repeat'];
        }
        return merge_js_1.merge(state, { password: payload });
    },
    collectAvatarData: function (state, payload) {
        state.avatar = payload;
    },
    openChat: function (state, payload) {
        if (!state.lastOpenedChat) {
            state.lastOpenedChat = {};
        }
        return merge_js_1.merge(state, { lastOpenedChat: payload });
    },
    getUsers: function (state, payload) {
        if (!state.users) {
            state.users = [];
        }
        return merge_js_1.merge(state, { users: payload });
    }
};
