"use strict";
exports.__esModule = true;
exports.getObjectData = void 0;
function getObjectData(obj, path) {
    var splittedPath = path.split('.');
    var result = obj;
    for (var i = 0; i < splittedPath.length; i++) {
        if (typeof result[splittedPath[i]] === 'undefined') {
            result = result[splittedPath[i]];
            break;
        }
        result = result[splittedPath[i]];
    }
    return result;
}
exports.getObjectData = getObjectData;
