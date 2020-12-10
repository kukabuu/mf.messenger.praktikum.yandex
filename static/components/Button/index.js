import Block from '../../core/Block/index.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
import { template } from './template.js';
import compile from '../../utils/compile.js';
export default class Button extends Block {
    constructor({ className = 'button', type = 'button', handleClick = {}, text }) {
        super({ className, type, handleClick, text });
        Object.entries(handleClick).forEach(([event, callback]) => {
            globalEventBus.on(event, callback);
        });
    }
    render() {
        return compile(template, this.props);
    }
}
//# sourceMappingURL=index.js.map