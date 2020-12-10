import Chat from '../../components/Chat/index.js';
import { render } from '../../utils/render.js';
import * as props from './mock.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';

const chat = new Chat(props.chatProps);
render('.app', chat);

globalEventBus.emit('event-listener:collect-form-data-chat');
globalEventBus.emit('event-listener:validate-form-file');
globalEventBus.emit('event-listener:display-file-name');
globalEventBus.emit('event-listener:validate-add-user');
globalEventBus.emit('event-listener:validate-remove-user');
globalEventBus.emit('event-listener:validate-remove-chat');
