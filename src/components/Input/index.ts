import Block from '../../core/Block/index';
import { globalEventBus } from '../../core/GlobalEventBus/index';
import { template } from './template';
import compile from '../../utils/compile';

export type InputProps = {
  handleClick?: {
    [key: string]: (...event: MouseEvent[]) => void;
  };
  label: {
    className: string;
    text: string;
  };
  floatedLabel?: {
    className?: string;
    text?: string;
  };
  group?: {
    className?: string;
  };
  file?: {
    className?: string;
  };
  value?: string;
  id: string;
  className?: string;
  type?: 'text' | 'password' | 'email' | 'tel' | 'file';
  placeholder?: string;
  name?: string;
  isReadOnly?: boolean;
  isHidden?: boolean;
  errorProfile?: string;
  errorEntry?: string;
}

export default class Input extends Block<InputProps> {
  constructor(
    {
      className = '',
      type = 'text',
      handleClick = {},
      name = '',
      placeholder = '',
      isReadOnly = false,
      isHidden = false,
      errorEntry = '',
      errorProfile = '',
      file = {
        className: ''
      },
      floatedLabel = {
        className: '',
        text: ''
      },
      group = {
        className: ''
      },
      ...props
    }: InputProps
  ) {
    super({
      className,
      type,
      handleClick,
      name,
      placeholder,
      isReadOnly,
      isHidden,
      errorEntry,
      errorProfile,
      file,
      floatedLabel,
      group,
      ...props
    });

    Object.entries(handleClick).forEach(([event, callback]) => {
      globalEventBus.on(event, callback);
    });
  }

  render(): string {
    return compile(template, this.props);
  }
}

