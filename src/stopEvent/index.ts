/**
 * @param {event} event event object
 */
export const stopEvent = (event: Event) => {
  const e = event || (typeof window !== 'undefined' && window.event);
  if (!e) return;

  if (e && e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }
};

export default stopEvent;
