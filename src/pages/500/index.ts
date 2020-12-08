import ServerError from '../../components/ServerError/index.js';
import { render } from '../../utils/render.js';
import props from './mock.js';

const notFound = new ServerError(props);
render('.app', notFound);
