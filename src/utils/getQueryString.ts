type StringIndexed = Record<string, unknown>;

export function getQueryString(data: StringIndexed): string | never {
  if (typeof data !== 'object') {
    throw 'input must be an object';
  }
  const result: string[] = [];
  iterateObject(data);

  function iterateObject(object: StringIndexed, prefix: string | number = ''): void {
    Object.keys(object).forEach((key) => {
      const value: unknown = object[key];
      const k: string = prefix ? `${prefix}[${key}]` : `${key}`;
      if (typeof value !== 'object') {
        result.push(`${k}=${value}`);
        return;
      }
      iterateObject(value as StringIndexed, k);
    });
  }

  return `?${result.join('&')}`;
}
