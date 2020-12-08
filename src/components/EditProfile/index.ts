import Block from '../Block/index.js';
import { template } from './template.js';

type props = {
	avatar: {
		[key: string] : string
	}
	inputs: {
		name: string,
		id: string,
		type?: string,
		value: string
	}[],
	back: {
		[key: string] : string
	}
};

class EditProfile extends Block {
	constructor(props: props) {
		super(props);
	}

	render() {
		return template;
	}
}

export default EditProfile;
