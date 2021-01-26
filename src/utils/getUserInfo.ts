import { ProfileAPI } from '../api/profileAPI.js';
import { router } from '../core/Main/main.js';

export async function getUserInfo() {
	return new ProfileAPI()
		.request()
		.then((response) => {
			console.log('FROM REQUEST OPEN')

			console.log(response.responseText, response.status)
			if (response.status !== 200) {
				router.go('/notFound');
				return;
			}
			return JSON.parse(response.responseText);
		})
}
