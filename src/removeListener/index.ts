type ValueOf<T> = T[keyof T]
type AnyEvent = ValueOf<WindowEventMap>
interface AnyEventListenerCallback {
  (e: AnyEvent): any;
}

type EventListenerCallback = AnyEventListenerCallback;
type DOMType = Window | Document | HTMLElement;
type RemoveListener = (event: string, fn: EventListenerCallback, dom: DOMType, useCapture?: boolean) => void;
type RemoveListener_IE = (event: string, fn: EventListenerCallback, dom: DOMType) => void;

/**
 * @param {string} event event name
 * @param {function} fn event callback
 * @param {object} dom event dom
 * @param {boolean} useCapture bubble or capture
 */
export const removeListener: RemoveListener | RemoveListener_IE = (function () {
  if (typeof window === 'undefined') return function (): void {}

  if (!window.removeEventListener) {
    return function (event: string, fn: EventListenerCallback, dom: DOMType): void {
      const eventDOM: any = dom || window
      eventDOM.detachEvent(`on${event}`, fn)
    }
  }

  return function (event: string, fn: EventListenerCallback, dom: DOMType, useCapture: boolean = false): void {
    const eventDOM = dom || window
    eventDOM.removeEventListener(event, fn, useCapture)
  }
})()

export default removeListener
