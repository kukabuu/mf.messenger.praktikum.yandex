import Profile from '../../components/Profile/index.js';
import { render } from '../../utils/render.js';
import { profileEditProps } from './mock.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
const ProfileEditPage = new Profile(profileEditProps);
render('.app', ProfileEditPage);
globalEventBus.emit('event-listener:validate-form');
globalEventBus.emit('event-listener:collect-form-data');
//# sourceMappingURL=index.js.map