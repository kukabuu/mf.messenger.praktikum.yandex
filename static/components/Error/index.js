import Block from '../../core/Block/index.js';
import { template } from './template.js';
import compile from '../../utils/compile.js';
export default class Error extends Block {
    constructor({ className = '', text = '' }) {
        super({ className, text });
    }
    render() {
        return compile(template, this.props);
    }
}
//# sourceMappingURL=index.js.map