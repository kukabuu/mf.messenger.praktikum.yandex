import ComponentController from '../../core/ComponentController/index';
import Entry from '../../components/Entry/index';
import { props } from './props';
import { globalEventBus } from '../../core/GlobalEventBus/index';
import SignInAPI from '../../api/signInAPI';
import { router } from '../../core/Main/main';
import { collectFormData } from '../../utils/collectFormData';
import { notify } from '../../utils/notify';

export default class SignInController extends ComponentController {
  static EVENTS = {
    EVENT_VALIDATE: 'event-listener:validate-form',
    EVENT_SEND_FORM: 'event-listener:send-signin-form',
    EVENT_SEND_FORM_CLICKED: 'event-listener:send-signin-form-clicked'
  };

  static PATHS = {
    CHATS: '/chats'
  };
  private static __instance: SignInController;
  private isFormSubmit: boolean;

  constructor() {
    super(Entry, props);
    if (SignInController.__instance) {
      return SignInController.__instance;
    }
    SignInController.__instance = this;
    this.isFormSubmit = false;
  }

  emitListeners(): void {
    globalEventBus.emit(SignInController.EVENTS.EVENT_VALIDATE);
    globalEventBus.emit(SignInController.EVENTS.EVENT_SEND_FORM);
  }

  subscribeState(): void {
    globalEventBus.on(SignInController.EVENTS.EVENT_SEND_FORM_CLICKED,
      ($form: HTMLFormElement) => {
        this.sendFormData($form);
      });
  }

  sendFormData($form: HTMLFormElement): void {
    if (this.isFormSubmit) {
      return;
    }
    this.isFormSubmit = true;
    const formData = collectFormData($form);
    SignInAPI.create({data: formData})
      .then(() => {
        this.isFormSubmit = false;
        router.go(SignInController.PATHS.CHATS);
      })
      .catch((response) => {
        notify({
          response,
          block: this.block
        });
      })
      .finally(() => {
        this.isFormSubmit = false;
      });
  }
}
