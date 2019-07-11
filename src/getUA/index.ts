interface Iua {
  [propsName: string]: boolean;
}

/**
 * generation ua object accroding to navigator.userAgent
 * @param {string} u navigator.userAgent
 * @return {false | Iua} ua object
 */
export function getUA (u: ''): false;
export function getUA (u: string): Iua;
export function getUA (u: string): false | Iua {
  if (!u) return false

  function check (pattern: RegExp): boolean {
    return (pattern).test(u)
  }

  const UA: Iua = {
    isAndroid: check(/android|linux|adr/i),
    isIOS: check(/\(i[^;]+;( U;)? CPU.+Mac OS X/i),
    isWindows: check(/window/i),
    isMac: check(/mac os x/i),
    isIPad: check(/iPad/i),
    isMobile: check(/AppleWebKit.*Mobile.*|Mobile/i),
    isWebKit: check(/webkit\W/i),

    isChrome: check(/webkit\W.*(chrome|chromium)\W/i),
    isFirefox: check(/mozilla.*\Wfirefox\W/i),
    isGecko: check(/mozilla(?!.*webkit).*\Wgecko\W/i),
    is360se: check(/360/i),
    isIE: (function() {
      if (typeof window !== 'undefined' && navigator.appName === 'Microsoft Internet Explorer') {
        return true;
      } else if (check(/\bTrident\b/)) {
        return true;
      } else {
        return false;
      }
    })(),
    isEdge: check(/\bEdge\b/i),
    isOpera: check(/opera.*\Wpresto\W|OPR/i),
    isSafari: check(/webkit\W(?!.*chrome).*safari\W/i),
    isUCBrowser: check(/ucbrowser/i),
    isBaiduBrowser: check(/bidubrowser/i),
    isSougouBrowser: check(/metasr/i),
    isLiebaoBrowser: check(/lbbrowser/i),

    isWeixin: check(/micromessenger/i),
    isSinaWeibo: check(/weibo/i),
    isQQ: check(/qq/i),
    isQQWeibo: check(/tencentmicroblog/i),

    isFacebook: check(/fban/i),
    isTwitter: check(/twitter/i),
    isInstagram: check(/instagram/i),
  }

  return UA
}

export default getUA
