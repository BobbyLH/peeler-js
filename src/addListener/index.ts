type PickOne<T, K extends keyof T> = T[K]
type AnyEventName = keyof WindowEventMap;
type EventListenerCallback<T extends AnyEventName> = (e: PickOne<WindowEventMap, T>) => any;
type DOMType = Window | Document | HTMLElement;

interface ListenerOption {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
}

/**
 * @param {AnyEventName} event event name
 * @param {function} fn event callback
 * @param {object} dom event dom
 * @param {ListenerOption} option option contain captrue, passive, once
 */
export const addListener = (function () {
  if (typeof window === 'undefined') return function (): void {}

  if (!window.addEventListener) {
    return function <T extends AnyEventName>(event: T, fn: EventListenerCallback<T>, dom: DOMType): void {
      const eventDOM: any = dom || window
      eventDOM.attachEvent(`on${event}`, fn)
    }
  }

  return function <T extends AnyEventName>(event: T, fn: EventListenerCallback<T>, dom: DOMType, option: ListenerOption = {}): void {
    const eventDOM = dom || window
    const { capture = false, passive = false, once = false } = option

    eventDOM.addEventListener(event, fn as EventListenerOrEventListenerObject, {
      capture,
      passive,
      once
    })
  }
})()

export default addListener
