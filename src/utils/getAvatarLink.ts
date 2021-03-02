import BASE_IMG from '../../static/assets/images/profile_blob.png';

export function getAvatarLink(userData: Record<string, unknown>): string {
  const BASE_URL = 'https://ya-praktikum.tech/';

  return userData['avatar'] !== null
    ? `${BASE_URL}${userData['avatar']}`
    : BASE_IMG;
}
