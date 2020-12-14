interface Callback<T> {
	(...args: T[] | [] | MouseEvent[]): void;
}

type ListenersType<T> = {
	[key: string]: Callback<T>[];
};

export default class EventBus<T> {
	listeners: ListenersType<T>;
	constructor() {
		this.listeners = {};
	}

	on(event: string, callback: (...args: T[] | [] | MouseEvent[]) => void): void {

		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback);
	}

	off(event: string, callback: Callback<T>): void {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event] = this.listeners[event].filter(
			listener => listener !== callback
		);
	}

	emit(event: string, ...args: T[]): void {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event].forEach(function(listener: Callback<T>) {
			listener(...args);
		});
	}
}
