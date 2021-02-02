"use strict";
exports.__esModule = true;
function trim(string, chars) {
    var regexp = chars ? new RegExp("" + chars, 'g') : /[ \\xA0]/g;
    return string.replace(regexp, '');
}
exports["default"] = trim;
