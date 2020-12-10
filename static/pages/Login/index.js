import Enter from '../../components/Enter/index.js';
import { render } from '../../utils/render.js';
import { loginProps } from './mock.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
const loginPage = new Enter(loginProps);
render('.app', loginPage);
globalEventBus.emit('event-listener:validate-form-login');
globalEventBus.emit('event-listener:collect-form-data-login');
//# sourceMappingURL=index.js.map