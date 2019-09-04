interface EventReplenishment extends WindowEventMap, HTMLBodyElementEventMap, DocumentEventMap {
  DOMContentLoaded: Event;
  progress: ProgressEvent;
  readystatechange: ProgressEvent;
}

type PickOne<T, K extends keyof T> = T[K]
type AnyEventName = keyof EventReplenishment;
type EventListenerCallback<T extends AnyEventName> = (e: PickOne<EventReplenishment, T>) => any;
type DOMType = Window | Document | HTMLElement | Node | Element;

/**
 * @param {string} event event name
 * @param {function} fn event callback
 * @param {object} dom event dom
 * @param {boolean} useCapture bubble or capture
 */
export const removeListener = (function () {
  if (typeof window === 'undefined') return function (): void {}

  if (!window.removeEventListener) {
    return function <T extends AnyEventName>(event: string, fn: EventListenerCallback<T>, dom: DOMType): void {
      const eventDOM: any = dom || window
      eventDOM.detachEvent(`on${event}`, fn)
    }
  }

  return function <T extends AnyEventName>(event: string, fn: EventListenerCallback<T>, dom: DOMType, useCapture: boolean = false): void {
    const eventDOM = dom || window
    eventDOM.removeEventListener(event, fn as EventListenerOrEventListenerObject, useCapture)
  }
})()

export default removeListener
