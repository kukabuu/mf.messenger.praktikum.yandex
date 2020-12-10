import Profile from '../../components/Profile/index.js';
import { render } from '../../utils/render.js';

import { profileChangePasswordProps } from './mock.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';

const changePasswordPage = new Profile(profileChangePasswordProps);
render('.app', changePasswordPage);

globalEventBus.emit('event-listener:validate-form');
globalEventBus.emit('event-listener:collect-form-data');
