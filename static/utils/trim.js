function trim(string, chars) {
    const regexp = chars ? new RegExp(`${chars}`, 'g') : /[ \\xA0]/g;
    return string.replace(regexp, '');
}
export default trim;
//# sourceMappingURL=trim.js.map