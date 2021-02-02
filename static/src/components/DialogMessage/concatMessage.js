import DialogMessage from './index.js';
export default function concatItems(messages) {
    let html = '';
    messages.forEach((props) => {
        html += new DialogMessage(props).getContent().innerHTML;
    });
    return html;
}
//# sourceMappingURL=concatMessage.js.map