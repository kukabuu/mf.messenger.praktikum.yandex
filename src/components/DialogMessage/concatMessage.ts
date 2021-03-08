import DialogMessage, { MessageProps } from './index';

export default function concatMessages(messages: MessageProps[]): string {
  let html = '';
  messages.forEach((props) => {
    html += new DialogMessage(props).getContent().innerHTML;
  });
  return html;
}
