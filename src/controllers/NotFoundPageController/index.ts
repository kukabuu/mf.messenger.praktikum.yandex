import ComponentController from '../../core/ComponentController/index.js';
import ServerError from '../../core/ServerError/index.js';
import { props } from './props.js';

export default class NotFoundPageController extends ComponentController {
	private static __instance: NotFoundPageController
	constructor() {
		super(ServerError, props);
		if (NotFoundPageController.__instance) {
			return NotFoundPageController.__instance;
		}
		NotFoundPageController.__instance = this;
	}
}
