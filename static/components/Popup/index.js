import Block from '../../core/Block/index.js';
import { template } from './template.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
import compile from '../../utils/compile.js';
export default class Popup extends Block {
    constructor({ eventListeners = [], cancelButton = '', ...props }) {
        super({
            eventListeners,
            cancelButton,
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