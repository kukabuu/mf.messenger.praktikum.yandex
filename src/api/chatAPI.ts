import HTTP from '../core/HTTP/index';

const chatAPIInstance = new HTTP('/chats');

export class ChatAPI {
  create(data: Record<string, unknown>): Promise<XMLHttpRequest> {
    return chatAPIInstance.post('/', data);
  }

  update(): Promise<XMLHttpRequest> {
    return chatAPIInstance.get('/');
  }

  delete(data: Record<string, unknown>): Promise<XMLHttpRequest> {
    return chatAPIInstance.delete('/', data);
  }
}

/*
а вообще не вижу смысла в этой дополнительной абстракции, которая вокруг profileAPIInstance.
ведь есть же все эти методы описанные, зачем ещё класс ProfileAPI ?

все эти файлы выше с именем *API.ts можно удалить и использовать *APIInstance
напрямую без каких-то дополнительных абстракций.
	либо можно наоборот весь функционал из userChatAPIInstance вытащить сюда в UserChatAPI,
	в общем иметь под это дело всего один файл под каждую сущность (юзер, чат и тд)
	*/
