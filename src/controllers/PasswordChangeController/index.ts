import ComponentController from '../../core/ComponentController/index';
import Profile from '../../components/Profile/index';
import { props } from './props';
import { globalEventBus } from '../../core/GlobalEventBus/index';
import { router } from '../../core/Main/main';
import { ProfileChangePasswordAPI } from '../../api/profileChangePasswordAPI';
import { getUserInfo } from '../../utils/getUserInfo';
import { collectFormData } from '../../utils/collectFormData';
import { notify } from '../../utils/notify';

export default class PasswordChangeController extends ComponentController {
  static EVENTS = {
    EVENT_VALIDATE: 'event-listener:validate-form',
    EVENT_CHANGE_PASSWORD: 'event-listener:change-password',
    EVENT_CHANGE_PASSWORD_CLICKED: 'event-listener:change-password-clicked'
  };

  static PATHS = {
    PROFILE: '/profile'
  };
  private static __instance: PasswordChangeController;
  private isChangePasswordClicked: boolean;

  constructor() {
    super(Profile, props);
    if (PasswordChangeController.__instance) {
      return PasswordChangeController.__instance;
    }
    PasswordChangeController.__instance = this;
    this.isChangePasswordClicked = false;
  }

  emitListeners(): void {
    globalEventBus.emit(PasswordChangeController.EVENTS.EVENT_VALIDATE);
    globalEventBus.emit(PasswordChangeController.EVENTS.EVENT_CHANGE_PASSWORD);
  }

  addListeners(): void {
    globalEventBus.on(PasswordChangeController.EVENTS.EVENT_CHANGE_PASSWORD_CLICKED,
      ($form: HTMLFormElement) => {
        this.changePassword($form);
      });
  }

  async updateProps(): Promise<void> {
    const BASE_URL = 'https://ya-praktikum.tech/';
    const BASE_IMG = './images/profile_blob.png';
    const newProps = await getUserInfo();

    const avatar = newProps['avatar'] !== null
      ? `${BASE_URL}${newProps['avatar']}`
      : BASE_IMG;

    this.block?.setProps({
      header: newProps['first_name'],
      avatar
    });
  }

  changePassword($form: HTMLFormElement): void {
    if (this.isChangePasswordClicked) {
      return;
    }
    this.isChangePasswordClicked = true;
    const formData = collectFormData($form);
    new ProfileChangePasswordAPI()
      .update({data: formData})
      .then(() => {
        this.isChangePasswordClicked = false;
        router.go(PasswordChangeController.PATHS.PROFILE);
      })
      .catch((response) => {
        this.isChangePasswordClicked = false;
        notify({
          response,
          block: this.block
        });
      });
  }
}
