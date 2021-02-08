import { ProfileAPI } from '../api/profileAPI';
import { router } from '../core/Main/main';

export async function getUserInfo(): Promise<Record<string, unknown>> {
  return new ProfileAPI()
    .request()
    .then((response) => {
      return JSON.parse(response.response);
    })
    .catch(() => {
      router.go('/notFound');
    });
}
