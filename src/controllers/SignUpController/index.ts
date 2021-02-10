import ComponentController from '../../core/ComponentController/index';
import Entry from '../../components/Entry/index';
import { props } from './props';
import { globalEventBus } from '../../core/GlobalEventBus/index';
import SignUpAPI from '../../api/signUpAPI';
import { router } from '../../core/Main/main';
import { collectFormData } from '../../utils/collectFormData';
import { notify } from '../../utils/notify';

export default class SignUpController extends ComponentController {
  static EVENTS = {
    EVENT_VALIDATE: 'event-listener:validate-form',
    EVENT_SEND_FORM: 'event-listener:send-signup-form',
    EVENT_SEND_FORM_CLICKED: 'event-listener:send-signup-form-clicked'
  };

  static PATHS = {
    CHATS: '/chats'
  };
  private static __instance: SignUpController;
  private isFormSubmit: boolean;

  constructor() {
    super(Entry, props);
    if (SignUpController.__instance) {
      return SignUpController.__instance;
    }
    SignUpController.__instance = this;
    this.isFormSubmit = false;
  }

  emitListeners(): void {
    globalEventBus.emit(SignUpController.EVENTS.EVENT_VALIDATE);
    globalEventBus.emit(SignUpController.EVENTS.EVENT_SEND_FORM);
  }

  subscribeState(): void {
    globalEventBus.on(SignUpController.EVENTS.EVENT_SEND_FORM_CLICKED,
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
    SignUpAPI.create({data: formData})
      .then(() => {
        router.go(SignUpController.PATHS.CHATS);
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

