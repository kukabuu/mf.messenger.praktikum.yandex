"use strict";
exports.__esModule = true;
exports.displayFileName = void 0;
function displayFileName($input) {
    var _a;
    var $label = document.querySelector('.js-file-upload--label');
    var $name = document.querySelector('.js-file-name');
    if (!$input.files || $label === null || $name === null) {
        return;
    }
    $name.textContent = (_a = $input.files[0]) === null || _a === void 0 ? void 0 : _a.name;
    $name.classList.remove('i-display-none');
    $label.classList.add('i-display-none');
}
exports.displayFileName = displayFileName;
