import ServerError from '../../core/ServerError/index.js';
import { render } from '../../utils/render.js';
import props from './mock.js';

const NotFound = new ServerError(props);
render('.app', NotFound);
