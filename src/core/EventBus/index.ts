interface Callback {
	(...args: props[] | [] | MouseEvent[]): void;
}

type ListenersType = {
	[key: string]: Callback[];
};

type props = {
	[key: string]: string | number | boolean | Function
};

class Index {
	listeners: ListenersType;
	constructor() {
		this.listeners = {};
	}

	on(event: string, callback: (...args: props[] | [] | MouseEvent[]) => void): void {

		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback);
	}

	off(event: string, callback: Callback): void {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event] = this.listeners[event].filter(
			listener => listener !== callback
		);
	}

	emit(event: string, ...args: props[]): void {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event].forEach(function(listener: Callback) {
			listener(...args);
		});
	}
}

export default Index;
