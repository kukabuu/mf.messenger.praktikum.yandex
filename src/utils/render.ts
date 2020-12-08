import Block from "../components/Block/index";

export function render(selector: string, block: Block) {
	const root = document.querySelector(selector);
	root?.append(block.getContent());
	return root;
}
