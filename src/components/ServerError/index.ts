import Block from '../../components/Block/index.js';
import { template } from './template.js';

type props = {
	error: string | number,
	errorText: string,
	back: {
		link: string,
		text: string
	}
};

class ServerError extends Block {
	constructor(props: props) {
		super(props);
	}

	render() {
		return template;
	}
}

export default ServerError;
