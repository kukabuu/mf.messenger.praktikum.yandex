import Block from '../../core/Block/index';

import { template } from './template';
import compile from '../../utils/compile';
import { globalEventBus } from '../../core/GlobalEventBus/index';

type EventListener = {
  event: string,
  callback: () => void
}

export enum METHODS {
  GET = 'get',
  POST = 'post'
}

export type ProfileProps = {
  header?: string
  inputs: string
  popup?: string
  button?: string
  avatar: string
  avatarInfo: {
    name: string
    link?: string
    linkText?: string
    classToChange?: string
  }
  form?: {
    className?: string
    method?: METHODS.GET | METHODS.POST
  }
  footerLinks?: {
    name: string
    href: string
    className?: string
  }[]
  back: {
    link: string
    src: string
    text: string
  }
  eventListeners?: EventListener[]
};

export default class Profile extends Block<ProfileProps> {
  constructor({
    eventListeners = [],
    footerLinks = [{
      name: '',
      href: '#',
      className: ''
    }],
    form = {
      className: '',
      method: METHODS.GET
    },
    popup = '',
    header = '',
    button = '',
    avatar = './images/profile_blob.png',
    ...props
  }: ProfileProps) {
    super({
      eventListeners,
      footerLinks,
      form,
      popup,
      header,
      button,
      avatar,
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
