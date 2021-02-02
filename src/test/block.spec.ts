import { expect } from "chai";

import { merge } from "../utils/merge";

describe("Typescript + Babel usage suite", () => {
	it("should return string correctly", () => {
		expect(merge({'a': 1}, {'b': 2}), "Hello mocha");
	});
});

// тестирование кнопки
// создание кнопки
// проверка на пропсы - добавить правильные пропсы, добавить не все пропсы, добавить пропсы неверного формата
// проверка на обновление пропсов

