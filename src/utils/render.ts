import Block from "../core/Block/index";

export function render<P extends object>(selector: string, block: Block<P>) {
	const root = document.querySelector(selector);
	root?.append(block.getContent());
	return root;
}
