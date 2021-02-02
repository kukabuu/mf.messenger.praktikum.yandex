import Block from '../../core/Block/index.js';
import { template } from './template.js';
import compile from '../../utils/compile.js';
export default class ChatListItem extends Block {
    constructor({ from = {
        text: 'Вы:',
        className: 'i-display-none'
    }, counter = {
        value: '',
        className: 'i-display-none'
    }, ...props }) {
        super({ from, counter, ...props });
    }
    render() {
        return compile(template, this.props);
    }
}
//# sourceMappingURL=index.js.map