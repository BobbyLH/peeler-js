interface EventReplenishment extends WindowEventMap, HTMLBodyElementEventMap, DocumentEventMap {
  DOMContentLoaded: Event;
  progress: any;
  readystatechange: any;
}

type DOMType = Window | Document | HTMLElement | Node | Element;

interface RemoveListener {
  <K extends keyof WindowEventMap>(event: K, fn: (this: Window, ev: WindowEventMap[K]) => any, dom: DOMType, useCapture?: boolean): void;
  (event: string, fn: EventListenerOrEventListenerObject, dom: DOMType, useCapture?: boolean): void;
}

/**
 * @param {string} event event name
 * @param {function} fn event callback
 * @param {object} dom event dom
 * @param {boolean} useCapture bubble or capture
 */
export const removeListener: RemoveListener = (function () {
  if (typeof window === 'undefined') return function (): void {};

  if (!window.removeEventListener) {
    return function (event: any, fn: any, dom: DOMType): void {
      const eventDOM: any = dom || window;
      eventDOM.detachEvent(`on${event}`, fn);
    };
  }

  return function (event: any, fn: any, dom: DOMType, useCapture = false): void {
    const eventDOM = dom || window;
    eventDOM.removeEventListener(event, fn as EventListenerOrEventListenerObject, useCapture);
  };
})();

export default removeListener;
