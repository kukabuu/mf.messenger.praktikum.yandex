import Block from '../Block/index.js';
import { template } from './template.js';
import compile from '../../utils/compile.js';
class ServerError extends Block {
    constructor(props) {
        super(props);
    }
    render() {
        return compile(template, this.props);
    }
}
export default ServerError;
//# sourceMappingURL=index.js.map