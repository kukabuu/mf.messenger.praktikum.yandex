import ComponentController from '../../core/ComponentController/index.js';
import Profile from '../../components/Profile/index.js';
import { inputs, props } from './props.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
import { router } from '../../core/Main/main.js';
import { ProfileChangeInfoAPI } from '../../api/profileChangeInfoAPI.js';
import { getUserInfo } from '../../utils/getUserInfo.js';
import concatInputs from '../../components/Input/concatInputs.js';
import { collectFormData } from '../../utils/collectFormData.js';
import { notify } from '../../utils/notify.js';
export default class ProfileEditController extends ComponentController {
    constructor() {
        super(Profile, props);
        if (ProfileEditController.__instance) {
            return ProfileEditController.__instance;
        }
        ProfileEditController.__instance = this;
    }
    emitListeners() {
        console.log('from emitListeners');
        globalEventBus.emit(ProfileEditController.EVENTS.EVENT_DISPLAY_NAME);
        globalEventBus.emit(ProfileEditController.EVENTS.EVENT_VALIDATE);
        globalEventBus.emit(ProfileEditController.EVENTS.EVENT_SEND_AVATAR);
        globalEventBus.emit(ProfileEditController.EVENTS.EVENT_CHANGE_PROFILE);
        globalEventBus.emit(ProfileEditController.EVENTS.EVENT_TOGGLE_POPUP);
    }
    addListeners() {
        globalEventBus.on(ProfileEditController.EVENTS.EVENT_CHANGE_PROFILE_CLICKED, ($form) => {
            console.log('from change-profile-clicked of profileController');
            this.changeInfo($form);
        });
        globalEventBus.on(ProfileEditController.EVENTS.EVENT_SEND_AVATAR_CLICKED, ($form) => {
            console.log('emit event-listener:send-avatar-clicked');
            this.updateAvatar($form);
        });
        console.log(globalEventBus.listeners);
    }
    async updateProps() {
        const BASE_URL = 'https://ya-praktikum.tech/';
        const BASE_IMG = './images/profile_blob.png';
        console.log('update props');
        const newProps = await getUserInfo();
        const newInputProps = [];
        inputs.forEach((inputProp) => {
            const prop = { ...inputProp };
            Object.keys(newProps).forEach((key) => {
                if (prop.name !== key) {
                    return;
                }
                prop.value = newProps[key] === null ? '' : newProps[key];
                if (key === 'display_name' && newProps[key] === null) {
                    prop.value = newProps.login;
                }
            });
            newInputProps.push(prop);
        });
        const avatar = newProps['avatar'] !== null
            ? `${BASE_URL}${newProps['avatar']}`
            : BASE_IMG;
        this.block.setProps({
            inputs: concatInputs(newInputProps),
            header: newProps['first_name'],
            avatar
        });
    }
    changeInfo($form) {
        const formData = collectFormData($form);
        new ProfileChangeInfoAPI()
            .update({ data: formData })
            .then((response) => {
            console.log(response.responseText, response.status);
            if (response.status !== 200) {
                notify({
                    response,
                    block: this.block
                });
                return;
            }
            router.go(ProfileEditController.PATHS.PROFILE);
        });
    }
    updateAvatar($form) {
        const formData = new FormData($form);
        new ProfileChangeInfoAPI()
            .request({ data: formData })
            .then((response) => {
            console.log(response.responseText, response.status);
            if (response.status !== 200) {
                notify({
                    response,
                    block: this.block
                });
                return;
            }
            router.go(ProfileEditController.PATHS.PROFILE);
        });
    }
}
ProfileEditController.EVENTS = {
    EVENT_DISPLAY_NAME: 'event-listener:display-file-name',
    EVENT_VALIDATE: 'event-listener:validate-form',
    EVENT_SEND_AVATAR: 'event-listener:send-avatar',
    EVENT_CHANGE_PROFILE: 'event-listener:change-profile',
    EVENT_TOGGLE_POPUP: 'event-listener:toggle-popup',
    STATE_CHANGE: 'state:change',
    EVENT_SEND_AVATAR_CLICKED: 'event-listener:send-avatar-clicked',
    EVENT_CHANGE_PROFILE_CLICKED: 'event-listener:change-profile-clicked'
};
ProfileEditController.PATHS = {
    PROFILE: '/profile'
};
//# sourceMappingURL=index.js.map