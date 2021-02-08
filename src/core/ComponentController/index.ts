import Block from '../Block/index';
import { render } from '../../utils/render';

type asBlock<T> = new (props: Record<string, unknown>) => T;

export default class ComponentController {
  block: Block<Record<string, unknown>> | null;
  props: Record<string, unknown>;
  private readonly blockClass: asBlock<Block<Record<string, unknown>>>;

  constructor(view: asBlock<Block<Record<string, unknown>>>, defaultProps: Record<string, unknown>) {
    this.block = null;
    this.blockClass = view;
    this.props = defaultProps;
  }

  init(): void {
    if (this.block) {
      return;
    }
    this.block = new this.blockClass(this.props);
  }


  remove(): void {
    this.block?.hide();
  }

  async render(root: string): Promise<void> {
    if (!this.block) {
      return;
    }
    await this.updateProps();
    render(root, this.block);
    this._listen();
  }

  _listen(): void {
    this.subscribeState();
    this.addListeners();
    this.emitListeners();
  }

  subscribeState(): void {
    return;
  }

  addListeners(): void {
    return;
  }

  emitListeners(): void {
    return;
  }

  updateProps(): void {
    return;
  }
}
