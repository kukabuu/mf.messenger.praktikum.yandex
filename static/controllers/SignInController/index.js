import ComponentController from '../../core/ComponentController/index.js';
import Entry from '../../components/Entry/index.js';
import { props } from './props.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
import { SignInAPI } from '../../api/signInAPI.js';
import { router } from '../../core/Main/main.js';
import { collectFormData } from '../../utils/collectFormData.js';
import { notify } from '../../utils/notify.js';
export default class SignInController extends ComponentController {
    constructor() {
        super(Entry, props);
        if (SignInController.__instance) {
            return SignInController.__instance;
        }
        SignInController.__instance = this;
    }
    emitListeners() {
        globalEventBus.emit(SignInController.EVENTS.EVENT_VALIDATE);
        globalEventBus.emit(SignInController.EVENTS.EVENT_SEND_FORM);
    }
    subscribeState() {
        globalEventBus.on(SignInController.EVENTS.EVENT_SEND_FORM_CLICKED, ($form) => {
            this.sendFormData($form);
        });
    }
    sendFormData($form) {
        const formData = collectFormData($form);
        new SignInAPI()
            .create({ data: formData })
            .then((response) => {
            console.log(response.responseText, response.status);
            if (response.status !== 200) {
                notify({
                    response,
                    block: this.block
                });
                return;
            }
            router.go(SignInController.PATHS.CHATS);
        });
    }
}
SignInController.EVENTS = {
    EVENT_VALIDATE: 'event-listener:validate-form',
    EVENT_SEND_FORM: 'event-listener:send-signin-form',
    EVENT_SEND_FORM_CLICKED: 'event-listener:send-signin-form-clicked'
};
SignInController.PATHS = {
    CHATS: '/chats'
};
//# sourceMappingURL=index.js.map