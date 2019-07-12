type ValueOf<T> = T[keyof T]
interface ListenerOption {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
}

type AnyEvent = ValueOf<WindowEventMap>
interface AnyEventListenerCallback {
  (e: AnyEvent): any;
}

type EventListenerCallback = AnyEventListenerCallback;
type DOMType = Window | Document | HTMLElement;
type AddListener = (event: string, fn: EventListenerCallback, dom: DOMType, option?: ListenerOption) => void;
type AddListener_IE = (event: string, fn: EventListenerCallback, dom: DOMType) => void;

/**
 * @param {string} event event name
 * @param {function} fn event callback
 * @param {object} dom event dom
 * @param {ListenerOption} option option contain captrue, passive, once
 */
export const addListener: AddListener | AddListener_IE = (function () {
  if (typeof window === 'undefined') return function (): void {}

  if (!window.addEventListener) {
    return function (event: string, fn: EventListenerCallback, dom: DOMType): void {
      const eventDOM: any = dom || window
      eventDOM.attachEvent(`on${event}`, fn)
    }
  }

  return function (event: string, fn: EventListenerCallback, dom: DOMType, option: ListenerOption = {}): void {
    const eventDOM = dom || window
    const { capture = false, passive = false, once = false } = option

    eventDOM.addEventListener(event, fn, {
      capture,
      passive,
      once
    })
  }
})()

export default addListener
