import Profile from '../../components/Profile/index.js';
import Button from '../../components/Button/index.js';
import { UploadFilePopup } from '../../components/Popup/index.js';

import { render } from '../../utils/render.js';
import { FormValidator } from '../../utils/validation.js';
import { displayFileName } from '../../utils/displayFileName.js';
import { collectFormData } from '../../utils/collectFormData.js';

import { props, updateAvatarButton, updateAvatarPopup } from './mock.js';

// рендерим компоненты
const profilePage = new Profile(props);
render('.app', profilePage);

const popup = new UploadFilePopup(updateAvatarPopup);
render('#popup-update-avatar', popup);

const popupButton = new Button(updateAvatarButton);
render('.js-form', popupButton);

// добавляем валидацию
const $form = document.querySelector('.popup .js-form');
const fields = ['avatar'];
const validator = new FormValidator($form, fields);
validator.initialize();

// добавляем обработчики событий
displayFileName();
collectFormData();
