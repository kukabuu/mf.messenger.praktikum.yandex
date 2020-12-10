import Entry from '../../components/Entry/index.js';
import { render } from '../../utils/render.js';
import { authorizationProps } from './mock.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';

const AuthorizationPage = new Entry(authorizationProps);
render('.app', AuthorizationPage);

globalEventBus.emit('event-listener:validate-form-login');
globalEventBus.emit('event-listener:collect-form-data-login');
