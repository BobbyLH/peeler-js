export function firstLetter (str: string, option?: {
  case?: 'upper' | 'lower';
  include?: boolean;
}): string {
  if (!str) return str;
  const [ first, ...rest ] = str.split('');

  if (!option || option.include === true) return first;

  if (option.include === false) return rest.join('');

  return first[option.case === 'upper' ? 'toUpperCase' : 'toLowerCase']() + rest.join('');
}

export function lastLetter (str: string, option?: {
  case?: 'upper' | 'lower';
  include?: boolean;
}): string {
  if (!str) return str;
  const [ last, ...rest ] = str.split('').reverse();

  if (!option || option.include === true) return last;

  if (option.include === false) return rest.join('');

  return rest.reverse().join('') + last[option.case === 'upper' ? 'toUpperCase' : 'toLowerCase']();
}

export default {
  firstLetter,
  lastLetter
};