function isNumberLike (value: any) {
  // exclude empty string
  if (typeof value === 'string' && value !== '0' && +value === 0) return false;

  return !isNaN('' + value as any);
}

function toNumberLike (value: any) {
  // exclude empty string
  if (typeof value === 'string' && value !== '0' && +value === 0) return value;

  return !isNaN('' + value as any) ? +value : value;
}

export {
  isNumberLike,
  toNumberLike
};