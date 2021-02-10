export function getAvatarLink(userData: Record<string, unknown>): string {
  const BASE_URL = 'https://ya-praktikum.tech/';
  const BASE_IMG = './images/profile_blob.png';

  return userData['avatar'] !== null
    ? `${BASE_URL}${userData['avatar']}`
    : BASE_IMG;
}
