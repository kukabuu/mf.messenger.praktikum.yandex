"use strict";
exports.__esModule = true;
exports.template = void 0;
exports.template = "\n\t<li class=\"list__item\" data-id=\"{{ id }}\">\n\t\t<img class=\"item__image\" src=\"{{avatar.src}}\" alt=\"{{avatar.name}}\" width=\"48\" height=\"48\">\n\t\t<div class=\"item__details\">\n\t\t\t<span class=\"item__name\">\n\t\t\t\t{{name}}\n\t\t\t</span>\n\t\t\t<span class=\"item__message\">\n\t\t\t\t<span class=\"item__message--from-you {{from.className}}\">{{from.text}}</span>\n\t\t\t\t\t{{preview}}\t\t\t\t\n\t\t\t\t</span>\n\t\t</div>\n\t\t<time class=\"item__time\" datetime=\"{{time.full}}\">{{time.less}}</time>\n\t\t<span class=\"item__message-counter {{counter.className}}\">{{counter.value}}</span>\n\t</li>\n";
