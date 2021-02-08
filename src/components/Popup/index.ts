import Block from '../../core/Block/index';

import { template } from './template';
import { globalEventBus } from '../../core/GlobalEventBus/index';
import compile from '../../utils/compile';

type EventListener = {
  event: string,
  callback: () => void
}

type PopupProps = {
  header: string
  input: string
  button: string
  cancelButton?: string
  eventListeners?: EventListener[]
};

export default class Popup extends Block<PopupProps> {
  constructor(
    {
      eventListeners = [],
      cancelButton = '',
      ...props
    }: PopupProps) {
    super({
      eventListeners,
      cancelButton,
      ...props
    });

    eventListeners.forEach((listener) => {
      globalEventBus.on(listener['event'], listener['callback']);
    });
  }

  render(): string {
    return compile(template, this.props);
  }
}
