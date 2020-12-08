import Signin from '../../components/Signin/index.js';
import Button from '../../components/Button/index.js';

import { render } from '../../utils/render.js';
import { FormValidator } from '../../utils/validation.js';
import { collectFormData } from '../../utils/collectFormData.js';

import { signinPageProps, signinButtonProps } from './mock.js';

// рендерим компоненты
const signinPage = new Signin(signinPageProps);
render('.app', signinPage);

const signinButton = new Button(signinButtonProps);
render('.js-form', signinButton);

// добавляем валидацию
const $form = document.querySelector('.js-form');
const fields = ['email', 'login', 'first_name', 'second_name', 'phone', 'password','password-repeat'];
const validator = new FormValidator($form, fields);
validator.initialize();

// добавляет обработчики событий
collectFormData();
