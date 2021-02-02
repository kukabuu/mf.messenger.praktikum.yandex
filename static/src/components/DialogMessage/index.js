import Block from '../../core/Block/index.js';
import { template } from './template.js';
import compile from '../../utils/compile.js';
export default class DialogMessage extends Block {
    constructor({ isEmpty = false, empty = {
        text: 'Выберите чат, чтобы отправить сообщение'
    }, from = false, person = {
        src: '',
        name: ''
    }, isAttachment = false, attachment = {
        src: '',
        name: '',
        className: 'i-display-none'
    }, message = {
        className: '',
        content: ''
    }, date = {
        value: '',
        className: 'i-display-none'
    }, ...props }) {
        super({
            isEmpty,
            empty,
            from,
            person,
            isAttachment,
            attachment,
            message,
            date,
            ...props
        });
    }
    render() {
        return compile(template, this.props);
    }
}
//# sourceMappingURL=index.js.map