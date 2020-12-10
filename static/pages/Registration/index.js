import Entry from '../../components/Entry/index.js';
import { render } from '../../utils/render.js';
import { registrationProps } from './mock.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
const RegistrationProps = new Entry(registrationProps);
render('.app', RegistrationProps);
globalEventBus.emit('event-listener:validate-form-register');
globalEventBus.emit('event-listener:collect-form-data-register');
//# sourceMappingURL=index.js.map