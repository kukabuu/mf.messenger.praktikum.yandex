import Profile from '../../components/Profile/index.js';
import { render } from '../../utils/render.js';

import { profileEditProps } from './mock.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';

// рендерим компоненты
const editProfilePage = new Profile(profileEditProps);
render('.app', editProfilePage);

globalEventBus.emit('event-listener:validate-form');
globalEventBus.emit('event-listener:collect-form-data');
