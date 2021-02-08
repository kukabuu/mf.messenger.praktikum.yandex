import { expect } from 'chai';

import Button, { ButtonProps } from '../components/Button/index';

describe('Block', () => {
  it('should to be created with empty object props', () => {
    const button = new Button({});
    expect(button.props).to.have.property('className');
  });

  it('should return text', () => {
    const textToButton = 'День сурка. Повторить!';
    const button = new Button({text: textToButton});
    const element = button.getContent();
    const textFromButton = element.textContent?.trim();
    expect(textFromButton).eq(textToButton);
  });

  it('should return text after setting props', () => {
    const textToButton = 'День сурка. Повторить!';
    const textToChange = 'Повторить!';
    const button = new Button({text: textToButton});
    button.setProps({text: textToChange});
    const element = button.getContent();
    const textFromButton = element.textContent?.trim();
    expect(textFromButton).eq(textToChange);
  });

  it('should to be created without props', () => {
    const button = new Button({});
    expect(button.props).to.have.property('className');
  });

  it('should to be created with default props when pass undefined', () => {
    const button = new Button(undefined);
    expect(button.props).to.have.property('className');
  });

  it('should to be created with default props when pass number', () => {
    const button = new Button(123 as ButtonProps);
    expect(button.props).to.have.property('className');
  });

  it('should to be created with default props when pass boolean', () => {
    const button = new Button(true as ButtonProps);
    expect(button.props).to.have.property('className');
  });

  it('should to be created with default props when pass script tag', () => {
    const button = new Button('<script>alert()</script>' as ButtonProps);
    expect(button.props).to.have.property('className');
  });
});
