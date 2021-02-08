import Block from '../../core/Block/index';
import { template } from './template';
import compile from '../../utils/compile';

enum Visibility {
  OPEN = 'notification--opacity-1',
  CLOSE = 'notification--opacity-0',
}

type Props = {
  status?: 'notification--error' | 'notification--success' | 'notification--warning'
  title?: 'Ошибка!' | 'Успешно!' | 'Внимание!'
  message?: string;
}

export default class Notification extends Block<Props> {
  constructor({
    title = 'Успешно!',
    status = 'notification--success',
    ...props
  }: Props) {
    super({
      title, status, ...props
    });
  }

  render(): string {
    return compile(template, this.props);
  }

  show(): void {
    const child = this.element.firstChild as HTMLElement;
    child.classList.remove(Visibility.CLOSE);
    child.classList.add(Visibility.OPEN);
  }

  hide(): void {
    const child = this.element.firstChild as HTMLElement;
    child.classList.remove(Visibility.OPEN);
    child.classList.add(Visibility.CLOSE);
  }
}

