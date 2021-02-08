function trim(string: string, chars?: string): string {
  const regexp = chars ? new RegExp(`${chars}`, 'g') : /[ \\xA0]/g;
  return string.replace(regexp, '');
}

export default trim;
