import Block from '../../core/Block/index.js';
import { template } from './template.js';
import compile from '../../utils/compile.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
export default class Profile extends Block {
    constructor({ eventListeners = [], footerLinks = [{
            name: '',
            href: '#',
            className: ''
        }], form = {
        className: '',
        method: 'get'
    }, popup = '', header = '', button = '', ...props }) {
        super({
            eventListeners,
            footerLinks,
            form,
            popup,
            header,
            button,
            ...props
        });
        eventListeners.forEach((listener) => {
            globalEventBus.on(listener['event'], listener['callback']);
        });
    }
    render() {
        return compile(template, this.props);
    }
}
//# sourceMappingURL=index.js.map