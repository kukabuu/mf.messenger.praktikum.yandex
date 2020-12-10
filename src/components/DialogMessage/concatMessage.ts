import DialogMessage, { MessageProps } from './index.js';

export default function concatItems(messages: MessageProps[]) {
	let html = '';
	messages.forEach((props) => {
		html += new DialogMessage(props).getContent().innerHTML;
	})
	return html;
}
