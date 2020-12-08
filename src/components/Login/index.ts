import Block from '../Block/index.js';
import { template } from './template.js';

type props = {
	header: string,
	inputs: {
		name: string,
		id: string,
		type?: string
	}[],
	back: {
		link: string,
		text: string
	}
};

class Login extends Block {
	constructor(props: props) {
		super(props);
	}

	render() {
		return template;
	}
}

export default Login;
