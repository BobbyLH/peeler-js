import addListener from '../addListener';
import removeListener from '../removeListener';
import getUA from '../getUA';

type AnyFn = () => any;
type Listener = AnyFn | null;
interface CbOption {
  isIOS: boolean;
  isAndroid: boolean;
};
type CbFn = (option: CbOption) => any;
let listener_resize: Listener, listener_focus: Listener, listener_blur: Listener = null;

export function listenKeyboard (node: HTMLInputElement | HTMLTextAreaElement, onRise?: CbFn, onFold?: CbFn) {
  if (typeof window === 'undefined') return;

  const { isAndroid, isIOS } = getUA(window.navigator.userAgent);
  const env = {
    isIOS,
    isAndroid
  };

  if (isAndroid) {
    let originHeight = document.documentElement.clientHeight || document.body.clientHeight;
    listener_resize = function () {
      const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;

      if (originHeight < resizeHeight) {
        // Android 键盘收起
        onFold && onFold(env);
      } else {
        // Android 键盘弹起
        onRise && onRise(env);
      }
      originHeight = resizeHeight;
    };

    addListener('resize', listener_resize, window)
  }

  if (isIOS) {
    listener_focus = function () {
      // IOS 键盘弹起
      onRise && onRise(env);
    };
    addListener('focus', listener_focus, node);

    listener_blur = function () {
      // IOS 键盘收起
      onFold && onFold(env);
    };
    addListener('blur', listener_blur, node);
  }
};

export function clearKeyboardListener (node: HTMLInputElement | HTMLTextAreaElement) {
  if (typeof window === 'undefined') return;

  const { isAndroid, isIOS } = getUA(window.navigator.userAgent);

  if (isAndroid && listener_resize) {
    removeListener('resize', listener_resize, window)
  }

  if (isIOS && listener_focus && listener_blur) {
    removeListener('focus', listener_focus, node);
    removeListener('blur', listener_blur, node);
  }
}

export default listenKeyboard;