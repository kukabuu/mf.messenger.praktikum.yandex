"use strict";
exports.__esModule = true;
var index_js_1 = require("./index.js");
function concatItems(messages) {
    var html = '';
    messages.forEach(function (props) {
        html += new index_js_1["default"](props).getContent().innerHTML;
    });
    return html;
}
exports["default"] = concatItems;
