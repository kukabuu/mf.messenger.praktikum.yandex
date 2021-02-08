import Block from '../../core/Block/index';
import { template } from './template';
import compile from '../../utils/compile';

type ErrorProps = {
  className?: string;
  text?: string;
}

export default class Error extends Block<ErrorProps> {
  constructor(
    {
      className = '',
      text = ''
    }: ErrorProps) {
    super({className, text});
  }

  render(): string {
    return compile(template, this.props);
  }
}

