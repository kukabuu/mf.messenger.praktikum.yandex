"use strict";
exports.__esModule = true;
var index_js_1 = require("./index.js");
function concatInputs(inputs) {
    var html = '';
    inputs.forEach(function (props) {
        html += new index_js_1["default"](props).getContent().innerHTML;
    });
    return html;
}
exports["default"] = concatInputs;
