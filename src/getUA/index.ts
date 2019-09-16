interface Iua {
  [propsName: string]: boolean;
}

/**
 * generation ua object accroding to navigator.userAgent
 * @param {string} u navigator.userAgent
 * @return {false | Iua} ua object
 */
export function getUA(u: ''): false;
export function getUA(u: string): Iua;
export function getUA(u: string): false | Iua {
  if (!u) return false

  function check(pattern: RegExp): boolean {
    return (pattern).test(u)
  }

  function parseIPhoneX(u: string): string {
    let model = ''
    if (/(iPhone\/)?iPhone\s?X/.test(u)) { // 通过UA判断
      model = 'iPhoneX'
    } else { // 浏览器中无法通过UA检测出iphonex系列
      if (/iPhone/.test(u)) { // 通过ua加屏幕宽高判断
        // https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/
        // iPhone X      @3x 1125px × 2436px => 375px x 812px
        // iPhone XS     @3x 1125px × 2436px => 375px x 812px
        // iPhone XS Max @3x 1242px × 2688px => 414px x 896px
        // iPhone XR     @2x 828px × 1792px  => 414px x 896px
        // Portrait/Landscape

        if (typeof screen !== 'undefined') {
          const screenHeight = screen.height
          const screenWidth = screen.width
          if (screenHeight === 812 || screenWidth === 812) { // iPhoneX/iPhoneXS
            model = 'iPhoneX'
          } else if (screenHeight === 896 || screenWidth === 896) { // iPhoneXR/iPhoneXSMax
            model = 'iPhoneXR'
            if (devicePixelRatio) {
              if (devicePixelRatio === 3) {
                model = 'iPhoneXSMax'
              }
            }
          }
        }
      }
    }
    return model
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
    isIE: (function () {
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

    isIphoneX: parseIPhoneX(u) == 'iPhoneX' ? true : false,
    isIPhoneXR: parseIPhoneX(u) == 'iPhoneXR' ? true : false,
    isIPhoneXSMax: parseIPhoneX(u) == 'iPhoneXSMax' ? true : false,
  }

  return UA
}

export default getUA
