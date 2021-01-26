import ServerError from '../../core/ServerError/index.js';
import { props } from './props.js';
import ComponentController from '../../core/ComponentController/index.js';
export default class ServerErrorController extends ComponentController {
    constructor() {
        super(ServerError, props);
        if (ServerErrorController.__instance) {
            return ServerErrorController.__instance;
        }
        ServerErrorController.__instance = this;
    }
}
//# sourceMappingURL=index.js.map