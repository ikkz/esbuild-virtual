export const mergeRegExp = (regExps: RegExp[]) =>
  new RegExp(regExps.map(regExp => regExp.source).join('|'));
