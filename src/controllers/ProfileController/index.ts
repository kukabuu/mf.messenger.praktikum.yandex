import ComponentController from '../../core/ComponentController/index';
import Profile from '../../components/Profile/index';
import { props } from './props';
import { globalEventBus } from '../../core/GlobalEventBus/index';
import { router } from '../../core/Main/main';
import { ProfileAPI } from '../../api/profileAPI';
import { getUserInfo } from '../../utils/getUserInfo';
import { InputProps } from '../../components/Input/index';
import { inputs } from '../ProfileEditController/props';
import concatInputs from '../../components/Input/concatInputs';
import { notify } from '../../utils/notify';

export default class ProfileController extends ComponentController {
  static EVENTS = {
    EVENT_LOGOUT: 'event-listener:logout',
    EVENT_LOGOUT_CLICKED: 'event-listener:logout-clicked'
  };

  static PATHS = {
    SIGNIN: '/signin'
  };
  private static __instance: ProfileController;
  private isLogoutClicked: boolean;

  constructor() {
    super(Profile, props);
    if (ProfileController.__instance) {
      return ProfileController.__instance;
    }
    ProfileController.__instance = this;
    this.isLogoutClicked = false;
  }

  emitListeners(): void {
    globalEventBus.emit(ProfileController.EVENTS.EVENT_LOGOUT);
  }

  addListeners(): void {
    globalEventBus.on(ProfileController.EVENTS.EVENT_LOGOUT_CLICKED,
      () => {
        this.logout();
      });
  }

  async updateProps(): Promise<void> {
    const BASE_URL = 'https://ya-praktikum.tech/';
    const BASE_IMG = './images/profile_blob.png';
    const newProps = await getUserInfo();
    if (!newProps) {
      return;
    }
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

    const avatar = newProps['avatar'] !== null
      ? `${BASE_URL}${newProps['avatar']}`
      : BASE_IMG;

    this.block?.setProps({
      inputs: concatInputs(newInputProps as InputProps[]),
      header: newProps['first_name'],
      avatar
    });
  }

  logout(): void {
    if (this.isLogoutClicked) {
      return;
    }
    this.isLogoutClicked = true;
    new ProfileAPI()
      .logout()
      .then(() => {
        this.isLogoutClicked = false;
        router.go(ProfileController.PATHS.SIGNIN);
      })
      .catch((response) => {
        this.isLogoutClicked = false;
        notify({
          response,
          block: this.block
        });
      });
  }
}
