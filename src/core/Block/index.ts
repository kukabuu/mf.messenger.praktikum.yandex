import EventBus from '../EventBus/index';
import { merge } from '../../utils/merge';

interface ProxyConstructor {
  new<T extends Record<string, unknown>, H extends Record<string, unknown>>(target: T, handler: ProxyHandler<H>): T;
}

type _meta = {
  tagName: string;
  props: unknown | null;
};

export default abstract class Block<T extends Record<string, unknown>> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CWM: 'flow:component-will-mount',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };
  readonly _meta: _meta;
  props: T;
  eventBus: () => EventBus<T>;

  protected constructor(props: T, tagName = 'div') {
    if (!props) {
      throw 'Необходимо передать пропсы';
    }
    const eventBus: EventBus<T> = new EventBus();
    this._meta = {
      tagName,
      props
    };

    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _element: HTMLElement;

  get element(): HTMLElement {
    return this._element;
  }

  private static _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CWM);
  }

  componentWillMount(): void {
    return;
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(): void {
    return;
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: T, newProps: T): { newProps: T; oldProps: T } {
    return {oldProps, newProps};
  }

  setProps = (nextProps: T): void => {
    if (!nextProps) {
      return;
    }
    try {
      this.props = merge(this.props, nextProps);
      this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, nextProps);
    } catch (e) {
      throw new Error(e);
    }
  };

  abstract render(): string;

  getContent(): HTMLElement {
    return this.element;
  }

  hide(): void {
    this._element.remove();
  }

  private _registerEvents(eventBus: EventBus<T>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWM, this._componentWillMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const {tagName} = this._meta;
    this._element = Block._createDocumentElement(tagName);
  }

  private _componentWillMount() {
    this.componentWillMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  private _componentDidUpdate(oldProps: T, newProps: T) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _render() {
    this._element.innerHTML = this.render();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _makePropsProxy<T extends Record<string, unknown>, P extends keyof S, S extends Record<string, unknown>>(props: T): T {
    const CustomProxy = Proxy as ProxyConstructor;

    return new CustomProxy(props, {
      get(target: S, prop: P) {
        const value = target[prop];
        return (typeof value === 'function') ? value.bind(target) : value;
      },
      set(target: S, prop: P, value): boolean {
        if (target[prop] !== value) {
          target[prop] = value;
          return true;
        }
        return true;
      },
      deleteProperty() {
        throw new Error('Нет прав');
      }
    });
  }
}
