import ChangePassword from '../../components/ChangePassword/index.js';
import Button from '../../components/Button/index.js';
import { render } from '../../utils/render.js';
import { FormValidator } from '../../utils/validation.js';
import { collectFormData } from '../../utils/collectFormData.js';
import { props, buttonProps } from './mock.js';
// рендерим компоненты
const editProfilePage = new ChangePassword(props);
render('.app', editProfilePage);
const editProfileButton = new Button(buttonProps);
render('.js-form', editProfileButton);
// добавляем валидацию
const $form = document.querySelector('.js-form');
const fields = ['oldPassword', 'password', 'password-repeat'];
const validator = new FormValidator($form, fields);
validator.initialize();
// добавляет обработчики событий
collectFormData();
//# sourceMappingURL=index.js.map