export function merge<T extends Record<string, unknown>>(lhs: T, rhs: T): T {
  const target = lhs as Record<string, unknown>;
  merger(rhs);

  function merger(obj: Record<string, unknown>) {
    if (obj === null) return;
    for (const prop in obj) {
      if (Object.hasOwnProperty.call(obj, prop)) {
        if (typeof obj[prop] === 'object' && !Array.isArray(obj[prop])) {
          target[prop] = merge(
            target[prop] as Record<string, unknown>,
            obj[prop] as Record<string, unknown>
          );
        } else {
          target[prop] = obj[prop];
        }
      }
    }
  }

  return target as T;
}
