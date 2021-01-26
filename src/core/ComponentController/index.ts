import Block from '../Block/index.js';
import { render } from '../../utils/render.js';

type asBlock<T> = new (props: object) => T;

export default class ComponentController {
	block: Block<object> | null
	private readonly blockClass: asBlock<Block<object>>
	props: object

	constructor(view: asBlock<Block<object>>, defaultProps: object) {
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
		this.block!.hide();
	}

	async render(root: string) {
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

	subscribeState() {}
	addListeners() {}
	emitListeners() {}
	updateProps() {}
}
