import Profile from '../../components/Profile/index.js';
import { render } from '../../utils/render.js';
import { passwordChangeProps } from './mock.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
const PasswordChangePage = new Profile(passwordChangeProps);
render('.app', PasswordChangePage);
globalEventBus.emit('event-listener:validate-form');
globalEventBus.emit('event-listener:collect-form-data');
//# sourceMappingURL=index.js.map