export function getObjectData(obj, path) {
    const splittedPath = path.split('.');
    let result = obj;
    for (let i = 0; i < splittedPath.length; i++) {
        if (typeof result[splittedPath[i]] === 'undefined') {
            result = result[splittedPath[i]];
            break;
        }
        result = result[splittedPath[i]];
    }
    return result;
}
//# sourceMappingURL=getObjectData.js.map