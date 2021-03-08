import { globalStore } from '../../store/index';
import { globalEventBus } from '../GlobalEventBus/index';

export default class WebSocketService {
  chatId: number;
  userId: number;
  url: string;
  socket: WebSocket;
  __instance: WebSocketService;

  constructor(userId: number, chatId: number, token: string) {
    this.chatId = chatId;
    this.userId = userId;
    this.url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;
    this.socket = new WebSocket(this.url);
    this.__instance = this;
  }

  onMessage(): void {
    this.socket.addEventListener('message', (event) => {

      const data = JSON.parse(event.data);
      if (!Array.isArray(data) && data.type !== 'message') {
        return;
      }
      const messages = {
        id: this.chatId,
        list: Array.isArray(data) ? data : [data]
      };
      globalStore.dispatch('setMessages', messages);
      globalEventBus.emit('state:change-messages', this.chatId);
    });
  }

  onOpen(): void {
    this.socket.addEventListener('open', () => {
      this.getOld('0');
    });
  }

  onClose(): void {
    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });
  }

  onError(): void {
    this.socket.addEventListener('error', (event) => {
      throw new Error(`Ошибка: ${event}`);
    });
  }

  connect(): void {
    this.onOpen();
    this.onMessage();
    this.onClose();
    this.onError();
    this.setInterval();
  }

  send(message: string): void {
    this.socket.send(JSON.stringify({
      content: message,
      userId: this.userId,
      type: 'message'
    }));
  }

  getOld(count: string): void {
    this.socket.send(JSON.stringify({
      content: count,
      type: 'get old'
    }));
  }

  ping(): void {
    this.send('');
  }

  setInterval(): void {
    setInterval(this.ping.bind(this), 60000);
  }
}
