/**
 * @param {event} event event object
 */
export const preventEvent = (event: Event) => {
  const e = event || (typeof window !== 'undefined' && window.event);
  if (!e) return;

  if (e.preventDefault) {
    e.cancelable && !e.defaultPrevented && e.preventDefault();
  } else {
    e.returnValue = false;
  }
  return false;
};

export default preventEvent;
