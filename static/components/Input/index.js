import Block from '../../core/Block/index.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
import { template } from './template.js';
import compile from '../../utils/compile.js';
export default class Input extends Block {
    constructor({ id, label, value, className = '', type = 'text', handleClick = {}, name = id, placeholder = '', isReadOnly = false, isHidden = false, errorEnter = '', errorProfile = '', file = {
        className: ''
    }, floatedLabel = {
        className: '',
        text: ''
    }, group = {
        className: ''
    } }) {
        super({
            id,
            label,
            value,
            className,
            type,
            handleClick,
            name,
            placeholder,
            isReadOnly,
            isHidden,
            errorEnter,
            errorProfile,
            file,
            floatedLabel,
            group
        });
        Object.entries(handleClick).forEach(([event, callback]) => {
            globalEventBus.on(event, callback);
        });
    }
    render() {
        return compile(template, this.props);
    }
}
//# sourceMappingURL=index.js.map