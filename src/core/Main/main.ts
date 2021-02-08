import Router from '../Router/index';

import SignInController from '../../controllers/SignInController/index';
import SignUpController from '../../controllers/SignUpController/index';
import ProfileEditController from '../../controllers/ProfileEditController/index';
import ProfileController from '../../controllers/ProfileController/index';
import PasswordChangeController from '../../controllers/PasswordChangeController/index';
import ChatController from '../../controllers/ChatController/index';
import ServerErrorController from '../../controllers/ServerErrorController/index';
import NotFoundPageController from '../../controllers/NotFoundPageController/index';

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
