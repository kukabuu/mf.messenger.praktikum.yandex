import Router from '../Router/index.js';

import SignInController from '../../controllers/SignInController/index.js';
import SignUpController from '../../controllers/SignUpController/index.js';
import ProfileEditController from '../../controllers/ProfileEditController/index.js';
import ProfileController from '../../controllers/ProfileController/index.js';
import PasswordChangeController from '../../controllers/PasswordChangeController/index.js';
import ChatController from '../../controllers/ChatController/index.js';
import ServerErrorController from '../../controllers/ServerErrorController/index.js';
import NotFoundPageController from '../../controllers/NotFoundPageController/index.js';

import { globalEventBus } from '../GlobalEventBus/index.js';

export const router = new Router('.app');

router
	.use('/', SignInController)
	.use('/notFound', NotFoundPageController)
	.use('/serverError', ServerErrorController)
	.use('/signin', SignInController)
	.use('/signup', SignUpController)
	.use('/profile', ProfileController)
	.use('/changePassword', PasswordChangeController)
	.use('/changeProfile', ProfileEditController)
	.use('/chats', ChatController)
	.start();

// //Через секунду контент изменится сам, достаточно дёрнуть переход
// setTimeout(() => {
// 	router.go('/');
// }, 1000);
//
// // А можно и назад
// setTimeout(() => {
// 	router.back();
// }, 3000);
//
// // И снова вперёд
// setTimeout(() => {
// 	router.forward();
// 	console.log(globalEventBus)
//
// }, 5000);

console.log(globalEventBus)
