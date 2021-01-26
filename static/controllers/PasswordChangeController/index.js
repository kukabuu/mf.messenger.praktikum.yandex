import ComponentController from '../../core/ComponentController/index.js';
import Profile from '../../components/Profile/index.js';
import { props } from './props.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
import { router } from '../../core/Main/main.js';
import { ProfileChangePasswordAPI } from '../../api/profileChangePasswordAPI.js';
import { getUserInfo } from '../../utils/getUserInfo.js';
import { collectFormData } from '../../utils/collectFormData.js';
import { notify } from '../../utils/notify.js';
export default class PasswordChangeController extends ComponentController {
    constructor() {
        super(Profile, props);
        if (PasswordChangeController.__instance) {
            return PasswordChangeController.__instance;
        }
        PasswordChangeController.__instance = this;
    }
    emitListeners() {
        globalEventBus.emit(PasswordChangeController.EVENTS.EVENT_VALIDATE);
        globalEventBus.emit(PasswordChangeController.EVENTS.EVENT_CHANGE_PASSWORD);
    }
    addListeners() {
        globalEventBus.on(PasswordChangeController.EVENTS.EVENT_CHANGE_PASSWORD_CLICKED, ($form) => {
            console.log('from event-listener:change-password-clicked of passwordChangeController');
            this.changePassword($form);
        });
    }
    async updateProps() {
        const BASE_URL = 'https://ya-praktikum.tech/';
        const BASE_IMG = './images/profile_blob.png';
        console.log('update props');
        const newProps = await getUserInfo();
        const avatar = newProps['avatar'] !== null
            ? `${BASE_URL}${newProps['avatar']}`
            : BASE_IMG;
        this.block.setProps({
            header: newProps['first_name'],
            avatar
        });
    }
    changePassword($form) {
        const formData = collectFormData($form);
        new ProfileChangePasswordAPI()
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
            router.go(PasswordChangeController.PATHS.PROFILE);
        });
    }
}
PasswordChangeController.EVENTS = {
    EVENT_VALIDATE: 'event-listener:validate-form',
    EVENT_CHANGE_PASSWORD: 'event-listener:change-password',
    EVENT_CHANGE_PASSWORD_CLICKED: 'event-listener:change-password-clicked'
};
PasswordChangeController.PATHS = {
    PROFILE: '/profile'
};
//# sourceMappingURL=index.js.map