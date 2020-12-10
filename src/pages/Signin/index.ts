import Enter from '../../components/Enter/index.js';

import { render } from '../../utils/render.js';
import { signinProps } from './mock.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';

const signinPage = new Enter(signinProps);
render('.app', signinPage);

globalEventBus.emit('event-listener:validate-form-signin');
globalEventBus.emit('event-listener:collect-form-data-signin');
