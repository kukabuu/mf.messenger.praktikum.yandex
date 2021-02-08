import ChatListItem, { ListItemProps } from './index';

export default function concatItems(items: ListItemProps[]): string {
  let html = '';
  items.forEach((props) => {
    html += new ChatListItem(props).getContent().innerHTML;
  });
  return html;
}
