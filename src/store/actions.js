"use strict";
exports.__esModule = true;
exports["default"] = {
    addItem: function (context, payload) {
        context.commit('addItem', payload);
    },
    clearItem: function (context, payload) {
        context.commit('clearItem', payload);
    },
    collectSignUpData: function (context, payload) {
        context.commit('collectSignUpData', payload);
    },
    collectSignInData: function (context, payload) {
        context.commit('collectSignInData', payload);
    },
    collectProfileData: function (context, payload) {
        context.commit('collectProfileData', payload);
    },
    collectPasswordData: function (context, payload) {
        context.commit('collectPasswordData', payload);
    },
    collectAvatarData: function (context, payload) {
        context.commit('collectAvatarData', payload);
    },
    openChat: function (context, payload) {
        context.commit('openChat', payload);
    },
    getUsers: function (context, payload) {
        context.commit('getUsers', payload);
    }
};
