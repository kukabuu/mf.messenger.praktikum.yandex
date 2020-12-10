import InputProfile from './index.js';
export default function concatInputs(inputs) {
    let html = '';
    inputs.forEach((props) => {
        html += new InputProfile(props).getContent().innerHTML;
    });
    return html;
}
//# sourceMappingURL=concatInputs.js.map