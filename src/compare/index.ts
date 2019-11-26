/**
 * 
 * @param {any} x The object which will compare with another(y)
 * @param {any} y The object which will compare with another(x)
 * @return {boolean}
 */
export function compare (x: any, y: any): boolean {
  let p: string;

  // NaN eq NaN
  if (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y)) {
    return true;
  }

  // strict equal
  if (x === y) {
    return true;
  }

  // both function / regExp / either String or Number compare with toString
  if ((typeof x === 'function' && typeof y === 'function') || (x instanceof RegExp && y instanceof RegExp) ||
  (x instanceof String || y instanceof String) ||
  (x instanceof Number || y instanceof Number)) {
    return x.toString() === y.toString();
  }

  // Date instance compare with millisecond
  if (x instanceof Date && y instanceof Date) {
    return x.getTime() === y.getTime();
  }

  // In this process, the two element must be Object instance
  if (!(x instanceof Object && y instanceof Object)) {
    return false;
  }

  // prototype must eq
  if (x.prototype !== y.prototype) {
    return false;
  }

  // constructor must eq
  if (x.constructor !== y.constructor) {
    return false;
  }

  // reference must eq
  for (p in y) {
    if (!x.hasOwnProperty(p)) {
      return false;
    }
  }

  for (p in x) {
    // reference must eq
    if (!y.hasOwnProperty(p)) {
      return false;
    }

    // reference type must eq
    if (typeof y[p] !== typeof x[p]) {
      return false;
    }

    // recursion compare
    if (!compare(x[p], y[p])) {
      return false;
    }
  }

  return true;
}

export default compare;
