import Login from '../../components/Login/index.js';
import Button from '../../components/Button/index.js';
import { render } from '../../utils/render.js';
import { FormValidator } from '../../utils/validation.js';
import { collectFormData } from '../../utils/collectFormData.js';
import { loginPageProps, loginButtonProps } from './mock.js';
// рендерим компоненты
const loginPage = new Login(loginPageProps);
render('.app', loginPage);
const loginButton = new Button(loginButtonProps);
render('.js-form', loginButton);
// добавляем валидацию
const $form = document.querySelector('.js-form');
const fields = ['login', 'password'];
const validator = new FormValidator($form, fields);
validator.initialize();
// добавляет обработчики событий
collectFormData();
//# sourceMappingURL=index.js.map