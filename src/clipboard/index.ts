/**
 * copy text to clipboard method
 * @param {string} text the content for copy
 * @param {function} cb the callback for copy result
 * @return {void}
 */
export const clipboard: (text: string | number, cb?: (succeeded: boolean) => any) => void = (text, cb) => {
  if (typeof window === 'undefined' || typeof text === 'undefined' || ('' + text) === 'null') return;
  const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  let fakeElem: HTMLTextAreaElement | null = document.createElement('textarea');
  // Prevent zooming on iOS
  fakeElem.style.fontSize = '12pt';
  // Reset box model
  fakeElem.style.border = '0';
  fakeElem.style.padding = '0';
  fakeElem.style.margin = '0';
  // Move element out of screen horizontally
  fakeElem.style.position = 'absolute';
  fakeElem.style[ isRTL ? 'right' : 'left' ] = '-9999px';
  // Move element to the same position vertically
  const yPosition = window.pageYOffset || document.documentElement.scrollTop;
  fakeElem.style.top = `${yPosition}px`;

  fakeElem.setAttribute('readonly', '');
  fakeElem.value = '' + text;

  document.body.appendChild(fakeElem);

  // make selection
  fakeElem.select();
  fakeElem.setSelectionRange(0, fakeElem.value.length);

  let succeeded: boolean;
  try {
    succeeded = document.execCommand('copy');
  } catch (error) {
    succeeded = false;
  }
  cb && cb(succeeded);
  // remove the selection
  const getSelection = window.getSelection();
  getSelection && getSelection.removeAllRanges();


  document.body.removeChild(fakeElem);
  fakeElem = null;
};

export default clipboard;
