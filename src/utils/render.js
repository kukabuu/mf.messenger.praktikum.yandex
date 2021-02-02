"use strict";
exports.__esModule = true;
exports.render = void 0;
function render(selector, block) {
    var $root = document.querySelector(selector);
    $root === null || $root === void 0 ? void 0 : $root.append(block.getContent());
    return $root;
}
exports.render = render;
