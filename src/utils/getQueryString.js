"use strict";
exports.__esModule = true;
exports.getQueryString = void 0;
function getQueryString(data) {
    if (typeof data !== 'object') {
        throw 'input must be an object';
    }
    var result = [];
    iterateObject(data);
    function iterateObject(object, prefix) {
        if (prefix === void 0) { prefix = ''; }
        Object.keys(object).forEach(function (key) {
            var value = object[key];
            var k = prefix ? prefix + "[" + key + "]" : "" + key;
            if (typeof value !== 'object') {
                result.push(k + "=" + value);
                return;
            }
            iterateObject(value, k);
        });
    }
    return result.join('&');
}
exports.getQueryString = getQueryString;
