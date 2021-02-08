import ComponentController from '../../core/ComponentController/index';
import ServerError from '../../core/ServerError/index';
import { props } from './props';

export default class NotFoundPageController extends ComponentController {
  private static __instance: NotFoundPageController;

  constructor() {
    super(ServerError, props);
    if (NotFoundPageController.__instance) {
      return NotFoundPageController.__instance;
    }
    NotFoundPageController.__instance = this;
  }
}
