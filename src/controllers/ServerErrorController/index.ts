import ServerError from '../../core/ServerError/index';
import { props } from './props';
import ComponentController from '../../core/ComponentController/index';

export default class ServerErrorController extends ComponentController {
  private static __instance: ServerErrorController;

  constructor() {
    super(ServerError, props);
    if (ServerErrorController.__instance) {
      return ServerErrorController.__instance;
    }
    ServerErrorController.__instance = this;
  }
}
