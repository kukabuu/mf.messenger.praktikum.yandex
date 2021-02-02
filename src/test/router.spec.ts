import { expect } from "chai";

import Router from '../core/Router/index';
import ChatController from '../controllers/ChatController/index';

describe("Router", () => {
	it("should return /chats when go to '/chats'", (done) => {
		const router = new Router('.app');
		router.use('/chats', ChatController);
		router.go('/chats');
		const pathname = window.location.pathname;
		expect(pathname).is.eq('/chats');
		done();
	});
});

//граничные значения
//позитивные
//негативные
//фаззинг

// переход на страницу профиля по url
// переход на ту же страницу
// переход на рут по url
// переход по back, forward
// переход на несуществующий адрес
