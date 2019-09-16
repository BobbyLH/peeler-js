import 'mocha'
import { expect } from 'chai'
import listenKeyboard, { clearKeyboardListener } from '../'

describe('listenKeyboard\'s test module', function () {
  it('listenKeyboard is a function', function () {
    expect(listenKeyboard).to.be.a('function');
    expect(clearKeyboardListener).to.be.a('function');
  })

  it('invoke listenKeyboard', function () {
    if (typeof window !== 'undefined') {
      var $input = document.createElement('input');
      document.body.appendChild($input);
      listenKeyboard($input, function () {
        console.info('$input', 'unfold')
      }, function () {
        console.info('$input', 'fold')
      })

      setTimeout(() => {
        $input.focus();
      }, 1000)
    }
  })
})