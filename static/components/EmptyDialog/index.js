import Block from '../Block/index.js';
import { template } from './template.js';
export class EmptyDialog extends Block {
    constructor(props, tagName = 'span') {
        super(props, tagName);
    }
    render() {
        return template;
    }
}
//# sourceMappingURL=index.js.map