import Block from '../../components/Block/index.js';
import { template } from './template.js';

type props = {
	header: string,
	inputs: {
		name: string,
		id: string,
		type?: string,
		placeholder?: string,
		className?: string
	}[],
	back: {
		link: string,
		text: string
	}
};

class Signin extends Block {
	constructor(props: props) {
		super(props);
	}

	render() {
		return template;
	}
}

export default Signin;
