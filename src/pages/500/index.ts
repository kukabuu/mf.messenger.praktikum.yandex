import ServerError from '../../core/ServerError/index.js';
import { render } from '../../utils/render.js';
import props from './mock.js';

const InternalServerError = new ServerError(props);
render('.app', InternalServerError);
