import ChatListItem, { ListItemProps } from './index.js';

export default function concatItems(items: ListItemProps[]) {
	let html = '';
	items.forEach((props) => {
		html += new ChatListItem(props).getContent().innerHTML;
	})
	return html;
}
