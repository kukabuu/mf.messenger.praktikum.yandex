import Block from '../../core/Block/index.js';
import { template } from './template.js';
import compile from '../../utils/compile.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
export default class Chat extends Block {
    constructor({ popupRemoveUser = '', popupAddUser = '', popupChatDelete = '', popupUploadFile = '', dialog = '', chatListItems = '', eventListeners = [], ...props }) {
        super({
            popupRemoveUser,
            popupAddUser,
            popupChatDelete,
            popupUploadFile,
            dialog,
            chatListItems,
            eventListeners,
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