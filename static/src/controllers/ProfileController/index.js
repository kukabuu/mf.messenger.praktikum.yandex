import ComponentController from '../../core/ComponentController/index.js';
import Profile from '../../components/Profile/index.js';
import { props } from './props.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
import { router } from '../../core/Main/main.js';
import { ProfileAPI } from '../../api/profileAPI.js';
import { getUserInfo } from '../../utils/getUserInfo.js';
import { inputs } from '../ProfileEditController/props.js';
import concatInputs from '../../components/Input/concatInputs.js';
import { notify } from '../../utils/notify.js';
export default class ProfileController extends ComponentController {
    constructor() {
        super(Profile, props);
        if (ProfileController.__instance) {
            return ProfileController.__instance;
        }
        ProfileController.__instance = this;
    }
    emitListeners() {
        globalEventBus.emit(ProfileController.EVENTS.EVENT_LOGOUT);
    }
    addListeners() {
        globalEventBus.on(ProfileController.EVENTS.EVENT_LOGOUT_CLICKED, () => {
            console.log('from event-listener:logout-clicked of profileController');
            this.logout();
        });
        console.log(globalEventBus.listeners);
    }
    async updateProps() {
        const BASE_URL = 'https://ya-praktikum.tech/';
        const BASE_IMG = './images/profile_blob.png';
        console.log('update props');
        const newProps = await getUserInfo();
        if (!newProps) {
            return;
        }
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
    logout() {
        new ProfileAPI()
            .create()
            .then((response) => {
            console.log(response.responseText, response.status);
            if (response.status !== 200) {
                notify({
                    response,
                    block: this.block
                });
                return;
            }
            router.go(ProfileController.PATHS.SIGNIN);
        });
    }
}
ProfileController.EVENTS = {
    EVENT_LOGOUT: 'event-listener:logout',
    EVENT_LOGOUT_CLICKED: 'event-listener:logout-clicked'
};
ProfileController.PATHS = {
    SIGNIN: '/singin'
};
//# sourceMappingURL=index.js.map