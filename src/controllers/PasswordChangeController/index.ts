import ComponentController from '../../core/ComponentController/index';
import Profile from '../../components/Profile/index';
import { props } from './props';
import { globalEventBus } from '../../core/GlobalEventBus/index';
import { router } from '../../core/Main/main';
import ProfileChangePasswordAPI from '../../api/profileChangePasswordAPI';
import { getUserInfo } from '../../utils/getUserInfo';
import { collectFormData } from '../../utils/collectFormData';
import { notify } from '../../utils/notify';
import { getAvatarLink } from '../../utils/getAvatarLink';

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
    const newProps = await getUserInfo();
    const avatar = getAvatarLink(newProps);

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
    ProfileChangePasswordAPI.update({data: formData})
      .then(() => {
        router.go(PasswordChangeController.PATHS.PROFILE);
      })
      .catch((response) => {
        notify({
          response,
          block: this.block
        });
      })
      .finally(() => {
        this.isChangePasswordClicked = false;
      });
  }
}
