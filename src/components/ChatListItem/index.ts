import Block from '../../core/Block/index';
import { template } from './template';

import compile from '../../utils/compile';

export type ListItemProps = {
  id: number
  avatar: {
    src: string
    name: string
  }
  name: string
  preview: string
  time: {
    full: string
    less: string
  }
  from?: {
    text?: string
    className?: string
  }
  counter?: {
    value?: string | number
    className?: string
  }
};

export default class ChatListItem extends Block<ListItemProps> {
  constructor({
    from = {
      text: 'Вы:',
      className: 'i-display-none'
    },
    counter = {
      value: '',
      className: 'i-display-none'
    },
    ...props
  }: ListItemProps) {
    super({from, counter, ...props});
  }

  render(): string {
    return compile(template, this.props);
  }
}
