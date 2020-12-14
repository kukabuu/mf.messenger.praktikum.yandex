import Block from '../../core/Block/index.js';
import { template } from './template.js';
import compile from '../../utils/compile.js';
export default class Image extends Block {
    constructor({ className = '', ...props }) {
        super({
            className,
            ...props
        });
    }
    render() {
        return compile(template, this.props);
    }
}
//# sourceMappingURL=index.js.map