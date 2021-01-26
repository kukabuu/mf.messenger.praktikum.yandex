type Object = {
	[key: string]: any;
}

export function merge<T extends object>(lhs: T, rhs: T): T {
	const target = lhs as Object;
	merger(rhs);

	function merger(obj: Object) {
		if (obj === null) return;
		for (const prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				if (typeof obj[prop] === 'object' && !Array.isArray(obj[prop])) {
					target[prop] = merge(target[prop], obj[prop]);
				} else {
					target[prop] = obj[prop];
				}
			}
		}
	}
	return target as T;
}
