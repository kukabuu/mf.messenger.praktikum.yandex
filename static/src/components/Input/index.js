import Block from '../../core/Block/index.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
import { template } from './template.js';
import compile from '../../utils/compile.js';
export default class Input extends Block {
    constructor({ className = '', type = 'text', handleClick = {}, name = '', placeholder = '', isReadOnly = false, isHidden = false, errorEntry = '', errorProfile = '', file = {
        className: ''
    }, floatedLabel = {
        className: '',
        text: ''
    }, group = {
        className: ''
    }, ...props }) {
        super({
            className,
            type,
            handleClick,
            name,
            placeholder,
            isReadOnly,
            isHidden,
            errorEntry,
            errorProfile,
            file,
            floatedLabel,
            group,
            ...props
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