import Block from '../Block/index.js';
import { toggleUserPopup, deleteChatPopup, uploadFile } from './template.js';
export class UserPopup extends Block {
    constructor(props) {
        super(props);
    }
    render() {
        return toggleUserPopup;
    }
}
export class ChatPopup extends Block {
    constructor(props) {
        super(props);
    }
    render() {
        return deleteChatPopup;
    }
}
export class UploadFilePopup extends Block {
    constructor(props) {
        super(props);
    }
    render() {
        return uploadFile;
    }
}
//# sourceMappingURL=index.js.map