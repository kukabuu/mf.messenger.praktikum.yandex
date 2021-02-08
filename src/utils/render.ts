import Block from '../core/Block/index';

export function render<P extends Record<string, unknown>>(selector: string, block: Block<P>): Element | null {
  const $root = document.querySelector(selector);
  $root?.append(block.getContent());
  return $root;
}
