import Block from '../Block/index.js';
import { toggleUserPopup, deleteChatPopup, uploadFile } from './template.js';

type props = {
	header: string,
	input: {
		[key: string] : string | boolean
	}
};

export class UserPopup extends Block {
	constructor(props: props) {
		super(props);
	}

	render() {
		return toggleUserPopup;
	}
}

export class ChatPopup extends Block {
	constructor(props: props) {
		super(props);
	}

	render() {
		return deleteChatPopup;
	}
}

export class UploadFilePopup extends Block {
	constructor(props: props) {
		super(props);
	}

	render() {
		return uploadFile;
	}
}
