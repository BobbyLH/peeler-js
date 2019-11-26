/**
 * get cookie by appoint name and cookie str
 * @param {string} name 
 * @param {string} cookie
 * @return {string | null}
 */
function handleCookie (name: string, cookie: string): string | null {
  if (cookie) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    const cookArr = cookie.match(reg);
    if (cookArr && cookArr[2]) {
      return unescape(cookArr[2]);
    }
  }

  return null;
}

/**
 * get cookie
 * @param {string} name 
 * @param {string} cookie
 * @return {string | null}
 */
export function getCookie (name: string, cookie: string | void): string | null {
  return handleCookie(name, cookie || (typeof window !== 'undefined' ? document.cookie : ''));
}

export default getCookie;