import ComponentController from '../../core/ComponentController/index.js';
import Entry from '../../components/Entry/index.js';
import { props } from './props.js';
import { globalEventBus } from '../../core/GlobalEventBus/index.js';
import { SignUpAPI } from '../../api/signUpAPI.js';
import { router } from '../../core/Main/main.js';
import { collectFormData } from '../../utils/collectFormData.js';
import { notify } from '../../utils/notify.js';
export default class SignUpController extends ComponentController {
    constructor() {
        super(Entry, props);
        if (SignUpController.__instance) {
            return SignUpController.__instance;
        }
        SignUpController.__instance = this;
    }
    emitListeners() {
        globalEventBus.emit(SignUpController.EVENTS.EVENT_VALIDATE);
        globalEventBus.emit(SignUpController.EVENTS.EVENT_SEND_FORM);
    }
    subscribeState() {
        globalEventBus.on(SignUpController.EVENTS.EVENT_SEND_FORM_CLICKED, ($form) => {
            console.log('from event-listener:submit-signup-form-clicked of signupcontroller');
            this.sendFormData($form);
        });
    }
    sendFormData($form) {
        const formData = collectFormData($form);
        new SignUpAPI()
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
            router.go(SignUpController.PATHS.CHATS);
        });
    }
}
SignUpController.EVENTS = {
    EVENT_VALIDATE: 'event-listener:validate-form',
    EVENT_SEND_FORM: 'event-listener:send-signin-form',
    EVENT_SEND_FORM_CLICKED: 'event-listener:send-signin-form-clicked'
};
SignUpController.PATHS = {
    CHATS: '/chats'
};
//# sourceMappingURL=index.js.map