import Block from '../Block/index.js';
import { template } from './template.js';

type props = {
	header: string,
	avatar: {
		[key: string] : string
	}
	inputs: {
		name: string,
		id: string,
		type: string
	}[],
	back: {
		[key: string] : string
	}
};

class ChangePassword extends Block {
	constructor(props: props) {
		super(props);
	}

	render() {
		return template;
	}
}

export default ChangePassword;
