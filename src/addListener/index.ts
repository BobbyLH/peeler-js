type DOMType = Window | Document | HTMLElement | Node | Element;

interface ListenerOption {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
}

interface AddListener {
  <K extends keyof WindowEventMap>(event: K, fn: (this: Window, ev: WindowEventMap[K]) => any, dom: DOMType, option?: ListenerOption): void;
  (event: string, fn: EventListenerOrEventListenerObject, dom: DOMType, option?: ListenerOption): void;
}

/**
 * @param {AnyEventName} event event name
 * @param {function} fn event callback
 * @param {object} dom event dom
 * @param {ListenerOption} option option contain captrue, passive, once
 */
export const addListener: AddListener = (function () {
  if (typeof window === 'undefined') return function () {};

  if (!window.addEventListener) {
    return function (event: any, fn: any, dom: DOMType) {
      const eventDOM: any = dom || window;
      eventDOM.attachEvent(`on${event}`, fn);
    };
  }

  return function (event: any, fn: any, dom: DOMType, option: ListenerOption = {}) {
    const eventDOM = dom || window;
    const { capture = false, passive = false, once = false } = option;

    eventDOM.addEventListener(event, fn as EventListenerOrEventListenerObject, {
      capture,
      passive,
      once
    });
  };
})();

export default addListener;
