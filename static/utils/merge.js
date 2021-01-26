export function merge(lhs, rhs) {
    const target = lhs;
    merger(rhs);
    function merger(obj) {
        if (obj === null)
            return;
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (typeof obj[prop] === 'object' && !Array.isArray(obj[prop])) {
                    target[prop] = merge(target[prop], obj[prop]);
                }
                else {
                    target[prop] = obj[prop];
                }
            }
        }
    }
    return target;
}
//# sourceMappingURL=merge.js.map