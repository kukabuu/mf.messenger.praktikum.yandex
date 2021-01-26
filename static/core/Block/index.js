import EventBus from '../EventBus/index.js';
import { merge } from '../../utils/merge.js';
export default class Block {
    constructor(props, tagName = 'div') {
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            console.log('from set props');
            try {
                this.props = merge(this.props, nextProps);
                this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, nextProps);
            }
            catch (e) {
                console.log('some error here');
                throw new Error(e);
            }
        };
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };
        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CWM, this._componentWillMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }
    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CWM);
    }
    _componentWillMount() {
        this.componentWillMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    // Может переопределять пользователь, необязательно трогать
    componentWillMount() { }
    _componentDidMount() {
        this.componentDidMount();
    }
    // Может переопределять пользователь, необязательно трогать
    componentDidMount() { }
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }
    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps, newProps) {
        return { oldProps, newProps };
    }
    get element() {
        return this._element;
    }
    _render() {
        this._element.innerHTML = this.render();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
    getContent() {
        return this.element;
    }
    _makePropsProxy(props) {
        const CustomProxy = Proxy;
        props = new CustomProxy(props, {
            get(target, prop) {
                const value = target[prop];
                return (typeof value === 'function') ? value.bind(target) : value;
            },
            set(target, prop, value) {
                if (target[prop] !== value) {
                    target[prop] = value;
                    return true;
                }
                return true;
            },
            deleteProperty() {
                throw new Error('Нет прав');
            },
        });
        return props;
    }
    _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }
    show() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    hide() {
        this._element.remove();
    }
}
Block.EVENTS = {
    INIT: 'init',
    FLOW_CWM: 'flow:component-will-mount',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
};
//# sourceMappingURL=index.js.map