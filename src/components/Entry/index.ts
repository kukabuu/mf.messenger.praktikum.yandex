import Block from '../../core/Block/index';
import { template } from './template';
import compile from '../../utils/compile';
import { globalEventBus } from '../../core/GlobalEventBus/index';

type EventListener = {
  event: string;
  callback: () => void;
}

export type EntryProps = {
  className: string;
  header: string;
  inputs: string;
  button: string;
  notification: string;
  back: {
    link: string;
    text: string;
  };
  eventListeners?: EventListener[];
};

export default class Entry extends Block<EntryProps> {
  constructor({eventListeners = [], ...props}: EntryProps) {
    super({eventListeners, ...props});

    eventListeners.forEach((listener) => {
      globalEventBus.on(listener['event'], listener['callback']);
    });
  }

  render(): string {
    return compile(template, this.props);
  }
}

