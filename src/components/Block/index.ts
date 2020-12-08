import EventBus from '../EventBus/index.js';

type _meta = {
	tagName: string,
	props: unknown | null
};

type props = {
	[key: string]: string | number | boolean | Function
};

class Index {
	static EVENTS = {
		INIT: 'init',
		FLOW_CWM: 'flow:component-will-mount',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render'
	};

	private _element: HTMLElement;
	readonly _meta: _meta;
	props: props;
	eventBus: () => EventBus;

	constructor(props = {}, tagName: string = 'div') {
		const eventBus: EventBus = new EventBus();
		this._meta = {
			tagName,
			props
		};

		this.props = this._makePropsProxy(props);
		this.eventBus = () => eventBus;
		this._registerEvents(eventBus);
		eventBus.emit(Index.EVENTS.INIT);
	}

	private _registerEvents(eventBus: EventBus) {
		eventBus.on(Index.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Index.EVENTS.FLOW_CWM, this._componentWillMount.bind(this));
		eventBus.on(Index.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Index.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Index.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _createResources() {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	init() {
		this._createResources();
		this.eventBus().emit(Index.EVENTS.FLOW_CWM);
	}

	private _componentWillMount() {
		this.componentWillMount();
		this.eventBus().emit(Index.EVENTS.FLOW_RENDER);
	}

	// Может переопределять пользователь, необязательно трогать
	componentWillMount() {}

	private _componentDidMount() {
		this.componentDidMount();
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidMount() {}

	private _componentDidUpdate(oldProps: props, newProps: props) {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (response) {
			this.eventBus().emit(Index.EVENTS.FLOW_RENDER);
		}
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidUpdate(oldProps: props, newProps: props) {
		return {oldProps, newProps};
	}

	setProps = (nextProps: props) => {
		if (!nextProps) {
			return;
		}
		try {
			Object.assign(this.props, nextProps);

			this.eventBus().emit(Index.EVENTS.FLOW_CDU, this.props)
		} catch (e) {
			throw new Error(e);
		}

	};

	get element() {
		return this._element;
	}

	private _render() {
		const template = this.render();
		const compiled = Handlebars.compile(template);
		this._element.innerHTML = compiled(this.props);
		this.eventBus().emit(Index.EVENTS.FLOW_CDM);
	}

	// Может переопределять пользователь, необязательно трогать
	render(): string {
		return '';
	}

	getContent() {
		return this.element;
	}

	private _makePropsProxy(props: props) {
		props = new Proxy (props, {
			get(target: props, prop: string) {
				const value = target[prop];
				return (typeof value === 'function') ? value.bind(target) : value;
			},
			set(target: props, prop: string, value): boolean {
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

export default Index;
