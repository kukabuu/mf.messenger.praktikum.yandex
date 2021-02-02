import ComponentController from '../../core/ComponentController/index.js';
import ServerError from '../../core/ServerError/index.js';
import { props } from './props.js';
export default class NotFoundPageController extends ComponentController {
    constructor() {
        super(ServerError, props);
        if (NotFoundPageController.__instance) {
            return NotFoundPageController.__instance;
        }
        NotFoundPageController.__instance = this;
    }
}
//# sourceMappingURL=index.js.map