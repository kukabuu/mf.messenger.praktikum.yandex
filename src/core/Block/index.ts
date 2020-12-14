import EventBus from '../EventBus/index.js';

interface ProxyConstructor {
	new <T extends object, H extends Proxy<string, Function>>(target: T, handler: ProxyHandler<H>): T
}

type Proxy<S, F> = {
	get(): S | F
	set(value: S): void
}

type _meta = {
	tagName: string,
	props: unknown | null
};

export default abstract class Block<T extends object> {
	static EVENTS = {
		INIT: 'init',
		FLOW_CWM: 'flow:component-will-mount',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render'
	};

	private _element: HTMLElement;
	readonly _meta: _meta;
	props: T;
	eventBus: () => EventBus<T>;

	protected constructor(props: T, tagName: string = 'div') {
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

	private _registerEvents(eventBus: EventBus<T>) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CWM, this._componentWillMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _createResources() {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	init() {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_CWM);
	}

	private _componentWillMount() {
		this.componentWillMount();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	// Может переопределять пользователь, необязательно трогать
	componentWillMount() {}

	private _componentDidMount() {
		this.componentDidMount();
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidMount() {}

	private _componentDidUpdate(oldProps: T, newProps: T) {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (response) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		}
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidUpdate(oldProps: T, newProps: T) {
		return {oldProps, newProps};
	}

	setProps = (nextProps: T) => {
		if (!nextProps) {
			return;
		}
		try {
			Object.assign(this.props, nextProps);
			this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, nextProps)
		} catch (e) {
			throw new Error(e);
		}
	};

	get element() {
		return this._element;
	}

	private _render() {
		this._element.innerHTML = this.render();
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	abstract render(): string;

	getContent() {
		return this.element;
	}

	private _makePropsProxy<T extends object, P extends keyof S, S extends Proxy<string, Function>>(props: T): T {
		const CustomProxy = Proxy as ProxyConstructor;

		props = new CustomProxy (props, {
			get(target: S, prop: P) {
				const value = target[prop];
				return (typeof value === 'function') ? value.bind(target) : value;
			},
			set(target: S, prop: P, value): boolean {
				if (target[prop] !== value) {
					target[prop] = value;
					return true;
				}
				return false;
			},
			deleteProperty() {
				throw new Error('Нет прав')
			},
		})
		return props;
	}

	private _createDocumentElement(tagName: string) {
		return document.createElement(tagName);
	}

	show() {
		this._element.classList.remove('i-display-none');
	}

	hide() {
		this._element.classList.add('i-display-none');
	}
}
