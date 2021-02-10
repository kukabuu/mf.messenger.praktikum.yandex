import Block from '../Block/index';

import { template } from './template';
import compile from '../../utils/compile';

type ServerErrorProps = {
  error: string | number;
  errorText: string;
  back: {
    link: string;
    text: string;
  };
};

export default class ServerError extends Block<ServerErrorProps> {
  constructor(props: ServerErrorProps) {
    super(props);
  }

  render(): string {
    return compile(template, this.props);
  }
}
