import { render } from '../../utils/render.js';
export default class ComponentController {
    constructor(view, defaultProps) {
        this.block = null;
        this.blockClass = view;
        this.props = defaultProps;
    }
    init() {
        if (this.block) {
            return;
        }
        this.block = new this.blockClass(this.props);
    }
    remove() {
        this.block.hide();
    }
    async render(root) {
        if (!this.block) {
            return;
        }
        await this.updateProps();
        render(root, this.block);
        this._listen();
    }
    _listen() {
        this.subscribeState();
        this.addListeners();
        this.emitListeners();
    }
    subscribeState() { }
    addListeners() { }
    emitListeners() { }
    updateProps() { }
}
//# sourceMappingURL=index.js.map