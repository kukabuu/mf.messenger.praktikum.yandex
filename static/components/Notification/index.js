import Block from '../../core/Block/index.js';
import { template } from './template.js';
import compile from '../../utils/compile.js';
var Visibility;
(function (Visibility) {
    Visibility["OPEN"] = "notification--opacity-1";
    Visibility["CLOSE"] = "notification--opacity-0";
})(Visibility || (Visibility = {}));
export default class Notification extends Block {
    constructor({ title = 'Успешно!', status = 'notification--success', ...props }) {
        super({
            title, status, ...props
        });
    }
    render() {
        return compile(template, this.props);
    }
    show() {
        const child = this.element.firstChild;
        child.classList.remove(Visibility.CLOSE);
        child.classList.add(Visibility.OPEN);
    }
    hide() {
        const child = this.element.firstChild;
        child.classList.remove(Visibility.OPEN);
        child.classList.add(Visibility.CLOSE);
    }
}
//# sourceMappingURL=index.js.map