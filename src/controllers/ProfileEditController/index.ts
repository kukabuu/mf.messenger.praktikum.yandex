import ComponentController from '../../core/ComponentController/index';
import Profile from '../../components/Profile/index';
import { inputs, props } from './props';
import { InputProps } from '../../components/Input/index';
import concatInputs from '../../components/Input/concatInputs';
import { globalEventBus } from '../../core/GlobalEventBus/index';
import { router } from '../../core/Main/main';
import ProfileChangeInfoAPI from '../../api/profileChangeInfoAPI';
import { getUserInfo } from '../../utils/getUserInfo';
import { collectFormData } from '../../utils/collectFormData';
import { notify } from '../../utils/notify';
import { getAvatarLink } from '../../utils/getAvatarLink';

export default class ProfileEditController extends ComponentController {
  static EVENTS = {
    EVENT_DISPLAY_NAME: 'event-listener:display-file-name',
    EVENT_VALIDATE: 'event-listener:validate-form',
    EVENT_SEND_AVATAR: 'event-listener:send-avatar',
    EVENT_CHANGE_PROFILE: 'event-listener:change-profile',
    EVENT_TOGGLE_POPUP: 'event-listener:toggle-popup',
    STATE_CHANGE: 'state:change',

    EVENT_SEND_AVATAR_CLICKED: 'event-listener:send-avatar-clicked',
    EVENT_CHANGE_PROFILE_CLICKED: 'event-listener:change-profile-clicked'
  };

  static PATHS = {
    PROFILE: '/profile'
  };
  private static __instance: ProfileEditController;
  private isUpdateAvatarClicked: boolean;
  private isChangeInfoClicked: boolean;

  constructor() {
    super(Profile, props);
    if (ProfileEditController.__instance) {
      return ProfileEditController.__instance;
    }
    ProfileEditController.__instance = this;
    this.isChangeInfoClicked = false;
    this.isUpdateAvatarClicked = false;
  }

  emitListeners(): void {
    globalEventBus.emit(ProfileEditController.EVENTS.EVENT_DISPLAY_NAME);
    globalEventBus.emit(ProfileEditController.EVENTS.EVENT_VALIDATE);
    globalEventBus.emit(ProfileEditController.EVENTS.EVENT_SEND_AVATAR);
    globalEventBus.emit(ProfileEditController.EVENTS.EVENT_CHANGE_PROFILE);
    globalEventBus.emit(ProfileEditController.EVENTS.EVENT_TOGGLE_POPUP);
  }

  addListeners(): void {
    globalEventBus.on(ProfileEditController.EVENTS.EVENT_CHANGE_PROFILE_CLICKED, ($form: HTMLFormElement) => {
      this.changeInfo($form);
    });
    globalEventBus.on(ProfileEditController.EVENTS.EVENT_SEND_AVATAR_CLICKED, ($form: HTMLFormElement) => {
      this.updateAvatar($form);
    });
  }

  async updateProps(): Promise<void> {
    const newProps = await getUserInfo();
    const newInputProps: InputProps[] = [];

    inputs.forEach((inputProp) => {
      const prop = {...inputProp};
      Object.keys(newProps).forEach((key) => {
        if (prop.name !== key) {
          return;
        }
        prop.value = newProps[key] === null ? '' : newProps[key] as string;

        if (key === 'display_name' && newProps[key] === null) {
          prop.value = newProps.login as string;
        }
      });
      newInputProps.push(prop);
    });

    const avatar = getAvatarLink(newProps);

    this.block?.setProps({
      inputs: concatInputs(newInputProps as InputProps[]),
      header: newProps['first_name'],
      avatar
    });
  }

  changeInfo($form: HTMLFormElement): void {
    if (this.isChangeInfoClicked) {
      return;
    }
    this.isChangeInfoClicked = true;
    const formData = collectFormData($form);
    ProfileChangeInfoAPI.update({data: formData})
      .then(() => {
        this.isChangeInfoClicked = false;
        router.go(ProfileEditController.PATHS.PROFILE);
      })
      .catch((response) => {
        this.isChangeInfoClicked = false;
        notify({
          response,
          block: this.block
        });
      });
  }

  updateAvatar($form: HTMLFormElement): void {
    if (this.isUpdateAvatarClicked) {
      return;
    }
    this.isUpdateAvatarClicked = true;
    const formData = new FormData($form);
    ProfileChangeInfoAPI.upload({data: formData})
      .then(() => {
        router.go(ProfileEditController.PATHS.PROFILE);
      })
      .catch((response) => {
        notify({
          response,
          block: this.block
        });
      })
      .finally(() => {
        this.isUpdateAvatarClicked = false;
      });
  }
}
