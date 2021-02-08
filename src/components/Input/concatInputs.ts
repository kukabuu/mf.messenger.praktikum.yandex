import InputProfile, { InputProps } from './index';

export default function concatInputs(inputs: InputProps[]): string {
  let html = '';
  inputs.forEach((props) => {
    html += new InputProfile(props).getContent().innerHTML;
  });
  return html;
}
