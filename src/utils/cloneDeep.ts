export function cloneDeep<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null)
    return obj;
  let result;
  if (Array.isArray(obj)) {
    result = [];
    obj.forEach((o) => {
      result.push(copy(o));
    });
  }
  if (typeof obj === 'object' && !Array.isArray(obj)) {
    result = copy(obj as Record<string, unknown>);
  }
  return result as T;
}

function copy(obj: Record<string, unknown>): Record<string, unknown>[] | Record<string, unknown> {
  if (typeof obj !== 'object' || !obj) return obj;
  const result: Record<string, unknown>[] | Record<string, unknown> = (Array.isArray(obj)) ? [] : {};

  for (const i in obj) {
    if (Object.hasOwnProperty.call(obj, i)) {
      if (Array.isArray(result)) {
        result.push(copy(obj[i] as Record<string, unknown>) as Record<string, unknown>);
      } else {
        result[i] = copy((obj[i] as Record<string, unknown>));
      }
    }
  }
  return result;
}

