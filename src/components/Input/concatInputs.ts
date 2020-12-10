import InputProfile, { InputProps } from './index.js';

export default function concatInputs(inputs: InputProps[]) {
	let html = '';
	inputs.forEach((props) => {
		html += new InputProfile(props).getContent().innerHTML;
	})
	return html;
}
