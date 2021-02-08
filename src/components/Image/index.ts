import Block from '../../core/Block/index';
import { template } from './template';
import compile from '../../utils/compile';

type ImageProps = {
  className?: string
  src: string
  name: string,
  size: number
}

export default class Image extends Block<ImageProps> {
  constructor(
    {
      className = '',
      ...props
    }: ImageProps) {
    super({
      className,
      ...props
    });
  }

  render(): string {
    return compile(template, this.props);
  }
}

