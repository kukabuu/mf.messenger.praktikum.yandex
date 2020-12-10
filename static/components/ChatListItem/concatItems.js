import ChatListItem from './index.js';
export default function concatItems(items) {
    let html = '';
    items.forEach((props) => {
        html += new ChatListItem(props).getContent().innerHTML;
    });
    return html;
}
//# sourceMappingURL=concatItems.js.map