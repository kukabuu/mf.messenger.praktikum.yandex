"use strict";
exports.__esModule = true;
exports.template = void 0;
exports.template = "\n\t<div>\n\t\t<div class=\"form__group {{group.className}}\">\n\t\t\t<label class=\"{{label.className}}\" for=\"{{id}}\">{{label.text}}</label>\n\t\t\t<span class=\"input__file-name i-display-none {{file.className}}\"></span>\n\t\t\t<input class=\"form__input {{className}}\"\n\t\t\t\t\t\t id=\"{{id}}\"\n\t\t\t\t\t\t type=\"{{type}}\"\n\t\t\t\t\t\t name=\"{{name}}\"\n\t\t\t\t\t\t value=\"{{value}}\"\n\t\t\t\t\t\t placeholder=\"{{placeholder}}\"\n\t\t\t\t\t\t {{#if isReadOnly}}readonly{{/if}}\n\t\t\t\t\t\t {{#if isHidden}}hidden{{/if}}>\n\t\t\t<span class=\"form__label--floated {{floatedLabel.className}}\">{{floatedLabel.text}}</span>\n\t\t\t{{{errorEntry}}}\n\t\t</div>\n\t\t{{{errorProfile}}}\n\t</div>\n";
