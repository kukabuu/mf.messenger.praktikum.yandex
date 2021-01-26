import { isEqual } from '../../utils/isEqual.js';
import ComponentController from '../ComponentController/index.js';

type asController<T> = new () => T;

export default class Route {
	private _pathname: string
	private _controllerClass: asController<ComponentController>
	private _controller: ComponentController | null
	private _root: string

	constructor(pathname: string, controller: asController<ComponentController>, root: string) {
		this._pathname = pathname;
		this._controllerClass = controller;
		this._controller = null;
		this._root = root;
	}
// метод для отображения вьюшки, если переданный URL совпадает с URL текущего Route
	navigate(pathname: string) {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	leave() {
		this._controller!.remove();
		console.log('remove from dom', this._root, this._pathname);
	}

	match(pathname: string) {
		return isEqual(pathname, this._pathname);
	}

	render() {
		console.log(`from route render of ${this._pathname}`)
		if (!this._controller) {
			this._controller = new this._controllerClass();
			this._controller.init();
		}

		this._controller.render(this._root);
		console.log('route render', this._root, this._pathname);
	}
}
