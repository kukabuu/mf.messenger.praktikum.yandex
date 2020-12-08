import Block from '../Block/index.js';
import { template } from './template.js';

type props = {
	header: string,
	avatar: {
		[key: string] : string
	},
	inputs: {
		name: string,
		id: string,
		type?: string,
		value: string,
		isReadOnly: boolean
	}[],
	footerLinks: {
		name:string,
		href: string,
		className?: string
	}[],
	back: {
		[key: string] : string
	}
};

class Profile extends Block {
	constructor(props: props) {
		super(props);
	}

	render() {
		return template;
	}
}

export default Profile;
