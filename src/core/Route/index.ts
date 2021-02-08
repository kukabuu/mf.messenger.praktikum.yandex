import { isEqual } from '../../utils/isEqual';
import ComponentController from '../ComponentController/index';

type asController<T> = new () => T;

export default class Route {
  private readonly _pathname: string;
  private readonly _controllerClass: asController<ComponentController>;
  private _controller: ComponentController | null;
  private readonly _root: string;

  constructor(pathname: string, controller: asController<ComponentController>, root: string) {
    this._pathname = pathname;
    this._controllerClass = controller;
    this._controller = null;
    this._root = root;
  }

  leave(): void {
    this._controller?.remove();
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  render(): void {
    if (!this._controller) {
      this._controller = new this._controllerClass();
      this._controller.init();
    }

    this._controller.render(this._root);
  }
}
