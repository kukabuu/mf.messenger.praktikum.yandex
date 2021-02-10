import Block from '../core/Block/index';
import Notification from '../components/Notification/index';
import { router } from '../core/Main/main';

type Options = {
  response: XMLHttpRequest;
  block: Block<Record<string, unknown>> | null;
  successMessage?: string;
  errorMessage?: string;
  showOnSuccess?: boolean;
}

function hideNotification(block: Block<Record<string, unknown>> | null) {
  setTimeout(() => {
    block?.setProps({
      notification: ''
    });
  }, 3000);
}

export function notify({
  response,
  block,
  successMessage = '',
  errorMessage = '',
  showOnSuccess = false
}: Options): void {
  switch (response.status) {
    case 404:
      router.go('/notFound');
      break;
    case 500:
      router.go('/serverError');
      break;
    case 200:
      if (!showOnSuccess) {
        break;
      }
      block?.setProps({
        notification: new Notification({
          message: successMessage
        }).getContent().innerHTML
      });
      hideNotification(block);
      break;
    default:
      block?.setProps({
        notification: new Notification({
          title: 'Ошибка!',
          message: response.response || errorMessage,
          status: 'notification--error'
        }).getContent().innerHTML
      });
      hideNotification(block);
  }
}
