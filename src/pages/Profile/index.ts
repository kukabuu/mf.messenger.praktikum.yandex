import Profile from '../../components/Profile/index.js';
import { render } from '../../utils/render.js';
import { profileProps } from './mock.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';

const profilePage = new Profile(profileProps);
render('.app', profilePage);

globalEventBus.emit('event-listener:validate-form-file');
globalEventBus.emit('event-listener:collect-form-data-file');
globalEventBus.emit('event-listener:display-file-name');
