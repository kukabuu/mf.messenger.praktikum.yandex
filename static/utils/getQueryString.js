export function getQueryString(data) {
    if (typeof data !== 'object') {
        throw 'input must be an object';
    }
    const result = [];
    iterateObject(data);
    function iterateObject(object, prefix = '') {
        Object.keys(object).forEach((key) => {
            let value = object[key];
            let k = prefix ? `${prefix}[${key}]` : `${key}`;
            if (typeof value !== 'object') {
                result.push(`${k}=${value}`);
                return;
            }
            iterateObject(value, k);
        });
    }
    return result.join('&');
}
//# sourceMappingURL=getQueryString.js.map